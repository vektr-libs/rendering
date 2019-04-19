function createText(lib,mylib){
  'use strict';
  function Text(cb,ctx,storageel,parnt){
    lib.Settable.call(this);
    mylib.Shape.call(this,ctx,storageel,parnt);
    this.set('content',new mylib.content.Text(ctx,this,storageel));
    cb(this);
  }
  lib.inherit(Text,mylib.Shape);
  Text.prototype.get_text = function(){
    return this.content.text;
  };
  Text.prototype.set_text = function(val){
    this.content.set_text(val);
  };
  Text.prototype.__cleanUp = function(){
    mylib.Shape.prototype.__cleanUp.call(this);
    lib.Settable.prototype.__cleanUp.call(this);
  };
  Text.prototype.tagName = function(){
    return 'text';
  };

  Text.prototype.get_width = function () {
    return this.get('content')._boundingBox[2];
  };
  mylib.Text = Text;
}

module.exports = createText;
