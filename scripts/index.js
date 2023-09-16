import { Game } from "./core/game.js";
import { Layout } from "./core/layout.js";
import { Group } from "./core/group.js";
import { Cloud } from "./gameObjects/cloud.js";
import { Colleague } from "./gameObjects/colleague.js";
import { Polya } from "./gameObjects/polya.js";
import { Hotdog } from "./gameObjects/hotdog.js";
import { Candy } from "./gameObjects/candy.js";
import { Cake } from "./gameObjects/cake.js";
import { Coffee } from "./gameObjects/coffee.js";
import { InactiveStuff } from "./gameObjects/stuffInactive.js";
import { Randomizer } from "./helpers/randomizer.js";
import { textWithLeadingZeros } from "./helpers/textFormatter.js";
import { Scene } from "./core/scene.js";

const app = new PIXI.Application({
  view: document.querySelector(".main-gbc"),
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  resizeTo: window,
});

async function init() {
  const manifest = {
    bundles: [
      {
        name: "game-fonts",
        assets: [
          {
            name: "GoldmanRegular",
            srcs: "fonts/goldman_regular.ttf",
          },
          {
            name: "GoldmanBold",
            srcs: "fonts/goldman_bold.ttf",
          },
        ],
      },
      {
        name: "menu-screen",
        assets: [
          {
            name: "menuPolya",
            srcs: "assets/characters/polya/run_1.svg",
          },
        ],
      },
      {
        name: "game-screen",
        assets: [
          {
            name: "bgCloud2",
            srcs: "assets/backgrounds/office/cloud2.svg",
          },
          {
            name: "bgCloud",
            srcs: "assets/backgrounds/office/cloud.svg",
          },
          {
            name: "bgBuildingsBack",
            srcs: "assets/backgrounds/office/buildings_back.svg",
          },
          {
            name: "bgBuildingsFront",
            srcs: "assets/backgrounds/office/buildings_front.svg",
          },
          {
            name: "bgFloor",
            srcs: "assets/backgrounds/office/floor.svg",
          },
          {
            name: "bgWindows",
            srcs: "assets/backgrounds/office/windows.svg",
          },
          {
            name: "colleagueSpritesheet",
            srcs: "assets/scenery/colleague/colleague_spritesheet.json",
          },
          {
            name: "ggSheet",
            srcs: "assets/characters/polya/polya_spritesheet.json",
          },
          {
            name: "satietyBar",
            srcs: "assets/scenery/hunger_bar.svg",
          },
          {
            name: "hotdog",
            srcs: "assets/stuff/hotdog.svg",
          },
          {
            name: "cake",
            srcs: "assets/stuff/cake.svg",
          },
          {
            name: "coffee",
            srcs: "assets/stuff/coffee.svg",
          },
          {
            name: "candy",
            srcs: "assets/stuff/candy_black_border.svg",
          },
          {
            name: "gameOverText",
            srcs: "assets/controls/game_over_text.png",
          },
          {
            name: "gameOverTable",
            srcs: "assets/controls/score_table.svg",
          },
          {
            name: "tryAgainBtn",
            srcs: "assets/controls/try_again_btn.svg",
          },
        ],
      },
    ],
  };

  await PIXI.Assets.init({ manifest: manifest });

  PIXI.Assets.backgroundLoadBundle([
    "game-fonts",
    "menu-screen",
    "game-screen",
  ]);

  // makeMenuScreen();
  makeGameScreen();
}

// async function makeMenuScreen() {
//   const menuScreenAssets = await PIXI.Assets.loadBundle("menu-screen");

//   const menuSound = new Howl({
//     src: ["../audio/main_menu.mp3"],
//     loop: true,
//   });
//   const laughSound = new Howl({
//     src: ["../audio/laugh.wav"],
//   });

//   const menuLayout = new PIXI.Container();

//   const polya = new PIXI.Sprite(menuScreenAssets.menuPolya);

//   const initLevel = () => {
//     polya.scale.set(-2, 2);
//     polya.anchor.set(0.5, 1);
//     polya.x = app.renderer.width - polya.width * 1.2;
//     polya.y = app.renderer.height + polya.height * 0.33;
//     polya.movementSpeed = 1.5;
//     polya.isMoving = false;

//     menuLayout.addChild(polya);

//     app.stage.addChild(menuLayout);

//     menuSound.play();
//   };

//   initLevel();

//   const laughPolya = () => {
//     laughSound.play();
//   };

// const randomActionPolya = () => {
//   const r = Randomizer.intBetween(0, 3);

//   switch (r) {
//     case 0:
//       laughPolya();
//   }
// };

//   const movePolya = () => {
//     polya.x += polya.movementSpeed * polya.scale.x;
//     polya.isMoving = true;
//   };

//   const standPolya = () => {
//     polya.isMoving = false;
//   };

//   const changeDirectionPolya = () => {
//     polya.scale.x *= -1;
//   };

//   const randomDirectionPolya = () => {
//     const chance = Randomizer.intBetween(0, 1);

//     if (chance === 0) {
//       return;
//     }

//     changeDirectionPolya();
//   };

//   let elapsed = 0.0;
//   const animateLoadScreen = (delta) => {
//     elapsed += (1 / 60) * delta;

//     if (elapsed > 1) {
//       randomDirectionPolya();
//       elapsed = 0;
//     } else {
//       movePolya();
//     }
//   };

//   app.ticker.add(animateLoadScreen);
// }

async function makeGameScreen() {
  // const gameFonts = await PIXI.Assets.loadBundle("game-fonts");
  const gameScreenAssets = await PIXI.Assets.loadBundle("game-screen");

  const game = new Game();
  const scene = new Scene();

  const colorScheme = {
    bg: [
      0x7dc1ff, 0x73b5f1, 0x6aa9e4, 0x609ed6, 0x5692c8, 0x4c86bb, 0x437aad,
      0x396ea0, 0x2f6292, 0x255784, 0x1c4b77, 0x123f69,
    ],
    buildingsBack: [
      0xc1e4fe, 0xb6d9f4, 0xabcfe9, 0xa1c4df, 0x96bad4, 0x8bafca, 0x80a5bf,
      0x759ab5, 0x6a90aa, 0x6085a0, 0x557b95, 0x4a708b,
    ],
    buildingsFront: [
      0xa6d6f3, 0x9bcae7, 0x90beda, 0x84b2ce, 0x79a6c1, 0x6e9ab5, 0x638ea8,
      0x58829c, 0x4d768f, 0x416a83, 0x365e76, 0x2b526a,
    ],
    cloudsBack: [
      0xcde9fc, 0xbedbef, 0xb0cee2, 0xa1c0d6, 0x92b3c9, 0x84a5bc, 0x7598af,
      0x678aa2, 0x587d95, 0x496f89, 0x3b627c, 0x2c546f,
    ],
    cloudsFront: [
      0xffffff, 0xedf0f2, 0xdbe1e6, 0xc9d1d9, 0xb7c2cd, 0xa5b3c0, 0x92a4b4,
      0x8095a7, 0x6e869b, 0x5c768e, 0x4a6782, 0x385875,
    ],
    floor: [
      0x7cd8d1, 0x76d1ca, 0x71c9c2, 0x6bc2bb, 0x65bab4, 0x60b3ac, 0x5aaba5,
      0x55a49d, 0x4f9c96, 0x49958f, 0x448d87, 0x3e8680,
    ],
  };

  PIXI.sound.add("level", "../audio/level.mp3");
  PIXI.sound.add("bonus", "../audio/bonus.wav");
  PIXI.sound.add("laugh", "../audio/laugh.wav");
  PIXI.sound.add("gameOver", "../audio/stomach_growl.wav");

  const setBackroundColor = (color) => (app.renderer.background.color = color);

  const initLevel = () => {
    app.stage.interactive = true;
    setBackroundColor(0x7dc1ff);

    const cloudsBackLayout = new Layout();
    const cloudsFrontLayout = new Layout();
    const buildingsBackLayout = new Layout();
    const buildingsFrontLayout = new Layout();
    const windowsLayout = new Layout();
    const floorLayout = new Layout();
    const colleaguesLayout = new Layout();
    const stuffInactiveLayout = new Layout();
    const sceneryLayout = new Layout();
    const polyaLayout = new Layout();
    const stuffLayout = new Layout();
    const controlsLayout = new Layout();

    sceneryLayout.addChild(cloudsBackLayout);
    sceneryLayout.addChild(cloudsFrontLayout);
    sceneryLayout.addChild(buildingsBackLayout);
    sceneryLayout.addChild(buildingsFrontLayout);
    sceneryLayout.addChild(windowsLayout);
    sceneryLayout.addChild(floorLayout);
    sceneryLayout.addChild(colleaguesLayout);
    sceneryLayout.addChild(stuffInactiveLayout);

    const brightnessFilter = new PIXI.ColorMatrixFilter();
    app.stage.filters = [brightnessFilter];
    brightnessFilter.brightness(scene.brightness, false);

    const bgClouds = new Group();
    const totalBgCloudsBack = Randomizer.intBetween(2, 4);
    const totalBgCloudsFront = Randomizer.intBetween(2, 3);

    const initFrontClouds = (amount) => {
      for (let i = 0; i < amount; i++) {
        const frontCloud = new Cloud(gameScreenAssets.bgCloud, {
          anchorX: 0,
          anchorY: 0.5,
          scale: Randomizer.floatBetween(0.3, 1),
          movementSpeed: Randomizer.floatBetween(0.25, 0.5),
        });

        frontCloud.x = i * frontCloud.width + i * frontCloud.width * 0.25;
        frontCloud.y = Randomizer.floatBetween(
          app.renderer.height * 0.25,
          app.renderer.height * 0.8
        );

        bgClouds.add(frontCloud);
        cloudsFrontLayout.addChild(frontCloud);
      }
    };

    const initBackClouds = (amount) => {
      for (let i = 0; i < amount; i++) {
        const bgCloud2 = new Cloud(gameScreenAssets.bgCloud2, {
          anchorX: 0,
          anchorY: 0.5,
          scale: Randomizer.floatBetween(0.4, 0.7),
          movementSpeed: Randomizer.floatBetween(0.12, 0.25),
        });

        bgCloud2.x = i * bgCloud2.width + i * bgCloud2.width * 0.25;
        bgCloud2.y = Randomizer.floatBetween(
          app.renderer.height * 0.15,
          app.renderer.height * 0.75
        );

        bgClouds.add(bgCloud2);
        cloudsBackLayout.addChild(bgCloud2);
      }
    };

    initBackClouds(totalBgCloudsBack);
    initFrontClouds(totalBgCloudsFront);

    const bgBuildingsBack = new PIXI.Sprite(gameScreenAssets.bgBuildingsBack);
    bgBuildingsBack.anchor.set(0, 1);
    bgBuildingsBack.position.set(0, app.renderer.height);
    buildingsBackLayout.addChild(bgBuildingsBack);

    const bgBuildingsFront = new PIXI.Sprite(gameScreenAssets.bgBuildingsFront);
    bgBuildingsFront.anchor.set(0, 1);
    bgBuildingsFront.position.set(
      app.renderer.width * 0.19,
      app.renderer.height
    );
    buildingsFrontLayout.addChild(bgBuildingsFront);

    const bgWindows = new PIXI.Sprite(gameScreenAssets.bgWindows);
    bgWindows.position.set(0, 0);
    windowsLayout.addChild(bgWindows);

    const bgFloor = new PIXI.Sprite(gameScreenAssets.bgFloor);
    bgFloor.anchor.set(0.5, 0.5);
    bgFloor.position.set(
      app.renderer.width * 0.5,
      app.renderer.height - bgFloor.height * 0.5
    );
    floorLayout.addChild(bgFloor);

    const colleagueSpritesheet = gameScreenAssets.colleagueSpritesheet;
    const colleagues = new Group();
    const colleaguesActive = new Group();
    const totalColleagues = Randomizer.intBetween(3, 5);

    const initColleagues = (amount) => {
      for (let i = 0; i < amount; i++) {
        const colleague = new Colleague(
          colleagueSpritesheet.animations["look_out"]
        );
        colleague.animationSpeed = 1 / 90;
        colleague.loop = false;
        colleague.anchor.set(0.5, 1);
        colleague.x =
          i * colleague.width + colleague.width + i * app.renderer.width * 0.05;
        colleague.y = app.renderer.height - colleague.height * 0.275;

        const randomChance = Randomizer.float();
        if (randomChance > 0.33) {
          const randomLookOutMoment = Randomizer.floatBetween(5.0, 29.0);
          colleague.lookOutMoment = randomLookOutMoment;

          colleague.setActive();

          colleaguesActive.add(colleague);
        }

        colleagues.add(colleague);
        colleaguesLayout.addChild(colleague);
      }
    };

    initColleagues(totalColleagues);

    const polyaSpritesheet = gameScreenAssets.ggSheet;
    const polya = new Polya(polyaSpritesheet.animations["run"]);
    polya.animationSpeed = 1 / 5;
    polya.anchor.set(0.5, 0);
    polya.x = polya.width * 1.25;
    polya.y = app.view.height - polya.height* 1.075;
    polya.interactive = true;
    polyaLayout.addChild(polya);

    const onPolyaTap = function () {
      PIXI.sound.play("laugh");
      game.increaseScoreBy(10);
      polya.hungerBy(0.03);
      updateScoreText();
    };
    polya.on("pointerdown", onPolyaTap);
    polya.play();

    const polyaSatietyBarLayout = new PIXI.Container();
    polyaSatietyBarLayout.x = app.renderer.width - 8;
    polyaSatietyBarLayout.y = 100;
    polyaSatietyBarLayout.scale.set(-polyaSatietyBarLayout.scale.x, 1);

    const polyaSatietyBar = new PIXI.Sprite(gameScreenAssets.satietyBar);
    polyaSatietyBar.x = 0;
    polyaSatietyBar.y = 8;
    polyaSatietyBar.scale.set(0.75);

    const polyaSatietyInnerBarLayout = new PIXI.Container();
    polyaSatietyInnerBarLayout.x = 45;

    const maxSatietyInnerBarWidth = 345;
    const polyaSatietyInnerBar = new PIXI.Graphics();
    polyaSatietyInnerBar.beginFill(0xd31a1a);
    polyaSatietyInnerBar.drawRect(
      0,
      polyaSatietyBar.height * 0.5,
      maxSatietyInnerBarWidth,
      16
    );
    polyaSatietyInnerBar.endFill();

    polyaSatietyInnerBarLayout.addChild(polyaSatietyInnerBar);
    polyaSatietyBarLayout.addChild(polyaSatietyInnerBarLayout);
    polyaSatietyBarLayout.addChild(polyaSatietyBar);
    controlsLayout.addChild(polyaSatietyBarLayout);

    const stuff = new Group();
    const stuffInactive = new Group();

    const scoreTextOptions = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: 36,
      fontStyle: "italic",
      fontWeight: "bold",
      fill: ["#ffffff", "#7cd8d1"], // gradient
      stroke: "#4a1850",
      strokeThickness: 5,
      lineJoin: "round",
      align: "right",
    });
    const scoreText = new PIXI.Text(game.score, scoreTextOptions);
    scoreText.text = textWithLeadingZeros(game.score, 6);
    scoreText.anchor.set(1, 0);
    scoreText.x = app.renderer.width - scoreText.width * 0.2;
    scoreText.y = 16;
    controlsLayout.addChild(scoreText);

    // const scoreTextHints = new Group();

    app.stage.addChild(buildingsBackLayout);
    app.stage.addChild(cloudsBackLayout);
    app.stage.addChild(buildingsFrontLayout);
    app.stage.addChild(cloudsFrontLayout);
    app.stage.addChild(windowsLayout);
    app.stage.addChild(floorLayout);
    app.stage.addChild(colleaguesLayout);
    app.stage.addChild(stuffInactiveLayout);
    app.stage.addChild(polyaLayout);
    app.stage.addChild(stuffLayout);
    app.stage.addChild(controlsLayout);

    const buildingsBgFilter = new PIXI.ColorMatrixFilter();
    buildingsBackLayout.filters = [buildingsBgFilter];

    const buildingsFgFilter = new PIXI.ColorMatrixFilter();
    buildingsFrontLayout.filters = [buildingsFgFilter];

    const cloudsBgFilter = new PIXI.ColorMatrixFilter();
    cloudsBackLayout.filters = [cloudsBgFilter];

    const cloudsFgFilter = new PIXI.ColorMatrixFilter();
    cloudsFrontLayout.filters = [cloudsFgFilter];

    const floorFilter = new PIXI.ColorMatrixFilter();
    floorLayout.filters = [floorFilter];

    PIXI.sound.play("level", { loop: true });

    const mouseManager = {
      mousePressed: false,
    };

    const polyaCanNotBeFlippedHorizontally = () =>
      polya.x > app.renderer.width - polya.width / 4 ||
      polya.x < polya.width / 4;

    const onTouchStart = function () {
      mouseManager.mousePressed = true;

      if (polyaCanNotBeFlippedHorizontally()) {
        return;
      }

      polya.flipHorizontal();
    };
    app.stage.on("pointerdown", onTouchStart);

    const onTouchEnd = function () {
      mouseManager.mousePressed = false;
    };
    app.stage.on("pointerup", onTouchEnd);

    const updateBg = () => {
      windowsLayout.x =
        stuffLayout.x =
        colleaguesLayout.x =
        stuffInactiveLayout.x =
          -polya.x * 0.15;
    };

    const updateClouds = () => {
      for (const cloud of bgClouds.elems) {
        if (cloud.x > app.view.width) {
          cloud.x = -cloud.width;
        }

        cloud.update();
      }
    };

    const updatePolya = () => {
      if (polya.x > app.renderer.width || polya.x < 0) {
        polya.flipHorizontal();
      }
      polya.move();
    };

    const updateColleagues = (lookOutTime) => {
      for (const colleague of colleaguesActive.elems) {
        if (
          lookOutTime > colleague.lookOutMoment &&
          colleague.hasNotLookedOut()
        ) {
          colleague.lookOutAndHide();
        }
      }
    };

    const resetColleaguesLookOut = () => {
      for (const colleague of colleaguesActive.elems) {
        colleague.resetLookOut();
      }
    };

    const getRandomThing = () => {
      const r = Randomizer.float();

      if (r > 0.32) {
        return new Candy(gameScreenAssets.candy, {
          fallingSpeed: Randomizer.floatBetween(6.0, 8.0),
        });
      } else if (r > 0.09 && r < 0.33) {
        return new Hotdog(gameScreenAssets.hotdog, {
          fallingSpeed: Randomizer.floatBetween(8.0, 10.0),
        });
      } else if (r > 0.05 && r < 0.1) {
        return new Cake(gameScreenAssets.cake, {
          fallingSpeed: Randomizer.floatBetween(9.0, 12.0),
        });
      } else {
        return new Coffee(gameScreenAssets.coffee, {
          fallingSpeed: Randomizer.floatBetween(12.0, 15.0),
        });
      }
    };

    // const createTemporaryText = (value, opts) => {
    //   const tempTextStyle = new PIXI.TextStyle({
    //     fontFamily: "Arial",
    //     fontSize: 14,
    //     fill: "#ffffff",
    //   });
    //   const tempText = new PIXI.Text("+1", tempTextStyle);
    //   // tempText.anchor.set(1, 0);
    //   tempText.x = opts.x;
    //   tempText.y = opts.y;
    //   scoreTextHints.add(tempText);
    //   controlsLayout.addChild(tempText);
    // };

    // const updateTemporaryText = () => {
    //   if (temporaryText < 1) {
    //     return;
    //   }

    //   for (const temp of temporaryText) {
    //     temp.y -= 1;
    //     temp.apha -= 0.2;
    //   }
    // };

    const createInactiveStuffFrom = (stuff) => {
      const inactiveThing = new InactiveStuff(stuff.texture);
      inactiveThing.anchor.set(0.5);
      inactiveThing.scale = stuff.scale;
      inactiveThing.x = stuff.x;
      inactiveThing.y = stuff.y;
      inactiveThing.rotation = stuff.rotation;

      stuffInactive.add(inactiveThing);
      stuffInactiveLayout.addChild(inactiveThing);
    };

    const updateStuff = () => {
      for (const thing of stuff.elems) {
        if (thing.y + thing.height > app.renderer.height) {
          createInactiveStuffFrom(thing);

          stuff.remove(thing);
          stuffLayout.removeChild(thing);
        } else {
          thing.update();

          if (thing.hitTest(polya)) {
            polya.saturateBy(thing.satietyValue);

            stuff.remove(thing);
            stuffLayout.removeChild(thing);

            game.increaseScoreBy(thing.scoreValue);
            updateScoreText();

            PIXI.sound.play("bonus");
          }
        }
      }
    };

    const percentOf = (percent, value) => (value * percent) / 100;

    const updateSatietyBar = () => {
      polyaSatietyInnerBar.width = percentOf(
        polya.satiety * 100,
        maxSatietyInnerBarWidth
      );
    };

    const updateScoreText = () => {
      scoreText.text = textWithLeadingZeros(game.score, 6);
    };

    const changeColors = (colorNumber) => {
      setBackroundColor(colorScheme.bg[colorNumber]);
      buildingsBgFilter.tint(colorScheme.buildingsBack[colorNumber]);
      buildingsFgFilter.tint(colorScheme.buildingsFront[colorNumber]);
      cloudsBgFilter.tint(colorScheme.cloudsBack[colorNumber]);
      cloudsFgFilter.tint(colorScheme.cloudsFront[colorNumber]);
      floorFilter.tint(colorScheme.floor[colorNumber]);
    };

    const changeBrightness = (value) => {
      brightnessFilter.brightness(value);
    };

    const updateColors = () => {
      const colorNumber = parseInt(game.maxGlobalTime) - 1 - game.hours();
      changeColors(colorNumber);
    };

    const updateBrightness = () => {
      const tempBrightness = game.globalTime / game.maxGlobalTime;
      scene.brightness = Math.max(scene.minBrightness, tempBrightness);

      changeBrightness(scene.brightness);
    };

    updateColors();
    updateBrightness();

    const createReplayBtn = () => {
      const replayBtn = new PIXI.Sprite(gameScreenAssets.replayBtn);
      replayBtn.x = app.renderer.width / 2;
      replayBtn.y = app.renderer.height / 2;
      replayBtn.anchor.set(0.5);
      replayBtn.interactive = true;

      const onReplayBtnPress = function () {
        // Todo change to correct reset level
        location.reload();
        // replayBtn.off("pointerdown", onReplayBtnPress);
        // gameOverLayout.removeChild(replayBtn);
        // app.stage.removeChild(gameOverLayout);

        // resetLevel();
        // // polya.resetSatiety(); // change resetLevel() to that
        // app.ticker.start();
      };
      replayBtn.on("pointerdown", onReplayBtnPress);

      return replayBtn;
    };

    const gameOver = () => {
      app.ticker.stop();

      PIXI.sound.stop("level");
      PIXI.sound.play("gameOver");

      app.stage.filters = [];

      const gameOverLayout = new Layout();

      // TODO inclue Goldman font
      // const gameOverText = new PIXI.Text("GAME OVER", {
      //   fontFamily: "Arial",
      //   fontSize: 96,
      //   fontWeight: "bold",
      //   fill: "#F7A12F",
      //   stroke: "#000000",
      //   strokeThickness: 6,
      //   lineJoin: "round",
      // });
      const gameOverText = new PIXI.Sprite(gameScreenAssets.gameOverText);
      gameOverText.x = app.renderer.width * 0.5;
      gameOverText.y = 60;
      gameOverText.anchor.set(0.5);
      gameOverLayout.addChild(gameOverText);

      const gameOverScoreTable = new PIXI.Sprite(
        gameScreenAssets.gameOverTable
      );
      gameOverScoreTable.x = app.renderer.width * 0.5;
      gameOverScoreTable.y = app.renderer.height * 0.5;
      gameOverScoreTable.anchor.set(0.5);
      gameOverLayout.addChild(gameOverScoreTable);

      const replayBtn = new PIXI.Sprite(gameScreenAssets.tryAgainBtn);
      replayBtn.x = app.renderer.width / 2;
      replayBtn.y = gameOverScoreTable.y + gameOverScoreTable.height * 0.5 + 50;
      replayBtn.anchor.set(0.5);
      replayBtn.interactive = true;

      const onReplayBtnPress = function () {
        location.reload();
      };
      replayBtn.on("pointerdown", onReplayBtnPress);

      gameOverLayout.addChild(replayBtn);

      app.stage.addChild(gameOverLayout);
    };

    let localTime = 0.0;
    const maxLocalTime = 0.5;

    let colleaguesLookOutTime = 0.0;
    const maxColleaguesLookOutTime = 30.0;

    let spawnStuffTime = 0.0;
    const animateLevel = (delta) => {
      if (polya.isHungry()) {
        gameOver();
        return;
      }

      polya.updateHunger();
      updateSatietyBar();
      updatePolya();

      localTime += (1 / 60) * delta;

      if (localTime > maxLocalTime) {
        if (
          game.globalTime > game.maxGlobalTime - 0.1 ||
          game.globalTime < game.minGlobalTime + 0.2
        ) {
          game.toggleTimeOfDay();
        }
        game.tick();

        updateColors();
        updateBrightness();

        localTime = 0.0;
      }

      // TODO: realize in Event Emitter
      spawnStuffTime += (1 / 60) * delta;

      if (spawnStuffTime > game.foodFallingDelay) {
        const randomThing = getRandomThing();
        randomThing.anchor.set(0.5);
        randomThing.scale.set(0.5);
        randomThing.x = Randomizer.floatBetween(0, app.screen.width);
        randomThing.y = -randomThing.height;

        stuff.add(randomThing);
        stuffLayout.addChild(randomThing);

        spawnStuffTime = 0;
      }

      updateBg();
      updateClouds();

      if (colleaguesLookOutTime > maxColleaguesLookOutTime) {
        colleaguesLookOutTime = 0.0;
        resetColleaguesLookOut();
      }
      colleaguesLookOutTime += (1 / 60) * delta;

      updateColleagues(colleaguesLookOutTime);

      updateStuff();
    };

    app.ticker.add(animateLevel);
  };

  initLevel();
}

init();
