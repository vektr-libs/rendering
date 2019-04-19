function createRasterContent(lib,mylibContent,mylib){
  'use strict';
  function Raster(rendershape,storageel){
    mylibContent.Content.call(this,rendershape);
    mylib.Areable.call(this,storageel);
    var sprite = storageel.content ? storageel.content.sprite : storageel;
    this.sprite = sprite;
    if(sprite.attachListener){
      sprite.attachListener('changed',this.originalChanged.bind(this));
    }/*else{
      //I'm on my own with this sprite...
    }*/
  }
  lib.inherit(Raster,mylibContent.Content);
  Raster.prototype.set_image = function(img){
    this.sprite.image = img;
  };
  Raster.prototype.get_image = function(){
    return this.sprite.image;
  };
  Raster.prototype.originalChanged = function(){
    this.changed.fire();
  };
  Raster.prototype.render= function(ctx){
    ctx.drawImage(this.sprite.image,this.pos[0],this.pos[1],this.dimensions[0],this.dimensions[1]);
  };
  Raster.prototype.applyFillAndStroke = lib.dummyFunc;
  Raster.prototype.__cleanUp = function(){
    this.sprite = null;
    mylibContent.Content.prototype.__cleanUp.call(this);
    mylib.Areable.prototype.__cleanUp.call(this);
  };
  mylibContent.Raster = Raster;
}

module.exports = createRasterContent;
