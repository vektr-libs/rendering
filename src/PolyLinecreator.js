function createPolyLine(lib,mylib){
  'use strict';
  function PolyLine(cb,ctx,storageel,parnt){
    mylib.Shape.call(this,ctx,storageel,parnt);
    this.set('content',new mylib.content.PolyLine(this,storageel));
    cb(this);
  }
  lib.inherit(PolyLine,mylib.Shape);
  PolyLine.prototype.tagName = function(){
    return 'polyline';
  };
  mylib.PolyLine = PolyLine;
}

module.exports = createPolyLine;
