var PowerUp = function (x, y) {
  this.object = new createjs.Bitmap(preloader.get('powerup1'));
  this.object.x = x;
  this.object.y = y;
  game.powerupsLayer.addChild(this);

  this.update = function () {
    this.object.x -= 4;

    if (this.object.x <= 0) {
      this.destroy();
    }
  };

  this.collect = function () {
    game.player.powerUp();
    this.destroy();
  };

  this.destroy = function () {
    game.powerupsLayer.removeChild(this);
  };
};
