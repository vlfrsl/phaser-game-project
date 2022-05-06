
import { gameProcess } from "../gameLogic/gameLogic";

import { fontStyle } from "../constants/fontStyle";
import { getPositions } from "../constants/positions";

export class MainPart extends Phaser.Scene {

    constructor() {
        super('main-part');
    }

    create() {

        // positions
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2
        this.girlPosition = {};
        [this.girlPosition] = getPositions.call(this)

        const defaultChooseVariants = gameProcess .getCurrentChooseVariants()

        // game objects
        this.add.image(500, 450, 'home')
            .setScale(1, 1)

        this.particles = this.add.particles('red-magic')

        this.textBg = this.add.image(500, 70, 'choose-text-bg')
            .setScale(1.8,1.3)

        this.text = this.add.text(this.screenCenterX, 70, `Choose your ${gameProcess.getCurrentCategory()}`, fontStyle)
            .setScale(1.5,1.2)
            .setOrigin(0.5)

        this.progress = this.add.image(this.screenCenterX, 70, 'progress-0')
            .setScale(1.5,1.2)
            .setOrigin(0.5)
            .setVisible(false)

        this.girl = this.add.image(this.girlPosition.x, this.girlPosition.y, 'girl')
            .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY)

        this.joyFace = this.add.image(this.girlPosition.x, this.girlPosition.y, 'face-joy')
            .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY)
            .setVisible(false)

        this.clothes = this.add.image(this.girlPosition.x, this.girlPosition.y, gameProcess .chosen.clothes)
            .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY)

        this.bag = this.add.image(this.girlPosition.x, this.girlPosition.y, '')
            .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY)
            .setVisible(false)

        this.accessories = this.add.image(this.girlPosition.x, this.girlPosition.y, '')
            .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY)
            .setVisible(false)

        this.hair = this.add.image(this.girlPosition.x, this.girlPosition.y, 'hair')
            .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY)


        this.leftChoose = this.add.image(270, 600, defaultChooseVariants.var1)
            .setScale(0.7,0.35)
            .setInteractive()

        this.rightChoose = this.add.image(750, 600,  defaultChooseVariants.var2)
            .setScale(0.7,0.35)
            .setInteractive()


        this.emitter = this.particles.createEmitter({
            speed: 1000,
            y: 100,
            lifespan: 500,
            scaleX: 3,
            scaleY: 3,
            on: false,
            active: true,
            follow: this.girl,
        });


        const callUpdate = (chosenElementTexture) => {
            this.updateGame(chosenElementTexture)
        }

        this.leftChoose.on('pointerdown', function (){
                callUpdate(this.texture.key)
            }
        )
        this.rightChoose.on('pointerdown', function (){
                callUpdate(this.texture.key)
            }
        )

        this.pointer = this.add.image(350,650, 'pointer')
            .setScale(0)
            .setVisible(false)


        this.showHintTween = this.tweens.createTimeline();
        this.showHintTween.add({
            targets: this.pointer,
            x: 800,
            duration: 2000,
            paused: true, // set pause default, it lets us control show and hide
            yoyo: true,
            ease: 'Power1',
            loop: 1000,

        })

        this.hintTimer = this.time.addEvent({
            delay: 3000,
            callback: this.showHintPointer,
            callbackScope: this,
        });
    }

    startTotal() { // start total scene
        gameProcess.isLooser() ? this.scene.start('loose-screen') : this.scene.start('win-screen')
    }

    updateGame (chosenElementTexture) {
        // to unable click during transformation-animation
        this.leftChoose.setVisible(false)
        this.rightChoose.setVisible(false)

        this.stopHintTween()
        this.hintTimer.destroy()

        this.showTransformation()

        // if all categories is chosen after timeout win/loose screen will be shown
        let callback = this.hideTransformation
        if (gameProcess .progress + 1 === gameProcess.categories.length) {
            callback = this.startTotal
        }
        this.time.addEvent({
            delay: 2000, // hide transform animation or start total screen in 2s
            callback: callback,
            callbackScope: this,
        });


        this.updateGirlLook(chosenElementTexture)
        gameProcess .incrementProgress()


    }

    showTransformation() {
        // start animation
        this.emitter.on = true
        //show happy emotion
        this.joyFace.setVisible(true)
        // hide text
        this.text.setVisible(false)
        this.textBg.setVisible(false)
        // set and show progress bar
        this.progress.setTexture(`progress-${gameProcess .progress + 1}`)
        this.progress.setVisible(true)

    }
    hideTransformation() {
        // stop animation
        this.emitter.on = false
        // hide happy face
        this.joyFace.setVisible(false)
        //set and show new text
        this.text.setVisible(true)
        this.text.setText(`Choose your ${gameProcess .getCurrentCategory()}`)
        this.textBg.setVisible(true)
        // hide progress bar
        this.progress.setVisible(false)
        // set next choose variants
        this.updateChooseVariants()
    }

    //chosenElementTexture icon-thing-name
    updateGirlLook(chosenElementTexture) {
        const currentCategory = gameProcess.getCurrentCategory()
        gameProcess.setChosen(chosenElementTexture) // set chosen thing

        const chosenThing = gameProcess.chosen[currentCategory] // thing name

        // if thing must be shown on main part screen
        if (currentCategory === 'clothes') {
            this.clothes.setTexture(chosenThing)
        }
        if (currentCategory === 'bag') {
            this.bag.setTexture(chosenThing)
                .setVisible(true)
        }
        if (currentCategory === 'accessories') {
            this.accessories.setTexture(chosenThing)
                .setVisible(true)
        }
    }

    showHintPointer() {
        this.pointer
            .setScale(
                0.7,
                0.35,
            ).setVisible(true)

        this.showHintTween.play()
    }

    stopHintTween() {
        this.pointer.setVisible(false)
        this.showHintTween.paused = true
    }

    updateChooseVariants () {
        const {var1, var2} = gameProcess.getCurrentChooseVariants()

        this.leftChoose.setTexture(var1)
        this.rightChoose.setTexture(var2)

        this.hintTimer = this.time.addEvent({
            delay: 3000,                // ms
            callback: this.showHintPointer,
            callbackScope: this,
        });

        this.leftChoose.setVisible(true)
        this.rightChoose.setVisible(true)
    }
}

