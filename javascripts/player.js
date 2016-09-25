var Player = function () {

  MAX_LEVEL = 5;

  this.object = new createjs.Bitmap(preloader.get('playerPlane'));

  // var spritesheet = new createjs.SpriteSheet({
  //   images: [preloader.get('explosion')],
  //   frames: {
  //     width: 128,
  //     height: 128,
  //     regX: 64,
  //     regY: 64,
  //     count: 72,
  //   },
  //   animations: {
  //     explode: [0, 71, false, 1],
  //   },
  // });

  // this.object = new createjs.Sprite(spritesheet, 'explode');

  this.object.scaleX = 1;
  this.object.scaleY = 1;
  this.object.x = 20;
  this.object.y = ((game.height / 2) - (this.object.image.height / 2));
  this.hp = 1;
  this.moving = {
    left: false,
    right: false,
    up: false,
    down: false,
  };
  this.fireHeld = false;
  this.lastTimeFired = 0;
  this.level = 1;
  this.controllable = true;
  this.orb = undefined;
  this.weapon = new Weapon(this, true);
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

    this.weapon = new Weapon(this, true);
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
      this.weapon.shoot();

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
      this.object.y = (game.height / 2) - (this.object.image.height / 2);

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
      } else if (this.moving.down) {
        this.object.y += 10;
      }

      if (this.object.x <= 0) {
        this.object.x = 0;
      }

      if (this.object.x >= (game.width - this.object.image.width)) {
        this.object.x = game.width - this.object.image.width;
      }

      if (this.object.y <= 0) {
        this.object.y = 0;
      }

      if (this.object.y >= (game.height - this.object.image.height)) {
        this.object.y = game.height - this.object.image.height;
      }

      if (this.fireHeld) {
        this.shoot();
      }

      if (this.orb) {
        this.orb.update();
      }
      this.weapon.update(this.object.x, this.object.y);
    }
  }
};
