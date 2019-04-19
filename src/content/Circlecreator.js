function createCircleContent(lib,mylibContent,mylib){
  'use strict';
  function Circle(rendershape,storageel){
    mylibContent.VectorContent.call(this,rendershape);
    this.center = storageel.center ? storageel.center.slice() : storageel.content.center.slice();
    this.radius = 'undefined' !== typeof storageel.radius ? storageel.radius : storageel.content.radius;
  }
  lib.inherit(Circle,mylibContent.VectorContent);
  Circle.prototype.renderContents = function(ctx){
    ctx.arc(this.center[0],this.center[1],this.radius,0,2*Math.PI);
  };
  Circle.prototype.boundingBox = function(){
    return [this.center[0]-this.radius,this.center[1]-this.radius,this.center[0]+this.radius,this.center[1]+this.radius];
  };
  Circle.prototype.__cleanUp = function(){
    this.radius = null;
    this.center = null;
    mylib.Areable.prototype.__cleanUp.call(this);
    mylibContent.VectorContent.prototype.__cleanUp.call(this);
  };
  mylibContent.Circle = Circle;
}

module.exports = createCircleContent;

