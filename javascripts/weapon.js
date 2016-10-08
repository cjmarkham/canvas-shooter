var Weapon = function () {
  this.lastTimeFired = 0;

  this.shoot = function () {
    if (this.lastTimeFired < new Date().getTime() - 150) {
      var bullet = Bullets[game.player.level - 1];

      var i;
      for (i = 0; i < bullet.bullets.length; ++i) {
        new PlayerBullet(bullet.bullets[i]);
      }

      this.lastTimeFired = new Date().getTime();
    }
  };
};
