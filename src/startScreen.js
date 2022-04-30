import { positions } from "./constants/positions.js";
import {fontStyle} from "./constants/fontStyles.js";

export class StartScreen extends Phaser.Scene {

    constructor() {
        super('start-screen');
    }

    preload() {

        // GIRL
        this.load.image('girl-normal', '../assets/girl/girl-normal.png');
        this.load.image('dress', '../assets/girl/girl-normal-dress.png');
        this.load.image('costume', '../assets/girl/girl-normal-costume.png');
        this.load.image('girl-happy-dress', '../assets/girl/girl-happy-dress.png');
        this.load.image('girl-happy-costume', '../assets/girl/girl-happy-costume.png');

        this.load.image('background', '../assets/places/place-1.svg')
        this.load.image('all-directions-icon','../assets/arrows/all-directions.svg')
        this.load.image('rectangle', '../assets/gameplay/icons/rectangle.svg')
        this.load.image('text-bg-green', '../assets/gameplay/buttons/button-bg.svg')

        this.load.image('girl', '../assets/girl/girl-happy-dress.png')

        this.load.image('red-magic', '../assets/gameplay/icons/red-magic.png')
    }

    create() {


        let bg = this.add.image(500,500, 'background')
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

        this.add.image(500,500,'girl')
            .setScale(
                positions.girl.scaleX,
                positions.girl.scaleY
            );

        this.add.image(500, 750, 'text-bg-green')
            .setScale(4,2);

        this.add.text(50, 700, 'Tap or swipe to start game',fontStyle)
            .setScale(
                2, 1);


        bg.on('pointerup', () => { // handle swipe/tap
            this.scene.start('intro');
        });

        let swipeOrTapBg = this.add.image(900, 75, 'rectangle')
            .setScale(
                0.6,0.3);

        let swipeOrTapIcon = this.add.image(900,75, 'all-directions-icon')
            .setScale(
                0.6,0.3);

        let swipeOrTapIconAnimationTween = this.tweens.createTimeline();

        swipeOrTapIconAnimationTween .add({
            targets: swipeOrTapIcon,
            duration: 300,

            ease: 'Power1',
            easeParams: [1, 1],

            scaleX: 0.7,
            scaleY: 0.4,

            loop: 1000,
            yoyo: true,
        });
        swipeOrTapIconAnimationTween .play();

    }
}