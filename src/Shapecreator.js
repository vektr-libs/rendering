function createShape(lib,mylib){
  'use strict';
  var dummyShape = {
    id:'nullShape',
    style:{
      display:'inline'
    },
    content:null,
    transformMatrix:[1,0,0,1,0,0]
  };
  function Shape(ctx,storageel,parnt,newid){
    storageel = storageel || dummyShape;
    mylib.Placeholder.call(this,ctx,storageel,parnt,newid);
  }
  lib.inherit(Shape,mylib.Placeholder);
  Shape.prototype.set_content = function(val){
    if(this.content){
      this.content.destroy();
      this.content = null;
    }
    this.content = val;
    if(this.content){
      this.content.attachListener('changed',this.fireEvent.bind(this,'content'));
    }
  };
  Shape.prototype.reportRenderUnit = function(parntstack,cb){
    parntstack.push(this);
    parntstack.push(this.content);
    cb(parntstack);
  };
  Shape.prototype.__cleanUp = function(){
    if(this.content){
      this.content.destroy();
    }
    this.content = null;
    mylib.Placeholder.prototype.__cleanUp.call(this);
  };
  Shape.prototype.endRender = function(ctx,doclip){
    /*
    ctx.save();
    ctx.strokeStyle = 'green';
    ctx.fillStyle = 'green';
    ctx.beginPath();
    var bb = this.content.boundingBox();
    ctx.strokeRect.apply(ctx,bb);
    if(this.tagName()==='path'){
      ctx.fillText(this.id,bb[0],bb[1]);
      }
    ctx.closePath();
    ctx.restore();
    */
    mylib.Placeholder.prototype.endRender.call(this,ctx,doclip);
  };
  Shape.prototype.renderContent = function(ctx,doclip){
    this.content.render(ctx,doclip);
  };
  Shape.prototype.render = function(ctx,doclip){
    if(!this.content){return;}
    mylib.Placeholder.prototype.render.call(this,ctx,doclip);
  };
  Shape.prototype.containsPoint = function(point){
    var bb = this.content.boundingBox();
    if(point[0]<bb[0]){return false;}
    if(point[0]>bb[0]+bb[2]){return false;}
    if(point[1]<bb[1]){return false;}
    if(point[1]>bb[1]+bb[3]){return false;}
    return true;
  };
  mylib.Shape = Shape;
}

module.exports = createShape;

