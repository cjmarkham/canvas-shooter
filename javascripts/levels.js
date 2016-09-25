var width = $(window).width();
var height = $(window).height();

var levels = [
  // level 1
  [
    // group 1
    {
      id: 1,
      givePowerUp: true, // give a powerup if all enemies killed
      enemies: [
        {
          spawnTime: 1.0, // seconds
          type: 'orb',
          x: width + 50, // x position of spawn
          y: 100, // y position of spawn
          angle: 180, // angle the enemy is facing (180 = forward)
          speed: 150, // the speed of the enemy
        },
        {
          spawnTime: 2.5, // seconds
          type: 'orb',
          x: width + 50, // x position of spawn
          y: 100, // y position of spawn
          angle: 180, // angle the enemy is facing (180 = forward)
          speed: 150, // the speed of the enemy
        },
        {
          spawnTime: 4.0, // seconds
          type: 'orb',
          x: width + 50, // x position of spawn
          y: 100, // y position of spawn
          angle: 180, // angle the enemy is facing (180 = forward)
          speed: 150, // the speed of the enemy
        },
      ]
    },
    // group 2
    {
      id: 2,
      givePowerUp: false, // give a powerup if all enemies killed
      enemies: [
        {
          spawnTime: 7.0, // seconds
          type: 'orb',
          x: width + 50, // x position of spawn
          y: height - 100, // y position of spawn
          angle: 180, // angle the enemy is facing (180 = forward)
          speed: 150, // the speed of the enemy
        },
        {
          spawnTime: 8.5, // seconds
          type: 'orb',
          x: width + 50, // x position of spawn
          y: height - 100, // y position of spawn
          angle: 180, // angle the enemy is facing (180 = forward)
          speed: 150, // the speed of the enemy
        },
        {
          spawnTime: 10.0, // seconds
          type: 'orb',
          x: width + 50, // x position of spawn
          y: height - 100, // y position of spawn
          angle: 180, // angle the enemy is facing (180 = forward)
          speed: 150, // the speed of the enemy
        },
        {
          spawnTime: 11.5, // seconds
          type: 'orb',
          x: width + 50, // x position of spawn
          y: height - 100, // y position of spawn
          angle: 180, // angle the enemy is facing (180 = forward)
          speed: 150, // the speed of the enemy
        },
      ]
    }
  ]
]
