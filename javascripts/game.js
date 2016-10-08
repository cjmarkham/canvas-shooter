var Game = function () {
  this.stage = null;
  this.canvas = null;
  this.width = 1024;
  this.height = 650;
  this.paused = false;
  this.player = null;
  this.ticks = 0;
  this.score = 0;
  this.money = 1000;
  this.levelIndex = 0;
  this.ui = null;
  this.shop = null;
  // this.debugMode = location.href.indexOf('gonestatic') !== -1 || location.href.indexOf('carlmarkham') !== -1;
  this.debugMode = false;
  this.cells = [];
  this.grid = new createjs.Container();
  createjs.MotionGuidePlugin.install();

  this.createGrid = function () {
    this.cellWidth = this.width / 10;
    this.cellHeight = this.height / 10;
    var rows = this.height / this.cellHeight;
    var columns = this.width / this.cellWidth;

    var x;
    var y;
    for (x = 0; x < rows; ++x) {
      for (y = 0; y < columns; ++y) {

        var cell = {
          id: this.cells.length,
          x: y * this.cellWidth,
          y: x * this.cellHeight,
          w: this.cellWidth,
          h: this.cellHeight,
        };

        if (this.debugMode) {
          var graphics = new createjs.Graphics()
            .beginStroke('red')
            .drawRect(
              y * this.cellWidth,
              x * this.cellHeight,
              this.cellWidth,
              this.cellHeight
            );
          var shape = new createjs.Shape(graphics);

          var text = new createjs.Text(
            this.cells.length, '20px Arial', '#ffffff'
          );
          text.x = cell.x;
          text.y = cell.y;
          this.stage.addChild(shape, text);
        }

        this.cells.push(cell);
      }
    }
  };

  this.init = function () {
    document.getElementById('wrapper').style.width = this.width + 'px';
    document.getElementById('wrapper').style.height = this.height + 'px';
    this.canvas = document.getElementById('main-canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.stage = new createjs.Stage(this.canvas);
    this.createGrid();

    this.playerLayer = new Layer();
    this.enemiesLayer = new Layer();
    this.playerBulletLayer = new Layer();
    this.playerSpecialLayer = new Layer();
    this.enemyBulletLayer = new Layer();
    this.explosionLayer = new Layer();
    this.powerupsLayer = new Layer();
    this.orbsLayer = new Layer();
    this.backgroundLayer = new Layer();

    this.ui = new Ui();
    this.ui.init();
    this.input = new Input();
    this.player = new Player();

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', this.tick.bind(this));
    $(document.body).on('keydown', this.input.keyPress.bind(this.input));
    $(document.body).on('keyup', this.input.keyPress.bind(this.input));

    this.stage.addChild(
      this.backgroundLayer.container,
      this.playerLayer.container,
      this.enemiesLayer.container,
      this.playerBulletLayer.container,
      this.playerSpecialLayer.container,
      this.enemyBulletLayer.container,
      this.powerupsLayer.container,
      this.orbsLayer.container,
      this.explosionLayer.container
    );

    this.shop = new Shop();
    this.shop.render();
  };

  this.loadLevel = function () {
    this.playerLayer.addChild(this.player);
    this.level = new Level(this.levelIndex);
    this.level.load();
  };

  this.nextLevel = function () {
    this.levelIndex++;
    if ( ! levels[this.levelIndex]) {
      return;
    }
    this.loadLevel();
  };

  this.tick = function () {
    if (this.paused) {
      return;
    }

    this.ticks++;

    if ( ! this.player.dead) {
      this.player.update();
    }
    if (this.level) {
      this.level.update();
      this.enemiesLayer.update();
    }
    this.stage.update();

    $('#fps span').text(Math.floor(createjs.Ticker.getMeasuredFPS()));
  };

  this.updateScore = function (number) {
    this.score += number;
    this.ui.updateScore();
  };

  this.updateMoney = function (number) {
    this.money += number;
    this.ui.updateMoney();
  };

  this.gameOver = function () {
    setTimeout(function () {
      this.ui.renderGameOver();
      this.reset();
    }.bind(this), 2000);
  };

  this.reset = function () {
    this.paused = false;
    this.ticks = 0;
    this.score = 0;
    this.levelIndex = 0;
  };
};
