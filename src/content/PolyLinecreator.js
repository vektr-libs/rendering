function createPolyLineContent(lib,mylibContent,mylib){
  'use strict';
  function PolyLine(rendershape,storageel){
    mylib.Areable.call(this,storageel);
    mylibContent.VectorContent.call(this,rendershape);
    this.points = (storageel.content ? storageel.content : storageel).points.slice();
  }
  lib.inherit(PolyLine,mylibContent.VectorContent);
  PolyLine.prototype.isClosed = function(){
    return false;
  };
  PolyLine.prototype.lineTo = function(ctx,point,pointindex){
    if(pointindex===0){
      return;
    }
    ctx.lineTo.apply(ctx,point);
  };
  PolyLine.prototype.renderContents = function(ctx){
    ctx.moveTo.apply(ctx,this.points[0]);
    this.points.forEach(this.lineTo.bind(this,ctx));
  };
  PolyLine.prototype.boundingBox = function(){
    return this.pos.concat(this.dimensions);
  };
  PolyLine.prototype.__cleanUp = function(){
    this.points = null;
    mylib.Areable.prototype.__cleanUp.call(this);
    mylibContent.VectorContent.prototype.__cleanUp.call(this);
  };
  mylibContent.PolyLine = PolyLine;
}

module.exports = createPolyLineContent;

