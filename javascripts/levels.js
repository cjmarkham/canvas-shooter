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
  {
    totalEnemies: 2,
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
          // {
          //   spawnTime: 3.0, // seconds
          //   type: 'orb',
          //   movement: {
          //     start: 29,
          //     end: 20,
          //   }
          // },
          // {
          //   spawnTime: 4.0, // seconds
          //   type: 'orb',
          //   movement: {
          //     start: 29,
          //     end: 20,
          //   }
          // },
          // {
          //   spawnTime: 5.0, // seconds
          //   type: 'orb',
          //   movement: {
          //     start: 29,
          //     end: 20,
          //   }
          // },
        ],
      },
      // // group 2
      // {
      //   id: 2,
      //   givePowerUp: true, // give a powerup if all enemies killed
      //   enemies: [
      //     {
      //       spawnTime: 7.0, // seconds
      //       type: 'orb',
      //       movement: {
      //         start: 89,
      //         end: 80,
      //       }
      //     },
      //     {
      //       spawnTime: 8.0, // seconds
      //       type: 'orb',
      //       movement: {
      //         start: 89,
      //         end: 80,
      //       }
      //     },
      //     {
      //       spawnTime: 9.0, // seconds
      //       type: 'orb',
      //       movement: {
      //         start: 89,
      //         end: 80,
      //       }
      //     },
      //     {
      //       spawnTime: 10.0, // seconds
      //       type: 'orb',
      //       movement: {
      //         start: 89,
      //         end: 80,
      //       }
      //     },
      //   ],
      // },
      // // group 3
      // {
      //   id: 3,
      //   givePowerUp: false, // give a powerup if all enemies killed
      //   enemies: [
      //     {
      //       spawnTime: 14.0, // seconds
      //       type: 'orb',
      //       movement: PATTERNS.TOP_ARC
      //     },
      //     {
      //       spawnTime: 14.0, // seconds
      //       type: 'orb',
      //       movement: PATTERNS.BOTTOM_ARC
      //     },
      //     {
      //       spawnTime: 18.0, // seconds
      //       type: 'orb',
      //       movement: PATTERNS.LEFT_ARC
      //     },
      //     {
      //       spawnTime: 18.0, // seconds
      //       type: 'orb',
      //       movement: PATTERNS.RIGHT_ARC
      //     },
      //   ],
      // },
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
