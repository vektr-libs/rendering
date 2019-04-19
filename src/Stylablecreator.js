function createStylable(storagelib,commonlib,mylib){
  'use strict';
  function resolve(name,storageel){
    var val = storageel.style[name];
    if(val && val.id){
      this.__parent.onResolveNeeded(this,name,val.id);
    }else{
      commonlib.set(this,name,val);
    }
  }
  function Stylable(ctx,storageel){
    this.style = {};
    if(ctx==='clone'){
      this.set('display',storageel.get('display'));
      this.set('opacity',storageel.get('opacity'));
      this.set('fill',storageel.get('fill'));
      this.set('stroke',storageel.get('stroke'));
      this.set('strokeWidth',storageel.get('strokeWidth'));
      this.set('strokeLinecap',storageel.get('strokeLinecap'));
      this.set('strokeMiterlimit',storageel.get('strokeMiterlimit'));
      this.set('fontSize',storageel.get('fontSize'));
      this.set('fontStyle',storageel.get('fontStyle'));
      this.set('fontWeight',storageel.get('fontWeight'));
      this.set('fontFamily',storageel.get('fontFamily'));
      this.set('fontVariant',storageel.get('fontVariant'));
      this.set('lineHeight',storageel.get('lineHeight'));
      this.set('letterSpacing',storageel.get('letterSpacing'));
      this.set('textAlign',storageel.get('textAlign'));
      this.set('textAnchor',storageel.get('textAnchor'));
    }else{
      resolve.call(this,'display',storageel);
      resolve.call(this,'opacity',storageel);
      resolve.call(this,'fill',storageel);
      resolve.call(this,'stroke',storageel);
      resolve.call(this,'strokeWidth',storageel);
      resolve.call(this,'strokeLinecap',storageel);
      resolve.call(this,'strokeMiterlimit',storageel);
      resolve.call(this,'fontSize',storageel);
      resolve.call(this,'fontStyle',storageel);
      resolve.call(this,'fontWeight',storageel);
      resolve.call(this,'fontFamily',storageel);
      resolve.call(this,'fontVariant',storageel);
      resolve.call(this,'lineHeight',storageel);
      resolve.call(this,'letterSpacing',storageel);
      resolve.call(this,'textAlign',storageel);
      resolve.call(this,'textAnchor',storageel);
    }
  }
  Stylable.prototype.assignStyle = function(name,val){
    if('undefined' === typeof val || val === null){
      return;
    }
    this.style[name] = val;
  };
  Stylable.prototype.set_fill = function(val){
    this.assignStyle('fill',val);
  };
  Stylable.prototype.get_fill = function(){
    return this.style.fill;
  };
  Stylable.prototype.set_stroke = function(val){
    this.assignStyle('stroke',val);
  };
  Stylable.prototype.get_stroke = function(){
    return this.style.stroke;
  };
  Stylable.prototype.set_display = function(val){
    this.assignStyle('display',val);
  };
  Stylable.prototype.get_display = function(){
    return this.style.display;
  };
  Stylable.prototype.set_opacity = function(val){
    this.assignStyle('opacity',val);
  };
  Stylable.prototype.get_opacity = function(){
    return this.style.opacity;
  };
  Stylable.prototype.set_strokeWidth = function(val){
    this.assignStyle('strokeWidth',val);
  };
  Stylable.prototype.get_strokeWidth = function(){
    return this.style.strokeWidth;
  };
  Stylable.prototype.set_strokeLinecap = function(val){
    this.assignStyle('strokeLinecap',val);
  };
  Stylable.prototype.get_strokeLinecap = function(){
    return this.style.strokeLinecap;
  };
  Stylable.prototype.set_strokeMiterlimit = function(val){
    this.assignStyle('strokeMiterlimit',val);
  };
  Stylable.prototype.get_strokeMiterlimit = function(){
    return this.style.strokeMiterlimit;
  };
  Stylable.prototype.set_strokeMiterlimit = function(val){
    this.assignStyle('strokeMiterlimit',val);
  };
  Stylable.prototype.get_strokeMiterlimit = function(){
    return this.style.strokeMiterlimit;
  };
  Stylable.prototype.set_fontSize = function(val){
    this.assignStyle('fontSize',val);
  };
  Stylable.prototype.get_fontSize = function(){
    return this.style.fontSize;
  };
  Stylable.prototype.set_fontStyle = function(val){
    this.assignStyle('fontStyle',val);
  };
  Stylable.prototype.get_fontStyle = function(){
    return this.style.fontStyle;
  };
  Stylable.prototype.set_fontWeight = function(val){
    this.assignStyle('fontWeight',val);
  };
  Stylable.prototype.get_fontWeight = function(){
    return this.style.fontWeight;
  };
  Stylable.prototype.set_fontFamily = function(val){
    this.assignStyle('fontFamily',val);
  };
  Stylable.prototype.get_fontFamily = function(){
    return this.style.fontFamily;
  };
  Stylable.prototype.set_fontVariant = function(val){
    this.assignStyle('fontVariant',val);
  };
  Stylable.prototype.get_fontVariant = function(){
    return this.style.fontVariant;
  };
  Stylable.prototype.set_lineHeight = function(val){
    this.assignStyle('lineHeight',val);
  };
  Stylable.prototype.get_lineHeight = function(){
    return this.style.lineHeight;
  };
  Stylable.prototype.set_letterSpacing = function(val){
    this.assignStyle('letterSpacing',val);
  };
  Stylable.prototype.get_letterSpacing = function(){
    return this.style.letterSpacing;
  };
  Stylable.prototype.set_textAlign = function(val){
    this.assignStyle('textAlign',val);
  };
  Stylable.prototype.get_textAlign = function(){
    return this.style.textAlign;
  };
  Stylable.prototype.set_textAnchor = function(val){
    this.assignStyle('textAnchor',val);
  };
  Stylable.prototype.get_textAnchor = function(){
    return this.style.textAnchor;
  };
  Stylable.prototype.applyStyle = function(ctx,doclip){
    if(!doclip){
      if(this.style.stroke && this.style.stroke!=='none'){
        var st = this.style.stroke.gradient ? this.style.stroke.gradient : this.style.stroke;
        //console.log(this.id,'setting stroke',st);
        ctx.strokeStyle = st;
      }
      if(this.style.fill && this.style.fill!=='none'){
        var fl = this.style.fill.gradient ? this.style.fill.gradient : this.style.fill;
        //console.log(this.id,'setting fill',this.fill.gradient);
        ctx.fillStyle = fl;
      }
      if('undefined' !== typeof this.style.strokeWidth){
        ctx.lineWidth = this.style.strokeWidth;
      }
      if('undefined' !== typeof this.style.strokeLinecap){
        ctx.lineCap = this.style.strokeLinecap;
      }
      if('undefined' !== typeof this.style.strokeMiterlimit){
        ctx.miterLimit = this.style.strokeMiterlimit;
      }
    }
  };
  Stylable.prototype.__cleanUp = function(){
    storagelib.Stylable.prototype.__cleanUp.call(this);
  };
  mylib.Stylable = Stylable;
}

module.exports = createStylable;
