var Ui = function () {
  this.renderOpeningLevelText = function () {
    $('#level-text').text('Level ' + (game.levelIndex + 1)).fadeIn().delay(1000).fadeOut();
  };

  this.updateScore = function () {
    $('#hud #score span').text(game.score);
  };

  this.updateMoney = function () {
    $('#hud #money span').text(game.money);
  };

  this.renderGameOver = function () {
    $('#game-over').fadeIn();
  };

  this.tricklePoints = function() {
    var currentScore = parseInt($('#hud #score span').text(), 10);
    var amount = 10;

    if (this.pointsToAward - amount < 0) {
      amount = this.pointsToAward;
    }
    currentScore += amount;
    this.pointsToAward -= amount;
    $('#hud #score span').text(currentScore);
    $('#end-level #score span').text(this.pointsToAward);

    if (this.pointsToAward > 0) {
      window.requestAnimationFrame(this.tricklePoints.bind(this));
    }
  };

  this.trickleMoney = function() {
    var currentMoney = parseInt($('#hud #money span').text(), 10);
    var amount = 10;

    if (this.moneyToAward - amount < 0) {
      amount = this.moneyToAward;
    }
    currentMoney += amount;
    this.moneyToAward -= amount;
    $('#hud #money span').text(currentMoney);
    $('#end-level #money span').text(this.moneyToAward);

    if (this.moneyToAward > 0) {
      window.requestAnimationFrame(this.trickleMoney.bind(this));
    }
  };

  this.renderEndLevelStats = function () {
    var results = game.level.calculateEndingRewards();
    $('#end-level #clear-text span').text(game.level.levelNumber + 1);
    $('#end-level #score span').text(results.points);
    $('#end-level #money span').text(results.money);
    $('#end-level').show();

    this.moneyToAward = results.money;
    this.pointsToAward = results.points;

    setTimeout(function () {
      this.tricklePoints();
      this.trickleMoney();
    }.bind(this), 1000);

    game.score += results.points;
    game.money += results.money;

    setTimeout(function () {
      $('#end-level').hide();
    }.bind(this), 6000);
  };

  this.updateSpecialAmmo = function (ammo) {
    $('#special-ammo span').text(ammo);
  };

  this.renderShop = function () {
    var i;
    for (i in specials) {
      var special = specials[i];
      var element = $('<div class="special" />');
      element.attr('data-name', special.name);
      element.attr('data-cost', special.cost);
      var title = $('<p />');
      title.text(special.name + ' (' + special.ammo + ')');
      var cost = $('<p />');
      cost.text('$' + special.cost);
      var description = $('<p />');
      description.text(special.description);

      element.append(title, cost, description);

      if (game.money < special.cost) {
        element.addClass('disabled');
      }

      $('#shop').append(element);
    }
    $('#shop').show();

    $('.special:not(.disabled)').on('click', function () {
      $('#shop').fadeOut();
      $('#hud').fadeIn();
      var special = $(this).attr('data-name');
      game.shop.specialChosen(special);
    });
  };
};
