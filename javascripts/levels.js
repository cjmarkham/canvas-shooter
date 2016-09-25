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
          willChangeDirection: true,
          directionChanges: [
            {
              whenInCell: 28,
              gotoCell: 4,
            },
            {
              whenInCell: 2,
              gotoCell: 50,
            },
          ],
        },
        // {
        //   spawnTime: 2.5, // seconds
        //   type: 'orb',
        //   x: width + 50, // x position of spawn
        //   y: 100, // y position of spawn
        //   angle: 180, // angle the enemy is facing (180 = forward)
        // },
        // {
        //   spawnTime: 4.0, // seconds
        //   type: 'orb',
        //   x: width + 50, // x position of spawn
        //   y: 100, // y position of spawn
        //   angle: 180, // angle the enemy is facing (180 = forward)
        // },
      ]
    },
    // group 2
    // {
    //   id: 2,
    //   givePowerUp: false, // give a powerup if all enemies killed
    //   enemies: [
    //     {
    //       spawnTime: 7.0, // seconds
    //       type: 'orb',
    //       x: width + 50, // x position of spawn
    //       y: height - 100, // y position of spawn
    //       angle: 180, // angle the enemy is facing (180 = forward)
    //       willChangeDirection: true,
    //       directionChanges: [
    //         {
    //           changeAt: 8.0,
    //           angle: 200,
    //         },
    //         {
    //           changeAt: 10.0,
    //           angle: 180,
    //         },
    //       ],
    //     },
    //     {
    //       spawnTime: 8.5, // seconds
    //       type: 'orb',
    //       x: width + 50, // x position of spawn
    //       y: height - 100, // y position of spawn
    //       angle: 180, // angle the enemy is facing (180 = forward)
    //     },
    //     {
    //       spawnTime: 10.0, // seconds
    //       type: 'orb',
    //       x: width + 50, // x position of spawn
    //       y: height - 100, // y position of spawn
    //       angle: 180, // angle the enemy is facing (180 = forward)
    //     },
    //     {
    //       spawnTime: 11.5, // seconds
    //       type: 'orb',
    //       x: width + 50, // x position of spawn
    //       y: height - 100, // y position of spawn
    //       angle: 180, // angle the enemy is facing (180 = forward)
    //     },
    //   ]
    // }
  ]
]
