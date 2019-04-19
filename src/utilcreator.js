function createUtil(lib,utillib,commonlib,mylib){
  'use strict';
  function renderElement(ctx,doclip,el){
    if(!el){return;}
    utillib.log(el.id);
    if('function' !== typeof el.render){return;}
    el.render(ctx,doclip);
  }
  mylib.util.renderChildren = function(ctx,doclip){
    this.__children.traverse(renderElement.bind(null,ctx,doclip));
  };
  mylib.clone = function(el,cb,parnt,newid){
    var ctor = commonlib.svg.ctorFor(mylib,el),ret,originaldisplay;
    if(ctor){
      originaldisplay = el.style.display;
      el.style.display = false;
      ret =  new ctor(cb,'clone',el,parnt,newid);
      el.style.display = originaldisplay;
      return ret;
    }else{
      cb(null);
    }
  };
  mylib.util.renderScaled = function(w,h,ctx){
    if(!this.get('display')){return;}
    var now = (new Date()).getTime();
    var hr = w/this.dimensions[0], vr = h/this.dimensions[1], r = Math.min(hr,vr);
    /*
    console.log(this.id,'scale',this.scale);
    console.log(w,'=>',this.dimensions[0]);
    console.log(h,'=>',this.dimensions[1]);
    console.log(r);
    */
    ctx.save();
    ctx.scale(r,r);
    ctx.transform.apply(ctx,this.transformMatrix);
    this.renderContents(ctx);
    ctx.restore();
    this.set('scale',r);
    //console.log((new Date()).getTime()-now);
  };
}

module.exports = createUtil;
