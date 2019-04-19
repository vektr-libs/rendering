function createSvg(lib,commonlib,hierarchymixinslib,mylib){
  'use strict';
  var MouseEnvironmentableMixin = mylib.mixins.MouseEnvironmentableMixin;
  function Svg(canvas,storageel,parnt,cb){
    var now = (new Date()).getTime();
    lib.Destroyable.call(this);
    lib.Gettable.call(this);
    lib.Changeable.call(this,parnt);
    hierarchymixinslib.Parent.call(this);
    hierarchymixinslib.Child.call(this,parnt);
    this.transformMatrix = [1,0,0,1,0,0]; //to mimic an svg element
    mylib.Dimensionable.call(this,storageel);
    this.scale = null;
    this.id = storageel.id;
    this.statik = null;
    this.display = false;
    this.__renderUnits = new hierarchymixinslib.Parent();
    MouseEnvironmentableMixin.call(this);
    //canvas.environments.mouse.addChild(this.mouseEnvironment);
    //this.__elementsById = {};
    this.__elementsById = new lib.Map();
    if(storageel.statik){
      this.statik = new mylib.Statik(canvas.ctx,storageel.statik,this);
      this.statik.traverseChildrenAfter(this.registerObject.bind(this));
    }
    storageel.__children.traverse(mylib.SvgParent.prototype.processElement.bind(this,{originalid:storageel.id,start:now,target:storageel.__children.length,loaded:0,lap:now},cb,canvas.ctx));
  }
  lib.inherit(Svg,hierarchymixinslib.Parent);
  MouseEnvironmentableMixin.addMethods(Svg);
  Svg.prototype.onChildrenProduced = function(chldload,cb){
    chldload.lap = (new Date()).getTime();
    /*
    console.log(this.id,'load done in',chldload.lap-chldload.start,Object.keys(this.__elementsById).length,'objects');
    lib.traverse(this.__elementsById,this.checkElementById.bind(this,this.__elementsById));
    this.__elementsById = {}; //reset after load
    */
    console.log(this.id,'load done in',chldload.lap-chldload.start,this.__elementsById.count,'objects');
    this.__elementsById.traverse(this.checkElementById.bind(this,this.__elementsById));
    this.__elementsById = {}; //reset after load
    if(mylib.options.svgrendering==='linear'){
      this.__children.traverse(this.buildRenderUnits.bind(this));
      console.log(this.id,'renderUnits built in',(new Date()).getTime()-chldload.lap,this.__renderUnits.__children.arry.length,'objects');
    }
    mylib.SvgParent.prototype.onChildrenProduced.call(this,chldload,cb);
  };
  Svg.prototype.onChildProduced = function(chldload,cb,chld){
    if(chld){
      if('function' === typeof chld.traverseChildrenAfter){
        chld.traverseChildrenAfter(this.registerObject.bind(this));
      }else{
        this.registerObject(chld);
      }
    }
    mylib.SvgParent.prototype.onChildProduced.call(this,chldload,cb);
  };
  Svg.prototype.addRenderUnit = function(renderstack){
    this.__renderUnits.addChild(new mylib.RenderUnit(renderstack));
  };
  Svg.prototype.buildRenderUnits = function(el){
    if(!el.reportRenderUnit){return;}
    el.reportRenderUnit([this],this.addRenderUnit.bind(this));
  };
  Svg.prototype.get = lib.Gettable.prototype.get;
  Svg.prototype.set = lib.Settable.prototype.set;
  Svg.prototype.destroy = lib.Destroyable.prototype.destroy;
  Svg.prototype.leaveParent = hierarchymixinslib.Child.prototype.leaveParent;
  Svg.prototype.produceAndAddFrom = mylib.SvgParent.prototype.produceAndAddFrom;
  Svg.prototype.registerObject = commonlib.SvgBase.prototype.registerObject;
  Svg.prototype.checkElementById = commonlib.SvgBase.prototype.checkElementById;
  Svg.prototype.attachListener = lib.Listenable.prototype.attachListener;
  Svg.prototype.childById = mylib.SvgParent.prototype.childById;
  Svg.prototype.hotspotChildId = mylib.SvgParent.prototype.hotspotChildId;
  Svg.prototype.hotspotChild = mylib.SvgParent.prototype.hotspotChild;
  Svg.prototype.childAtPath = mylib.SvgParent.prototype.childAtPath;
  Svg.prototype.rePrefixChild = mylib.SvgParent.prototype.rePrefixChild;
  Svg.prototype.onResolveNeeded = commonlib.SvgBase.prototype.onResolveNeeded;
  Svg.prototype.set = lib.Changeable.prototype.set;
  Svg.prototype.fireEvent = lib.Changeable.prototype.fireEvent;
  Svg.prototype.containsPoint = mylib.Areable.prototype.containsPoint;
  Svg.prototype.getChildrenIDs = mylib.SvgParent.prototype.getChildrenIDs;
  Svg.prototype.__cleanUp = function(){
    if(this.statik){
      this.statik.destroy();
    }
    this.__elementsById = null;
    this.display = null;
    this.statik = null;
    this.ctx = null;
    this.id = null;
    this.scale = null;
    this.transformMatrix = null;
    //this.__renderUnits.destroy(); //TODO: ovo treba jos raspraviti
    this.__renderUnits.__cleanUp();
    this.__renderUnits = null;
    MouseEnvironmentableMixin.prototype.destroy.call(this);
    mylib.Dimensionable.prototype.__cleanUp.call(this);
    hierarchymixinslib.Child.prototype.__cleanUp.call(this);
    hierarchymixinslib.Parent.prototype.__cleanUp.call(this);
    lib.Changeable.prototype.__cleanUp.call(this);
    lib.Gettable.prototype.__cleanUp.call(this);
    lib.Destroyable.prototype.__cleanUp.call(this);
  };
  Svg.prototype.childChanged = mylib.SvgParent.prototype.childChanged;
  /*
  Svg.prototype.childChanged = function(child){
    this.changed.fire('child',child);
  };
  */
  Svg.prototype.activate = function(){
    console.log('activating');
    this.set('display',true);
    if(this.__parent.environments.mouse){
      this.__parent.environments.mouse.addChild(this.getMouseEnvironment());
    }
    console.log('activated');
  };
  Svg.prototype.show = Svg.prototype.activate;
  Svg.prototype.deactivate = function(){
    this.set('display',false);
    this.__parent.environments.mouse.removeChild(this.getMouseEnvironment());
  };
  Svg.prototype.hide = Svg.prototype.deactivate;
  Svg.prototype.toLocalSpace = mylib.Placeholder.prototype.toLocalSpace;
  Svg.prototype.flush = mylib.util.renderScaled;
  Svg.prototype.render = mylib.util.renderScaled;
  Svg.prototype.renderContents = function(ctx){
    switch(mylib.options.svgrendering){
      case 'tree':
        mylib.util.renderChildren.call(this,ctx);
        break;
      case 'linear':
        this.__renderUnits.__children.traverse(this.renderRenderUnit.bind(this,ctx));
        break;
    }
  };
  Svg.prototype.renderRenderUnit = function(ctx,r){
    r.render(ctx);
  };
  mylib.Svg = Svg;
}

module.exports = createSvg;
