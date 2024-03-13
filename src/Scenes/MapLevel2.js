export default class MapLevel2 extends Phaser.Scene {
  constructor() {
    super("MapLevel2");
  }
  preload() {}
  create() {
    const map = this.make.tilemap({ key: "map" });

    const tileset1 = map.addTilesetImage("Terrain", "terrain");
    const tileset2 = map.addTilesetImage("Colision", "colision");

    const backGround = map.createLayer("BackGround", [tileset1]);
    const colision = map.createLayer("Colision", [tileset2]).setAlpha(0.01);
    colision.setCollisionByProperty({ Colision: true });

    this.scene.launch("UIScene");

    this.player = this.physics.add.sprite(100, 500, "idle-right");
    this.physics.add.collider(this.player, colision);
    this.anims.create({
      key: "idle-Right",
      frames: this.anims.generateFrameNumbers("idle-right", {
        start: 0,
        end: 10,
      }),
      frameRate: 10,
      repeat: -1,
    });

    console.log(this.scene.get("MapScene"));

    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setBounds(0, 0, 1250, 630);
  }
  update() {
    this.player.anims.play("idle-Right", true);
  }
}
