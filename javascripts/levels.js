var width = $(window).width();
var height = $(window).height();

var levels = [
  // level 1
  [
    // group 1
    {
      id: 1,
      givePowerUp: false, // give a powerup if all enemies killed
      enemies: [
        {
          spawnTime: 2.0, // seconds
          type: 'orb',
          startingCell: 19,
          endingCell: 10,
        },
        {
          spawnTime: 3.0, // seconds
          type: 'orb',
          startingCell: 19,
          endingCell: 10,
        },
        {
          spawnTime: 4.0, // seconds
          type: 'orb',
          startingCell: 19,
          endingCell: 10,
        },
      ],
    },
    // group 2
    {
      id: 2,
      givePowerUp: true, // give a powerup if all enemies killed
      enemies: [
        {
          spawnTime: 8.0, // seconds
          type: 'orb',
          startingCell: 89,
          endingCell: 80,
        },
        {
          spawnTime: 9.0, // seconds
          type: 'orb',
          startingCell: 89,
          endingCell: 80,
        },
        {
          spawnTime: 10.0, // seconds
          type: 'orb',
          startingCell: 89,
          endingCell: 80,
        },
      ],
    },
    // group 3
    {
      id: 3,
      givePowerUp: true, // give a powerup if all enemies killed
      enemies: [
        {
          spawnTime: 15.0, // seconds
          type: 'orb',
          startingCell: 80,
          endingCell: 10,
          movesVia: [
            83, 23
          ],
        },
        {
          spawnTime: 18.0, // seconds
          type: 'orb',
          startingCell: 91,
          endingCell: 98,
          movesVia: [
            22, 36
          ],
        },
        {
          spawnTime: 21.0, // seconds
          type: 'orb',
          startingCell: 19,
          endingCell: 79,
          movesVia: [
            15, 75
          ],
        },
        {
          spawnTime: 24.0, // seconds
          type: 'orb',
          startingCell: 1,
          endingCell: 8,
          movesVia: [
            43, 36
          ],
        },
      ],
    }
  ]
];
