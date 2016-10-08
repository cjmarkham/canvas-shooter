var Level = function (levelNumber) {
  this.levelNumber = levelNumber;
  this.background = document.getElementById('background-canvas');
  this.backgroundContext = this.background.getContext('2d');
  this.background.width = game.width;
  this.background.height = game.height;
  this.timer = 0;
  this.enemyGroupsData = [];
  this.enemyGroups = [];
  this.spawnedEnemyGroups = {};
  this.levelTimer = 0;
  this.levelData = {};
  this.enemiesSpawned = 0;
  this.bgmInstance = undefined;
  this.soundEffects = {};
  this.enemiesKilled = 0;
  this.isComplete = false;
  this.started = false;

  this.load = function () {
    console.log('Level:Load');
    if ( ! game.debugMode) {
      // var config = new createjs.PlayPropsConfig().set({
      //   loop: -1,
      // });
      // this.bgmInstance = createjs.Sound.play('level-' + this.levelNumber + '-bgm', config);
      // this.bgmInstance.volume = 0.3;
    }

    game.ui.updateSpecialAmmo(game.player.special.attributes.ammo);
    game.ui.renderOpeningLevelText();

    this.start();
  };

  this.start = function () {
    console.log('Level:Start');
    game.player.object.x = -150;
    game.player.object.y = ((game.height / 2) - (game.player.height / 2));
    game.player.starting = true;

    this.initBackground();
    this.levelData = levels[this.levelNumber];
    this.enemyGroupsData = this.levelData.groups;

    this.createEnemyGroups();

    if (game.debugMode) {
      $('#level-number span').text(this.levelNumber + 1);
    }

    this.started = true;
    game.player.starting = true;

    this.levelTimerInterval = setInterval(function () {
      // used for enemy spawn timing
      this.levelTimer += 0.5;
      if (game.debugMode) {
        $('#timer span').text(this.levelTimer);
      }
    }.bind(this), 500);
  };

  this.createEnemyGroups = function () {
    var i;
    for (i = 0; i < this.enemyGroupsData.length; ++i) {
      var enemyGroupData = this.enemyGroupsData[i];
      var group = new EnemyGroup(enemyGroupData);
      this.enemyGroups.push(group);
    }

    if (game.debugMode) {
      $('#enemies span').text(this.levelData.totalEnemies);
    }
  };

  this.calculateEndingRewards = function () {
    var points = 1000;
    var money = 1000;

    return {
      points: points,
      money: money,
    };
  };

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
          enemy.isSpawned = true;
          enemies.splice(j, 1);

          if ( ! this.spawnedEnemyGroups.hasOwnProperty(group.id)) {
            this.spawnedEnemyGroups[group.id] = [];
          }
          this.spawnedEnemyGroups[group.id].push(enemy);
          this.enemiesSpawned++;
        }
      }
    }
  };

  this.updateExplosions = function () {
    var i;
    for (i = 0; i < game.explosionLayer.entities.length; ++i) {
      var explosion = game.explosionLayer.entities[i];
      explosion.update();
    }
  };

  this.update = function () {
    this.updateBackground();
    this.updateExplosions();
    this.checkCollisions();
    this.updateBullets();
    this.updateSpecials();
    this.updatePowerups();
    this.spawnEnemies();
    this.checkLevelComplete();
  };

  this.checkLevelComplete = function () {
    if (this.levelData.hasBoss) {
      // Boss kill will trigger next level
      return;
    }

    if (this.enemiesSpawned === this.levelData.totalEnemies) {
      if (game.enemiesLayer.entities.length === 0) {
        this.complete();
      }
    }
  };

  this.completeAnimation = function () {
    game.player.controllable = false;
    game.player.object.x += 20;
  };

  this.complete = function () {
    if (game.player.inRespawnAnimation || game.player.dead) {
      return;
    }

    this.completeAnimation();

    if ( ! this.isComplete) {
      this.isComplete = true;
      game.ui.renderEndLevelStats();

      if ( ! game.debugMode) {
        this.bgmInstance.stop();
        this.levelCompleteBgm = createjs.Sound.play('level-complete-bgm');
        this.levelCompleteBgm.volume = 0.3;
      }

      setTimeout(function () {
        clearInterval(this.levelTimerInterval);
        game.nextLevel();
      }.bind(this), 6000);
    }
  };

  this.updatePowerups = function () {
    var i;
    for (i = 0; i < game.powerupsLayer.entities.length; ++i) {
      var powerup = game.powerupsLayer.entities[i];
      powerup.update();
    }
  };

  this.updateBullets = function () {
    var i;
    for (i = 0; i < game.playerBulletLayer.entities.length; ++i) {
      var playerBullet = game.playerBulletLayer.entities[i];
      playerBullet.update();
    }

    var j;
    for (j = 0; j < game.enemyBulletLayer.entities.length; ++j) {
      var enemyBullet = game.enemyBulletLayer.entities[j];
      enemyBullet.update();
    }
  };

  this.updateSpecials = function () {
    var i;
    for (i = 0; i < game.playerSpecialLayer.entities.length; ++i) {
      var special = game.playerSpecialLayer.entities[i];
      special.update();
    }
  };

  this.initBackground = function () {

  };

  this.updateBackground = function () {

  };

  this.checkCollisions = function () {
    // check enemy collisions with the player
    var i;
    for (i = 0; i < game.enemiesLayer.entities.length; ++i) {
      var enemy = game.enemiesLayer.entities[i];

      if ( ! game.player.inRespawnAnimation && ! game.player.dead) {
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
          // bullet.kill();
        }
      }

      // check special collisions with the enemy
      var specialIndex;
      for (specialIndex = 0; specialIndex < game.playerSpecialLayer.entities.length; ++specialIndex) {
        var special = game.playerSpecialLayer.entities[specialIndex];

        if (special.x > game.width) {
          continue;
        }

        if (ndgmr.checkPixelCollision(special.object, enemy.object)) {
          new Explosion(enemy.object.x, enemy.object.y);
          enemy.kill();
          if (special.attributes.destroyedOnImpact) {
            special.destroy();
          }
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
    if ( ! game.player.dead && ! game.player.inRespawnAnimation) {
      var k;
      for (k = 0; k < game.enemyBulletLayer.entities.length; ++k) {
        var enemyBullet = game.enemyBulletLayer.entities[k];

        if (ndgmr.checkPixelCollision(enemyBullet.object, game.player.object)) {
          console.log('enemy bullet collision with player');
          new Explosion(game.player.object.x, game.player.object.y);
          game.player.takeDamage(10);
          enemyBullet.kill();
        }

        // check enemy bullet collisions with player orbs
        if (game.player.orb) {
          if (ndgmr.checkPixelCollision(enemyBullet.object, game.player.orb.object)) {
            new Explosion(game.player.orb.object.x, game.player.orb.object.y);
            game.player.orb.kill();
          }
        }
      }

      // check player collisions with powerups
      var l;
      for (l = 0; l < game.powerupsLayer.entities.length; ++l) {
        var powerup = game.powerupsLayer.entities[l];

        if ( ! game.player.inRespawnAnimation) {
          if (ndgmr.checkPixelCollision(powerup.object, game.player.object)) {
            powerup.collect();
          }
        }
      }
    }
  };
};
