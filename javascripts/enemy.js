var Enemy = function (group, data) {
  var keys = Object.keys(data);
  var i;
  for (i = 0; i < keys.length; ++i) {
    this[keys[i]] = data[keys[i]];
  }
  this.attributes = new OrbEnemy(data.x, data.y);

  this.object = new createjs.Bitmap(preloader.get(this.attributes.sprite));
  this.object.x = data.x;
  this.object.y = data.y;
  this.group = group;
  this.angle = this.angle * Math.PI / 180;
  this.shootingInterval = Math.random() * 20;
  this.currentCell;

  this.update = function () {
    var currentCell = game.cells.find(function (cell) {
      var x = cell.x;
      var maxX = cell.x + cell.w;
      var y = cell.y;
      var maxY = cell.y + cell.h;

      if (this.object.x >= x && this.object.x <= maxX && this.object.y >= y && this.object.y <= maxY) {
        return cell;
      }
    }.bind(this));

    // If this enemy will change direction when spawned
    if (this.willChangeDirection && currentCell) {
      var i;
      for (i = 0; i < this.directionChanges.length; ++i) {
        var newDirection = this.directionChanges[i];

        if (newDirection.whenInCell === currentCell.id) {
          var cellToMoveTo = game.cells[newDirection.gotoCell];
          var targetX = cellToMoveTo.x + (cellToMoveTo.x + cellToMoveTo.w);
          var targetY = cellToMoveTo.y + (cellToMoveTo.y + cellToMoveTo.h);

          var originX = currentCell.x + (currentCell.x + currentCell.w);
          var originY = currentCell.y + (currentCell.y + currentCell.h);

          var angle =  Math.atan2(targetY - originY, targetX - originX);
          this.angle = angle;
        }

        if (currentCell.id === newDirection.gotoCell) {
          this.angle = Math.PI;
        }
      }
    }

    this.object.vx = Math.cos(this.angle) * this.attributes.speed;
    this.object.vy = Math.sin(this.angle) * this.attributes.speed;

    // Head in the direction
    this.object.x += this.object.vx * 33 / 1000;
    this.object.y += this.object.vy * 33 / 1000;

    // calculate whether a shot can be made
    // depending on the random shooting interval
    this.shootingInterval -= 0.1;
    if (this.shootingInterval <= 0) {
      this.shoot();
      this.shootingInterval = Math.random() * 40;
    }

    // if this enemy is offscreen, remove it
    if (this.object.x < -50 || this.object.y < -50 || this.object.y > game.height + 50 || this.object.x > game.width + 50) {
      this.destroy();
      return;
    }
  }

  this.gotoCell = function (cellIndex) {
    var cell = game.cells[cellIndex];

  }

  this.shoot = function () {
    new EnemyBullet(this.attributes.level, this.object.x, this.object.y);
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

    if (game.debugMode) {
      var count = parseInt($('#enemies span').text(), 10);
      $('#enemies span').text(count - 1);
    }
  }
}
