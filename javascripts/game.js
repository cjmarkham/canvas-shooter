var Game = function () {
  this.stage;
  this.canvas;
  this.width;
  this.height;
  this.paused = false;
  this.player;
  this.ticks = 0;
  this.score = 0;
  this.debugMode = location.href.indexOf('gonestatic') !== -1 || location.href.indexOf('carlmarkham') !== -1

  this.init = function () {
    this.canvas = document.getElementById('main-canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.stage = new createjs.Stage(this.canvas);

    this.player = new Player();

    this.playerLayer = new Layer();
    this.enemiesLayer = new Layer();
    this.playerBulletLayer = new Layer();
    this.enemyBulletLayer = new Layer();
    this.explosionLayer = new Layer();
    this.powerupsLayer = new Layer();
    this.orbsLayer = new Layer();

    this.playerLayer.addChild(this.player);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', this.tick.bind(this));
    document.addEventListener('keydown', this.keyDown.bind(this));
    document.addEventListener('keyup', this.keyUp.bind(this));

    this.stage.addChild(
      this.playerLayer.container,
      this.enemiesLayer.container,
      this.playerBulletLayer.container,
      this.enemyBulletLayer.container,
      this.powerupsLayer.container,
      this.orbsLayer.container,
      this.explosionLayer.container
    );

    this.level = new Level(1);
    this.level.start();
  }

  this.keyDown = function (e) {
    // P pressed
    if (e.keyCode === 80) {
      this.paused = ! this.paused;
    }

    switch (e.keyCode) {
      case 37:
        this.player.moving.left = true;
        this.player.moving.right = false;
        break;
      case 38:
        this.player.moving.up = true;
        this.player.moving.down = false;
        break;
      case 39:
        this.player.moving.right = true;
        this.player.moving.left = false;
        break;
      case 40:
        this.player.moving.down = true;
        this.player.moving.up = false;
        break;
      case 32:
        this.player.fireHeld = true;
        break;
    }
  };

  this.keyUp = function (e) {
    switch (e.keyCode) {
      case 37:
        this.player.moving.left = false;
        break;
      case 38:
        this.player.moving.up = false;
        break;
      case 39:
        this.player.moving.right = false;
        break;
      case 40:
        this.player.moving.down = false;
        break;
      case 32:
        this.player.fireHeld = false;
        break;
    }
  };

  this.tick = function () {
    if (this.paused) {
      return;
    }

    this.ticks++;

    this.player.update();
    this.level.update();
    this.stage.update();
    this.enemiesLayer.update();

    $('#fps span').text(Math.floor(createjs.Ticker.getMeasuredFPS()));
  }

  this.updateScore = function (number) {
    this.score += number;
    document.getElementById('score').innerText = Utils.pad(this.score, 8);
  }
};
