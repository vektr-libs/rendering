function createPositionable(mylib){
  'use strict';
  function Positionable(storageel){
    this.pos = storageel.pos ? storageel.pos.slice() : storageel.content.pos.slice();
  }
  Positionable.prototype.__cleanUp = function(){
    this.pos = null;
  };
  mylib.Positionable = Positionable;
}

module.exports = createPositionable;
