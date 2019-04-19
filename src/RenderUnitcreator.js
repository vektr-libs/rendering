function createRenderUnit(lib,commonlib,mylib){
  'use strict';
  function RenderUnit(stack){
    lib.Destroyable.call(this);
    lib.Child.call(this);
    lib.Listenable.call(this);
    this.content = stack.pop(); //once stack is popped, MatrixStack can come into play
    this.display = new commonlib.ANDStackedProperty('display',stack);
    this.transformMatrix = new commonlib.LazyDynamicStackedProperty('transformMatrix',stack);
  }
  lib.inherit(RenderUnit,commonlib.MatrixStack);
  RenderUnit.prototype.destroy = lib.Destroyable.prototype.destroy;
  RenderUnit.prototype.attachListener = lib.Listenable.prototype.attachListener;
  RenderUnit.prototype.isPath = function(patharry){
    if(this.stack.length!==patharry.length){return false;}
    for(var i in patharry){
      if(this.stack[i] !== patharry[i]){
        return false;
      }
    }
    return true;
  };
  RenderUnit.prototype.render = function(ctx){
    if(!this.display.get()){return;}
    ctx.save();
    ctx.transform.apply(ctx,this.transformMatrix.get());
    this.content.render(ctx);
    ctx.restore();
  };
  RenderUnit.prototype.__cleanUp = function(){
    this.transformMatrix.destroy();
    this.transformMatrix = null;
    this.display.destroy();
    this.display = null;
    this.content = null;
    lib.Listenable.prototype.__cleanUp.call(this);
    lib.Child.prototype.__cleanUp.call(this);
    lib.Destroyable.prototype.__cleanUp.call(this);
  };
  mylib.RenderUnit = RenderUnit;
}

module.exports = createRenderUnit;
