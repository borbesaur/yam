

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(receiver);
      }
      return desc.value;
    };
  }
  return _get(target, property, receiver || target);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var GameMapData = function GameMapData() {
  "use strict";

  _classCallCheck(this, GameMapData);
};

_defineProperty(GameMapData, "init", function () {
  GameMapData.startWorld = [
    // Ground of the game (Grass and roads)
    world, objects, cosmetics
  ];
});

var PokemonGame =
  /*#__PURE__*/
  (function () {
    "use strict";

    function PokemonGame() {
      _classCallCheck(this, PokemonGame);
    }

    _createClass(PokemonGame, null, [
      {
        key: "loadImages",
        // Calculates the difference between now and the last time this function ran
        // Game uses delta to run independent of framerate
        // Set sizes of both the reference and the main canvas
        value: function loadImages(callback) {
          var counter = 0;
          var paths = this.imagePaths;
          var total = Object.keys(paths).length;

          for (var i = 0; i < total; i++) {
            var img = new Image();
            var currentKey = Object.keys(paths)[i];
            img.addEventListener("load", function () {
              counter += 1;
              if (counter === total) callback();
            });
            img.src = paths[currentKey];
            this.images[currentKey] = img;
          }
        }, // Reference canvas is only drawn on inititalization or to update entire map
        // (Ex: New map (area) to be loaded or minor / major changes in map)
      },
    ]);

    return PokemonGame;
  })();

_defineProperty(PokemonGame, "init", function () {
  PokemonGame.dimensions = {
    cols: 100,
    rows: 100,
    tileSize: 32,
  };
  PokemonGame.playerConfig = {
    xpos: 512,
    ypos: 470,
    dir: 3,
    offset: {
      left: 5,
      top: 16,
      right: 5,
      bottom: 2,
    },
  };
  PokemonGame.imagePaths = {
    canvasTiles:
      "./assets/canvas-tiles.png",
    mainCharacter:
    //   "https://drive.google.com/uc?id=1LgGD_uk8Nn2RMtTgg66Pe0EIj2_RJqEK",
    "./assets/main-character.png",
  };
  PokemonGame.images = {};
  PokemonGame.delta = {
    now: 0,
    difference: 0,
    then: 0,
  };
  PokemonGame.allTileObjects = [];
  PokemonGame.setDelta();
  PokemonGame.setCanvas();
});

_defineProperty(PokemonGame, "addTileObject", function (tileData, x, y) {
  PokemonGame.allTileObjects[tileData.tileID] = new Tile(
    x,
    y,
    tileData.tileID,
    tileData.type,
    tileData.content
  );
});

_defineProperty(PokemonGame, "getTileObjects", function () {
  return PokemonGame.allTileObjects;
});

_defineProperty(PokemonGame, "getPlayerConfig", function () {
  return PokemonGame.playerConfig;
});

_defineProperty(PokemonGame, "getDimensions", function () {
  return PokemonGame.dimensions;
});

_defineProperty(PokemonGame, "getImageByName", function (name) {
  if (PokemonGame.images.hasOwnProperty(name)) {
    return PokemonGame.images[name];
  }
});

_defineProperty(PokemonGame, "isPaused", function () {
  // Future option to pause the game
  return false;
});

_defineProperty(PokemonGame, "setDelta", function () {
  var now = Date.now();
  var difference = (now - PokemonGame.delta.then) / 1000;
  var then = now;
  PokemonGame.delta = {
    now: now,
    difference: difference,
    then: then,
  };
});

_defineProperty(PokemonGame, "getDelta", function () {
  return PokemonGame.delta;
});

_defineProperty(PokemonGame, "setCanvas", function () {
  refc.height = PokemonGame.dimensions.cols * PokemonGame.dimensions.tileSize;
  refc.width = PokemonGame.dimensions.rows * PokemonGame.dimensions.tileSize;
  mainc.width = 500;
  mainc.height = 500;
});

_defineProperty(PokemonGame, "drawReferenceCanvas", function () {
  for (var i = 0; i < 3; i++) {
    for (var y = 0; y < PokemonGame.dimensions.cols; y++) {
      for (var x = 0; x < PokemonGame.dimensions.rows; x++) {
        var ts = PokemonGame.dimensions.tileSize;
        var num = GameMapData.startWorld[i][y][x];
        var tileData = InteractionManager.getTileData(num); // Save each interactive object in an array (xpos, ypos, id, event)

        if (InteractionManager.isTileInteractable(num) && i === 1) {
          PokemonGame.addTileObject(
            {
              tileID: num,
              ...tileData,
            },
            x,
            y
          );
        }

        refctx.drawImage(
          PokemonGame.getImageByName("canvasTiles"), // source x, source y source w, source h dest x, dest y dest w, dest h
          num * ts + num,
          0,
          ts,
          ts,
          x * ts,
          y * ts,
          ts,
          ts
        );
      }
    }
  }
});

_defineProperty(PokemonGame, "update", function () {
  PokemonGame.setDelta();
});

_defineProperty(PokemonGame, "render", function () {
  var px = player.pos.x + player.w / 2;
  var py = player.pos.y + player.h / 2;
  var midx = mainc.width / 2;
  var midy = mainc.height / 2;
  PokemonGame.update();
  mainctx.clearRect(0, 0, mainc.width, mainc.height);
  mainctx.drawImage(
    // source canvas, source x, source y, source w, source h
    refc,
    px - midx,
    py - midy,
    mainc.width,
    mainc.height, // dest x, dest y, dest w, dest h
    0,
    0,
    mainc.width,
    mainc.height
  );
});

var InteractionManager = function InteractionManager() {
  "use strict";

  _classCallCheck(this, InteractionManager);
};

_defineProperty(InteractionManager, "init", function () {
  InteractionManager.currentEvent = false;
  InteractionManager.interactiveTileIDs = [11, 13]; // Types: text or event

  InteractionManager.interactiveTileData = {
    11: {
      type: "text",
      content: ["A right fence"],
    },
    13: {
      type: "text",
      content: ["I can't climb over that.", "Maybe there's another way?"],
    },
  }; // Each tile has an offset to make the collisions look right

  InteractionManager.tileMargins = [
    {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    }, // 0 - Nothing (base tile)
    {
      left: 2,
      top: 0,
      right: 0,
      bottom: 0,
    }, // 1 - Tree (main)
    {
      left: 0,
      top: 0,
      right: 2,
      bottom: 0,
    }, // 2 - Tree (main)
    {
      left: 2,
      top: 5,
      right: 0,
      bottom: 0,
    }, // 3 - Tree (main)
    {
      left: 0,
      top: 5,
      right: 2,
      bottom: 0,
    }, // 4 - Tree (main)
    {
      left: 2,
      top: 0,
      right: 0,
      bottom: 0,
    }, // 5 - Tree (main)
    {
      left: 0,
      top: 0,
      right: 2,
      bottom: 0,
    }, // 6 - Tree (main)
    {
      left: 2,
      top: 0,
      right: 0,
      bottom: 0,
    }, // 7 - Tree (main)
    {
      left: 0,
      top: 0,
      right: 2,
      bottom: 0,
    }, // 8 - Tree (main)
    {
      left: 2,
      top: 5,
      right: 0,
      bottom: 0,
    }, // 9 - Fence (White)
    {
      left: 0,
      top: 5,
      right: 0,
      bottom: 0,
    }, // 10 - Fence (White)
    {
      left: 0,
      top: 5,
      right: 2,
      bottom: 0,
    }, // 11 - Fence (White)
    {
      left: 9,
      top: 5,
      right: 9,
      bottom: 0,
    }, // 12 - Fence (White)
    {
      left: 9,
      top: 0,
      right: 9,
      bottom: 0,
    }, // 13 - Fence (White)
    {
      left: 9,
      top: 0,
      right: 9,
      bottom: 0,
    }, // 14 - Fence (White)
    {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    }, // 15 - Grass
    {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    }, // 16 - Road in grass
    {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    }, // 17 - Road in grass
    {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    }, // 18 - Road in grass
    {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  ];
});

_defineProperty(InteractionManager, "isTileInteractable", function (tileID) {
  return InteractionManager.interactiveTileIDs.includes(tileID);
});

_defineProperty(InteractionManager, "getTileData", function (tileID) {
  return InteractionManager.interactiveTileData[String(tileID)];
});

_defineProperty(InteractionManager, "getTileMargin", function (tileID) {
  return InteractionManager.tileMargins[String(tileID)];
});

_defineProperty(InteractionManager, "handleInteraction", function (data) {
  player.isInteracting = true;
  var type = (data && data.eventType) || InteractionManager.currentEvent.type;

  if (type === "text") {
    // Setting up the initial data
    if (!InteractionManager.currentEvent) {
      InteractionManager.currentEvent = {
        type: data.eventType,
        sentences: data.content,
        currentIndex: 0,
      };
    }

    var _InteractionManager$c = InteractionManager.currentEvent,
      currentIndex = _InteractionManager$c.currentIndex,
      sentences = _InteractionManager$c.sentences;

    if (currentIndex <= sentences.length - 1) {
      InterfaceManager.setDialogText(sentences[currentIndex]);
      InterfaceManager.toggleDialog(true);
    } else {
      InterfaceManager.toggleDialog(false);
      player.isInteracting = false;
      InteractionManager.currentEvent = false;
    }

    if (PlayerInputManager.keyPressed(13) && InteractionManager.currentEvent) {
      InteractionManager.currentEvent.currentIndex += 1;
    }
  }
});

_defineProperty(InteractionManager, "isInViewport", function (ox, oy) {
  return (
    ox > player.pos.x - mainc.width / 2 &&
    ox < player.pos.x + mainc.width / 2 &&
    oy > player.pos.y - mainc.height / 2 &&
    oy < player.pos.y + mainc.height / 2
  );
});

var PlayerInputManager = function PlayerInputManager() {
  "use strict";

  _classCallCheck(this, PlayerInputManager);
};

_defineProperty(PlayerInputManager, "init", function () {
  window.addEventListener("keydown", function (e) {
    PlayerInputManager.keysDown = PlayerInputManager.keysDown || [];
    PlayerInputManager.keysDown[e.keyCode] = e.type === "keydown";
  });
  window.addEventListener("keyup", function (e) {
    PlayerInputManager.keysPressed = PlayerInputManager.keysPressed || [];
    if (PlayerInputManager.keysDown)
      PlayerInputManager.keysDown[e.keyCode] = e.type === "keydown";
    PlayerInputManager.keysPressed[e.keyCode] = {
      timestamp: Date.now(),
      used: false,
    };
  });
});

_defineProperty(PlayerInputManager, "isKeyDown", function (keyCode) {
  return PlayerInputManager.keysDown && PlayerInputManager.keysDown[keyCode];
});

_defineProperty(PlayerInputManager, "keyPressed", function (keyCode) {
  if (
    PlayerInputManager.keysPressed &&
    PlayerInputManager.keysPressed[keyCode]
  ) {
    var key = PlayerInputManager.keysPressed[keyCode]; // Prevent unused keys from sticking around more than a frame

    var used = Date.now() - key.timestamp > 1000 / 60 ? true : key.used; // Running throught this function means that the key is marked as used

    PlayerInputManager.keysPressed[keyCode].used = true;
    return !used;
  }

  return false;
});

_defineProperty(PlayerInputManager, "update", function () {
  // Decide what the player inputs should be used for
  if (player.isInteracting) {
    InteractionManager.handleInteraction();
  } else {
    player.controls();
  }
});

var InterfaceManager = function InterfaceManager() {
  "use strict";

  _classCallCheck(this, InterfaceManager);
};

_defineProperty(InterfaceManager, "init", function () {
  InterfaceManager.gameWrapper = document.querySelector("#main-wrapper");
  InterfaceManager.dialogContainer = document.getElementById("dialogContainer");
  InterfaceManager.dialogText = document.getElementById("dialogText");
});

_defineProperty(InterfaceManager, "toggleLoading", function (shouldShow) {
  shouldShow
    ? InterfaceManager.gameWrapper.classList.add("loading")
    : InterfaceManager.gameWrapper.classList.remove("loading");
});

_defineProperty(InterfaceManager, "setDialogText", function (text) {
  InterfaceManager.dialogText.textContent = text;
});

_defineProperty(InterfaceManager, "toggleDialog", function (shouldShow) {
  shouldShow
    ? InterfaceManager.dialogContainer.classList.add("showDialog")
    : InterfaceManager.dialogContainer.classList.remove("showDialog");
});

var Character =
  /*#__PURE__*/
  (function () {
    "use strict";

    function Character(xpos, ypos, dir, offset) {
      _classCallCheck(this, Character);

      // Initial position of character is assigned in main
      this.pos = {
        x: xpos,
        y: ypos,
      }; // Velocity is initialized to 0 in both directions

      this.vel = {
        x: 0,
        y: 0,
      };
      this.dir = dir;
      this.offset = offset;
      this.w = PokemonGame.getDimensions().tileSize;
      this.h = PokemonGame.getDimensions().tileSize;
    } // ox = "other" x; oy = "other" y; num = map location (map layer => x => y)

    _createClass(Character, [
      {
        key: "intersects",
        value: function intersects(ox, oy, num) {
          // Multiply the x and y by tilesize to get coordinates
          var ts = PokemonGame.getDimensions().tileSize;
          ox *= ts;
          oy *= ts;

          if (InteractionManager.isInViewport(ox, oy)) {
            var tm = this.offset;
            var om = InteractionManager.getTileMargin(num);
            return (
              this.pos.x + this.w - tm.right - om.left > ox &&
              this.pos.x + tm.left + om.right < ox + ts &&
              this.pos.y + this.h - tm.bottom - om.top > oy &&
              this.pos.y + tm.top + om.bottom < oy + ts
            );
          }
        },
      },
      {
        key: "render",
        value: function render(src, ypos, midx, midy) {
          var ts = PokemonGame.getDimensions().tileSize;
          this.update();
          mainctx.drawImage(
            src,
            ts * ypos + ypos,
            ts * this.dir + this.dir,
            this.w,
            this.h,
            midx,
            midy,
            this.w,
            this.h
          );
        },
      },
      {
        key: "update",
        value: function update() {
          var diff = PokemonGame.getDelta().difference;
          var disx = diff * this.vel.x;
          var disy = diff * this.vel.y;
          this.pos.x += disx;
          this.pos.y += disy;
        },
      },
    ]);

    return Character;
  })();

var Player =
  /*#__PURE__*/
  (function (_Character) {
    "use strict";

    _inherits(Player, _Character);

    function Player(data) {
      var _this;

      _classCallCheck(this, Player);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(Player).call(
          this,
          data.xpos,
          data.ypos,
          data.dir,
          data.offset
        )
      );
      _this.moveSpeed = 100;
      _this.isInteracting = false;
      _this.animationStep = 1;
      _this.counter = 1;
      _this.now = 0;
      _this.then = 0;
      return _this;
    }

    _createClass(Player, [
      {
        key: "controls",
        value: function controls() {
          // Velocity reset
          this.vel = {
            x: 0,
            y: 0,
          };
          this.moveSpeed = PlayerInputManager.isKeyDown(16) ? 150 : 100;

          switch (true) {
            case PlayerInputManager.isKeyDown(38):
              this.vel.y = -this.moveSpeed;
              this.dir = 1;
              break;

            case PlayerInputManager.isKeyDown(40):
              this.vel.y = this.moveSpeed;
              this.dir = 3;
              break;

            case PlayerInputManager.isKeyDown(37):
              this.vel.x = -this.moveSpeed;
              this.dir = 0;
              break;

            case PlayerInputManager.isKeyDown(39):
              this.vel.x = this.moveSpeed;
              this.dir = 2;
              break;
          }

          if (PlayerInputManager.isKeyDown(69)) {
            var tileObjects = PokemonGame.getTileObjects();

            for (var obj in tileObjects) {
              var dimensions = PokemonGame.getDimensions();
              var tile = tileObjects[obj];
              var x = tile.pos.x * dimensions.tileSize;
              var y = tile.pos.y * dimensions.tileSize;
              if (InteractionManager.isInViewport(x, y)) this.interact(tile);
            }
          }
        },
      },
      {
        key: "collision",
        value: function collision() {
          var dimensions = PokemonGame.getDimensions();
          var ts = dimensions.tileSize;
          var po = this.offset;

          for (var y = 0; y < dimensions.cols; y++) {
            for (var x = 0; x < dimensions.rows; x++) {
              // NB: Value 1 is referring to object-tiles array in maps
              var tileID = GameMapData.startWorld[1][y][x];
              var tm = InteractionManager.getTileMargin(tileID);

              if (this.intersects(x, y, tileID)) {
                if (tileID > 0) {
                  switch (this.dir) {
                    case 0:
                      this.pos.x = x * ts + ts - po.left - tm.right;
                      this.vel.x = 0;
                      break;

                    case 1:
                      this.pos.y = y * ts + ts - po.top - tm.bottom;
                      this.vel.y = 0;
                      break;

                    case 2:
                      this.pos.x = x * ts - ts + po.right + tm.left;
                      this.vel.x = 0;
                      break;

                    case 3:
                      this.pos.y = y * ts - ts + po.bottom + tm.top;
                      this.vel.y = 0;
                      break;
                  }
                }
              }
            }
          }
        },
      },
      {
        key: "interact",
        value: function interact(tile) {
          var objx = tile.pos.x;
          var objy = tile.pos.y;
          var offset = 0.2; // Check if player is next to object and facing it
          // Offset is used to expand interactive field beyond object hitbox

          if (
            (this.intersects(objx - offset, objy, tile.id) && this.dir === 2) || // Left
            (this.intersects(objx, objy - offset, tile.id) && this.dir === 3) || // Over
            (this.intersects(objx + offset, objy, tile.id) && this.dir === 0) || // Right
            (this.intersects(objx, objy + offset, tile.id) && this.dir === 1) // Under
          ) {
            InteractionManager.handleInteraction({ ...tile });
          }
        },
      },
      {
        key: "render",
        value: function render() {
          var _this2 = this;

          var xpos; // Middle xpos and ypos of canvas

          var midx = mainc.width / 2 - this.w / 2;
          var midy = mainc.height / 2 - this.h / 2; // Boolean value for no player movement

          var standStill = this.vel.x === 0 && this.vel.y === 0; // Handles run animation and returns a number as xpos

          var runDraw = function runDraw() {
            _this2.now = Date.now(); // Formula for when next step of animation should be shown

            if (_this2.now - _this2.then > 10000 / _this2.moveSpeed) {
              _this2.then = _this2.now;
              _this2.animationStep += _this2.counter; // Alternate the frame order every time

              if (_this2.animationStep > 2 || _this2.animationStep < 0) {
                _this2.counter *= -1;
                _this2.animationStep += _this2.counter;
              }
            }

            return _this2.animationStep;
          };

          standStill ? (xpos = 1) : (xpos = runDraw()); // Draws character to the middle of canvas using image sheet, where xpos
          // determines which frame player is drawn from (xpos 1 = standing still)

          _get(_getPrototypeOf(Player.prototype), "render", this).call(
            this,
            PokemonGame.getImageByName("mainCharacter"),
            xpos,
            midx,
            midy
          );
        },
      },
      {
        key: "update",
        value: function update() {
          _get(_getPrototypeOf(Player.prototype), "update", this).call(this);

          this.collision();
        },
      },
    ]);

    return Player;
  })(Character);

var Tile = function Tile(xpos, ypos, tileID, eventType, content) {
  "use strict";

  _classCallCheck(this, Tile);

  this.pos = {
    x: xpos,
    y: ypos,
  };
  this.id = tileID;
  this.eventType = eventType;
  this.content = content;
};

var refc = document.getElementById("referenceCanvas");
var mainc = document.getElementById("mainCanvas");
var refctx = refc.getContext("2d");
var mainctx = mainc.getContext("2d");
var player;

function gameLoop() {
  PokemonGame.render();
  PlayerInputManager.update();
  player.render();

  if (!PokemonGame.isPaused()) {
    requestAnimationFrame(gameLoop);
  }
}

function setup() {
  GameMapData.init();
  PlayerInputManager.init();
  InteractionManager.init();
  InterfaceManager.init();
  PokemonGame.init();
  player = new Player(PokemonGame.getPlayerConfig());
  PokemonGame.loadImages(function () {
    PokemonGame.drawReferenceCanvas();
    InterfaceManager.toggleLoading(false);
    requestAnimationFrame(gameLoop);
  });
}

window.addEventListener("DOMContentLoaded", function () {
  return setup();
});
