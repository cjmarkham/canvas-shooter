var Player = function () {

  MAX_LEVEL = 5;

  this.object = new createjs.Bitmap(preloader.get('playerPlane1'));
  this.width = this.object.image.width;
  this.height = this.object.image.height;
  this.object.x = this.width / 2;
  this.object.y = (game.height / 2) - (this.height / 2);
  this.lives = 3;
  this.inRespawnAnimation = false;
  this.moving = {
    left: false,
    right: false,
    up: false,
    down: false,
  };
  this.fireHeld = false;
  this.lastTimeFired = 0;
  this.level = 1;
  this.controllable = false;
  this.orb = undefined;
  this.respawning = false;
  this.starting = false;
  this.dead = false;
  this.weapon = new Weapon();
  this.special = null;

  this.setLevel = function (level) {
    this.level = level;
  };

  this.powerUp = function () {
    this.level++;

    if (this.level > MAX_LEVEL) {
      this.level = MAX_LEVEL;
    }

    if (this.level === 3) {
      this.addOrb();
    }
  };

  this.addOrb = function () {
    if (this.orb) {
      return;
    }

    this.orb = new Orb(this.object.x, this.object.y);
  };

  this.shoot = function () {
    this.weapon.shoot();
  };

  this.shootSpecial = function () {
    if ( ! this.controllable || this.respawning) {
      return;
    }
    this.special.shoot();
  };

  this.takeDamage = function (damage) {
    if (this.orb) {
      this.orb.kill();
    }

    this.kill();
  };

  this.kill = function () {
    this.lives--;

    if (this.lives === 0) {
      this.dead = true;
      game.playerLayer.removeChild(this);
      game.gameOver();
      return;
    }

    this.setLevel(1);
    this.controllable = false;
    this.object.x = -150;
    this.inRespawnAnimation = true;
    setTimeout(function () {
      this.respawning = true;
    }.bind(this), 1000);
  };

  this.update = function () {
    if (this.respawning || this.starting) {
      if (this.respawning) {
        this.object.alpha = (game.ticks % 4 === 0) ? 1 : 0;
      }
      this.object.x += 5;
      this.object.y = (game.height / 2) - (this.height / 2);

      if (this.object.x >= 100) {
        this.object.alpha = 1;
        this.respawning = false;
        this.inRespawnAnimation = false;
        this.starting = false;
        this.controllable = true;
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

      if (this.object.x >= game.width - this.width) {
        this.object.x = game.width - this.width;
      }

      if (this.object.y <= (this.height / 2) + 100) {
        this.object.y = (this.height / 2) + 100;
      }

      if (this.object.y >= game.height - this.height) {
        this.object.y = game.height - this.height;
      }

      if (this.fireHeld) {
        this.shoot();
      }

      if (this.orb) {
        this.orb.update();
      }
    }
  };
};
