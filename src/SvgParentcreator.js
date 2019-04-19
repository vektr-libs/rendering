function createSvgParent(lib,commonlib,hierarchymixinslib,mylib){
  'use strict';
  function SvgParent(cb,ctx,storageel){
    hierarchymixinslib.Parent.call(this);
    lib.runNext(this.createChildren.bind(this,storageel,cb,ctx));
  }
  lib.inherit(SvgParent,hierarchymixinslib.Parent);
  SvgParent.prototype.destroy = function () {
    this.__cleanUp();
  };

  SvgParent.prototype.__cleanUp = function () {
    hierarchymixinslib.Parent.prototype.__cleanUp.call(this);
  };

  SvgParent.prototype.createChildren = function(storageel,cb,ctx){
    if(!(storageel&&storageel.__children)){
      return;
    }
    var chlen = storageel.__children.length;
    if(chlen){
      storageel.__children.traverse(this.processElement.bind(this,{target:chlen,loaded:0,originalid:storageel.id},cb,ctx));
    }else{
      this.onChildrenProduced(null,cb);
    }
  };
  SvgParent.prototype.processElement = function(chldload,cb,ctx,el){
    this.produceAndAddFrom(chldload,cb,ctx,el);
  };
  SvgParent.prototype.rePrefixChild = function(originalid,chld){
    if(chld.id.indexOf(originalid)===0){
      //console.log(this.id,'renaming',chld.id);
      chld.id=this.id+chld.id.substring(originalid.length);
      //console.log('to',chld.id,'because of',originalid);
    }
  };
  SvgParent.prototype.onChildrenProduced = function(chldload,cb){
    if(chldload && this.id!==chldload.originalid){
      this.__children.traverse(this.rePrefixChild.bind(this,chldload.originalid));
      /*
      var hel = this.childById(chldload.originalid+'_hotspot');
      if(hel){
        hel.id = this.hotspotChildId();
      }
      */
    }
    lib.runNext(cb.bind(null, this));
  };
  SvgParent.prototype.onChildProduced = function(chldload,cb,chld){
    chldload.loaded++;
    if(chldload.loaded === chldload.target){
      //console.log(this.id,'finished child production with',chld?chld.id:'none',',',chldload.target,'children');
      this.onChildrenProduced(chldload,cb);
    }/*else{
      console.log(this.id,'has',chldload.target-chldload.loaded,'to load still');
    }*/
  };
  SvgParent.prototype.produceAndAddFrom = function(chldload,cb,ctx,el){
    var ctor = commonlib.svg.ctorFor(mylib,el);
    if(typeof ctor !== 'function'){
      this.onChildProduced(chldload,cb);
      return;
    }
    return new ctor(this.onChildProduced.bind(this,chldload,cb),ctx,el,this);
  };
  function findById(result,id,el){
    if(el.id===id){
      result.el = el;
      return true;
    }
  }
  SvgParent.prototype.childById = function(id){
    var res = {result:null};
    if(this.__children.traverseConditionally(findById.bind(this,res,id))){
      return res.el;
    }
  };
  SvgParent.prototype.hotspotChildId = function(){
    return this.id+'_hotspot';
  };
  SvgParent.prototype.hotspotChild = function(){
    return this.childById(this.hotspotChildId());
  };

  function processReplacers (path, replacers) {
    var regexp = null;
    for (var i in replacers) {
      regexp = new RegExp('\{'+i+'\}', 'g');
      path = path.replace(regexp, replacers[i]);
      regexp = null;
    }
    return path;
  }

  SvgParent.prototype.childAtPath = function(path, replacers){
    if (replacers) {
      path = processReplacers(path, replacers);
    }
    var p = this, pa = path.split('.'), cursor=0;
    while(p && cursor<pa.length){
      p = p.childById(pa[cursor]);
      cursor++;
    }
    if(cursor===pa.length){
      return p ;
    }
  };
  SvgParent.prototype.onResolveNeeded = function(child,needtype,needname){
    if(this.__parent && this.__parent.onResolveNeeded){
      this.__parent.onResolveNeeded(child,needtype,needname);
    }
  };
  SvgParent.prototype.addChild = function(child){
    hierarchymixinslib.Parent.prototype.addChild.call(this,child);
    this.changed.fire();
  };
  SvgParent.prototype.removeChild = function(child){
    hierarchymixinslib.Parent.prototype.removeChild.call(this,child);
    this.changed.fire();
  };
  SvgParent.prototype.childChanged = function(el,name,value){
    if(!this.__parent){return;}
    if(this.style && !this.style.display){return;}
    this.__parent.childChanged(this);
  };

  function getid(ret, conditionalf, item) {
    var id = item.id;
    if (lib.isFunction(conditionalf) && !conditionalf(id, item)) return;
    ret.push (id);
  }

  function checkRegexp(regexp, id, item) {
    return id.match(regexp);
  }

  SvgParent.prototype.getChildrenIDs = function (conditionalf) {
    var ret = [];

    if (conditionalf instanceof RegExp) {
      conditionalf = checkRegexp.bind(null, conditionalf);
    }
    this.__children.traverse(getid.bind(null, ret, conditionalf));
    return ret;
  };

  SvgParent.prototype.getIndexedChildren = function (regexp) {
    //samo proveri da li ce uvek da ih slozi u arr po indexu ....
    if (!regexp) {
      regexp = new RegExp ('^'+this.get('id')+'_(\\d+)$');
    }
    var ids = this.getChildrenIDs(regexp);
    var ret = new Array(ids.length);
    ids.forEach(indexChild.bind(null, ret, this, regexp));
    return ret;
  };

  function indexChild (ret, self, regexp, id) {
    var index = parseInt(id.match(regexp)[1]);
    ret[index] = self.childById(id);
  }
  mylib.SvgParent = SvgParent;
}

module.exports = createSvgParent;
