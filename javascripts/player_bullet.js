var PlayerBullet = function (player) {
  this.object = new createjs.Bitmap(preloader.get('bullet' + player.level));
  this.object.x = player.object.x;
  this.object.y = player.object.y - (this.object.image.height / 2);
  game.playerBulletLayer.addChild(this);

  this.update = function () {
    this.object.x += 30;

    if (this.object.x > (game.width + this.object.image.width)) {
      this.kill();
    }
  };

  this.kill = function () {
    game.playerBulletLayer.removeChild(this);
  };
};
