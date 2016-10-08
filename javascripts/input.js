var Input = function () {
  var keyMap = {};

  this.handleKeyPress = function (key) {
    switch (key) {
      case 'arrowleft':
        game.player.moving.left = keyMap[key];
      break;
      case 'arrowright':
        game.player.moving.right = keyMap[key];
      break;
      case 'arrowup':
        game.player.moving.up = keyMap[key];
      break;
      case 'arrowdown':
        game.player.moving.down = keyMap[key];
      break;
      case 'q':
        if (keyMap.q) {
          game.player.shootSpecial();
        }
      break;
      case 'space':
        game.player.shoot();
      break;
      case 'p':
        game.paused = ! game.paused;
      break;
    }
  };

  this.keyPress = function (e) {
    var key = e.key.toLowerCase();
    if (key === ' ') {
      key = 'space';
    }
    keyMap[key] = e.type === 'keydown';

    this.handleKeyPress(key);
  };
};
