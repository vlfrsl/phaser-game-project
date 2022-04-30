
import { Intro } from "./intro.js";
import { Tutorial } from "./tutorial.js";
import { MainPart } from "./mainPart.js";
import { WinnerScreen } from "./winnerScreen.js";
import { LooseScreen } from "./looseScreen.js";
import { RetryScreen } from "./retryScreen.js";
import {StartScreen} from "./startScreen.js";

window.onload = function () {

    function resize() {

        const canvas = document.querySelector("canvas");

        let windowHeight = window.innerHeight
        let windowWidth = window.innerWidth;

        // if we uncomment this, on (orientation : landscape)
        // our game area width will be less than window width,
        // but a little-bit better proportions

        // if (window.matchMedia("(orientation : landscape)").matches){
        //     windowWidth = window.innerWidth / 1.5;
        // }

        canvas.style.width = windowWidth  + "px";
        canvas.style.height = windowHeight  + "px";

        return canvas
    }




    const config = {
        type: Phaser.AUTO,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }
            }
        },
        scene: [
            StartScreen,
            Intro,
            Tutorial,
            MainPart,
            WinnerScreen,
            LooseScreen,
            RetryScreen,
        ]
    };

    const game = new Phaser.Game(config);

    resize();

    window.addEventListener("resize", resize, false);
}