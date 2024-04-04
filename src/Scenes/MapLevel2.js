export default class MapLevel2 extends Phaser.Scene {
  constructor() {
    super("MapLevel2");
    this.scoreGems;
    this.scoreHearts;
  }
  preload() {}
  create() {
    const map = this.make.tilemap({ key: "map" });

    const tileset1 = map.addTilesetImage("Terrain", "terrain");
    const tileset2 = map.addTilesetImage("Colision", "colision");
    const tileset3 = map.addTilesetImage("Decorations", "decorations");

    const backGround = map.createLayer("BackGround", [tileset1]);
    const colision = map.createLayer("Colision", [tileset2]).setAlpha(0.001);
    const decoration = map.createLayer("Decoration", [tileset3]);
    colision.setCollisionByProperty({ Colision: true });

    // -------------------- DOOR ---------------------- //

    this.doorStart = this.add.image(180, 540, "door");

    // this.doorNextLevel = this.add.image(850, 125, "door");

    this.doorStart = this.add.image(310, 325, "door");

    this.doorOpen = this.physics.add
      .sprite(310, 325, "doorOpen")
      .setVisible(false);

    this.physics.add.collider(this.doorOpen, colision);
    this.anims.create({
      key: "keepOpen",
      frames: this.anims.generateFrameNumbers("doorOpen", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: 1,
    });

    this.doorOpen.anims.play("keepOpen", true);

    // --------------------- PLAYER ------------------- //

    this.player = this.physics.add.sprite(180, 540, "idle-right");
    this.physics.add.collider(this.player, colision);
    this.player.setCircle(16, 16, 16);
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
      key: "move-Right",
      frames: this.anims.generateFrameNumbers("move-right"),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "move-Left",
      frames: this.anims.generateFrameNumbers("move-left"),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "attack-Right",
      frames: this.anims.generateFrameNumbers("attack-right", {
        start: 0,
        end: 0,
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

    this.scene.launch("UIScene");

    this.gem = this.scene.get("MapScene").scoreGems;

    console.log(this.gem);

    // ----------------- PIG * KINGPIG --------------- //

    this.pig = this.physics.add.sprite(200, 340, "pig");
    this.physics.add.collider(this.pig, colision);
    this.anims.create({
      key: "idleRight-pig",
      frames: this.anims.generateFrameNumbers("idle-right-pig", {
        start: 0,
        end: 10,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "idleLeft-pig",
      frames: this.anims.generateFrameNumbers("idle-left-pig", {
        start: 0,
        end: 10,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.canon = this.physics.add.image(230, 340, "canon");
    this.physics.add.collider(this.canon, colision);

    // ----------------- ITEMS ----------------------- //

    this.diamondFirst = this.physics.add.sprite(270, 570, "diamond");
    this.physics.add.collider(this.diamondFirst, colision);
    this.physics.add.overlap(
      this.player,
      this.diamondFirst,
      this.collectDiamondFirst,
      null,
      this
    );
    this.anims.create({
      key: "idle-diamond",
      frames: this.anims.generateFrameNumbers("diamond", {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.diamondSecond = this.physics.add.sprite(600, 600, "diamond");
    this.physics.add.collider(this.diamondSecond, colision);
    this.physics.add.overlap(
      this.player,
      this.diamondSecond,
      this.collectDiamondSecond,
      null,
      this
    );
    this.diamondThir = this.physics.add.sprite(380, 345, "diamond");
    this.physics.add.collider(this.diamondThir, colision);
    this.physics.add.overlap(
      this.player,
      this.diamondThir,
      this.collectDiamondThir,
      null,
      this
    );
    this.scoreGems = this.scene.get("UIScene").scoreGems;
    this.scoreGems = 0;

    this.scoreHearts = this.scene.get("UIScene").scoreHearts;
    this.scoreHearts = 0;

    // ------------------ CAMERA -------------------- //

    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setBounds(0, 0, 930, 630);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.lastDicoration = "Right";
  }
  update() {
    this.diamondFirst.anims.play("idle-diamond", true);
    this.diamondSecond.anims.play("idle-diamond", true);
    this.diamondThir.anims.play("idle-diamond", true);
    this.pig.anims.play("idleRight-pig", true);

    if (this.cursors.right.isDown) {
      this.player.setVelocityX(150);
      this.player.anims.play(`move-${this.lastDicoration}`, true);
      this.lastDicoration = "Right";
      this.player.setCircle(16, 16, 16);
    } else if (this.cursors.left.isDown) {
      this.player.setVelocityX(-150);
      this.player.anims.play(`move-${this.lastDicoration}`, true);
      this.lastDicoration = "Left";
      this.player.setCircle(16, 30, 16);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play(`idle-${this.lastDicoration}`, true);
    }
    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-200);
    }
    if (this.cursors.space.isDown) {
      this.player.anims.play(`attack-${this.lastDicoration}`, true);
    }
  }

  collectDiamondFirst() {
    this.diamondFirst.disableBody(true, true);
    this.scene.get("UIScene").increaseGems();
    this.scoreGems += 1;
    console.log("Gem: " + this.scoreGems + " Map");
  }

  collectDiamondSecond() {
    this.diamondSecond.disableBody(true, true);
    this.scene.get("UIScene").increaseGems();
    this.scoreGems += 1;
    console.log("Gem: " + this.scoreGems + " Map");
  }

  collectDiamondThir() {
    this.diamondThir.disableBody(true, true);
    this.scene.get("UIScene").increaseGems();
    this.scoreGems += 1;
    console.log("Gem: " + this.scoreGems + " Map");

    if (this.scoreGems == 3) {
      setInterval(() => {
        this.doorOpen.setVisible(true);
      }, 500);
    }
  }
}
