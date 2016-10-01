var Enemy = function (group, data) {
  var keys = Object.keys(data);
  var i;
  for (i = 0; i < keys.length; ++i) {
    this[keys[i]] = data[keys[i]];
  }
  this.currentCell = {};
  this.curveStep = 0;
  this.curveLUT = [];
  this.speed = 0;

  this.init = function () {
    this.attributes = new OrbEnemy(data.x, data.y);
    this.curve = {};

    this.object = new createjs.Bitmap(preloader.get(this.attributes.sprite));
    this.group = group;
    this.shootingInterval = Math.random() * 20;
    this.startingCell = game.cells[this.startingCell];

    this.calculateCurve();
  };

  this.calculateCurve = function () {
    var i;
    var cellToMoveTo = game.cells[this.endingCell];

    var originX, originY, targetX, targetY;

    // Calculate starting bounds from starting cell

    // If spawning from the top
    if (this.startingCell.id <= 9) {
      originX = this.startingCell.x + (this.startingCell.w / 2);
      originY = this.startingCell.y - (this.object.image.height / 2);
    } else if (this.startingCell.id <= 99 && this.startingCell.id >= 90) {
      // spawning from bottom cell
      originX = this.startingCell.x + (this.startingCell.w / 2);
      originY = this.startingCell.y - (this.object.image.height / 2) + this.startingCell.h;
    } else if (this.startingCell.id.toString()[1] === '9') {
      // Cell ends in a 9 (right most cell)
      originX = this.startingCell.x + this.startingCell.w;
      originY = originY = this.startingCell.y + (this.startingCell.h / 2) - (this.object.image.height / 2);
    } else if (this.startingCell.id.toString()[1] === '0') {
      // Cell ends in a 0 (left most cell)
      originX = this.startingCell.x;
      originY = originY = this.startingCell.y + (this.startingCell.h / 2) - (this.object.image.height / 2);
    }

    // Calculate ending bounds from end cell

    // If ending at the top
    if (this.startingCell.id <= 9) {
      targetX = cellToMoveTo.x + (cellToMoveTo.w / 2);
      targetY = cellToMoveTo.y - (this.object.image.height / 2);
    } else if (this.startingCell.id <= 99 && this.startingCell.id >= 90) {
      // If ending on the bottom
      targetX = cellToMoveTo.x + (cellToMoveTo.w / 2);
      targetY = cellToMoveTo.y + cellToMoveTo.h - (this.object.image.height / 2);
    } else if (this.startingCell.id.toString()[1] === '9') {
      // If ending on the right
      targetX = cellToMoveTo.x + cellToMoveTo.w;
      targetY = cellToMoveTo.y + (cellToMoveTo.h / 2) - (this.object.image.height / 2);
    } else if (this.startingCell.id.toString()[1] === '0') {
      // If endingon the left
      targetX = cellToMoveTo.x;
      targetY = cellToMoveTo.y + (cellToMoveTo.h / 2) - (this.object.image.height / 2);
    }

    var path = [
      originX, originY,
    ];

    var c;
    for (c = 0; c < this.movesVia.length; ++c) {
      var cell = game.cells[this.movesVia[c]];
      path.push(cell.x, cell.y);
    }

    path.push(targetX, targetY);

    this.curve = new Bezier(path);

    this.speed = 8 / this.curve.length();
    this.curveLUT = this.curve.getLUT(10);

    console.log(this.curveLUT);

    if (game.debugMode) {
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

  this.getLineAngle = function (x1, y1, x2, y2) {
    var dx = x2 - x1,
        dy = y2 - y1,
        th = Math.atan2(dy, dx);

    return th * 180 / Math.PI;
  };

  this.update = function () {
    var step = this.curve.get(this.curveStep);
    this.curveStep += this.speed;

    var angle = this.getLineAngle(this.object.x, this.object.y, step.x, step.y);

    if (this.curveStep <= 1) {
      this.object.rotation = angle;

      this.object.x = step.x;
      this.object.y = step.y;
    } else {
      var angleInRads = angle * Math.PI / 180;
      this.object.vx = Math.cos(angleInRads) * 150;
      this.object.vy = Math.sin(angleInRads) * 150;
      this.object.x += this.object.vx * 33 / 1000;
      this.object.y += this.object.vy * 33 / 1000;
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
