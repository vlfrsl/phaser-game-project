
import { positions } from "./constants/positions.js";
import { chooseVariants } from "./constants/chooseVariants.js";
import { fontStyle } from "./constants/fontStyles.js";

import { getThingName } from "./helpers/getThingName.js";
import { setHappyGirl } from "./helpers/addHappyGirl.js";
import { addThing } from "./helpers/addThing.js";
import { showTransformation, hideTransformation } from "./helpers/showTransformation.js";
import { getCurrentCategory } from "./helpers/getCurrentCategory.js";


export class MainPart extends Phaser.Scene {

    constructor() {
        super('main-part');
    }

    preload() {
        // ICONS
        this.load.image('icon-dress', '../assets/gameplay/icons/icon-dress.svg')
        this.load.image('icon-costume', '../assets/gameplay/icons/icon-costume.svg')
        this.load.image('icon-brown-bag', '../assets/gameplay/icons/icon-brown-bag.svg')
        this.load.image('icon-blue-bag', '../assets/gameplay/icons/icon-blue-bag.svg')
        this.load.image('icon-glasses', '../assets/gameplay/icons/icon-glasses.svg')
        this.load.image('icon-necklace-1', '../assets/gameplay/icons/icon-necklace-1.svg')
        this.load.image('icon-necklace-2', '../assets/gameplay/icons/icon-necklace-2.svg')

        // GIRL
        this.load.image('girl-normal-dress', '../assets/girl/girl-normal-dress.png');
        this.load.image('girl-normal-costume', '../assets/girl/girl-normal-costume.png');
        this.load.image('girl-happy-dress', '../assets/girl/girl-happy-dress.png');
        this.load.image('girl-happy-costume', '../assets/girl/girl-happy-costume.png');
        this.load.image('girl-happy-default','../assets/girl/girl-happy-default.png')

        // THINGS
        this.load.image('blue-bag', '../assets/things/blue-bag.svg')
        this.load.image('brown-bag', '../assets/things/brown-bag.svg')
        this.load.image('glasses', '../assets/things/glasses.svg')
        this.load.image('necklace-1', '../assets/things/necklace-1.svg')
        this.load.image('necklace-2', '../assets/things/necklace-2.svg')

        // PLACES
        this.load.image('house', '../assets/places/house.svg')
        this.load.image('icon-place-1', '../assets/places/icon-place-1.svg')
        this.load.image('icon-place-2', '../assets/places/icon-place-2.svg')

        // GAMEPLAY
        this.load.image('text-bg', '../assets/gameplay/text/text-bg.svg');

        this.load.image('progress-0', '../assets/gameplay/progress-bar/progress-0.svg');
        this.load.image('progress-1', '../assets/gameplay/progress-bar/progress-1.svg');
        this.load.image('progress-2', '../assets/gameplay/progress-bar/progress-2.svg');
        this.load.image('progress-3', '../assets/gameplay/progress-bar/progress-3.svg');
        this.load.image('progress-4', '../assets/gameplay/progress-bar/completed.svg');
        this.load.image('rectangle-border', '../assets/gameplay/icons/rectangle-border.svg')

        this.load.image('pointer', '../assets/pointer.svg')
    }

    create() {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2

        let isLooseScreen = false;
        let chooseAlternative = false;

        let totalLookData = {}

        let categories = Object.keys(chooseVariants)

        let progressStatus = 0

        this.add.image(512, 460, 'house')
            .setPosition(512, 460)
            .setScale(1.5, 1)




        let currentCategory = getCurrentCategory(progressStatus)

        // Displayed data
        const currentProgress = this.add.image(screenCenterX, 70, ``)
            .setScale(1.8, 1)
            .setOrigin(0.5)

            .setVisible(false)

        const textBg = this.add.image(screenCenterX, 70, 'text-bg')
            .setScale(2, 1.2)
            .setOrigin(0.5)

        const text = this.add.text(screenCenterX,70,`Choose your ${currentCategory}`, fontStyle)
            .setScale(1.5,1)
            .setOrigin(0.5)

        let chosenGirl = this.add.image(positions.girl.x, positions.girl.y, 'girl-normal')
            .setScale(
                positions.girl.scaleX,
                positions.girl.scaleY,
            )

        let happyGirl = this.add.image(positions.girl.x, positions.girl.y, 'girl-happy-default').setScale(0)

        let chosenBag = this.add.image(
            positions.bag.x,
            positions.bag.y,
            ''
        ).setScale(0)

        let chosenAccessories = this.add.image(
            0, 0, ''
        ).setScale(0)


        // Girl transformation animation
        let particles = this.add.particles('red-magic')
        let emitter = particles.createEmitter({
            speed: 500,
            y: 50,
            lifespan: 500,
            scaleX: 5,
            scaleY: 3,
            on: false,
            active: true,
            follow: chosenGirl,
        });


        let leftChoose = this.add.image(
            positions.leftChoose.x,
            positions.leftChoose.y,
            chooseVariants[currentCategory].var1
        )
            .setScale(0)
            .setInteractive()

        let rightChoose = this.add.image(
            positions.rightChoose.x,
            positions.rightChoose.y,
            chooseVariants[currentCategory].var2
        )
            .setScale(0)
            .setInteractive()

        // rectangle border displayed after user choose thing
        let chosenBorder = this.add.image(0, 0, 'rectangle-border')
            .setScale(
                positions.leftChoose.scaleX,
                positions.leftChoose.scaleY)
            .setVisible(false)


        // interface appearance animation
        let showInterfaceTween = this.tweens.createTimeline();
        showInterfaceTween.add({
            targets: [leftChoose, rightChoose],
            scaleX: positions.leftChoose.scaleX,
            scaleY: positions.rightChoose.scaleY,

            duration: 1000,
            ease: 'Power1',
            easeParams: [1, 1],
            delay: 0
        })
        showInterfaceTween.play()

        // hint pointer animation
        let showHintTween = this.tweens.createTimeline();
        let pointer = this.add.image(350, 750, 'pointer')
            .setScale(
                1.5,
                1,
            ).setVisible(false)

        showHintTween.add({
            targets: [pointer],
            x: 800,
            duration: 2000,
            paused: true, // set pause default, it lets us control show and hide
            yoyo: true,
            ease: 'Power1',
            loop: 1000,

        })
        showHintTween.play()

        let showHintTimeout = setTimeout(()=>{
            startHintTween()
        },2000)


        const stopHintTween = () => {
            pointer.setVisible(false)
            showHintTween.paused = true
        }

        const startHintTween = () => {
            pointer.setVisible(true)
            showHintTween.paused = false
        }

        //set next category and variants to choose
        const setNext = (progressStatus, setAlternative = false) => {

            let category = getCurrentCategory(progressStatus)
            let variants = chooseVariants[category]

            leftChoose.setTexture(variants.var1)
            rightChoose.setTexture(variants.var2)

            // if it must be displayed alternative variant
            // and alternative variant exists
            if (setAlternative && variants.var1alt) {
                leftChoose.setTexture(variants.var1alt)
            }
            if (setAlternative && variants.var2alt) {
                rightChoose.setTexture(variants.var2alt)
            }

        }

        // func starts new scene and pass data to it
        const startTotalScreen = (showLooseScreen, totalLookData) => {
            console.log("DATA", totalLookData)
            if (showLooseScreen) {
                this.scene.start('loose-screen', totalLookData)
            } else {
                this.scene.start('winner-screen', totalLookData)
            }
        }



        function handleClick() {

            leftChoose.removeInteractive()
            rightChoose.removeInteractive()

            stopHintTween() // hide hint pointer

            // reset timeout to put it away from event loop
            clearTimeout(showHintTimeout)

            let chosenIcon = this.texture.key // clicked variant

            chosenBorder.setPosition(this.x, this.y).setVisible(true)

            // convert icon name to thing name
            // icon-blue-bag => blue-bag
            let thingName = getThingName(chosenIcon)

            progressStatus += 1;

            showTransformation(emitter,
                progressStatus,
                chosenGirl,
                happyGirl,
                text,
                textBg,
                categories,
                currentProgress);

            setTimeout(() => { // set next step after transformation animation
                if (thingName.includes('dress')) {
                    addThing(chosenGirl, 'dress', 'girl')
                    setHappyGirl(happyGirl, 'girl-happy-dress')
                }
                if (thingName.includes('costume')) {
                    chooseAlternative = true
                    isLooseScreen = true
                    addThing(chosenGirl, 'costume', 'girl')
                    setHappyGirl(happyGirl, 'girl-happy-costume')
                }
                if (thingName.includes('bag')) {
                    totalLookData['bag'] = {
                        'name': thingName,
                        'position': positions.bag
                    }
                    addThing(chosenBag, thingName, 'bag')
                }
                if (thingName.includes('glasses')) {
                    totalLookData['accessories'] = {
                        'name': thingName,
                        'position': positions.glasses
                    }
                    addThing(chosenAccessories, thingName, 'glasses')

                }
                if (thingName.includes('necklace')) {
                    totalLookData['accessories'] = {
                        'name': thingName,
                        'position': positions.necklace
                    }
                    addThing(chosenAccessories, thingName, 'necklace')
                }
                if (thingName.includes('place')) {
                    totalLookData['place'] = {
                        'name': thingName,
                        'position': positions.place
                    }
                }

                // if there is no more steps => show result screen
                if (!(progressStatus === categories.length)) {
                    setNext(progressStatus, chooseAlternative)
                    chosenBorder.setVisible(false)
                } else {
                    startTotalScreen(isLooseScreen, totalLookData)
                }


                hideTransformation(emitter,chosenGirl, happyGirl,text, textBg, currentProgress)
                leftChoose.setInteractive()
                rightChoose.setInteractive()

                // after setting the next step data
                // set timeout for showing hint after 2s user inaction
                showHintTimeout = setTimeout(()=> {
                    startHintTween()
                },2000)


            }, 2000)
        }

        //bind to set 'this' value inside function
        leftChoose.on('pointerdown', handleClick.bind(leftChoose))
        rightChoose.on('pointerdown', handleClick.bind(rightChoose))
    }
}
