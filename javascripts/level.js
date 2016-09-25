var Level = function (levelNumber) {
  this.levelNumber = levelNumber;
  this.background = document.getElementById('background-canvas');
  this.backgroundContext = this.background.getContext('2d');
  this.stars = [];
  this.starColors = ['#555', '#aaa', '#fff'];
  this.starSpeeds = [2, 4, 8];
  this.timer = 0;
  this.enemyGroupsData = [];
  this.enemyGroups = [];
  this.spawnedEnemyGroups = {};
  this.levelTimer = 0;

  this.start = function () {
    this.initBackground();
    this.enemyGroupsData = levels[levelNumber - 1];

    this.createEnemyGroups();

    this.levelTimerInterval = setInterval(function () {
      // used for enemy spawn timing
      this.levelTimer += 0.5;
      if (game.debugMode) {
        $('#timer span').text(this.levelTimer);
      }
    }.bind(this), 500);
  }

  this.complete = function () {
    clearInterval(this.levelTimer);
  }

  this.createEnemyGroups = function () {
    var i;
    var totalEnemies = 0;
    for (i = 0; i < this.enemyGroupsData.length; ++i) {
      var enemyGroupData = this.enemyGroupsData[i];
      var group = new EnemyGroup(enemyGroupData);
      this.enemyGroups.push(group);

      totalEnemies += group.enemies.length;
    }

    if (game.debugMode) {
      $('#enemies span').text(totalEnemies);
    }
  }

  this.spawnEnemies = function () {
    var i;
    for (i = 0; i < this.enemyGroups.length; ++i) {
      var group = this.enemyGroups[i];
      var enemies = group.enemies;

      if ( ! enemies.length) {
        this.enemyGroups.splice(i, 1);
        return;
      }

      var j;
      for (j = 0; j < enemies.length; ++j) {
        var enemy = enemies[j];

        if (enemy.spawnTime === this.levelTimer) {
          game.enemiesLayer.addChild(enemy);
          enemies.shift();

          if ( ! this.spawnedEnemyGroups.hasOwnProperty(group.id)) {
            this.spawnedEnemyGroups[group.id] = [];
          }
          this.spawnedEnemyGroups[group.id].push(enemy);
        }
      }
    }
  }

  this.updateExplosions = function () {
    var i;
    for (i = 0; i < game.explosionLayer.entities.length; ++i) {
      var explosion = game.explosionLayer.entities[i];
      explosion.update();
    }
  }

  this.update = function () {
    this.spawnEnemies();
    this.updateBackground();
    this.updateExplosions();
    this.checkCollisions();
    this.updateBullets();
    this.updatePowerups();
  }

  this.updatePowerups = function () {
    var i;
    for (i = 0; i < game.powerupsLayer.entities.length; ++i) {
      var powerup = game.powerupsLayer.entities[i];
      powerup.update();
    }
  }

  this.updateBullets = function () {
    var i;
    for (i = 0; i < game.playerBulletLayer.entities.length; ++i) {
      var bullet = game.playerBulletLayer.entities[i];
      bullet.update();
    }

    var j;
    for (j = 0; j < game.enemyBulletLayer.entities.length; ++j) {
      var bullet = game.enemyBulletLayer.entities[j];
      bullet.update();
    }
  }

  this.initBackground = function () {
    this.background.width = game.width;
    this.background.height = game.height;
    var i;
    for (i = 0; i < 250; ++i) {
      var randomNumber = Math.floor(Math.random() * 3);
      var star = {
        x: Math.floor(Math.random() * game.width),
        y: Math.floor(Math.random() * game.height),
        speed: this.starSpeeds[randomNumber],
      }
      this.stars.push(star);
    }
  }

  this.updateBackground = function () {
    this.backgroundContext.fillStyle = 'black';
    this.backgroundContext.fillRect(0, 0, game.width, game.height);

    var i;
    for (i = 0; i < this.stars.length; ++i) {
      var star = this.stars[i];
      star.x -= star.speed;

      if (star.x <= 0) {
        star.x = game.width;
        star.y = Math.floor(Math.random() * game.height);
      }

      var randomNumber = Math.floor(Math.random() * 3);
      this.backgroundContext.fillStyle = this.starColors[randomNumber];
      this.backgroundContext.fillRect(star.x, star.y, 1, 1);
    }
  }

  this.checkCollisions = function () {
    // check enemy collisions with the player
    var i;
    for (i = 0; i < game.enemiesLayer.entities.length; ++i) {
      var enemy = game.enemiesLayer.entities[i];

      if ( ! game.player.respawning) {
        if (ndgmr.checkPixelCollision(enemy.object, game.player.object)) {
          new Explosion(enemy.object.x, enemy.object.y);
          game.player.takeDamage();
          enemy.kill();
        }
      }

      // check player bullet collisions with the enemy
      var j;
      for (j = 0; j < game.playerBulletLayer.entities.length; ++j) {
        var bullet = game.playerBulletLayer.entities[j];

        if (bullet.x > game.width) {
          continue;
        }

        if (ndgmr.checkPixelCollision(bullet.object, enemy.object)) {
          new Explosion(enemy.object.x, enemy.object.y);
          enemy.kill();
          bullet.kill();
        }
      }

      if (game.player.orb) {
        // Check enemy collisions with player orbs
        if (ndgmr.checkPixelCollision(enemy.object, game.player.orb.object)) {
          new Explosion(game.player.orb.object.x, game.player.orb.object.y);
          game.player.orb.kill();
          enemy.kill();
        }
      }
    }

    // check enemy bullet collisions with the player
    var k;
    for (k = 0; k < game.enemyBulletLayer.entities.length; ++k) {
      var bullet = game.enemyBulletLayer.entities[k];

      if ( ! game.player.respawning) {
        if (ndgmr.checkPixelCollision(bullet.object, game.player.object)) {
          new Explosion(game.player.object.x, game.player.object.y);
          game.player.takeDamage(10);
          bullet.kill();
        }
      }

      // check enemy bullet collisions with player orbs
      if (game.player.orb) {
        if (ndgmr.checkPixelCollision(bullet.object, game.player.orb.object)) {
          new Explosion(game.player.orb.object.x, game.player.orb.object.y);
          game.player.orb.kill();
        }
      }
    }

    // check player collisions with powerups
    var k;
    for (j = 0; j < game.powerupsLayer.entities.length; ++j) {
      var powerup = game.powerupsLayer.entities[j];

      if ( ! game.player.respawning) {
        if (ndgmr.checkPixelCollision(powerup.object, game.player.object)) {
          powerup.collect();
        }
      }
    }
  }
}
