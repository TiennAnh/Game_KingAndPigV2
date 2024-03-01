export default class MapScene extends Phaser.Scene {
  constructor() {
    super("MapScene");
  }
  preload() {}
  create() {
    const map = this.make.tilemap({ key: "background" });

    const tileset1 = map.addTilesetImage("Terrain", "terrain");
    const tileset2 = map.addTilesetImage("Decorations", "decorations");
    const tileset3 = map.addTilesetImage("Colision", "colision");

    const backGround = map.createLayer("BackGround", [tileset1]);
    const decorations = map.createLayer("Decorations", [tileset2]);
    const colision = map.createLayer("Colision", [tileset3]).setAlpha(0.01);

    colision.setCollisionByProperty({ Colision: true });
  }
  update() {}
}
