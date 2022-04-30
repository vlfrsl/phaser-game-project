import {fontStyle} from "./constants/fontStyles.js";

export class RetryScreen extends Phaser.Scene {
    constructor() {
        super('retry-screen');
    }

    preload () {
        this.load.image('button-bg', '../assets/gameplay/buttons/button-bg.svg')
    }

    create () {
        let btn = this.add.image(500, 400, 'button-bg')
            .setScale(2,1)
            .setInteractive()

        this.add.text(370, 360, 'Retry', fontStyle)
            .setScale(3,1.5)

        btn.on('pointerdown', ()=>{
            this.scene.start('main-part')
        })

    }
}