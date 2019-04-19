function createClipPath(lib,mylib){
  'use strict';
  function ClipPath(cb,ctx,svgel,parnt){
    mylib.Group.call(this,cb,ctx,svgel,parnt);
    this.display = true;
  }
  lib.inherit(ClipPath,mylib.SvgParent);
  ClipPath.prototype.show = lib.dummyFunc;
  ClipPath.prototype.hide = lib.dummyFunc;
  ClipPath.prototype.attachListener = mylib.Shape.prototype.attachListener;
  ClipPath.prototype.startRender = mylib.Shape.prototype.startRender;
  ClipPath.prototype.endRender = mylib.Shape.prototype.endRender;
  ClipPath.prototype.render = mylib.Shape.prototype.render;
  ClipPath.prototype.renderContent = function(ctx){
    mylib.util.renderChildren.call(this,ctx,true);
  };
  ClipPath.prototype.__cleanUp = function(){
    mylib.Group.prototype.__cleanUp.call(this);
  };
  mylib.ClipPath = ClipPath;
}

module.exports = createClipPath;

