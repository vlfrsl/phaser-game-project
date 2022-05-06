

import { fontStyle} from "../constants/fontStyle";
import { gameProcess } from "../gameLogic/gameLogic";
import {getPositions} from "../constants/positions";

export class Tutorial extends Phaser.Scene {

    constructor() {
        super('tutorial');
    }



    create() {

        //positions
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2
        this.girlPosition = {};
        [this.girlPosition] = getPositions.call(this)


        const defaultChooseVariants = gameProcess .getCurrentChooseVariants()

        //game objects
        this.add.image(500, 450, 'home')
            .setScale(1, 1)

        this.add.image(500, 450, 'dark-bg')
            .setScale(2,1).setInteractive()

        this.girl =  this.add.image(this.girlPosition.x, this.girlPosition.y, 'girl')
            .setScale(0)

        this.clothes = this.add.image(this.girlPosition.x, this.girlPosition.y, gameProcess.chosen.clothes)
            .setScale(0)

        this.hair = this.add.image(this.girlPosition.x, this.girlPosition.y, 'hair')
            .setScale(0)

        this.leftChoose = this.add.image(270, 600, defaultChooseVariants.var1)
            .setScale(0)
            .setInteractive()

        this.rightChoose = this.add.image(750, 600,  defaultChooseVariants.var2)
            .setScale(0)
            .setInteractive()

        this.pointer = this.add.image(0, 0, 'pointer')
            .setScale(0)
            .setPosition(350,700)

        this.textBg = this.add.image(this.screenCenterX, -700, 'choose-text-bg')
            .setScale(1.8,1.3)

        this.text = this.add.text(this.screenCenterX, -700, "Choose your clothes", fontStyle)
            .setScale(1.5,1.2)
            .setOrigin(0.5)

        this.completeTutorialImage = this.add.image(this.screenCenterX,400,'star').setScale(0)


        this.showInterface()

        this.leftChoose.on('pointerdown',  () => {
            this.showTutorialComplete()
        })

        this.rightChoose.on('pointerdown', () => {
            this.showTutorialComplete()
        })

    }

    showInterface () {
            let showInterfaceTween = this.tweens.createTimeline();

            showInterfaceTween.add({
                targets: [this.girl, this.hair, this.clothes],
                scaleX: this.girlPosition.scaleX,
                scaleY: this.girlPosition.scaleY,

                duration: 1000,
                ease: 'Power1',
                easeParams: [1, 1],
            })

            showInterfaceTween.add({
                targets: [this.textBg, this.text],
                y: 70,
                duration: 1000,
                ease: 'Power1',
                easeParams: [1, 1],
            })

            showInterfaceTween.add({
                targets: [this.leftChoose, this.rightChoose, this.pointer],
                scaleX: 0.7,
                scaleY: 0.35,
                duration: 1000,
                ease: 'Power1',
                easeParams: [1, 1],
            })

            showInterfaceTween.add({
                targets: this.pointer,
                x: 800,
                duration: 2000,
                yoyo: true,
                ease: 'Power1',
                loop: 1000,
            })
            showInterfaceTween.play()
    }

    showTutorialComplete () {
        let showTutorialCompletedTween = this.tweens.createTimeline();
        showTutorialCompletedTween.add({
            targets: this.completeTutorialImage,
            scaleX: 7,
            scaleY: 6,
            duration: 1000,
            ease: 'Power1',
            onComplete : () => this.scene.start('main-part'),
        })
        showTutorialCompletedTween.play()
    }
}