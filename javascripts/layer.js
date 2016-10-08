var Layer = function () {
  this.entities = [];
  this.container = new createjs.Container();
  this.container.x = 0;
  this.container.y = 0;
  game.stage.addChild(this.container);

  this.addChild = function (child) {
    this.entities.push(child);

    if (child.hasOwnProperty('object')) {
      this.container.addChild(child.object);
    }
  };

  this.removeChild = function (child) {
    var index = this.entities.findIndex(function (entity) {
      return entity.object.id === child.object.id;
    });

    this.entities.splice(index, 1);
    this.container.removeChild(child.object);
  };

  this.update = function () {
    var i;
    for (i = 0; i < this.entities.length; ++i) {
      var entity = this.entities[i];
      entity.update();
    }
  };

  return this;
};
