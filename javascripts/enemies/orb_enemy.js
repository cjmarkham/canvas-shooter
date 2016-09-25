var OrbEnemy = function (x, y) {
  this.sprite = 'orb';
  this.canFire = true;
  this.speed = 1;
  this.hp = 1;
  this.value = 100;
  this.willRotate = true;

  this.weaponSlots = [
    {
      x: x + 50,
      y: y,
      level: 1,
    }
  ];
}
