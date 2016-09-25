var Weapon = function (entity, isPlayerWeapon) {
  this.object = new createjs.Container();
  this.object.x = entity.object.x;
  this.object.y = entity.object.y;
  this.level = entity.level;
  this.isPlayerWeapon = isPlayerWeapon || false;

  // if (!isPlayerWeapon) {
  //   console.log(entity.object.x, entity.object.y);
  // }

  this.shoot = function () {
    if (this.isPlayerWeapon) {
      var bullet = new PlayerBullet(this.level, this.object.x, this.object.y);
    } else {
      var bullet = new EnemyBullet(this.level, this.object.x, this.object.y);
    }
  }

  this.update = function (playerX, playerY) {
    this.object.x = playerX;
    this.object.y = playerY;
  }
}
