var Player = function () {

  MAX_LEVEL = 2;

  this.object = new createjs.Container();
  this.image = new createjs.Bitmap(preloader.get('playerPlane'));
  this.object.addChild(this.image);
  this.object.scaleX = 1;
  this.object.scaleY = 1;
  this.object.x = 20;
  this.object.y = ((game.height / 2) - (this.image.image.height / 2));
  this.hp = 40;
  this.moving = {
    left: false,
    right: false,
    up: false,
    down: false,
  };
  this.fireHeld = false;
  this.lastTimeFired = 0;
  this.level = 1;
  this.weapons = [];
  this.weaponSlots = [
    [
      {
        x: this.object.x + 50,
        y: this.object.y,
      }
    ],
    [
      {
        x: this.object.x,
        y: this.object.y - 10,
      },
      {
        x: this.object.x,
        y: this.object.y + 10,
      }
    ]
  ];

  this.setWeapons = function () {
    this.weapons = [];
    var i;
    for (i = 0; i < this.weaponSlots[this.level - 1].length; ++i) {
      var weaponSlot = this.weaponSlots[this.level - 1];
      var j;
      for (j = 0; j < weaponSlot.length; ++j) {
        var slot = weaponSlot[j];
        var weapon = new Weapon(this.level, slot.x, slot.y);
        this.weapons.push(weapon);
      }
    }
  }

  this.setLevel = function (level) {
    this.level = level;
    this.setWeapons();
  }

  this.levelUp = function () {
    this.level++;

    if (this.level > MAX_LEVEL) {
      this.level = MAX_LEVEL;
    }

    this.setWeapons();
  }

  this.shoot = function () {
    // Check if we can fire
    if (this.lastTimeFired < new Date().getTime() - 150) {
      var i;
      for (i = 0; i < this.weapons.length; ++i) {
        var weapon = this.weapons[i];
        weapon.shoot();
      }

      this.lastTimeFired = new Date().getTime();
    }
  }

  this.takeDamage = function (damage) {
    this.hp -= damage;
    this.setLevel(1);
    new Explosion(this.object.x, this.object.y);
  }

  this.kill = function () {

  }

  this.update = function () {
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

    if (this.object.x >= (game.width - this.image.image.width)) {
      this.object.x = game.width - this.image.image.width;
    }

    if (this.object.y <= 0) {
      this.object.y = 0;
    }

    if (this.object.y >= (game.height - this.image.image.height)) {
      this.object.y = game.height - this.image.image.height;
    }

    if (this.fireHeld) {
      this.shoot();
    }

    this.updateBullets();
    this.updateWeapons();
  }

  this.updateBullets = function () {
    var i;
    for (i = 0; i < game.bulletLayer.entities.length; ++i) {
      var bullet = game.bulletLayer.entities[i];
      bullet.update();
    }
  };

  this.updateWeapons = function () {
    var i;
    for (i = 0; i < this.weapons.length; ++i) {
      var weapon = this.weapons[i];
      weapon.update(this.object.x, this.object.y);
    }
  }

  this.setWeapons();
};
