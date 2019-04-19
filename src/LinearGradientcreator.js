function createLinearGradient(lib,mathlib,mylib){
  'use strict';
  function LinearGradient(cb,ctx,storageel,parnt){
    this.vector = storageel.vector.slice();
    mylib.Gradient.call(this,ctx,storageel,parnt);
    cb(this);
  }
  lib.inherit(LinearGradient,mylib.Gradient);
  LinearGradient.prototype.tagName = function(){
    return 'linearGradient';
  };
  LinearGradient.prototype.createGradient = function(ctx){
    var v = mathlib.coordsInSpace(this.vector,this.transformMatrix);
    this.gradient = ctx.createLinearGradient.apply(ctx,v);
  };
  mylib.LinearGradient = LinearGradient;
}

module.exports = createLinearGradient;
