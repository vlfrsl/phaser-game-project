// import { positions } from "./constants/positions.js";

import { fontStyle } from "../constants/fontStyle";
import { gameProcess } from "../gameLogic/gameLogic";
import {getPositions} from "../constants/positions";

export class StartScreen extends Phaser.Scene {

    constructor() {
        super('start-screen');
    }


    create() {

        //positions
        this.girlPosition = {};
        [this.girlPosition] = getPositions.call(this)

        // game objects
        let bg = this.add.image(500,500, 'beach')
            .setScale(2,2)
            .setInteractive();

        // flying magic parts animation
        let particles = this.add.particles('red-magic');
        let emitter = particles.createEmitter({
            speed: 400,
            x:500,
            y: 700,
            lifespan: 4000,
            on: true,
        });

        this.add.image(this.girlPosition.x,this.girlPosition.y,'girl')
            .setScale(
                this.girlPosition.scaleX,
                this.girlPosition.scaleY
            );

        this.add.image(this.girlPosition.x, this.girlPosition.y, 'face-joy')
            .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY);

        this.clothes = this.add.image(this.girlPosition.x, this.girlPosition.y, 'dress')
            .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY);


        this.hair = this.add.image(this.girlPosition.x, this.girlPosition.y,'hair')
            .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY);

        this.add.image(500, 750, 'rectangle-green')
            .setScale(4,1);

        this.add.text(50, 700, 'Tap or swipe to start game',fontStyle)
            .setScale(
                2, 1);


        bg.on('pointerup', () => { // handle swipe/tap
            this.scene.start('intro');
        });

        let swipeOrTapBg = this.add.image(900, 75, 'rectangle-white')
            .setScale(
                0.7,0.4);

        let swipeOrTapIcon = this.add.image(900,75, 'icon-swipe-or-tap')
            .setScale(
                0.12,0.12);

        let swipeOrTapIconAnimationTween = this.tweens.createTimeline();

        swipeOrTapIconAnimationTween .add({
            targets: swipeOrTapIcon,
            duration: 300,

            ease: 'Power1',
            easeParams: [1, 1],

            scaleX: 0.17,
            scaleY: 0.16,

            loop: 1000,
            yoyo: true,
        });
        swipeOrTapIconAnimationTween .play();
    }
}