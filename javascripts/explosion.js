var Explosion = function (x, y) {
  var spritesheet = new createjs.SpriteSheet({
    images: [preloader.get('explosion')],
    frames: {
      width: 128,
      height: 128,
      regX: 64,
      regY: 64,
      count: 72,
    },
    animations: {
      explode: [0, 71, false, 1],
    },
  });

  this.object = new createjs.Sprite(spritesheet, 'explode');
  this.object.x = x;
  this.object.y = y;

  game.level.background.style.top = '-5px';

  setTimeout(function () {
    game.level.background.style.top = '-5px';
    game.level.background.style.left = '5px';
  }, 50);

  setTimeout(function () {
    game.level.background.style.top = '0';
    game.level.background.style.left = '0';
  }, 100);

  game.explosionLayer.addChild(this);

  this.update = function () {
    this.object.x += 5;
    this.object.alpha -= 0.01;

    if (this.object.alpha <= 0) {
      game.explosionLayer.removeChild(this);
    }
  };
};
