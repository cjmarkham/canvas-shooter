var Shop = function () {
  this.render = function () {
    game.ui.renderShop();
  };

  this.specialChosen = function (specialName) {
    game.player.special = new Special(specialName);
    game.updateMoney(-game.player.special.attributes.cost);
    game.loadLevel();
  };
};
