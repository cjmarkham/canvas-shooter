var PlayerBullet = function (level, x, y) {
  this.object = new createjs.Bitmap(preloader.get('bullet' + level));
  this.object.x = x;
  this.object.y = y;
  game.playerBulletLayer.addChild(this);

  this.update = function () {
    this.object.x += 30;

    if (this.object.x > (game.width + this.object.image.width)) {
      this.kill();
    }
  }

  this.kill = function () {
    game.playerBulletLayer.removeChild(this);
  };
}
