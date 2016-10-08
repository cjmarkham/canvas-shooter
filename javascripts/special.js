var Special = function (name) {
  this.attributes = specials[name.toLowerCase()];
  this.ammo = this.attributes.ammo;
  this.name = name;

  this.shoot = function () {
    var weapon = new window[this.name]();
    if (this.ammo > 0) {
      weapon.shoot();
      --this.ammo;
      game.ui.updateSpecialAmmo(this.ammo);
    }
  };

  return this;
};
