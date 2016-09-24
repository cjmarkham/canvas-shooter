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
  this.levelTimer = 0;

  this.start = function () {
    this.initBackground();
    this.enemyGroupsData = levels[levelNumber - 1];

    this.createEnemyGroups();

    this.levelTimerInterval = setInterval(function () {
      this.levelTimer += 0.5;
      // document.getElementById('timer').innerText = this.levelTimer;
    }.bind(this), 500);
  }

  this.complete = function () {
    clearInterval(this.levelTimer);
  }

  this.createEnemyGroups = function () {
    var i;
    for (i = 0; i < this.enemyGroupsData.length; ++i) {
      var enemyGroupData = this.enemyGroupsData[i];
      var group = new EnemyGroup(enemyGroupData);
      this.enemyGroups.push(group);
    }
  }

  this.spawnEnemies = function () {
    var i;
    for (i = 0; i < this.enemyGroups.length; ++i) {
      var enemies = this.enemyGroups[i].enemies;

      if ( ! enemies.length) {
        this.enemyGroups.splice(i, 1);
        return;
      }

      var j;
      for (j = 0; j < enemies.length; ++j) {
        var enemy = enemies[j];

        if (enemy.spawnTime === this.levelTimer) {
          console.log('spawn', enemy);
          game.enemiesLayer.addChild(enemy);
          enemies.shift();
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
    var i;
    for (i = 0; i < game.enemiesLayer.entities.length; ++i) {
      var enemy = game.enemiesLayer.entities[i];

      if (ndgmr.checkPixelCollision(enemy.object, game.player.image)) {
        game.player.takeDamage();
        enemy.kill();
      }


      var j;
      for (j = 0; j < game.bulletLayer.entities.length; ++j) {
        var bullet = game.bulletLayer.entities[i];

        if (bullet.x > game.width) {
          continue;
        }

        if (ndgmr.checkPixelCollision(bullet.object, enemy.object)) {
          enemy.kill();
          bullet.kill();
        }
      }
    }
  }
}
