import Phaser from "phaser";

export default class MapScene extends Phaser.Scene {
  constructor() {
    super("MapScene");
    this.player;
    this.diamond;
    
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

    this.player = this.physics.add.sprite(100, 230, "idle-right");
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
    this.anims.create({
      key: "idle-Left",
      frames: this.anims.generateFrameNumbers("idle-left", {
        start: 0,
        end: 10,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turn-Right",
      frames: this.anims.generateFrameNumbers("move-right", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turn-Left",
      frames: this.anims.generateFrameNumbers("move-left", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.diamond = this.physics.add.sprite(400, 250, "diamond");
    this.physics.add.collider(this.diamond, colision);
    this.anims.create({
      key: "diamond",
      frames: this.anims.generateFrameNumbers("diamond", {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.physics.add.overlap(
      this.player,
      this.diamond,
      this.collectDiamond,
      null,
      this
    );

    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setBounds(0, 0, 1250, 630);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.lastDecoration = "Right";

    console.log(backGround);
  }

  update() {
    this.diamond.anims.play("diamond", true);

    if (this.cursors.right.isDown) {
      this.player.setVelocityX(150);
      this.player.anims.play("turn-Right", true);
      this.lastDecoration = "Right";
    } else if (this.cursors.left.isDown) {
      this.player.setVelocityX(-150);
      this.player.anims.play("turn-Left", true);
      this.lastDecoration = "Left";
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play(`idle-${this.lastDecoration}`, true);
    }

    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-200);
    }
  }

  collectDiamond() {
    this.diamond.disableBody(true, true);
  }
}
