function createVectorContentContent(lib,utillib,commonlib,mylibContent,mylib){
  'use strict';
  function VectorContent(rendershape){
    mylibContent.Content.call(this,rendershape);
    this.cache = null;
  }
  lib.inherit(VectorContent,mylibContent.Content);
  VectorContent.prototype.isClosed = function(){
    return true;
  };
  VectorContent.prototype.renderWCache = function(ctx,doclip){
    /*
    if(!doclip && !(this.stroke!=='none'||this.fill!=='none')){
      return;
    }
    */
    if(this.id.indexOf('_hotspot')===this.id.length-8){
      return this.renderWOCache(ctx,doclip);
    }
    var rb = this.boundingBox(), backingScale = window.devicePixelRatio || 1;
    if(!this.cache){
      //if(rb[2]>1000 || rb[3]>1000){return;}
      this.cache = document.createElement('canvas');
      commonlib.enable3DAcceleration(this.cache);
      this.cache.width = Math.ceil(rb[2])*backingScale;
      this.cache.height = Math.ceil(rb[3])*backingScale;
      //console.log('new cache, ',this,this.cache.width,'x',this.cache.height,'(',rb[2],'x',rb[3],') ',-rb[0],-rb[1]);
      var _ctx = this.cache.getContext("2d");
      /*
      _ctx.fillStyle = 'black';
      _ctx.fillRect(0,0,rb[2],rb[3]);
      _ctx.fillStyle = 'white';
      _ctx.fillText(this.id,10,10);
      */
      _ctx.clearRect(0,0,rb[2],rb[3]);
      if(backingScale!==1){
        _ctx.scale(backingScale,backingScale);
      }
      _ctx.translate(-rb[0],-rb[1]);
      _ctx.fillStyle = ctx.fillStyle;
      _ctx.strokeStyle = ctx.strokeStyle;
      this.renderWOCache(_ctx,doclip);
      this.render(ctx);
      return;
    }
    ctx.save();
    ctx.translate(rb[0],rb[1]);
    if(backingScale!==1){
      ctx.scale(1/backingScale,1/backingScale);
    }
    ctx.imageSmoothingEnabled=true;
    ctx.drawImage(this.cache,0,0);
    ctx.restore();
  };
  VectorContent.prototype.renderWOCache = function(ctx,doclip){
    if(!doclip && !(this.stroke!=='none'||this.fill!=='none')){
      return;
    }
    //mylib.Stylable.prototype.applyStyle.call(this,ctx,doclip);
    ctx.beginPath();
    this.renderContents(ctx);
    if(this.isClosed()){
      ctx.closePath();
    }
    if(!doclip){
      this.applyFillAndStroke(ctx);
    }
  };
  VectorContent.prototype.render = mylibContent.options.vectorcontentcache ? VectorContent.prototype.renderWCache : VectorContent.prototype.renderWOCache;
  VectorContent.prototype.applyFillAndStroke = function(ctx){
    //if(this.fill){
    //if(ctx.fillStyle){
    if(this.shape.style.fill!=='none'){
      utillib.log(this.shape.id,'applying fill',ctx.fillStyle);
      ctx.fill();
    }
    //if(this.stroke){
    //if(ctx.strokeStyle){
    if(this.shape.style.stroke!=='none'){
      utillib.log(this.shape.id,'applying stroke',ctx.strokeStyle);
      ctx.stroke();
    }
  };
  VectorContent.prototype.__cleanUp = function(){
    this.cache = null;
    mylibContent.Content.prototype.__cleanUp.call(this);
  };
  mylibContent.VectorContent = VectorContent;
}

module.exports = createVectorContentContent;
