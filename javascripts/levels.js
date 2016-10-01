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
          endingCell: 10,
          movesVia: [
            28, 56, 23
          ],
        },
        {
          uniqueId: 2,
          spawnTime: 1.0, // seconds
          type: 'orb',
          startingCell: 49,
          endingCell: 70,
          movesVia: [
            47, 34
          ],
        },
        {
          uniqueId: 3,
          spawnTime: 1.0, // seconds
          type: 'orb',
          startingCell: 69,
          endingCell: 70,
          movesVia: [
            67, 96
          ],
        },
        {
          uniqueId: 4,
          spawnTime: 1.0, // seconds
          type: 'orb',
          startingCell: 99,
          endingCell: 50,
          movesVia: [
            97, 54
          ],
        },
      ],
    }
  ]
];
