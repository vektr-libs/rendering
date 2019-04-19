function createUse(lib,mathlib,mylib){
  'use strict';
  var dummyUse = {
    id:'nullUse',
    style:{
      fill:'none',
      stroke:'none',
      display:'inline'
    },
    transformMatrix:[1,0,0,1,0,0],
    pos:[0,0],
    dimensions:[0,0],
    usedObj:null
  };
  function Use(cb,ctx,storageel,parnt,newid){
    storageel = storageel||dummyUse;
    mylib.Placeholder.call(this,ctx,storageel,parnt,newid);
    mylib.Areable.call(this,storageel);
    this.usedObj = null;
    this.usedObjDestroyedListener = null;
    if(ctx==='clone'){
      this.set('usedObj',storageel.usedObj);
    }else{
      if(storageel.usedObj && parnt && parnt.onResolveNeeded){
        parnt.onResolveNeeded(this,'usedObj',storageel.usedObj.id);
      }
    }
    cb(this);
  }
  for(var n in mylib.Stylable.prototype){
    Use.prototype[n] = mylib.Stylable.prototype[n];
  }
  Use.prototype.show = mylib.Displayable.prototype.show;
  Use.prototype.hide = mylib.Displayable.prototype.hide;
  Use.prototype.get = mylib.Placeholder.prototype.get;
  Use.prototype.attachListener = mylib.Placeholder.prototype.attachListener;
  Use.prototype.leaveParent = mylib.Placeholder.prototype.leaveParent;
  Use.prototype.destroy = mylib.Placeholder.prototype.destroy;
  Use.prototype.transform = mylib.Placeholder.prototype.transform;
  Use.prototype.render = mylib.Placeholder.prototype.render;
  Use.prototype.set = mylib.Placeholder.prototype.set;
  Use.prototype.fireEvent = mylib.Placeholder.prototype.fireEvent;
  Use.prototype.fullPath = mylib.Placeholder.prototype.fullPath;
  Use.prototype.pathTo = mylib.Placeholder.prototype.pathTo;
  Use.prototype.startRender = mylib.Placeholder.prototype.startRender;
  Use.prototype.set_dtx = mylib.Placeholder.prototype.set_dtx;
  Use.prototype.set_dty = mylib.Placeholder.prototype.set_dty;
  Use.prototype.set_dopacity = mylib.Placeholder.prototype.set_dopacity;
  Use.prototype.toLocalSpace = function(matrix){
    mylib.Placeholder.prototype.toLocalSpace.call(this,matrix);
    mathlib.matrixToSpace(matrix,[1,0,0,1,this.pos[0],this.pos[1]]);
  };

  Use.prototype.pointToLocalSpace = function(point){
    mylib.Placeholder.prototype.pointToLocalSpace.call(this,point);
    point[0] += this.pos[0];
    point[1] += this.pos[1];
  };
  Use.prototype.moveTo = function(x,y){
    if(x===this.pos[0]&&y===this.pos[1]){return;}
    this.pos[0] = x;
    this.pos[1] = y;
    this.changed.fire('transformMatrix',this.transformMatrix);
  };
  Use.prototype.moveBy = function(x,y){
    if(!x&&!y){return;}
    this.pos[0] += x;
    this.pos[1] += y;
    this.changed.fire('transformMatrix',this.transformMatrix);
  };
  Use.prototype.reportRenderUnit = function(parntstack,cb){
    parntstack.push(this);
    this.usedObj.reportRenderUnit(parntstack,cb);
  };
  Use.prototype.renderContent = function(ctx,doclip){
    ctx.translate.apply(ctx,this.pos);
    //if (!this.usedObj) return;
    this.usedObj.render(ctx,doclip);
  };
  Use.prototype.endRender = mylib.Placeholder.prototype.endRender;
  Use.prototype.tagName = function(){
    return 'use';
  };
  Use.prototype.childById = function(id){
    return (this.usedObj && this.usedObj.id===id) ? this.usedObj : null;
  };
  Use.prototype.childAtPath = function(path){
    if(this.usedObj && 'function' === typeof this.usedObj.childAtPath){
      return this.usedObj.childAtPath(path);
    }
  };
  Use.prototype.tearOffUse = function(cb){
    if(!this.usedObj){
      lib.runNext(cb);
      return;
    }
    if(this.usedObj.__parent === this){
      lib.runNext(cb.bind(null, this.usedObj));
      return;
    }
    mylib.clone(this.usedObj,cb,this,this.usedObj.id);
  };

  Use.prototype.tearOffUseD = function (defer) {
    if (!defer) defer = lib.q.defer();
    this.tearOffUse(defer.resolve.bind(defer));
    return defer.promise;
  };
  Use.prototype.purgeUse = function(){
    if(!this.usedObj){
      return;
    }
    if (this.usedObjDestroyedListener) { //should never pass ....
      this.usedObjDestroyedListener.destroy();
    }
    this.usedObjDestroyedListener = null;
    if(this.usedObj.__parent === this){
      this.usedObj.destroy();
    }
    this.usedObj = null;
  };

  Use.prototype.set_usedObj = function (val) {
    this.purgeUse();
    this.usedObj = val;
    this.usedObjDestroyedListener = val.destroyed.attach(this.purgeUse.bind(this));
    this.changed.fire('usedObj', val);
  };

  Use.prototype.addChild = function(chld){
    //chld.__parent = this;
    this.set('usedObj',chld);
    lib.Parent.prototype.addChild.call(this,chld);
  };
  Use.prototype.setIndexOnChild = function(chld){
    chld.__childindex = 0;
  };
  Use.prototype.removeChild = Use.prototype.purgeUse;
  Use.prototype.childChanged = function(chld){
    if (!this.__parent)  return;
    this.__parent.childChanged(this);
  };
  Use.prototype.__cleanUp = function(){
    this.purgeUse();
    mylib.Areable.prototype.__cleanUp.call(this);
    mylib.Placeholder.prototype.__cleanUp.call(this);
  };
  mylib.Use = Use;
}

module.exports = createUse;
