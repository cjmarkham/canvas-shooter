var Orb = function (x, y) {
  this.object = new createjs.Bitmap(preloader.get('orb'));
  this.object.x = x;
  this.object.y = y;
  this.level = 1;

  this.radius = 0.1;

  game.orbsLayer.addChild(this);

  this.update = function () {
    var offsetX = Math.cos(game.ticks / 20) * 10;
    var offsetY = Math.sin(game.ticks / 20) * 7;
    var x = this.object.x + (game.player.object.x - (this.object.x + (this.object.image.width / 2)) + (game.player.width / 2)) * this.radius + offsetX;
    var y = this.object.y + (game.player.object.y - this.object.y) * this.radius + offsetY;
    this.object.x = x;
    this.object.y = y;
  };

  this.shoot = function () {
    new PlayerBullet(this);
  };

  this.kill = function () {
    game.orbsLayer.removeChild(this);
    game.player.orb = null;

    // var index = game.player.orbs.findIndex(function (orb) {
    //   return orb.object.id === this.object.id;
    // }.bind(this));
    //
    // game.player.orbs.splice(index, 1);
  };
};
