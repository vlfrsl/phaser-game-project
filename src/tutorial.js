
import { positions } from "./constants/positions.js";
import { fontStyle } from "./constants/fontStyles.js";

export class Tutorial extends Phaser.Scene {

    constructor() {
        super('tutorial');
    }


    preload() {

        this.load.image('text-bg', '../assets/gameplay/text/text-bg.svg');
        this.load.image('pointer', '../assets/pointer.svg')

        this.load.image('leftChoose', '../assets/gameplay/icons/icon-dress.svg');
        this.load.image('rightChoose', '../assets/gameplay/icons/icon-costume.svg');

        this.load.image('excellentImage', '../assets/gameplay/icons/icon-star.png');

    }

    create() {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2

        this.add.image(0,0, 'house-bg')
            .setPosition(512, 450)
            .setScale(1.5,1)

        this.add.image(0,0, 'darken-bg')
            .setPosition(512, 450)
            .setScale(2,2)

        let girl = this.add.image(0,0,'girl-normal-default')
            .setScale(0, 0)
            .setPosition(500, 500)

        this.add.image(screenCenterX,70, 'text-bg')
            .setScale(2,1.2)
            .setOrigin(0.5)

        this.add.text(screenCenterX, 70, "Choose your clothes", fontStyle)
            .setScale(1.5,1)
            .setOrigin(0.5)


        let leftChoose = this.add.image(0, 0, 'leftChoose')
            .setScale(0)
            .setPosition(250,600)
            .setInteractive()

        let rightChoose = this.add.image(0, 0, 'rightChoose')
            .setScale(0)
            .setPosition(770,600)
            .setInteractive()

        let pointer = this.add.image(0, 0, 'pointer')
            .setScale(0)
            .setPosition(350,650)


        let showInterfaceTween = this.tweens.createTimeline();

        showInterfaceTween.add({
            targets: girl,
            scaleX: positions.girl.scaleX,
            scaleY: positions.girl.scaleY,

            duration: 1000,
            ease: 'Power1',
            easeParams: [1, 1],
        })

        showInterfaceTween.add({
            targets: [leftChoose, rightChoose, pointer],
            scaleX: 1.5,
            scaleY: 0.5,
            duration: 1000,
            ease: 'Power1',
            easeParams: [1, 1],
        })

        showInterfaceTween.add({
            targets: pointer,
            x: 800,
            duration: 2000,
            yoyo: true,
            ease: 'Power1',
            loop: 1000,
        })


        showInterfaceTween.play()

        let successTutorialImage = this.add.image(500,400,'excellentImage').setScale(0)

        let showTutorialCompletedTween = this.tweens.createTimeline();
        showTutorialCompletedTween.add({
            targets: [successTutorialImage],
            scaleX: 7,
            scaleY: 6,
            duration: 1000,
            ease: 'Power1',
            onComplete : () => this.scene.start('main-part'),
        })

        leftChoose.on('pointerdown',  () => {
            showTutorialCompletedTween.play()
        })

        rightChoose.on('pointerdown', () => {
            showTutorialCompletedTween.play()
        })
    }

}