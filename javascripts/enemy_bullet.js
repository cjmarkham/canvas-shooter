var EnemyBullet = function (enemy, tracking) {
  this.enemy = enemy;
  this.tracking = tracking || false;
  if (this.tracking) {
    this.object = new createjs.Bitmap(preloader.get('enemyBulletTracking' + enemy.attributes.level));
  } else {
    this.object = new createjs.Bitmap(preloader.get('enemyBullet' + enemy.attributes.level));
  }
  this.object.x = enemy.object.x;
  this.object.y = enemy.object.y;
  this.object.velocity = {
    x: -30,
    y: 0,
  };

  if (this.tracking) {
    this.direction = Math.atan2(
      game.player.object.y - (game.player.height / 2) - enemy.object.y,
      game.player.object.x - enemy.object.x
    ) * (180 / Math.PI);

    this.angle = this.direction * Math.PI / 180;
    this.object.rotation = this.direction + Math.PI + 180;
    this.object.velocity = {
      x: Math.cos(this.angle) * 20,
      y: Math.sin(this.angle) * 20
    };
  }

  game.enemyBulletLayer.addChild(this);

  this.update = function () {
    this.object.x += this.object.velocity.x;
    this.object.y += this.object.velocity.y;

    // Remove if offscreen
    if (
      this.object.x < -this.object.image.width ||
      this.object.x > game.width + this.object.image.width ||
      this.object.y < -this.object.image.height ||
      this.object.y > game.height + this.object.image.height
    ) {
      this.kill();
    }
  };

  this.kill = function () {
    game.enemyBulletLayer.removeChild(this);
  };
};
