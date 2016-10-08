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
    via: [3, 93],
  },
};

var levels = [
  // level 1
  {
    totalEnemies: 12,
    hasBoss: false,
    groups: [
      // group 1
      {
        id: 1,
        givePowerUp: false, // give a powerup if all enemies killed
        enemies: [
          {
            spawnTime: 2.0, // seconds
            type: 'orb',
            movement: {
              start: 29,
              end: 20,
            }
          },
          {
            spawnTime: 3.0, // seconds
            type: 'orb',
            movement: {
              start: 29,
              end: 20,
            }
          },
          {
            spawnTime: 4.0, // seconds
            type: 'orb',
            movement: {
              start: 29,
              end: 20,
            }
          },
          {
            spawnTime: 5.0, // seconds
            type: 'orb',
            movement: {
              start: 29,
              end: 20,
            }
          },
        ],
      },
      // group 2
      {
        id: 2,
        givePowerUp: true, // give a powerup if all enemies killed
        enemies: [
          {
            spawnTime: 10.0, // seconds
            type: 'orb',
            movement: {
              start: 89,
              end: 80,
            }
          },
          {
            spawnTime: 11.0, // seconds
            type: 'orb',
            movement: {
              start: 89,
              end: 80,
            }
          },
          {
            spawnTime: 12.0, // seconds
            type: 'orb',
            movement: {
              start: 89,
              end: 80,
            }
          },
          {
            spawnTime: 13.0, // seconds
            type: 'orb',
            movement: {
              start: 89,
              end: 80,
            }
          },
        ],
      },
      // group 3
      {
        id: 3,
        givePowerUp: false, // give a powerup if all enemies killed
        enemies: [
          {
            spawnTime: 18.0, // seconds
            type: 'orb',
            movement: PATTERNS.RIGHT_ARC
          },
          {
            spawnTime: 19.0, // seconds
            type: 'orb',
            movement: PATTERNS.RIGHT_ARC
          },
          {
            spawnTime: 20.0, // seconds
            type: 'orb',
            movement: PATTERNS.RIGHT_ARC
          },
          {
            spawnTime: 21.0, // seconds
            type: 'orb',
            movement: PATTERNS.RIGHT_ARC
          },
        ],
      },
    ]
  },
  // level 2
  {
    totalEnemies: 1,
    hasBoss: false,
    groups: [
      // group 1
      {
        id: 1,
        givePowerUp: false, // give a powerup if all enemies killed
        enemies: [
          {
            spawnTime: 2.0, // seconds
            type: 'orb',
            movement: {
              start: 19,
              end: 10,
            }
          },
        ]
      }
    ]
  }
];
