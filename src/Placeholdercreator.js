function createPlaceholder(lib,mathlib,hierarchymixinslib,mylib){
  'use strict';
  function Placeholder(ctx,storageel,parnt,newid){
    lib.Destroyable.call(this,parnt);
    lib.Gettable.call(this,parnt);
    lib.Changeable.call(this,parnt);
    hierarchymixinslib.Child.call(this,parnt);
    mylib.Stylable.call(this,ctx,storageel);
    mylib.Displayable.call(this,storageel);
    this.id = newid || storageel.id;
    this.clipPath = null;
    if(storageel.clipPath){
      new mylib.ClipPath([this,this.set,['clipPath']],ctx,storageel.clipPath,this);
    }
    this.transformMatrix = storageel.transformMatrix.slice();
  }
  lib.inherit(Placeholder,mylib.Stylable);
  Placeholder.prototype.__cleanUp = function(){
    this.transformMatrix = null;
    if(this.clipPath){
      this.clipPath.destroy();
    }
    this.clipPath = null;
    this.id = null;
    mylib.Displayable.prototype.__cleanUp.call(this);
    mylib.Stylable.prototype.__cleanUp.call(this);
    hierarchymixinslib.Child.prototype.__cleanUp.call(this);
    lib.Changeable.prototype.__cleanUp.call(this);
    lib.Gettable.prototype.__cleanUp.call(this);
    lib.Destroyable.prototype.__cleanUp.call(this);
  };
  Placeholder.prototype.attachListener = lib.Listenable.prototype.attachListener;
  Placeholder.prototype.destroy = lib.Destroyable.prototype.destroy;
  Placeholder.prototype.leaveParent = hierarchymixinslib.Child.prototype.leaveParent;
  Placeholder.prototype.show = mylib.Displayable.prototype.show;
  Placeholder.prototype.hide = mylib.Displayable.prototype.hide;
  Placeholder.prototype.set = lib.Changeable.prototype.set;
  Placeholder.prototype.fireEvent = lib.Changeable.prototype.fireEvent;
  Placeholder.prototype.set_dopacity = function(val){
    if (!(lib.isNumber(val) && val!==0)) {
      return false;
    }
    this.set('opacity',this.get('opacity')+val);
  };
  Placeholder.prototype.set_dtx = function(val){
    if (!(lib.isNumber(val) && val!==0)) {
      return false;
    }
    this.transformMatrix[4]+=val;
    this.changed.fire('transformMatrix',this.transformMatrix);
  };
  Placeholder.prototype.set_dty = function(val){
    if (!(lib.isNumber(val) && val!==0)) {
      return false;
    }
    this.transformMatrix[5]+=val;
    this.changed.fire('transformMatrix',this.transformMatrix);
  };
  Placeholder.prototype.get = lib.Gettable.prototype.get;
  Placeholder.prototype.reportRenderUnit = function(parntstack,cb){
    parntstack.push(this);
    cb(parntstack);
  };
  Placeholder.prototype.toLocalSpace = function(matrix){
    mathlib.matrixToSpace(matrix,this.transformMatrix);
  };
  Placeholder.prototype.pointToLocalSpace = function(point){
    mathlib.pointToSpace(point,this.transformMatrix);
  };
  Placeholder.prototype.moveTo = function(x,y){
    if(x===this.transformMatrix[4]&&y===this.transformMatrix[5]){return;}
    this.transformMatrix[4] = x;
    this.transformMatrix[5] = y;
    this.changed.fire('transformMatrix',this.transformMatrix);
  };
  Placeholder.prototype.moveBy = function(x,y){
    if(!x&&!y){return;}
    this.transformMatrix[4] += x;
    this.transformMatrix[5] += y;
    this.changed.fire('transformMatrix',this.transformMatrix);
    if(x!==0){
      this.changed.fire('dtx',x);
    }
    if(y!==0){
      this.changed.fire('dty',y);
    }
  };
  Placeholder.prototype.transform = function(ctx){
    ctx.transform.apply(ctx,this.transformMatrix);
  };
  Placeholder.prototype.startRender = function(ctx,doclip){
    //console.log('rendering',this.id);
    ctx.save();
    if('undefined' !== typeof this.style.opacity){
      //ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha *= this.style.opacity;
    }
    this.transform(ctx);
    if(this.clipPath){
      var old = this.clipPath.style.display;
      this.clipPath.style.display = true;
      this.clipPath.render(ctx,true);
      this.clipPath.style.display = old;
      ctx.clip();
    }
    mylib.Stylable.prototype.applyStyle.call(this,ctx,doclip);
  };
  Placeholder.prototype.renderContent = function(ctx,doclip){
    console.log('void render content');
  };
  Placeholder.prototype.endRender = function(ctx,doclip){
    if(doclip){
      //console.log(this.id,'clipping');
      ctx.clip();
    }
    ctx.restore();
  };
  Placeholder.prototype.render = function(ctx,doclip){
    if(!this.style.display){return;}
    this.startRender(ctx,doclip);
    this.renderContent(ctx,doclip);
    this.endRender(ctx,doclip);
  };
  mylib.Placeholder = Placeholder;
}

module.exports = createPlaceholder;
