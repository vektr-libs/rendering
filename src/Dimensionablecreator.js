function createDimensionable(mylib){
  'use strict';
  function Dimensionable(storageel){
    this.dimensions = storageel.dimensions ? storageel.dimensions.slice() : storageel.content.dimensions.slice();
  }
  Dimensionable.prototype.__cleanUp = function(){
    this.dimensions = null;
  };
  mylib.Dimensionable = Dimensionable;
}

module.exports = createDimensionable;
