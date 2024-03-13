import Phaser from "phaser";

export default class UIScene extends Phaser.Scene {
  constructor() {
    super("UIScene");
    this.textScoreGems;
    this.scoreGems = 0;
    this.scoreHearts = 0;
  }
  preload() {}
  create() {
    this.add.image(10, 10, "live-bar").setOrigin(0, 0).setScale(1.2);
    this.add.sprite(10, 50, "diamond-bar").setOrigin(0);
    this.guiSetting = this.add
      .image(0, 0, "GuiSetting")
      .setOrigin(0)
      .setScale(0.1)
      .setPosition(760, 10)
      .setInteractive();

    this.guiSetting.on("pointerdown", () => {
      console.log("hello");
    });

    this.textScoreGems = this.add
      .text(30, 51, "0", { fontSize: "15px", fontStyle: "bold" })
      .setOrigin(0)
      .setScale(0.8);

    this.heartBarFirst = this.add
      .sprite(10, 10, "heart-bar")
      .setOrigin(0)
      .setPosition(22, 22)
      .setScale(1.2)
      .setAlpha(0.001);

    this.heartBarSecond = this.add
      .sprite(10, 10, "heart-bar")
      .setOrigin(0)
      .setPosition(36, 22)
      .setScale(1.2)
      .setAlpha(0.001);

    this.heartBarThir = this.add
      .sprite(10, 10, "heart-bar")
      .setOrigin(0)
      .setPosition(50, 22)
      .setScale(1.2)
      .setAlpha(0.001);
  }

  update() {
    if (this.scoreGems === 4) {
      // this.add
      //   .image(100, 100, "GuiNextLevel")
      //   .setOrigin(0)
      //   .setPosition(50, 100);
      // this.add.text(200, 200, "Next Level, please waittt...");
      this.scene.get("MapScene").visibleCheckPoint();
    }
  }

  increaseGems() {
    this.scoreGems += 1;
    this.textScoreGems.setText(`${this.scoreGems}`);
    console.log("Gems: " + `${this.scoreGems}`, "UIS");
  }

  increaseHearts() {
    this.scoreHearts += 1;
    if (this.scoreHearts == 1) {
      this.heartBarFirst.setAlpha(2);
      console.log("Heart: 1");
    }
    if (this.scoreHearts == 2) {
      this.heartBarSecond.setAlpha(2);
      console.log("Heart: 2");
    }
    if (this.scoreHearts == 3) {
      this.heartBarThir.setAlpha(2);
      console.log("Heart: 3");
    }
  }
}
