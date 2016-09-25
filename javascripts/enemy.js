var Enemy = function (group, data) {
  var keys = Object.keys(data);
  var i;
  for (i = 0; i < keys.length; ++i) {
    this[keys[i]] = data[keys[i]];
  }
  this.x = game.width;
  this.attributes = new OrbEnemy(this.x, this.y);

  this.object = new createjs.Bitmap(preloader.get(this.attributes.sprite));
  this.object.x = this.x;
  this.object.y = this.y;
  this.group = group;
  this.angle = this.angle * Math.PI / 180;
  this.weapons = [];
  this.shootingInterval = Math.random() * 20;

  this.update = function () {
    this.object.vx = Math.cos(this.angle) * this.speed;
    this.object.vy = Math.sin(this.angle) * this.speed;

    this.object.x += this.object.vx * 33 / 1000;
    this.object.y += this.object.vy * 33 / 1000;

    this.shootingInterval -= 0.1;
    if (this.shootingInterval <= 0) {
      this.shoot();
      this.shootingInterval = Math.random() * 40;
    }

    if (this.object.x < -50 || this.object.y < -50 || this.object.y > game.height + 50 || this.object.x > game.width + 50) {
      this.destroy();
      return;
    }

    this.updateWeapons();
  }

  this.setWeapons = function () {
    this.weapons = [];
    var i;
    for (i = 0; i < this.attributes.weaponSlots.length; ++i) {
      var slot = this.attributes.weaponSlots[i];
      var weapon = new Weapon(slot.level, slot, false);
      this.weapons.push(weapon);
    }
  }
  this.setWeapons();

  this.shoot = function () {
    var i;
    for (i = 0; i < this.weapons.length; ++i) {
      var weapon = this.weapons[i];
      weapon.shoot();
    }
  }

  this.takeDamage = function () {
    this.attributes.hp -= 1;

    if (this.attributes.hp === 0) {
      this.kill();
    }
  }

  this.kill = function () {
    game.updateScore(this.attributes.value);
    // update the enemy attributes in the group
    // to show that it was killed
    var index = game.level.spawnedEnemyGroups[this.group.id].findIndex(function (enemy) {
      return enemy.object.id === this.object.id;
    }.bind(this));

    game.level.spawnedEnemyGroups[this.group.id][index].killed = true;

    // if this group gives a power up
    if (this.group.givePowerUp) {
      // if this is the last one of the group
      if (index === this.group.enemyCount - 1) {
        // Check if all were killed by the player
        var givePowerUp = true;
        var i;
        for (i = 0; i < this.group.enemyCount - 1; ++i) {
          var enemy = game.level.spawnedEnemyGroups[this.group.id][i];
          if ( ! enemy.killed) {
            givePowerUp = false;
          }
        }

        if (givePowerUp) {
          new PowerUp(this.object.x, this.object.y);
        }
      }
    }

    this.destroy();
  }

  this.destroy = function () {
    game.enemiesLayer.removeChild(this);
    // console.log(this.group.enemies.length);
  }

  this.updateWeapons = function () {
    var i;
    for (i = 0; i < this.weapons.length; ++i) {
      var weapon = this.weapons[i];
      weapon.update(this.object.x, this.object.y);
    }
  }
}
