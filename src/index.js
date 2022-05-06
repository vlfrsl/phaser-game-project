
import Phaser from 'phaser';
import { Intro } from "./scenes/intro.js";
import { Preload } from "./scenes/preload";
import { Tutorial } from "./scenes/tutorial";
import { MainPart } from "./scenes/mainPart";
import { WinnerScreen } from "./scenes/winnerScreen";
import { LooseScreen } from "./scenes/looseScreen";
import { StartScreen } from "./scenes/startScreen";
import { RetryScreen } from "./scenes/retryScreen";


window.onload = function () {

  function resize() {

    const canvas = document.querySelector("canvas");
    const div = document.querySelector("#game") // game container

    let windowHeight = div.innerHeight
    let windowWidth = div.innerWidth;

    canvas.style.width = windowWidth  + "px";
    canvas.style.height = windowHeight  + "px";

    return canvas
  }




  const config = {
    type: Phaser.AUTO,
    parent: 'game',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 }
      }
    },
    scene: [
      Preload,
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

  // on pressing 'space' opens 'playableAdsIframe.html'
  // this html document include 'iframe' tag which loading 'index.html' with game
  // I suppose playable ads works at the same way :
  // adding iframe which download game from other source
  window.addEventListener('keypress', function(event) {
    console.log(event.code)
    if (event.code === 'Space') {
      console.log("space")
      window.open('playableAdsIframe.html')
    }
  });
}