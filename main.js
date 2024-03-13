import BootScene from "./src/Scenes/BootScene";
import MapScene from "./src/Scenes/MapScene";
import StartScene from "./src/Scenes/StartScene";
import Phaser from "phaser";
import UIScene from "./src/Scenes/UIScene";
import MapLevel2 from "./src/Scenes/MapLevel2";

export default class MyGames extends Phaser.Game {
  constructor() {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 400,
      scene: [BootScene, StartScene, MapScene, MapLevel2, UIScene],
      parent: "phaser-example",
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
          gravity: { y: 300 },
        },
      },
    };
    super(config);
  }
}

new MyGames();
