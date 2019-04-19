function createDisplayable(commonlib,mylib){
  'use strict';
  function Displayable(el){
  }
  Displayable.prototype.__cleanUp = function(){
  };
  Displayable.prototype.show = function(){
    commonlib.set(this,'display',true);
  };
  Displayable.prototype.hide = function(){
    commonlib.set(this,'display',false);
  };
  mylib.Displayable = Displayable;
}

module.exports = createDisplayable;

