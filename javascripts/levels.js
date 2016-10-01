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
          uniqueId: 1,
          spawnTime: 1.0, // seconds
          type: 'orb',
          startingCell: 29,
          movesToCell: 4,
        },
        {
          uniqueId: 2,
          spawnTime: 1.0, // seconds
          type: 'orb',
          startingCell: 49,
          movesToCell: 32,
        },
        {
          uniqueId: 3,
          spawnTime: 1.0, // seconds
          type: 'orb',
          startingCell: 69,
          movesToCell: 94,
        },
        {
          uniqueId: 4,
          spawnTime: 1.0, // seconds
          type: 'orb',
          startingCell: 99,
          movesToCell: 52,
        }
      ],
    }
  ]
];
