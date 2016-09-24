var Weapon = function (level, x, y) {
  this.object = new createjs.Container();
  this.object.x = x;
  this.object.y = y;
  this.level = level;

  this.shoot = function () {
    var bullet = new Bullet(this.level, this.object.x, this.object.y);
    game.bulletLayer.addChild(bullet);
  }

  this.update = function (x, y) {
    this.object.x = x;
    this.object.y = y;
  }
}
