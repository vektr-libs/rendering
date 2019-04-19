function createTextContent(lib,utillib,mylibContent,mylib){
  'use strict';
  function Text(ctx,rendershape,storageel){
    mylib.Positionable.call(this,storageel);
    mylibContent.VectorContent.call(this,rendershape);
    this.ctx = ctx;
    this.text = null;
    this.displacement = null;
    if(ctx==='clone'){
      var ct = storageel.content;
      this.ctx = ct.ctx;
      this.displacement = ct.displacement;
    }else{
      this.ctx = ctx;
      this.displacement = storageel.displacement;
    }
    this._boundingBox = [0,0,0,0];
    this.set('text',ctx==='clone'?storageel.content.text : storageel.text);
  }
  lib.inherit(Text,mylibContent.VectorContent);
  Text.prototype.set_text = function(val){
    this.text = val;
    this.ctx.save();
    this.setFontAndTextAlign(this.ctx);
    var tm = this.ctx.measureText(this.text);
    var x = this.pos[0], y = this.pos[1];
    var w = tm.width;
    var h = parseFloat(this.shape.style.fontSize.substring(0,this.shape.style.fontSize.length-2));
    if(this.shape.style.lineHeight){
      var iop = this.shape.style.lineHeight.indexOf('%');
      if(iop>=0){
        var lh = parseFloat(this.shape.style.lineHeight.substring(0,iop));
        h*=(lh/100);
      }
    }
    switch(this.shape.style.textAnchor){
      case 'middle':
          x -= w/2;
        break;
      case 'end':
          x -= w;
        break;
    }
    y -= (h*0.7);
    this._boundingBox[0] = x;
    this._boundingBox[1] = y;
    this._boundingBox[2] = w;
    this._boundingBox[3] = h;
    this.ctx.restore();
  };
  function addToString(string,elem){
    if(!elem){
      return string;
    }
    if(string.length){
      string+=' ';
    }
    return string+elem;
  }
  Text.prototype.setFontAndTextAlign = function(ctx){
    var fontspec = '';
    fontspec = addToString(fontspec,this.shape.style.fontStyle);
    fontspec = addToString(fontspec,this.shape.style.fontVariant);
    fontspec = addToString(fontspec,this.shape.style.fontWeight);
    fontspec = addToString(fontspec,(this.shape.style.fontSize||this.shape.style.lineHeight));
    fontspec = addToString(fontspec,this.shape.style.fontFamily);
    ctx.font = fontspec;
    ctx.textAlign = this.shape.style.textAlign || this.shape.style.textAnchor; //IE fix for a situation where text-align:end is not parsed, but text-anchor is
  };
  Text.prototype.boundingBox = function(){
    return this._boundingBox;
  };
  Text.prototype.render = function(ctx,doclip){
    //if(!(this.text && this.text.length)){return;}
    if(this.text === null || 'undefined' === typeof this.text){
      return;
    }
    this.ctx = ctx;
    mylibContent.VectorContent.prototype.render.call(this,ctx,doclip);
  };
  Text.prototype.renderContents = function(ctx){
    this.setFontAndTextAlign(ctx);
    if('none' !== this.shape.style.stroke){
      utillib.log(this.id,'stroking text',ctx.strokeStyle);
      ctx.strokeText(this.text,this.pos[0],this.pos[1]);
    }
    if('none' !== this.shape.style.fill){
      utillib.log(this.id,'filling text',ctx.fillStyle);
      ctx.fillText(this.text,this.pos[0],this.pos[1]);
    }
  };
  Text.prototype.applyFillAndStroke = lib.dummyFunc;
  Text.prototype.__cleanUp = function(){
    this._boundingBox = null;
    this.displacement = null;
    this.text = null;
    this.ctx = null;
    mylibContent.VectorContent.prototype.__cleanUp.call(this);
    mylib.Positionable.prototype.__cleanUp.call(this);
  };
  mylibContent.Text = Text;
}

module.exports = createTextContent;


