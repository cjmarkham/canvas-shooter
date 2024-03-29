var Enemy = function (group, data) {
  var keys = Object.keys(data);
  var i;
  for (i = 0; i < keys.length; ++i) {
    this[keys[i]] = data[keys[i]];
  }
  this.curveStep = 0;
  this.isSpawned = false;
  this.curve = null;
  this.type = data.type;
  this.speed = 0;

  if (game.debugMode) {
    this.line = null;
    this.linePoints = [];
  }

  this.init = function () {
    this.attributes = Enemies[this.type];
    this.speed = this.attributes.speed;

    this.object = new createjs.Bitmap(preloader.get(this.attributes.sprite));
    this.group = group;
    this.shootingInterval = Math.random() * 10;
    this.startingCell = game.cells[this.movement.start];

    this.calculateCurve();
  };

  this.calculateCurve = function () {
    var i;
    var cellToMoveTo = game.cells[this.movement.end];

    var originX, originY, targetX, targetY;

    // Calculate starting bounds from starting cell

    // If spawning from the top
    if (this.startingCell.id <= 9) {
      originX = this.startingCell.x + (this.startingCell.w / 2) - (this.object.image.width / 2);
      originY = this.startingCell.y - (this.object.image.height / 2);
    } else if (this.startingCell.id <= 99 && this.startingCell.id >= 90) {
      // spawning from bottom cell
      originX = this.startingCell.x + (this.startingCell.w / 2) - (this.object.image.width / 2);
      originY = this.startingCell.y + (this.startingCell.h) - (this.object.image.height / 2);
    } else if (this.startingCell.id.toString()[1] === '9') {
      // Cell ends in a 9 (right most cell)
      originX = game.width;
      originY = this.startingCell.y + (this.startingCell.h / 2) - (this.object.image.height / 2);
    } else if (this.startingCell.id.toString()[1] === '0') {
      // Cell ends in a 0 (left most cell)
      originX = 0;
      originY = this.startingCell.y + (this.startingCell.h / 2) - (this.object.image.height / 2);
    }

    // Calculate ending bounds from end cell

    // If ending at the top
    if (this.startingCell.id <= 9) {
      targetX = cellToMoveTo.x + (cellToMoveTo.w / 2) + (this.object.image.width / 2);
      targetY = cellToMoveTo.y - (this.object.image.height / 2);
    } else if (this.startingCell.id <= 99 && this.startingCell.id >= 90) {
      // If ending on the bottom
      targetX = cellToMoveTo.x + (cellToMoveTo.w / 2) + (this.object.image.width / 2);
      targetY = cellToMoveTo.y + (cellToMoveTo.h) - (this.object.image.height / 2);
    } else if (this.startingCell.id.toString()[1] === '9') {
      // If ending on the right
      targetX = game.width;
      targetY = cellToMoveTo.y + (cellToMoveTo.h / 2) - (this.object.image.height / 2);
    } else if (this.startingCell.id.toString()[1] === '0') {
      // If ending on the left
      targetX = 0;
      targetY = cellToMoveTo.y + (cellToMoveTo.h / 2) - (this.object.image.height / 2);
    }

    this.object.x = originX;
    this.object.y = originY;

    if (this.movement.via) {
      var path = [
        originX, originY,
      ];

      var c;
      for (c = 0; c < this.movement.via.length; ++c) {
        var cell = game.cells[this.movement.via[c]];
        path.push(cell.x + (cell.w / 2), cell.y + (cell.h / 2) - (this.object.image.width / 2));
      }

      path.push(targetX, targetY);

      this.curve = new Bezier(path);
      this.speed = this.speed / this.curve.length();
    }
  };

  this.getLineAngle = function (x1, y1, x2, y2) {
    var dx = x2 - x1,
        dy = y2 - y1,
        th = Math.atan2(dy, dx);

    return th * 180 / Math.PI;
  };

  this.update = function () {

    if (game.debugMode && this.isSpawned && ! this.line && this.curve) {
      var points = this.curve.points;
      var line = new createjs.Shape();
      line.graphics.setStrokeStyle(3);
      line.graphics.beginStroke('red');
      line.graphics.moveTo(points[0].x, points[0].y + (this.object.image.height / 2));
      line.graphics.bezierCurveTo(
        points[1].x, points[1].y + (this.object.image.height / 2),
        points[2].x, points[2].y + (this.object.image.height / 2),
        points[3].x, points[3].y + (this.object.image.height / 2)
      );
      this.line = line;
      game.stage.addChild(line);

      var j;
      for (j = 0; j < points.length; j++) {
        var graphics = new createjs.Graphics();
        graphics.beginFill('blue');
        graphics.drawCircle(points[j].x, points[j].y + (this.object.image.height / 2), 5);
        var linePoint = new createjs.Shape(graphics);
        this.linePoints.push(linePoint);
        game.stage.addChild(linePoint);
      }
    }

    if (this.curve) {
      var step = this.curve.get(this.curveStep);
      this.curveStep += this.speed;

      var angle = this.getLineAngle(this.object.x, this.object.y, step.x, step.y);

      if (this.curveStep <= 1) {
        this.object.x = step.x;
        this.object.y = step.y;
      } else {
        var angleInRads = angle * Math.PI / 180;
        this.object.vx = Math.cos(angleInRads) * this.speed;
        this.object.vy = Math.sin(angleInRads) * this.speed;
        this.object.x += this.object.vx * 33 / 1000;
        this.object.y += this.object.vy * 33 / 1000;
      }
    } else {
      if (this.startingCell.id.toString()[1] === '0') {
        this.object.x += this.speed;
      } else if (this.startingCell.id.toString()[1] === '9') {
        this.object.x -= this.speed;
      }
    }

    if (this.attributes.canShoot) {
      if (this.shootingInterval <= 0) {
        var random = Math.random() * (5 - 2) + 2;

        // timer = 6
        // random = 4
        // spawn = 2

        if (game.level.levelTimer == this.spawnTime + random) {
          // this.shoot();
          console.log('shoot');
        }
      }
    }

    this.destroyIfOffScreen();
  };

  this.destroyIfOffScreen = function () {
    // if this enemy is offscreen, remove it
    if (
      this.object.x < -110 ||
      this.object.y < -110 ||
      this.object.y > game.height + 110 ||
      this.object.x > game.width + 110
    ) {
      this.destroy();
      return;
    }
  };

  this.shoot = function () {
    new EnemyBullet(this, this.attributes.tracking);
  };

  this.takeDamage = function () {
    this.attributes.hp -= 1;

    if (this.attributes.hp === 0) {
      this.kill();
    }
  };

  this.kill = function () {
    game.updateScore(this.attributes.value);
    game.updateMoney(this.attributes.worth);
    game.level.enemiesKilled++;
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
      game.stage.removeChild(this.line);
      var i = 0;
      for (i = 0; i < this.linePoints.length; ++i) {
        game.stage.removeChild(this.linePoints[i]);
      }

      var count = parseInt($('#enemies span').text(), 10);
      $('#enemies span').text(count - 1);
    }
  };
};
