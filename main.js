import BootScene from "./src/BootScene";
import MapScene from "./src/MapScene";
import StartScene from "./src/StartScene";
import Phaser from "phaser";

export default class MyGames extends Phaser.Game {
  constructor() {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 400,
      scene: [BootScene, StartScene, MapScene],
      parent: "phaser-example",
      physics: {
        default: "arcade",
        arcade: {
          debug: true,
          gravity: { y: 0 },
        },
      },
    };
    super(config);
  }
}

new MyGames();
