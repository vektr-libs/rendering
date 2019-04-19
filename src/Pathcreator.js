function createPath(lib,mylib){
  'use strict';
  function Path(cb,ctx,storageel,parnt){
    mylib.Shape.call(this,ctx,storageel,parnt);
    this.set('content',new mylib.content.Path(this,storageel));
    this.svgpathel = storageel.svgpathel;
    this.pathlength = null;//this.svgpathel.getTotalLength();
    cb(this);
  }
  lib.inherit(Path,mylib.Shape);
  Path.prototype.tagName = function(){
    return 'path';
  };
  Path.prototype.get_pathlength = function(){
    if(this.pathlength===null){
      this.pathlength = this.svgpathel.getTotalLength();
    }
    return this.pathlength;
  };
  Path.prototype.pointAtLength = function(proc){
    //var p = this.svgpathel.getPointAtLength(proc*this.pathlength);
    var p = this.svgpathel.getPointAtLength(proc*this.get('pathlength')||0);
    return [p.x,p.y];
  };
  Path.prototype.__cleanUp = function(){
    this.pathlength = null;
    this.svgpathel = null;
    mylib.Shape.prototype.__cleanUp.call(this);
  };
  mylib.Path = Path;
}

module.exports = createPath;
