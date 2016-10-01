var EnemyGroup = function (group) {
  this.enemies = [];
  this.id = group.id;
  this.givePowerUp = group.givePowerUp;
  this.enemyCount = 0;

  var i;
  for (i = 0; i < group.enemies.length; ++i) {
    var enemy = new Enemy(this, group.enemies[i]);
    enemy.init();
    this.enemies.push(enemy);

    // Store the total enemies since they are shifted
    // from the array when they are spawned
    this.enemyCount++;
  }
}
