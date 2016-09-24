var Bullet = function (level, x, y) {
  this.object = new createjs.Bitmap(preloader.get('bullet' + level));
  this.object.x = x;
  this.object.y = y;

  this.update = function () {
    this.object.x += 30;

    if (this.object.x > (game.width + this.object.image.width)) {
      this.kill();
    }
  }

  this.kill = function () {
    game.bulletLayer.removeChild(this);
  };
}
