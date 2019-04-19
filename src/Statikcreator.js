function createStatik(lib,mylib){
  'use strict';
  function Statik(ctx,storageel,parnt){
    mylib.Group.call(this,ctx,storageel,parnt);
  }
  lib.inherit(Statik,mylib.Group);
  mylib.Statik = Statik;
}

module.exports = createStatik;
