var Enemy = function (group, data) {
  var keys = Object.keys(data);
  var i;
  for (i = 0; i < keys.length; ++i) {
    this[keys[i]] = data[keys[i]];
  }
  this.attributes = new OrbEnemy();

  this.object = new createjs.Bitmap(preloader.get(this.attributes.sprite));
  this.object.x = game.width + this.object.image.width;
  this.object.y = this.y;

  this.group = group;

  this.angle = this.angle * Math.PI / 180;

  this.update = function () {
    this.object.vx = Math.cos(this.angle) * this.speed;
    this.object.vy = Math.sin(this.angle) * this.speed;

    this.object.x += this.object.vx * 33 / 1000;
    this.object.y += this.object.vy * 33 / 1000;

    if (this.object.x < -50 || this.object.y < -50 || this.object.y > game.height + 50 || this.object.x > game.width + 50) {
      this.destroy();
    }
  }

  this.takeDamage = function () {
    this.attributes.hp -= 1;

    if (this.attributes.hp === 0) {
      this.kill();
    }
  }

  this.kill = function () {
    this.destroy();
    new Explosion(this.object.x, this.object.y);
  }

  this.destroy = function () {
    game.enemiesLayer.removeChild(this);
  }
}
