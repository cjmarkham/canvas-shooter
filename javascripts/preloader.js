var Preloader = function () {

  this.queue = new createjs.LoadQueue();
  this.queue.loadManifest([
    {
      id: 'playerPlane',
      src: 'images/sprites/player-plane.png',
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
      id: 'enemyBullet1',
      src: 'images/sprites/enemyBullet1.png',
    },
    {
      id: 'orb',
      src: 'images/sprites/orb.png',
    },
    {
      id: 'explosion',
      src: 'images/sprites/explosion.png',
    },
    {
      id: 'powerup1',
      src: 'images/sprites/powerup1.png',
    },
  ]);

  this.queue.on('progress', function (progress) {
    var percentage = Math.floor(progress.progress * 100).toString();
    console.log(percentage)
    $('#loading #progress-bar').css({
      width: percentage + '%'
    });
  })

  this.queue.on('complete', function () {
    $('#loading').fadeOut(10);
    game.init();
  });

  this.get = function (id) {
    return this.queue.getResult(id);
  }
}
