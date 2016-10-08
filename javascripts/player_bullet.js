var PlayerBullet = function (bullet) {
  this.object = new createjs.Bitmap(preloader.get(bullet.sprite));
  this.object.x = game.player.object.x + (game.player.width) - (this.object.image.width / 2);
  this.object.y = game.player.object.y + (game.player.height / 2) + (this.object.image.height / 2);
  this.object.scaleX = -1;

  if (bullet.angle < 0) {
    // this.object.y -= (this.object.image.height / 2);
    // this.object.x += this.object.image.width / 2;
  } else if (bullet.angle > 0) {
    // this.object.y += (this.object.image.height / 2);
  }

  game.playerBulletLayer.addChild(this);

  this.angle = bullet.angle * Math.PI / 180;
  this.object.rotation = bullet.angle + Math.PI + 180;

  this.velocity = {
    x: Math.cos(this.angle) * 20,
    y: Math.sin(this.angle) * 20,
  };

  this.update = function () {
    this.object.x += this.velocity.x;
    this.object.y += this.velocity.y;

    if (this.object.x > (game.width + this.object.image.width)) {
      this.kill();
    }
  };

  this.kill = function () {
    game.playerBulletLayer.removeChild(this);
  };
};
