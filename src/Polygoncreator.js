function createPolygon(lib,mylib){
  'use strict';
  function Polygon(cb,ctx,storageel,parnt){
    mylib.Shape.call(this,ctx,storageel,parnt);
    this.set('content',new mylib.content.Polygon(this,storageel));
    cb(this);
  }
  lib.inherit(Polygon,mylib.Shape);
  Polygon.prototype.tagName = function(){
    return 'polygon';
  };
  mylib.Polygon = Polygon;
}

module.exports = createPolygon;
