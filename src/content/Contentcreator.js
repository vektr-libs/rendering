function createContentContent(lib,mylibContent,mylib){
  'use strict';
  function Content(mylibshape){
    this.shape = mylibshape;
    if(!(this.shape && typeof this.shape.style === 'object')){
      throw "No shape given";
    }
    lib.Destroyable.call(this);
    lib.Changeable.call(this);
    lib.Settable.call(this);
  }
  lib.inherit(Content,lib.Settable);
  Content.prototype.set = function(name,val){
    if(lib.Settable.prototype.set.call(this,name,val)){
      this.cache = null;
    }
  };
  Content.prototype.get = lib.Gettable.prototype.get;
  Content.prototype.attachListener = lib.Listenable.prototype.attachListener;
  Content.prototype.boundingBox = function(){
    return [0,0,1,1];
  };
  Content.prototype.destroy = lib.Destroyable.prototype.destroy;
  Content.prototype.__cleanUp = function(){
    lib.Settable.prototype.__cleanUp.call(this);
    lib.Changeable.prototype.__cleanUp.call(this);
    lib.Destroyable.prototype.__cleanUp.call(this);
    this.id = null;
  };
  mylibContent.Content = Content;
}

module.exports = createContentContent;
