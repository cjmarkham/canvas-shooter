var Bomb = function () {
  this.attributes = specials.bomb;
  this.object = new createjs.Bitmap(preloader.get('bomb'));
  this.object.x = game.player.object.x - (game.player.height / 2);
  this.object.y = game.player.object.y;
  this.curveStep = 0;
  this.speed = 0;

  this.calculateCurve = function () {
    var path = [
      this.object.x, this.object.y,
      this.object.x + 100, this.object.y + 40,
      this.object.x + 100, game.height
    ];

    this.curve = new Bezier(path);
    this.speed = 10 / this.curve.length();
  };
  this.calculateCurve();

  this.shoot = function () {
    game.playerSpecialLayer.addChild(this);
  };

  this.update = function () {
    var step = this.curve.get(this.curveStep);
    this.curveStep += this.speed;

    if (this.curveStep <= 1) {
      this.object.x = step.x;
      this.object.y = step.y;
    } else {
      this.object.y += 8;
    }

    if (this.object.y > game.height + this.object.image.height) {
      this.destroy();
    }
  };

  this.destroy = function () {
    game.playerSpecialLayer.removeChild(this);
  };
};
