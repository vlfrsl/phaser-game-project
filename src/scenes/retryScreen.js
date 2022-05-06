
import { fontStyle } from "../constants/fontStyle";
import { gameProcess } from "../gameLogic/gameLogic";

export class RetryScreen extends Phaser.Scene {
    constructor() {
        super('retry-screen');
    }

    create () {

        gameProcess.setDefault()

        this.retryBtn = this.add.image(500, 400, 'rectangle-green')
            .setScale(1,0.8)
            .setInteractive()

        this.add.text(370, 360, 'Retry', fontStyle)
            .setScale(2.8,1.7)

        this.retryBtn.on('pointerdown', ()=>{
            this.scene.start('main-part')
        })

    }
}