function createPathContent(lib,mylibContent){
  'use strict';
  function Path(rendershape,storageel){
    mylibContent.VectorContent.call(this,rendershape);
    this.__curveactions = null;
    this._boundingBox = null;
    if(storageel.content){
      this.__curveactions = storageel.content.__curveactions.slice();
      this._boundingBox = storageel.content.boundingBox().slice();
    }else{
      this.__curveactions = storageel.__curveactions.slice();
      this._boundingBox = storageel.boundingBox.slice();
    }
  }
  lib.inherit(Path,mylibContent.VectorContent);
  Path.prototype.render = function(ctx,doclip){
    if(!this.__curveactions.length){return;}
    mylibContent.VectorContent.prototype.render.call(this,ctx,doclip);
  };
  Path.prototype.boundingBox = function(){
    return this._boundingBox;
  };
  function applyCurveAction(ctx,ca){
    ca(ctx);
  }
  Path.prototype.renderContents = function(ctx){
    this.__curveactions.forEach (applyCurveAction.bind(null,ctx));
  };
  Path.prototype.__cleanUp = function(){
    this.__curveactions = null;
    mylibContent.VectorContent.prototype.__cleanUp.call(this);
  };
  mylibContent.Path = Path;
}

module.exports = createPathContent;

