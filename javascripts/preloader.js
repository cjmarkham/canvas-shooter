var Preloader = function () {

  this.queue = new createjs.LoadQueue();
  this.queue.installPlugin(createjs.Sound);
  this.queue.loadManifest([
    {
      id: 'playerPlane1',
      src: 'images/sprites/playerPlane1.png',
    },
    {
      id: 'bullet1',
      src: 'images/sprites/bullet1.png',
    },
    {
      id: 'bullet2',
      src: 'images/sprites/bullet2.png',
    },
    {
      id: 'bullet3',
      src: 'images/sprites/bullet3.png',
    },
    {
      id: 'enemyBullet1',
      src: 'images/sprites/enemyBullet1.png',
    },
    {
      id: 'enemyBullet2',
      src: 'images/sprites/enemyBullet2.png',
    },
    {
      id: 'enemyBulletTracking1',
      src: 'images/sprites/enemyBullet2.png',
    },
    {
      id: 'enemy1',
      src: 'images/sprites/enemies/enemy1.png',
    },
    {
      id: 'explosion',
      src: 'images/sprites/explosion.png',
    },
    {
      id: 'powerup1',
      src: 'images/sprites/powerup1.png',
    },
    {
      id: 'bomb',
      src: 'images/sprites/bullet5.png',
    },
  ]);

  this.queue.on('progress', function (progress) {
    var percentage = Math.floor(progress.progress * 100).toString();
    $('#loading #progress-bar').css({
      width: percentage + '%'
    });
  });

  this.queue.on('complete', function () {
    $('#loading').fadeOut(10);
    game.init();
  });

  this.get = function (id) {
    return this.queue.getResult(id);
  };
};
