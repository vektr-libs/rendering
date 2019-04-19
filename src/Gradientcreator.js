function createGradient(lib,mathlib,hierarchymixinslib,mylib){
  'use strict';
  function Gradient(ctx,storageel,parnt){
    this.id = storageel.id;
    this.ctx = ctx==='clone' ? storageel.ctx : ctx;
    lib.Destroyable.call(this);
    lib.Changeable.call(this);
    hierarchymixinslib.Child.call(this,parnt);
    this.stops = storageel.stops.slice();
    this.parentGradient = null;
    this.parentGradientListener = null;
    this.transformMatrix = storageel.transformMatrix.slice();
    this.gradient = null;
    if(storageel.parentGradient){
      if(!storageel.parentGradient.createGradient){
        if(parnt && parnt.onResolveNeeded){
          parnt.onResolveNeeded(this,'parentGradient',storageel.parentGradient.id);
        }
      }else{
        this.set('parentGradient',storageel.parentGradient);
      }
    }else{
      this.set('parentGradient',this);
    }
  }
  Gradient.prototype.attachListener = lib.Listenable.prototype.attachListener;
  Gradient.prototype.set = lib.Changeable.prototype.set;
  Gradient.prototype.fireEvent = lib.Changeable.prototype.fireEvent;
  Gradient.prototype.destroy = lib.Destroyable.prototype.destroy;
  Gradient.prototype.__cleanUp = function(){
    this.id = null;
    this.ctx = null;
    this.stops = null;
    if (this.parentGradientListener) {
      this.parentGradientListener.destroy();
    }
    this.parentGradientListener = null;
    this.parentGradient = null;
    this.transformMatrix = null;
    this.gradient = null;
    hierarchymixinslib.Child.prototype.__cleanUp.call(this);
    lib.Changeable.prototype.__cleanUp.call(this);
    lib.Destroyable.prototype.__cleanUp.call(this);
  };
  Gradient.prototype.createGradient = function(){
  };
  Gradient.prototype.set_parentGradient = function(grad){
    this.parentGradient = grad;
    if (grad) {
      if (this.parentGradientListener) {
        this.parentGradientListener.destroy();
      }
      this.parentGradientListener = grad.changed.attach(this.rebuild.bind(this));
    }
    this.rebuild();
    return true;
  };
  Gradient.prototype.set_stops = function(stops){
    this.stops = stops;
    this.rebuild();
    return true;
  };
  Gradient.prototype.compoundTransform = function(){
    if(this.parentGradient){
      return mathlib.matrixInSpace(this.parentGradient.compoundTransform(),this.transformMatrix);
      //return mathlib.matrixInSpace(this.transformMatrix,this.parentGradient.compoundTransform());
    }else{
      return this.transformMatrix;
    }
  };
  Gradient.prototype.getStops = function(transform){
    if(this.stops.length || !this.parentGradient){// || this.parentGradient === this){
      return this.stops;
    }else{
      return this.parentGradient.getStops(transform);
    }
  };
  function addStop(stop){
    this.addColorStop.apply(this,stop);
  }
  Gradient.prototype.addStops = function(){
    if(!this.gradient){return;}
    this.getStops().forEach(addStop.bind(this.gradient));
  };
  Gradient.prototype.rebuild = function () {
    this.createGradient(this.ctx);
    this.addStops();
  };
  mylib.Gradient = Gradient;
}

module.exports = createGradient;
