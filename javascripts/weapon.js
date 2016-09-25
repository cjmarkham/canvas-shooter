var Weapon = function (level, slot, isPlayerWeapon) {
  this.object = new createjs.Container();
  this.object.x = slot.x;
  this.object.y = slot.y;
  this.level = level;
  this.isPlayerWeapon = isPlayerWeapon || false;

  this.shoot = function () {
    if (this.isPlayerWeapon) {
      var bullet = new PlayerBullet(this.level, this.object.x, this.object.y);
    } else {
      var bullet = new EnemyBullet(this.level, this.object.x, this.object.y);
    }
  }

  this.update = function (x, y) {
    this.object.x = x;
    this.object.y = y;
  }
}
