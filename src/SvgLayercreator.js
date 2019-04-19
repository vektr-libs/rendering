function createSvgLayer(lib,hierarchymixinslib,mylib){
  'use strict';
  var MouseEnvironmentableMixin = mylib.mixins.MouseEnvironmentableMixin;
  function SvgLayer(svg,matrix, boundingBox,el,scene,layerindex){
    this.scale = null;
    this.id = el.id+'_layer';
    lib.Destroyable.call(this);
    lib.Gettable.call(this);
    lib.Changeable.call(this);
    hierarchymixinslib.Child.call(this,scene.getLayer(layerindex));
    this.transformMatrix = matrix.slice();
    this.dimensions = svg.dimensions.slice();
    this.el = el;
    this.display = this.el.get('display');
    el.__parent = this;
    this.elChanged = el.attachListener('changed',this.childChanged.bind(this));
    MouseEnvironmentableMixin.call(this);
    this.__parent.environments.mouse.addChild(this.getMouseEnvironment());
    this.boundingBox = boundingBox;
    this.boundingBoxListener = this.boundingBox.changed.attach(this.onBoundingBoxChanged.bind(this));
  }
  SvgLayer.prototype.destroy = lib.Destroyable.prototype.destroy;
  SvgLayer.prototype.get = function(name){
    if(name==='__parent' || 'scale' === name){
      return lib.Gettable.prototype.get.call(this,name);
    }
    return this.el.get(name);
  };
  SvgLayer.prototype.set = function(name,value){
    if(name==='__parent' || 'scale' === name){
      return lib.Changeable.prototype.set.call(this,name,value);
    }
    return this.el.set(name,value);
  };
  SvgLayer.prototype.fireEvent = lib.Changeable.prototype.fireEvent;
  SvgLayer.prototype.attachListener = lib.Listenable.prototype.attachListener;
  SvgLayer.prototype.hotspotChildId = mylib.SvgParent.prototype.hotspotChildId;
  SvgLayer.prototype.hotspotChild = mylib.SvgParent.prototype.hotspotChild;
  MouseEnvironmentableMixin.addMethods(SvgLayer);
  SvgLayer.prototype.toLocalSpace = function(m){
    mylib.Placeholder.prototype.toLocalSpace.call(this,m);
    this.el.toLocalSpace(m);
  };
  SvgLayer.prototype.render = function () {
    if (this.checkIfVisible()) {
      //console.log('render ', this.el.id);
      mylib.util.renderScaled.apply(this, arguments);
    }else{
      //console.log('NO render ', this.el.id);
    }
  };
  SvgLayer.prototype.renderContents = function(ctx){
    this.el.render(ctx);
  };
  SvgLayer.prototype.checkIfVisible = function () {
    var cbb = this.boundingBox.get();
    var _parent = this.__parent.el;
    var ret = (cbb[0] > -cbb[2] && cbb[0] < cbb[2] && cbb[1] > -cbb[3] && cbb[1] < cbb[3]);
    /*
    //if(this.el.id==='presentation'){
      console.log(cbb);
    //}
    console.log(this.el.id,ret ? 'visible' : 'INvisible');
    */
    return ret;
  };
  SvgLayer.prototype.childChanged = function(){
    var eld = this.el.get('display');
    if(eld!=this.display){
      this.display = eld;
      this.fireEvent('display',eld);
    }
    this.__parent.childChanged(this);
  };
  SvgLayer.prototype.onBoundingBoxChanged = function(){
    if(this.checkIfVisible()){
      this.getMouseEnvironment().setActive(this.get('display'));
    }else{
      this.getMouseEnvironment().setActive(false);
    }
  };
  SvgLayer.prototype.__cleanUp = function(){
    this.boundingBoxListener.destroy();
    this.boundingBoxListener = null;
    this.boundingBox = null;
    MouseEnvironmentableMixin.prototype.destroy.call(this);
    this.display = null;
    this.elChanged.destroy();
    this.elChanged = null;
    this.el.__parent = null;
    this.el = null;
    this.dimensions = null;
    this.transformMatrix = null;
    this.id = null;
    this.scale = null;
    hierarchymixinslib.Child.prototype.__cleanUp.call(this);
    lib.Changeable.prototype.__cleanUp.call(this);
    lib.Gettable.prototype.__cleanUp.call(this);
    lib.Destroyable.prototype.__cleanUp.call(this);
  };
  mylib.SvgLayer = SvgLayer;
}

module.exports = createSvgLayer;
