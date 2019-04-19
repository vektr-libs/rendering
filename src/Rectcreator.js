function createRect(lib,mylib){
  'use strict';
  function Rect(cb,ctx,storageel,parnt){
    mylib.Shape.call(this,ctx,storageel,parnt);
    this.set('content',new mylib.content.Rect(this,storageel));
    cb(this);
  }
  lib.inherit(Rect,mylib.Shape);
  Rect.prototype.tagName = function(){
    return 'rect';
  };
  mylib.Rect = Rect;
}

module.exports = createRect;
