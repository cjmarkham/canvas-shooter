var OrbEnemy = function (x, y) {
  this.sprite = 'orb';
  this.canFire = true;
  this.speed = 1;
  this.hp = 1;
  this.value = 100;
  this.willRotate = true;

  this.weaponSlots = [
    {
      x: 50,
      y: 0,
      level: 1,
    }
  ];
}
