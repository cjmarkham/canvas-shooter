var Beam = function () {
  this.attributes = specials.beam;
  this.object = new createjs.Bitmap(preloader.get('bullet1'));
  this.object.x = game.player.object.x - (game.player.height / 2);
  this.object.y = game.player.object.y - (game.player.height / 2);
  this.object.scaleX = 4;

  this.shoot = function () {
    console.log(game.playerSpecialLayer.entities.length);
    if (game.playerSpecialLayer.entities.length === 1) {
      return;
    }
    game.playerSpecialLayer.addChild(this);
  };

  this.update = function () {
    this.object.x += 20;

    if (this.object.x > game.width + (this.object.image.width * this.object.scaleX)) {
      this.destroy();
    }
  };

  this.destroy = function () {
    game.playerSpecialLayer.removeChild(this);
  };
};
