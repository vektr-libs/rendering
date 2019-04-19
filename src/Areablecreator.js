function createAreable(mylib){
  'use strict';
  function Areable(storageel){
    mylib.Positionable.call(this,storageel);
    mylib.Dimensionable.call(this,storageel);
  }
  Areable.prototype.__cleanUp = function(){
    mylib.Dimensionable.prototype.__cleanUp.call(this);
    mylib.Positionable.prototype.__cleanUp.call(this);
  };
  Areable.prototype.containsPoint = function(point){
    if(point[0]<this.pos[0]){return false;}
    if(point[1]<this.pos[1]){return false;}
    if(point[0]>this.pos[0]+this.dimensions[0]){return false;}
    if(point[1]>this.pos[1]+this.dimensions[1]){return false;}
    return true;
  };
  mylib.Areable = Areable;
}

module.exports = createAreable;
