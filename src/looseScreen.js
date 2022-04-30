
import {positions} from "./constants/positions.js";
import {fontStyle} from "./constants/fontStyles.js";

export class LooseScreen extends Phaser.Scene {

    constructor() {
        super('loose-screen');
    }

    init (data) {
        this.data = data
    }

    preload () {
        this.load.image('sad-girl-costume', '../assets/girl/girl-surprised-costume.png')

        this.load.image('man', '../assets/man/man.png')

        this.load.image('man-text-bg', '../assets/gameplay/text/man-end-screen-text-bg.svg')

        this.load.image('icon-sad', '../assets/gameplay/icons/icon-sad.png')

        this.load.image('place-1', `../assets/places/place-1.svg`)
        this.load.image('place-2', `../assets/places/place-2.svg`)
    }



    create () {


        this.add.image(this.data.place.position.x, this.data.place.position.y,`${this.data.place.name}`)
            .setScale(
                this.data.place.position.scaleX,
                this.data.place.position.scaleY)

        const man = this.add.image(positions.girl.x + 100, positions.girl.y, 'man' )
            .setScale(
                1.5,0.6
            )


        const sadGirl = this.add.image(positions.girl.x, positions.girl.y, 'sad-girl-costume')
            .setScale(
                positions.girl.scaleX,
                positions.girl.scaleY,
            )

        this.add.image(this.data.bag.position.x, this.data.bag.position.y,this.data.bag.name)
            .setScale(
                this.data.bag.position.scaleX,
                this.data.bag.position.scaleY)

        this.add.image(this.data.accessories.position.x, this.data.accessories.position.y, this.data.accessories.name)
            .setScale(
                this.data.accessories.position.scaleX,
                this.data.accessories.position.scaleY)

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2

        const manTextBg = this.add.image(screenCenterX, 450, 'man-text-bg').setScale(1.5,1)

        const text = this.add.text(screenCenterX, 470, "What a weird appearance", fontStyle)
            .setOrigin(0.5)
            .setScale(1.5,1)
        text.setColor('black')

        let particles = this.add.particles('icon-sad')
        let emitter = particles.createEmitter({

            speed: 350,
            alpha: 150,
            x:500,
            y: 1000,
            lifespan: 4000,
            scaleX: 0.2,
            scaleY: 0.1,
            on: true,
            active: true,

        });

        setTimeout(() => {
            this.scene.start('retry-screen')
        },4000)
    }
}

// If change the object a little and make 'key- the name of the thing',
// you can automate drawing Loose/Winner Screen approximately
// I made drawing manually, it lets us easily interact with added objects

// const data = {
//     'blue-bag' : {
//         position :{
//             x: 100,
//             y: 100,
//             scaleX: 1,
//             scaleY: 1
//         }
//     },
//     'glasses' : {
//         position :{
//             x: 100,
//             y: 100,
//             scaleX: 1,
//             scaleY: 1
//         }
//     },
//     ...
// }

// for (let key in this.data) {
//     const img = this.add.image(
//         this.data.key.position.x,
//         this.data.key.position.y,
//         this.data.key).setScale(
//         this.data.position.scaleX,
//         this.data.position.scaleY,
//     )
//     if (key.includes('place')) {
//             img.setDepth(-100)
//     }
// }