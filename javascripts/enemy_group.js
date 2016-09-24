var EnemyGroup = function (enemies) {
  this.enemies = [];

  var i;
  for (i = 0; i < enemies.length; ++i) {
    var enemy = new Enemy(this, enemies[i]);
    this.enemies.push(enemy);
  }
}
