function createSticky(lib, mylibAlgorithms) {
  'use strict';
  var Settable = lib.Settable, 
  Gettable = lib.Gettable, 
  Destroyable = lib.Destroyable;

  function Sticky (boundingBox, moveEvaluator, decisionpercx, decisionpercy, xprop, yprop) {
    Settable.call(this);
    Gettable.call(this);
    Destroyable.call(this);

    this.boundingBox = boundingBox;
    this.decisionpercx = decisionpercx;
    this.decisionpercy = decisionpercy;
    this.initialBB = this.boundingBox.get();
    this.moveEvaluator = moveEvaluator;
    this.xprop_name = xprop;
    this.yprop_name = yprop;
  }

  lib.inherit(Sticky, Destroyable);
  Sticky.prototype.set = Settable.prototype.set;
  Sticky.prototype.get = Gettable.prototype.get;

  Sticky.prototype.__cleanUp = function () {
    this.xprop_name = null;
    this.yprop_name = null;
    this.moveEvaluator = null;
    this.initialBB = null;
    this.decisionpercy = null;
    this.decisionpercx = null;
    this.boundingBox = null;
    Settable.prototype.__cleanUp.call(this);
    Gettable.prototype.__cleanUp.call(this);
    Destroyable.prototype.__cleanUp.call(this);
  };


  Sticky.prototype.decide = function () {
    var bb = this.boundingBox.get(),
      dx = this.initialBB[0]-bb[0], adx = Math.abs(dx), sdx = dx>0?1:-1,
      dy = this.initialBB[1]-bb[1], ady = Math.abs(dy), sdy = dy>0?1:-1,
      totalpath,trajectory,direction;

    if (adx<0.01 && ady<0.01) {
      return;
    }

    var other = null;

    ///if equal, go for x ... both are considerable ...
    if (adx >= ady) {
      direction = this.xprop_name;
      totalpath = this.initialBB[0];
      if(adx>bb[2]*this.decisionpercx){
        trajectory = bb[0]+sdx*bb[2];
      }else{
        trajectory = bb[0];
      }
      other = {axis:this.yprop_name, amount: dy};
    }else{
      direction = this.yprop_name;
      totalpath = this.initialBB[1];
      if(ady>bb[3]*this.decisionpercy){
        trajectory = bb[1]+sdy*bb[3];
      }else{
        trajectory = bb[1];
      }
      other = {axis: this.xprop_name, amount: dx};
    }

    var po = {};
    po[direction] = {amount:totalpath-trajectory};
    var s = this.moveEvaluator.speed || 1;
    var dur = Math.min(Math.abs(totalpath-trajectory)/s, 300);
    return{
      po : po,
      dur: dur,
      other : other
    };
  };

  Sticky.prototype.reset = function () {
    this.initialBB = this.boundingBox.get();
  };

  Sticky.isValidStickyConfigVal = function (val) {
    return val > 0 && val < 1;
  };
  mylibAlgorithms.Sticky = Sticky;
}

module.exports = createSticky;
