function createRadialGradient(lib,mathlib,mylib){
  'use strict';
  function RadialGradient(cb,ctx,storageel,parnt){
    this.radials=storageel.radials.slice();
    mylib.Gradient.call(this,ctx,storageel,parnt);
    cb(this);
  }
  lib.inherit(RadialGradient,mylib.Gradient);
  RadialGradient.prototype.tagName = function(){
    return 'radialGradient';
  };
  RadialGradient.prototype.createGradient = function(ctx){
    var r = new Array(this.radials.length);
    mathlib.coordsToSpace(this.radials,this.transformMatrix,r,0,2);
    mathlib.coordsToSpace(this.radials,this.transformMatrix,r,3,2);
    r[2] = mathlib.lengthInSpace(this.radials[2],this.transformMatrix);
    r[5] = mathlib.lengthInSpace(this.radials[5],this.transformMatrix);
    this.gradient = ctx.createRadialGradient.apply(ctx,r);
  };
  mylib.RadialGradient = RadialGradient;
}

module.exports = createRadialGradient;

