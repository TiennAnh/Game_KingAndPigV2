import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }
  preload() {
    this.load.tilemapTiledJSON("background", "/public/MapKingsAndPigsV2.json");
    this.load.image("terrain", "/public/assets/Terrain/Terrain (32x32).png");
    this.load.image(
      "decorations",
      "/public/assets/Decorations/Decorations (32x32).png"
    );
    this.load.image("colision", "/public/assets/Colision/beach_tiles.png");
  }
  create() {
    this.scene.start("MapScene");
  }
  update() {}
}
