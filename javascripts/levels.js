var PATTERNS = {
  TOP_ARC: {
    start: 2,
    end: 7,
    via: [33, 36],
  },
  BOTTOM_ARC: {
    start: 92,
    end: 97,
    via: [63, 66],
  },
  LEFT_ARC: {
    start: 10,
    end: 80,
    via: [13, 83],
  },
  RIGHT_ARC: {
    start: 19,
    end: 89,
    via: [16, 86],
  },
};

var levels = [
  // level 1
  [
    // group 1
    {
      id: 1,
      givePowerUp: false, // give a powerup if all enemies killed
      enemies: [
        {
          spawnTime: 1.0, // seconds
          type: 'orb',
          movement: PATTERNS.TOP_ARC
        },
        {
          spawnTime: 1.0, // seconds
          type: 'orb',
          movement: PATTERNS.BOTTOM_ARC
        },
        {
          spawnTime: 1.0, // seconds
          type: 'orb',
          movement: PATTERNS.LEFT_ARC
        },
        {
          spawnTime: 1.0, // seconds
          type: 'orb',
          movement: PATTERNS.RIGHT_ARC
        },
      ],
    },
  ]
];
