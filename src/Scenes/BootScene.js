import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }
  preload() {
    // ---------------------- Map ------------------------ //

    this.load.tilemapTiledJSON("background", "/public/MapKingsAndPigsV2.json");
    this.load.tilemapTiledJSON("map", "/public/Map/MapLevel2/MapLevel2.json");
    this.load.image("terrain", "/public/assets/Terrain/Terrain (32x32).png");
    this.load.image(
      "decorations",
      "/public/assets/Decorations/Decorations (32x32).png"
    );
    this.load.image("colision", "/public/assets/Colision/beach_tiles.png");

    // ------------------- DOOR ---------------- //

    // this.load.spritesheet("door", "/public/assets/Door/Idle.png", {
    //   frameWidth: 60,
    //   frameHeight: 10,
    // });
    this.load.image("door", "/public/assets/Door/Idle.png");

    this.load.spritesheet(
      "doorOpen",
      "/public/assets/Door/Opening (46x56).png",
      {
        frameWidth: 46,
        frameHeight: 56,
      }
    );

    // ------------------- PLAYER --------------- //

    this.load.spritesheet(
      "idle-right",
      "/public/assets/SpritePlayer/Idle Right(78x58).png",
      {
        frameWidth: 78,
        frameHeight: 58,
      }
    );

    this.load.spritesheet(
      "idle-left",
      "/public/assets/SpritePlayer/Idle Left(78x58).png",
      {
        frameWidth: 78,
        frameHeight: 58,
      }
    );
    this.load.spritesheet(
      "move-right",
      "/public/assets/SpritePlayer/RunRight(78x58).png",
      {
        frameWidth: 78,
        frameHeight: 58,
      }
    );
    this.load.spritesheet(
      "move-left",
      "/public/assets/SpritePlayer/RunLeft(78x58).png",
      {
        frameWidth: 78,
        frameHeight: 58,
      }
    );
    this.load.spritesheet(
      "jump-right",
      "/public/assets/SpritePlayer/Jump Right(78x58).png",
      {
        frameWidth: 78,
        frameHeight: 58,
      }
    );
    this.load.spritesheet(
      "jump-left",
      "/public/assets/SpritePlayer/Jump Left(78x58).png",
      {
        frameWidth: 78,
        frameHeight: 58,
      }
    );
    this.load.spritesheet(
      "attack-right",
      "/public/assets/SpritePlayer/Attack Right(78x58).png",
      {
        frameWidth: 78,
        frameHeight: 58,
      }
    );
    this.load.spritesheet(
      "attack-left",
      "/public/assets/SpritePlayer/Attack Left(78x58).png",
      {
        frameWidth: 78,
        frameHeight: 58,
      }
    );

    // ----------- DIAMOND * HEART * CHECKPOINT --------------- //

    this.load.spritesheet(
      "diamond",
      "/public/assets/HeartDiamond/Big Diamond Idle (18x14).png",
      {
        frameWidth: 18,
        frameHeight: 14,
      }
    );
    this.load.image("live-bar", "/public/assets/HeartDiamond/Live Bar.png");
    this.load.spritesheet(
      "diamond-bar",
      "/public/assets/HeartDiamond/Small Diamond (18x14).png",
      {
        frameWidth: 18,
        frameHeight: 14,
      }
    );
    this.load.spritesheet(
      "heart-bar",
      "/public/assets/HeartDiamond/Small Heart Idle (18x14).png",
      {
        frameWidth: 18,
        frameHeight: 14,
      }
    );
    this.load.spritesheet(
      "heart",
      "/public/assets/HeartDiamond/Big Heart Idle (18x14).png",
      {
        frameWidth: 18,
        frameHeight: 14,
      }
    );
    this.load.image("GuiSetting", "/public/assets/MenuGui/Icon_Settings.png");
    this.load.image("GuiNextLevel", "/public/assets/HUD Text Box.png");
    this.load.spritesheet(
      "checkPoint",
      "/public/assets/CheckPoint/Checkpoint (Flag Idle)(64x64).png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );

    // --------------------- PIG ------------------------ //

    this.load.spritesheet(
      "idle-right-pig",
      "/public/assets/SpritePig/Idle-Right (34x28).png",
      {
        frameWidth: 34,
        frameHeight: 28,
      }
    );
    this.load.spritesheet(
      "idle-left-pig",
      "/public/assets/SpritePig/Idle-Left (34x28).png",
      {
        frameWidth: 34,
        frameHeight: 28,
      }
    );

    this.load.image("canon", "/public/assets/Canon/Idle-Right.png");
  }
  create() {
    this.scene.start("MapScene");
  }
  update() {}
}
