function createCircle(lib,mylib){
  'use strict';
  function Circle(cb,ctx,storageel,parnt){
    mylib.Shape.call(this,ctx,storageel,parnt);
    this.set('content',new mylib.content.Circle(this,storageel));
    cb(this);
  }
  lib.inherit(Circle,mylib.Shape);
  Circle.prototype.tagName = function(){
    return 'circle';
  };
  mylib.Circle = Circle;
}

module.exports = createCircle;
