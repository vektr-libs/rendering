function createRectContent(lib,mylibContent,mylib){
  'use strict';
  function Rect(rendershape,storageel){
    mylib.Areable.call(this,storageel);
    mylibContent.VectorContent.call(this,rendershape);
    this.rounding = storageel.rounding ? storageel.rounding.slice() : storageel.content.rounding.slice();
  }
  lib.inherit(Rect,mylibContent.VectorContent);
  Rect.prototype.renderContents = function(ctx){
    if(this.rounding && (this.rounding[0] || this.rounding[1])){
      var x = this.pos[0], y = this.pos[1], width = this.dimensions[0], height = this.dimensions[1], rx = this.rounding[0], ry = this.rounding[1];
      ctx.moveTo(x + rx, y);
      ctx.lineTo(x + width - rx, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + ry);
      ctx.lineTo(x + width, y + height - ry);
      ctx.quadraticCurveTo(x + width, y + height, x + width - rx, y + height);
      ctx.lineTo(x + rx, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - ry);
      ctx.lineTo(x, y + ry);
      ctx.quadraticCurveTo(x, y, x + rx, y);
    }else{
      ctx.rect(this.pos[0],this.pos[1],this.dimensions[0],this.dimensions[1]);
    }
  };
  Rect.prototype.boundingBox = function(){
    return this.pos.concat(this.dimensions);
  };
  Rect.prototype.__cleanUp = function(){
    this.rounding = null;
    mylib.Areable.prototype.__cleanUp.call(this);
    mylibContent.VectorContent.prototype.__cleanUp.call(this);
  };
  mylibContent.Rect = Rect;
}

module.exports = createRectContent;
