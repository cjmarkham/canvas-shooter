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
          startingCell: 80,
          endingCell: 10,
          movesVia: [
            83, 23
          ],
        },
        {
          spawnTime: 1.0, // seconds
          type: 'orb',
          startingCell: 91,
          endingCell: 98,
          movesVia: [
            22, 36
          ],
        },
        {
          spawnTime: 1.0, // seconds
          type: 'orb',
          startingCell: 19,
          endingCell: 79,
          movesVia: [
            15, 75
          ],
        },
        {
          spawnTime: 1.0, // seconds
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
