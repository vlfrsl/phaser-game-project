

import {gameProcess} from "../gameLogic/gameLogic";
import {fontStyle} from "../constants/fontStyle";
import { getPositions } from "../constants/positions";


export class Intro extends Phaser.Scene {

    constructor() {
        super('intro');

    }

    create() {
        // positions
        this.girlPosition = {};
        this.manPosition = {};
        [this.girlPosition, this.manPosition] = getPositions.call(this)

        // game objects
        this.add.image(500, 450, 'home')
            .setScale(1, 1)

        this.add.image(500, 450, 'dark-bg')
            .setScale(2,1).setInteractive()


        this.girl =  this.add.image(-1000, this.girlPosition.y, 'girl')
           .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY)

        this.girlFace = this.add.image(-1000, this.girlPosition.y, 'face-sad')
            .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY)

        this.clothes = this.add.image(-1000, this.girlPosition.y, gameProcess.chosen.clothes)
            .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY)

        this.hair = this.add.image(-1000, this.girlPosition.y, 'hair')
            .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY)

        this.man = this.add.image(-1000, this.manPosition.y, 'man')
            .setScale(this.manPosition.scaleX, this.manPosition.scaleY)

        this.manCostume = this.add.image(-1000, this.manPosition.y, 'man-home-costume')
            .setScale(this.manPosition.scaleX, this.manPosition.scaleY)

        this.manHair = this.add.image(-1000, this.manPosition.y, 'man-hair')
            .setScale(this.manPosition.scaleX, this.manPosition.scaleY)

        this.skipIcon = this.add.image(850, 100,'icon-skip')
            .setScale(0.25,0.25)
            .setInteractive()

        this.manTextBg = this.add.image(-1000, 500, 'man-text-bg')
            // .setScale(1.8, 0.8)

        this.girlTextBg = this.add.image(-1000, 500, 'girl-text-bg')
            // .setScale(1.8, 0.8)

        this.textStyle = {
            ...fontStyle,
            'color': '#000',
            'font-size': '36px',
        }

        this.manText = this.add.text(-1000, 520, 'Honey, we will\n go on vacation', this.textStyle)
            .setOrigin(0.5)
            .setScale(1.2, 1)

        this.girlText = this.add.text(-1000, 520, 'I need to prepare\n my appearance', this.textStyle)
            .setOrigin(0.5)
            .setScale(1.2, 1)

        this.idea = this.add.image( this.girlPosition.x, -1000, 'idea')
            .setScale(0.25, 0.2)

        this.skipIcon.on('pointerdown', () => {
            this.scene.start('main-part')
        })

        this.showIntro()
    }

    showIntro () {

        let introAnimationTween = this.tweens.createTimeline();

        introAnimationTween.add({
            targets: [this.man,this.manCostume,this.manHair,this.manTextBg, this.manText],
            x:  this.manPosition.x,
            duration: 1500,
            ease: 'Power1',
            easeParams: [1, 1],
            onComplete : function (src,tgt){
                tgt[0].setVisible(false)
                tgt[1].setVisible(false)
                tgt[2].setVisible(false)
                tgt[3].setVisible(false)
                tgt[4].setVisible(false)
            },
        })

        introAnimationTween.add({
            targets: [this.girl, this.girlFace, this.clothes, this.hair, this.girlTextBg, this.girlText ],
            x: this.girlPosition.x,
            duration: 1500,
            ease: 'Power1',
            easeParams: [1, 1],
            onComplete: function (src,tgt) {
                tgt[1].setTexture('face-joy')
            },
        })


        introAnimationTween.add({
            targets: this.idea,
            y:100,
            duration: 1000,
            ease: 'Power1',
            easeParams: [1, 1],
            onComplete:  () => {
                this.scene.start('tutorial')
            },
        })
        introAnimationTween.play();
    }
}


