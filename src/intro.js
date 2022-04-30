
import { positions } from "./constants/positions.js";

export class Intro extends Phaser.Scene {

    constructor() {
        super('intro');

    }


    preload() {

        this.load.image('house-bg','../assets/house-bg.svg')
        this.load.image('darken-bg','../assets/darken-bg.svg')

        this.load.image('man', '../assets/man/man.png')
        this.load.image('intro-text-man', '../assets/gameplay/text/intro-man-text.svg');

        this.load.image('intro-text-girl', '../assets/gameplay/text/intro-girl-text.svg')
        this.load.image('girl-surprised-default', '../assets/girl/girl-surprised.svg');

        this.load.image('girl-normal-default', '../assets/girl/girl-normal.png')

        this.load.image('icon-idea', '../assets/gameplay/icons/icon-idea-2.png')

        this.load.image('icon-skip', '../assets/gameplay/buttons/button-skip.png')


    }

    async create() {

        this.add.image(0,0, 'house-bg')
            .setPosition(512, 440)
            .setScale(1.5,1.1)

        this.add.image(0,0, 'darken-bg')
            .setPosition(512, 460)
            .setScale(2,2)

        let btn = this.add.image(850, 70,'icon-skip')
            .setScale(0.2,0.1)
            .setInteractive()

        btn.on('pointerdown', ()=>{
            this.scene.start('main-part')
        })

        this.imageMan = this.add.image(-1000,0,'man')
            .setOrigin(0)
            .setScale(
                positions.man.scaleX,
                positions.man.scaleY)

        this.manText = this.add.image(-1000,350,'intro-text-man')
            .setOrigin(0)
            .setScale(1.5,1);

        this.imageSurprisedGirl = this.add.image(-1000,50,'girl-surprised-default')
            .setOrigin(0)
            .setScale(1, 0.9)

        this.girlText = this.add.image(-1000,350,'intro-text-girl')
            .setOrigin(0)
            .setScale(1.5, 1)

        this.imageNormalGirl = this.add.image(0,1000,'girl-normal-default')
            .setOrigin(0)
            .setScale(1.5, 1)

        this.ideaIcon = this.add.image(530, -1000, 'icon-idea')
            .setScale(0.3, 0.2)

        let introAnimationTween = this.tweens.createTimeline();

        introAnimationTween.add({
            targets: [this.imageMan,this.manText],
            x:200,
            duration: 1000,
            ease: 'Power1',
            easeParams: [1, 1],
            onComplete : function (src,tgt){
                tgt[0].setVisible(false)
                tgt[1].setVisible(false)
            },
            delay: 0
        })

        introAnimationTween.add({
            targets: [this.imageSurprisedGirl ,this.girlText],
            x:80,
            duration: 1000,
            ease: 'Power1',
            easeParams: [1, 1],
            onComplete: function (src,tgt) {
                tgt[0].setVisible(false)
                tgt[1].setVisible(false)
            },
            delay: 0
        })

        introAnimationTween.add({
            targets: this.imageNormalGirl,
            x:0,
            y:200,
            duration: 1000,
            ease: 'Power1',
            easeParams: [1, 1],
            delay: 0
        })

        introAnimationTween.add({
            targets: this.ideaIcon,
            y:100,
            duration: 1000,
            ease: 'Power1',
            easeParams: [1, 1],
            onComplete: ()=>this.scene.start('tutorial'),
            delay: 0
        })

        introAnimationTween.play();
    }

}


