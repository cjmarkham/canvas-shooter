var Player = function () {

  MAX_LEVEL = 5;

  this.width = 480 * .3;
  this.height = 256 * .3;

  var spritesheet = new createjs.SpriteSheet({
    images: [preloader.get('playerPlane3')],
    frames: {
      width: 480,
      height: 256,
      regX: 241,
      regY: 128,
      count: 5,
    },
    animations: {
      up: [0, 0, 'normal', 1],
      normal: 2,
      down: [4, 4, 'normal', 1]
    },
  });
  this.object = new createjs.Sprite(spritesheet, 'normal');

  this.object.scaleX = .3;
  this.object.scaleY = .3;
  this.object.x = this.width / 2;
  this.object.y = ((game.height / 2) - (this.height / 2));
  this.hp = 1;
  this.moving = {
    left: false,
    right: false,
    up: false,
    down: false,
  };
  this.fireHeld = false;
  this.lastTimeFired = 0;
  this.level = 2;
  this.controllable = true;
  this.orb = undefined;
  this.respawning = false;

  this.setLevel = function (level) {
    this.level = level;
  }

  this.levelUp = function () {
    this.level++;

    if (this.level > MAX_LEVEL) {
      this.level = MAX_LEVEL;
    }

    if (this.level === 3) {
      this.addOrb();
    }
  }

  this.addOrb = function () {
    if (this.orb) {
      return;
    }

    this.orb = new Orb(this.object.x, this.object.y);
  };

  this.shoot = function () {
    // Check if we can fire
    if (this.lastTimeFired < new Date().getTime() - 150) {
      new PlayerBullet(this);

      if (this.orb) {
        this.orb.shoot();
      }

      this.lastTimeFired = new Date().getTime();
    }
  }

  this.takeDamage = function (damage) {
    // this.hp -= damage;
    this.setLevel(1);

    // if (this.hp <= 0) {
      this.kill();
    // }
  }

  this.kill = function () {
    this.setLevel(1);
    this.controllable = false;
    this.object.x = -150;
    setTimeout(function () {
      this.respawning = true;
    }.bind(this), 1000);
  }

  this.update = function () {
    if (this.respawning) {
      this.object.alpha = (game.ticks % 4 === 0) ? 1 : 0;
      this.object.x += 5;
      this.object.y = (game.height / 2) - (this.height / 2);

      if (this.object.x >= 100) {
        this.object.alpha = 1;
        this.respawning = false
        this.controllable = true;
        // this.hp = 1;
      }
    }

    if (this.controllable) {
      if (this.moving.left) {
        this.object.x -= 10;
      } else if (this.moving.right) {
        this.object.x += 10;
      }

      if (this.moving.up) {
        this.object.y -= 10;
        this.object.gotoAndPlay('up');
      } else if (this.moving.down) {
        this.object.y += 10;
        this.object.gotoAndPlay('down');
      }

      if (this.object.x <= this.width / 2) {
        this.object.x = this.width / 2;
      }

      if (this.object.x >= (game.width - this.width)) {
        this.object.x = game.width - this.width;
      }

      if (this.object.y <= this.height / 2) {
        this.object.y = this.height / 2;
      }

      if (this.object.y >= game.height - (this.height / 2)) {
        this.object.y = game.height - (this.height / 2);
      }

      if (this.fireHeld) {
        this.shoot();
      }

      if (this.orb) {
        this.orb.update();
      }
    }
  }
};
