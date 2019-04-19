function createDefs(lib,hierarchymixinslib,mylib){
  'use strict';
  function Defs(cb,ctx,storageel,parnt){
    this.id = storageel.id;
    lib.Destroyable.call(this);
    lib.Changeable.call(this);
    hierarchymixinslib.Child.call(this,parnt);
    mylib.SvgParent.call(this,cb,ctx,storageel);
  }
  lib.inherit(Defs,mylib.SvgParent);
  Defs.prototype.attachListener = lib.Listenable.prototype.attachListener;
  Defs.prototype.tagName = function(){
    return 'defs';
  };
  Defs.prototype.__cleanUp = function(){
    this.id = null;
    mylib.SvgParent.prototype.__cleanUp.call(this);
    hierarchymixinslib.Child.prototype.__cleanUp.call(this);
    lib.Changeable.prototype.__cleanUp.call(this);
    lib.Destroyable.prototype.__cleanUp.call(this);
  };
  mylib.Defs = Defs;
}

module.exports = createDefs;
