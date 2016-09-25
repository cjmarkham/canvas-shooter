var Player = function () {

  MAX_LEVEL = 2;

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
  this.orbs = [];
  this.weapons = [];
  this.weaponSlots = [
    [
      {
        x: 50,
        y: 0,
      }
    ],
    [
      {
        x: 0,
        y: -10,
      },
      {
        x: 0,
        y: 10,
      }
    ]
  ];
  this.respawning = false;

  this.setWeapons = function () {
    this.weapons = [];
    var i;
    for (i = 0; i < this.weaponSlots[this.level - 1].length; ++i) {
      var weaponSlot = this.weaponSlots[this.level - 1];
      var j;
      for (j = 0; j < weaponSlot.length; ++j) {
        var slot = weaponSlot[j];
        var weapon = new Weapon(this, slot, true);
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

    if (this.level === 3) {
      this.addOrb();
    } else {
      this.setWeapons();
    }
  }

  this.addOrb = function () {
    if (this.orbs.length === 1) {
      return;
    }

    var orb = new Orb(this.object.x, this.object.y);
    this.orbs.push(orb);
  };

  this.shoot = function () {
    // Check if we can fire
    if (this.lastTimeFired < new Date().getTime() - 150) {
      var i;
      for (i = 0; i < this.weapons.length; ++i) {
        var weapon = this.weapons[i];
        weapon.shoot();
      }

      if (this.orbs.length) {
        var j;
        for (j = 0; j < this.orbs.length; ++j) {
          var orb = this.orbs[j];
          orb.shoot();
        }
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

      this.updateWeapons();
      this.updateOrbs();
    }
  }

  this.updateOrbs = function () {
    var i;
    for (i = 0; i < this.orbs.length; ++i) {
      var orb = this.orbs[i];
      orb.update();
    }
  }

  this.updateWeapons = function () {
    var i;
    for (i = 0; i < this.weapons.length; ++i) {
      var weapon = this.weapons[i];
      weapon.update(this.object.x, this.object.y);
    }
  }

  this.setWeapons();
};
