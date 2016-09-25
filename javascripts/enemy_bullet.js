var EnemyBullet = function (level, x, y) {
  this.object = new createjs.Bitmap(preloader.get('enemyBullet' + level));
  this.object.x = x;
  this.object.y = y;
  game.enemyBulletLayer.addChild(this);

  this.update = function () {
    this.object.x -= 30;

    if (this.object.x < -this.object.image.width) {
      this.kill();
    }
  }

  this.kill = function () {
    game.enemyBulletLayer.removeChild(this);
  };
}
