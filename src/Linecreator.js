function createLine(lib,mylib){
  'use strict';
  function Line(cb,ctx,storageel,parnt){
    mylib.Shape.call(this,ctx,storageel,parnt);
    this.set('content',new mylib.content.Line(this,storageel));
    cb(this);
  }
  lib.inherit(Line,mylib.Shape);
  Line.prototype.tagName = function(){
    return 'line';
  };
  mylib.Line = Line;
}

module.exports = createLine;
