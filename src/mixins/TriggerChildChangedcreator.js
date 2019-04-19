function createTriggerChildChanged(lib,commonlib,mylibMixins){
  'use strict';
  function TriggerChildChanged(parents) {
    this._tcc_parents = parents;
  }
  TriggerChildChanged.prototype.__cleanUp = function () {
    lib.arryNullAll(this._tcc_parents);
    this._tcc_parents = null;
  };

  function fire(p) {
    if (!p) return;
    //console.log('CHILD CHANGED ...');
    p.childChanged();
  }
  TriggerChildChanged.prototype.triggerChildChanged = function () {
    this._tcc_parents.forEach(fire);
  };
  TriggerChildChanged.addMethods = function (chld) {
    lib.inheritMethods(chld, TriggerChildChanged, 'triggerChildChanged');
  };

  mylibMixins.TriggerChildChanged = TriggerChildChanged;
}

module.exports = createTriggerChildChanged;
