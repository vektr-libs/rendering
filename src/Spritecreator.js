function createSprite(lib,storagelib,mylib){
  'use strict';
  function Sprite(cb,ctx,storageel,parnt){
    mylib.Shape.call(this,ctx,storageel,parnt);
    this.set('content',new mylib.content.Raster(this,storageel));
    this.pos_constraints = null;
    cb(this);
  }
  lib.inherit(Sprite,mylib.Shape);
  Sprite.prototype.__cleanUp = function () {
    this.pos_constraints = null;
    mylib.Shape.prototype.__cleanUp.call(this);
  };

  Sprite.prototype.onRemoteLoaded = function(img){
    var dimensions, pos;
    if (this.pos_constraints) {
      dimensions = [img.width,img.height]; 
      pos = [0,0];
      this.pos_constraints.calculate(dimensions, pos);
    }else{
      dimensions = this.content.dimensions.slice();
      pos = this.content.pos.slice();
    }
    this.content = new mylib.content.Raster(this,{
      id:this.content.id,
      pos:pos,
      dimensions:dimensions,
      image:img
    }
    );
    this.fireEvent('content',this.content);
  };
  Sprite.prototype.loadRemote = function(url){
    return storagelib.Sprite.loadRemote(url).then(this.onRemoteLoaded.bind(this));
  };
  Sprite.prototype.tagName = function(){
    return 'image';
  };
  mylib.Sprite = Sprite;
}

module.exports = createSprite;
