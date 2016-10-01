var Enemy = function (group, data) {
  var keys = Object.keys(data);
  var i;
  for (i = 0; i < keys.length; ++i) {
    this[keys[i]] = data[keys[i]];
  }
  this.currentCell = {};

  this.init = function () {
    this.attributes = new OrbEnemy(data.x, data.y);
    this.curve = {};

    this.object = new createjs.Bitmap(preloader.get(this.attributes.sprite));
    this.group = group;
    this.shootingInterval = Math.random() * 20;
    this.startingCell = game.cells[this.startingCell];
    console.log(this.uniqueId, this.startingCell.id, 'spawned');

    this.calculateCurve();
    var points = this.curve.points;
    var pathArray = [
      points[0].x, points[0].y, // moveTo
      points[0].x, points[0].y, points[1].x, points[1].y,
      points[2].x, points[2].y, points[3].x, points[3].y
    ];
  };

  this.calculateCurve = function () {
    var i;
    var cellToMoveTo = game.cells[this.movesToCell];
    var targetX = cellToMoveTo.x + (cellToMoveTo.w / 2);
    var targetY = cellToMoveTo.y + (cellToMoveTo.h / 2) - (this.object.image.height / 2);

    var originX = this.startingCell.x + this.startingCell.w;
    var originY = this.startingCell.y + (this.startingCell.h / 2) - (this.object.image.height / 2);

    var curve1Cell = game.cells[this.startingCell.id - 2];
    var curve2Cell = game.cells[cellToMoveTo.id + 2];

    var curve1CellX = curve1Cell.x + (curve1Cell.w / 2);
    var curve1CellY = curve1Cell.y + (curve1Cell.h / 2) - (this.object.image.height / 2);

    var curve2CellX = curve2Cell.x + (curve2Cell.w / 2);
    var curve2CellY = curve2Cell.y + (curve2Cell.h / 2) - (this.object.image.height / 2);

    this.curve = new Bezier(
      originX, originY,
      curve1CellX, curve1CellY,
      curve2CellX, curve2CellY,
      targetX, targetY
    );

    if (game.debugMode) {
      var points = this.curve.points;
      var line = new createjs.Shape();
      line.graphics.setStrokeStyle(3);
      line.graphics.beginStroke('red');
      line.graphics.moveTo(points[0].x, points[1].y + (this.object.image.height / 2));
      line.graphics.bezierCurveTo(
        points[1].x, points[1].y + (this.object.image.height / 2),
        points[2].x, points[2].y + (this.object.image.height / 2),
        points[3].x, points[3].y + (this.object.image.height / 2)
      );
      game.stage.addChild(line);

      var j;
      for (j = 0; j < points.length; j++) {
        var graphics = new createjs.Graphics();
        graphics.beginFill('blue');
        graphics.drawCircle(points[j].x, points[j].y + (this.object.image.height / 2), 5);
        var shape = new createjs.Shape(graphics);
        game.stage.addChild(shape);
      }
    }
  };

  this.curveStep = 0;

  this.update = function () {
    if (this.id == 2) {
      console.log(this.id, this.object.x, this.object.y);
    }
    var step = this.curve.get(this.curveStep);
    this.curveStep += 0.008;
    if (this.curveStep <= 1) {
      this.object.x = step.x;
      this.object.y = step.y;
    } else {
      this.object.x -= 8;
    }

    // calculate whether a shot can be made
    // depending on the random shooting interval
    this.shootingInterval -= 0.1;
    if (this.shootingInterval <= 0) {
      this.shoot();
      this.shootingInterval = Math.random() * 40;
    }

    // if this enemy is offscreen, remove it
    if (
      this.object.x < -50 ||
      this.object.y < -50 ||
      this.object.y > game.height + 50 ||
      this.object.x > game.width + 50
    ) {
      console.log(this.uniqueId, 'off screen');
      this.destroy();
      return;
    }
  };

  this.shoot = function () {
    new EnemyBullet(this.attributes.level, this.object.x, this.object.y);
  };

  this.takeDamage = function () {
    this.attributes.hp -= 1;

    if (this.attributes.hp === 0) {
      this.kill();
    }
  };

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
  };

  this.destroy = function () {
    game.enemiesLayer.removeChild(this);

    if (game.debugMode) {
      var count = parseInt($('#enemies span').text(), 10);
      $('#enemies span').text(count - 1);
    }
  };
};
