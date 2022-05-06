

import { gameProcess } from "../gameLogic/gameLogic";
import {fontStyle} from "../constants/fontStyle";
import {getPositions} from "../constants/positions";

export class LooseScreen extends Phaser.Scene {

    constructor() {
        super('loose-screen');
    }

    create() {

        // positions
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2
        this.girlPosition = {};
        this.manPosition = {};
        [this.girlPosition, this.manPosition] = getPositions.call(this)


        // game objects
        this.place = this.add.image(500,440,gameProcess.chosen.place)

        this.man = this.add.image(this.manPosition.x + 70, this.manPosition.y, 'man')
            .setScale(this.manPosition.scaleX, this.manPosition.scaleY)

        this.manFaceSad = this.add.image(this.manPosition.x + 70, this.manPosition.y, 'man-face-sad')
            .setScale(this.manPosition.scaleX, this.manPosition.scaleY)

        this.manCostume = this.add.image(this.manPosition.x + 70, this.manPosition.y, 'man-casual-costume')
            .setScale(this.manPosition.scaleX, this.manPosition.scaleY)

        this.manHair = this.add.image(this.manPosition.x + 70, this.manPosition.y, 'man-hair')
            .setScale(this.manPosition.scaleX, this.manPosition.scaleY)

        this.girl = this.add.image(this.girlPosition.x - 70, this.girlPosition.y, 'girl')
            .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY)

        this.joyFace = this.add.image(this.girlPosition.x - 70, this.girlPosition.y, 'face-sad')
            .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY)

        this.clothes = this.add.image(this.girlPosition.x - 70, this.girlPosition.y, gameProcess.chosen.clothes)
            .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY)

        this.bag = this.add.image(this.girlPosition.x - 70, this.girlPosition.y, gameProcess.chosen.bag)
            .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY)

        this.accessories = this.add.image(this.girlPosition.x - 70, this.girlPosition.y, gameProcess.chosen.accessories)
            .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY)

        this.hair = this.add.image(this.girlPosition.x - 70, this.girlPosition.y, 'hair')
            .setScale(this.girlPosition.scaleX, this.girlPosition.scaleY)

        this.manTextBg = this.add.image(this.manPosition.x + 70, 500, 'man-text-bg')
        // .setScale(1.8, 0.8)

        this.textStyle = {
            ...fontStyle,
            'color': '#000',
            'font-size': '36px',
        }

        this.manText = this.add.text(this.manPosition.x + 70, 520, 'What a weird\nappearance', this.textStyle)
            .setOrigin(0.5)
            .setScale(1.2, 1)
        this.particles = this.add.particles('emoji-sad')

        this.emitter = this.particles.createEmitter({
            speed: 400,
            x:500,
            y: 800,
            lifespan: 4000,
            scaleX: 0.2,
            alpha: 150,
            scaleY: 0.1,
            on: true,
            active: true,
        });


        this.time.addEvent({
            delay: 3000,                // ms
            callback: this.startNextScene,
            callbackScope: this,
        });

    }

    startNextScene() {
        this.scene.start("retry-screen")
    }
}