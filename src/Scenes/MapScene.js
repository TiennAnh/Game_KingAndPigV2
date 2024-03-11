import Phaser from "phaser";

export default class MapScene extends Phaser.Scene {
  constructor() {
    super("MapScene");
    this.player;
    this.diamondFirst;
    this.diamondSecond;
    this.diamondThir;
    this.diamondFour;
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
    this.anims.create({
      key: "attack-Right",
      frames: this.anims.generateFrameNumbers("attack-right", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "attack-Left",
      frames: this.anims.generateFrameNumbers("attack-left", {
        start: 2,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    //------------------ Diamond ----------------------

    this.diamondFirst = this.physics.add.sprite(400, 250, "diamond");
    this.physics.add.collider(this.diamondFirst, colision);
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
      this.diamondFirst,
      this.collectDiamondFirst,
      null,
      this
    );

    this.diamondSecond = this.physics.add.sprite(700, 250, "diamond");
    this.physics.add.collider(this.diamondSecond, colision);
    this.physics.add.overlap(
      this.player,
      this.diamondSecond,
      this.collectDiamondSecond,
      null,
      this
    );

    this.diamondThir = this.physics.add.sprite(900, 250, "diamond");
    this.physics.add.collider(this.diamondThir, colision);
    this.physics.add.overlap(
      this.player,
      this.diamondThir,
      this.collectDiamondThir,
      null,
      this
    );

    this.diamondFour = this.physics.add.sprite(400, 550, "diamond");
    this.physics.add.collider(this.diamondFour, colision);
    this.physics.add.overlap(
      this.player,
      this.diamondFour,
      this.collectDiamondFour,
      null,
      this
    );

    // ----------------------------------------------- //

    // ------------------- HEART -------------------- //

    this.heartFirst = this.physics.add.sprite(500, 250, "heart");
    this.physics.add.collider(this.heartFirst, colision);
    this.anims.create({
      key: "heart-idle",
      frames: this.anims.generateFrameNumbers("heart", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.physics.add.overlap(
      this.player,
      this.heartFirst,
      this.collectHeartFirst,
      null,
      this
    );

    this.heartSecond = this.physics.add.sprite(150, 250, "heart");
    this.physics.add.collider(this.heartSecond, colision);
    this.physics.add.overlap(
      this.player,
      this.heartSecond,
      this.collectHeartSecond,
      null,
      this
    );

    this.heartThir = this.physics.add.sprite(290, 250, "heart");
    this.physics.add.collider(this.heartThir, colision);
    this.physics.add.overlap(
      this.player,
      this.heartThir,
      this.collectHeartThir,
      null,
      this
    );

    // ------------------------------------------------- //

    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setBounds(0, 0, 1250, 630);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.lastDecoration = "Right";

    this.scene.launch("UIScene");

    console.log(this.cameras.main.width);
  }

  update() {
    this.diamondFirst.anims.play("diamond", true);
    this.diamondSecond.anims.play("diamond", true);
    this.diamondThir.anims.play("diamond", true);
    this.diamondFour.anims.play("diamond", true);

    this.heartFirst.anims.play("heart-idle", true);
    this.heartSecond.anims.play("heart-idle", true);
    this.heartThir.anims.play("heart-idle", true);

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

    if (this.cursors.space.isDown) {
      this.player.anims.play(`attack-${this.lastDecoration}`, true);
    }
  }

  // CollectDimond

  collectDiamondFirst() {
    this.diamondFirst.disableBody(true, true);
    this.scene.get("UIScene").increaseGems();
  }

  collectDiamondSecond() {
    this.diamondSecond.disableBody(true, true);
    this.scene.get("UIScene").increaseGems();
  }

  collectDiamondThir() {
    this.diamondThir.disableBody(true, true);
    this.scene.get("UIScene").increaseGems();
  }

  collectDiamondFour() {
    this.diamondFour.disableBody(true, true);
    this.scene.get("UIScene").increaseGems();
  }

  // CollectHeart

  collectHeartFirst() {
    this.heartFirst.disableBody(true, true);
    this.scene.get("UIScene").increaseHearts();
  }

  collectHeartSecond() {
    this.heartSecond.disableBody(true, true);
    this.scene.get("UIScene").increaseHearts();
  }

  collectHeartThir() {
    this.heartThir.disableBody(true, true);
    this.scene.get("UIScene").increaseHearts();
  }
}
