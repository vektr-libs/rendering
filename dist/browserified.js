(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var lr = ALLEX.execSuite.libRegistry;
lr.register('vektr_renderinglib',
  require('./index')(
    ALLEX,
    lr.get('vektr_utillib'),
    lr.get('vektr_commonlib'),
    lr.get('vektr_mathlib'),
    lr.get('vektr_storagelib'),
    lr.get('allex_hierarchymixinslib')
  )
);

},{"./index":2}],2:[function(require,module,exports){
function createLib (execlib, utillib, commonlib, mathlib, storagelib, hierarchymixinslib) {
  'use strict';

  var lib = execlib.lib;
  var ret = {
    util : {},
    options: {
    },
    content : {
      options: {
        vectorcontentcache: false
      }
    },
    mixins : {},
    algorithms : {}
  };

  require('./src/mixins/TriggerChildChangedcreator')(lib, commonlib, ret.mixins);
  require('./src/mixins/Tearablecreator')(lib, commonlib, ret, ret.mixins);
  require('./src/mixins/ContentSwitchercreator')(lib, commonlib, ret.mixins);
  require('./src/mixins/MouseEnvironmentablecreator')(execlib, ret.mixins);
  require('./src/algo/Stickycreator')(lib, ret.algorithms);
  require('./src/utilcreator')(lib, utillib, commonlib, ret);
  require('./src/Gradientcreator')(lib, mathlib, hierarchymixinslib, ret);
  require('./src/LinearGradientcreator')(lib, mathlib, ret);
  require('./src/RadialGradientcreator')(lib, mathlib, ret);
  require('./src/Dimensionablecreator')(ret);
  require('./src/Displayablecreator')(commonlib, ret);
  require('./src/Stylablecreator')(storagelib, commonlib, ret);
  require('./src/SvgParentcreator')(lib, commonlib, hierarchymixinslib, ret);
  require('./src/Defscreator')(lib, hierarchymixinslib, ret);
  require('./src/Placeholdercreator')(lib, mathlib, hierarchymixinslib, ret);
  require('./src/Shapecreator')(lib, ret);
  require('./src/Positionablecreator')(ret);
  require('./src/Areablecreator')(ret);
  require('./src/Usecreator')(lib,mathlib, hierarchymixinslib, ret);
  require('./src/Pathcreator')(lib, ret);
  require('./src/Groupcreator')(lib, ret);
  require('./src/ClipPathcreator')(lib, ret);
  require('./src/Statikcreator')(lib, ret);
  require('./src/PolyLinecreator')(lib, ret);
  require('./src/Linecreator')(lib, ret);
  require('./src/Polygoncreator')(lib, ret);
  require('./src/Circlecreator')(lib, ret);
  require('./src/Rectcreator')(lib, ret);
  require('./src/Textcreator')(lib, ret);
  require('./src/Spritecreator')(lib, storagelib, ret);
  require('./src/RenderUnitcreator')(lib, commonlib, ret);
  require('./src/Svgcreator')(lib, commonlib, hierarchymixinslib, ret);
  require('./src/SvgLayercreator')(lib, hierarchymixinslib, ret);
  require('./src/content/Contentcreator')(lib, ret.content, ret);
  require('./src/content/Rastercreator')(lib, ret.content, ret);
  require('./src/content/VectorContentcreator')(lib, utillib, commonlib, ret.content, ret);
  require('./src/content/PolyLinecreator')(lib, ret.content, ret);
  require('./src/content/Linecreator')(lib, ret.content);
  require('./src/content/Polygoncreator')(lib, ret.content);
  require('./src/content/Circlecreator')(lib, ret.content, ret);
  require('./src/content/Rectcreator')(lib, ret.content, ret);
  require('./src/content/Pathcreator')(lib, ret.content);
  require('./src/content/Textcreator')(lib, utillib, ret.content, ret);

  return ret;
}

module.exports = createLib;

},{"./src/Areablecreator":3,"./src/Circlecreator":4,"./src/ClipPathcreator":5,"./src/Defscreator":6,"./src/Dimensionablecreator":7,"./src/Displayablecreator":8,"./src/Gradientcreator":9,"./src/Groupcreator":10,"./src/LinearGradientcreator":11,"./src/Linecreator":12,"./src/Pathcreator":13,"./src/Placeholdercreator":14,"./src/PolyLinecreator":15,"./src/Polygoncreator":16,"./src/Positionablecreator":17,"./src/RadialGradientcreator":18,"./src/Rectcreator":19,"./src/RenderUnitcreator":20,"./src/Shapecreator":21,"./src/Spritecreator":22,"./src/Statikcreator":23,"./src/Stylablecreator":24,"./src/SvgLayercreator":25,"./src/SvgParentcreator":26,"./src/Svgcreator":27,"./src/Textcreator":28,"./src/Usecreator":29,"./src/algo/Stickycreator":30,"./src/content/Circlecreator":31,"./src/content/Contentcreator":32,"./src/content/Linecreator":33,"./src/content/Pathcreator":34,"./src/content/PolyLinecreator":35,"./src/content/Polygoncreator":36,"./src/content/Rastercreator":37,"./src/content/Rectcreator":38,"./src/content/Textcreator":39,"./src/content/VectorContentcreator":40,"./src/mixins/ContentSwitchercreator":41,"./src/mixins/MouseEnvironmentablecreator":42,"./src/mixins/Tearablecreator":43,"./src/mixins/TriggerChildChangedcreator":44,"./src/utilcreator":45}],3:[function(require,module,exports){
function createAreable(mylib){
  'use strict';
  function Areable(storageel){
    mylib.Positionable.call(this,storageel);
    mylib.Dimensionable.call(this,storageel);
  }
  Areable.prototype.__cleanUp = function(){
    mylib.Dimensionable.prototype.__cleanUp.call(this);
    mylib.Positionable.prototype.__cleanUp.call(this);
  };
  Areable.prototype.containsPoint = function(point){
    if(point[0]<this.pos[0]){return false;}
    if(point[1]<this.pos[1]){return false;}
    if(point[0]>this.pos[0]+this.dimensions[0]){return false;}
    if(point[1]>this.pos[1]+this.dimensions[1]){return false;}
    return true;
  };
  mylib.Areable = Areable;
}

module.exports = createAreable;

},{}],4:[function(require,module,exports){
function createCircle(lib,mylib){
  'use strict';
  function Circle(cb,ctx,storageel,parnt){
    mylib.Shape.call(this,ctx,storageel,parnt);
    this.set('content',new mylib.content.Circle(this,storageel));
    cb(this);
  }
  lib.inherit(Circle,mylib.Shape);
  Circle.prototype.tagName = function(){
    return 'circle';
  };
  mylib.Circle = Circle;
}

module.exports = createCircle;

},{}],5:[function(require,module,exports){
function createClipPath(lib,mylib){
  'use strict';
  function ClipPath(cb,ctx,svgel,parnt){
    mylib.Group.call(this,cb,ctx,svgel,parnt);
    this.display = true;
  }
  lib.inherit(ClipPath,mylib.SvgParent);
  ClipPath.prototype.show = lib.dummyFunc;
  ClipPath.prototype.hide = lib.dummyFunc;
  ClipPath.prototype.attachListener = mylib.Shape.prototype.attachListener;
  ClipPath.prototype.startRender = mylib.Shape.prototype.startRender;
  ClipPath.prototype.endRender = mylib.Shape.prototype.endRender;
  ClipPath.prototype.render = mylib.Shape.prototype.render;
  ClipPath.prototype.renderContent = function(ctx){
    mylib.util.renderChildren.call(this,ctx,true);
  };
  ClipPath.prototype.__cleanUp = function(){
    mylib.Group.prototype.__cleanUp.call(this);
  };
  mylib.ClipPath = ClipPath;
}

module.exports = createClipPath;


},{}],6:[function(require,module,exports){
function createDefs(lib,hierarchymixinslib,mylib){
  'use strict';
  function Defs(cb,ctx,storageel,parnt){
    this.id = storageel.id;
    lib.Destroyable.call(this);
    lib.Changeable.call(this);
    hierarchymixinslib.Child.call(this,parnt);
    mylib.SvgParent.call(this,cb,ctx,storageel);
  }
  lib.inherit(Defs,mylib.SvgParent);
  Defs.prototype.attachListener = lib.Listenable.prototype.attachListener;
  Defs.prototype.tagName = function(){
    return 'defs';
  };
  Defs.prototype.__cleanUp = function(){
    this.id = null;
    mylib.SvgParent.prototype.__cleanUp.call(this);
    hierarchymixinslib.Child.prototype.__cleanUp.call(this);
    lib.Changeable.prototype.__cleanUp.call(this);
    lib.Destroyable.prototype.__cleanUp.call(this);
  };
  mylib.Defs = Defs;
}

module.exports = createDefs;

},{}],7:[function(require,module,exports){
function createDimensionable(mylib){
  'use strict';
  function Dimensionable(storageel){
    this.dimensions = storageel.dimensions ? storageel.dimensions.slice() : storageel.content.dimensions.slice();
  }
  Dimensionable.prototype.__cleanUp = function(){
    this.dimensions = null;
  };
  mylib.Dimensionable = Dimensionable;
}

module.exports = createDimensionable;

},{}],8:[function(require,module,exports){
function createDisplayable(commonlib,mylib){
  'use strict';
  function Displayable(el){
  }
  Displayable.prototype.__cleanUp = function(){
  };
  Displayable.prototype.show = function(){
    commonlib.set(this,'display',true);
  };
  Displayable.prototype.hide = function(){
    commonlib.set(this,'display',false);
  };
  mylib.Displayable = Displayable;
}

module.exports = createDisplayable;


},{}],9:[function(require,module,exports){
function createGradient(lib,mathlib,hierarchymixinslib,mylib){
  'use strict';
  function Gradient(ctx,storageel,parnt){
    this.id = storageel.id;
    this.ctx = ctx==='clone' ? storageel.ctx : ctx;
    lib.Destroyable.call(this);
    lib.Changeable.call(this);
    hierarchymixinslib.Child.call(this,parnt);
    this.stops = storageel.stops.slice();
    this.parentGradient = null;
    this.parentGradientListener = null;
    this.transformMatrix = storageel.transformMatrix.slice();
    this.gradient = null;
    if(storageel.parentGradient){
      if(!storageel.parentGradient.createGradient){
        if(parnt && parnt.onResolveNeeded){
          parnt.onResolveNeeded(this,'parentGradient',storageel.parentGradient.id);
        }
      }else{
        this.set('parentGradient',storageel.parentGradient);
      }
    }else{
      this.set('parentGradient',this);
    }
  }
  Gradient.prototype.attachListener = lib.Listenable.prototype.attachListener;
  Gradient.prototype.set = lib.Changeable.prototype.set;
  Gradient.prototype.fireEvent = lib.Changeable.prototype.fireEvent;
  Gradient.prototype.destroy = lib.Destroyable.prototype.destroy;
  Gradient.prototype.__cleanUp = function(){
    this.id = null;
    this.ctx = null;
    this.stops = null;
    if (this.parentGradientListener) {
      this.parentGradientListener.destroy();
    }
    this.parentGradientListener = null;
    this.parentGradient = null;
    this.transformMatrix = null;
    this.gradient = null;
    hierarchymixinslib.Child.prototype.__cleanUp.call(this);
    lib.Changeable.prototype.__cleanUp.call(this);
    lib.Destroyable.prototype.__cleanUp.call(this);
  };
  Gradient.prototype.createGradient = function(){
  };
  Gradient.prototype.set_parentGradient = function(grad){
    this.parentGradient = grad;
    if (grad) {
      if (this.parentGradientListener) {
        this.parentGradientListener.destroy();
      }
      this.parentGradientListener = grad.changed.attach(this.rebuild.bind(this));
    }
    this.rebuild();
    return true;
  };
  Gradient.prototype.set_stops = function(stops){
    this.stops = stops;
    this.rebuild();
    return true;
  };
  Gradient.prototype.compoundTransform = function(){
    if(this.parentGradient){
      return mathlib.matrixInSpace(this.parentGradient.compoundTransform(),this.transformMatrix);
      //return mathlib.matrixInSpace(this.transformMatrix,this.parentGradient.compoundTransform());
    }else{
      return this.transformMatrix;
    }
  };
  Gradient.prototype.getStops = function(transform){
    if(this.stops.length || !this.parentGradient){// || this.parentGradient === this){
      return this.stops;
    }else{
      return this.parentGradient.getStops(transform);
    }
  };
  function addStop(stop){
    this.addColorStop.apply(this,stop);
  }
  Gradient.prototype.addStops = function(){
    if(!this.gradient){return;}
    this.getStops().forEach(addStop.bind(this.gradient));
  };
  Gradient.prototype.rebuild = function () {
    this.createGradient(this.ctx);
    this.addStops();
  };
  mylib.Gradient = Gradient;
}

module.exports = createGradient;

},{}],10:[function(require,module,exports){
function createGroup(lib,mylib){
  'use strict';
  var dummyGroup = {
    style : {
      display: true
    },
    transformMatrix: [1,0,0,1,0,0],
    __children: new lib.Map()
  };
  function Group(cb,ctx,storageel,parnt,newid){
    storageel = storageel || dummyGroup;
    mylib.SvgParent.call(this,cb,ctx,storageel,newid);
    mylib.Placeholder.call(this,ctx,storageel,parnt,newid);
  }
  lib.inherit(Group,mylib.SvgParent);
  for(var n in mylib.Stylable.prototype){
    Group.prototype[n] = mylib.Stylable.prototype[n];
  }
  Group.prototype.get = mylib.Placeholder.prototype.get;
  Group.prototype.attachListener = mylib.Placeholder.prototype.attachListener;
  Group.prototype.destroy = mylib.Placeholder.prototype.destroy;
  Group.prototype.leaveParent = mylib.Placeholder.prototype.leaveParent;
  Group.prototype.show = mylib.Displayable.prototype.show;
  Group.prototype.hide = mylib.Displayable.prototype.hide;
  Group.prototype.transform = mylib.Placeholder.prototype.transform;
  Group.prototype.toLocalSpace = mylib.Placeholder.prototype.toLocalSpace;
  Group.prototype.pointToLocalSpace = mylib.Placeholder.prototype.pointToLocalSpace;
  Group.prototype.startRender = mylib.Placeholder.prototype.startRender;
  Group.prototype.endRender = mylib.Placeholder.prototype.endRender;
  Group.prototype.render = mylib.Placeholder.prototype.render;
  Group.prototype.fullPath = mylib.Placeholder.prototype.fullPath;
  Group.prototype.pathTo = mylib.Placeholder.prototype.pathTo;
  Group.prototype.moveTo = mylib.Placeholder.prototype.moveTo;
  Group.prototype.moveBy = mylib.Placeholder.prototype.moveBy;
  Group.prototype.set = mylib.Placeholder.prototype.set;
  Group.prototype.set_dtx = mylib.Placeholder.prototype.set_dtx;
  Group.prototype.set_dty = mylib.Placeholder.prototype.set_dty;
  Group.prototype.set_dopacity = mylib.Placeholder.prototype.set_dopacity;
  Group.prototype.fireEvent = mylib.Placeholder.prototype.fireEvent;
  Group.prototype.invokeReportRenderUnitOnChild = function(parntstack,cb,ch){
    var ps = parntstack.slice();
    ps.push(this);
    ch.reportRenderUnit(ps,cb);
  };
  Group.prototype.reportRenderUnit = function(parntstack,cb){
    this.__children.traverse(this.invokeReportRenderUnitOnChild.bind(this,parntstack,cb));
  };
  Group.prototype.applyFillAndStroke = lib.dummyFunc;
  Group.prototype.renderContent = function(ctx,doclip){
    mylib.util.renderChildren.call(this,ctx,doclip);
  };
  Group.prototype.tagName = function(){
    return 'g';
  };
  Group.prototype.__cleanUp = function(){
    mylib.SvgParent.prototype.__cleanUp.call(this);
    mylib.Placeholder.prototype.__cleanUp.call(this);
  };
  mylib.Group = Group;
}

module.exports = createGroup;

},{}],11:[function(require,module,exports){
function createLinearGradient(lib,mathlib,mylib){
  'use strict';
  function LinearGradient(cb,ctx,storageel,parnt){
    this.vector = storageel.vector.slice();
    mylib.Gradient.call(this,ctx,storageel,parnt);
    cb(this);
  }
  lib.inherit(LinearGradient,mylib.Gradient);
  LinearGradient.prototype.tagName = function(){
    return 'linearGradient';
  };
  LinearGradient.prototype.createGradient = function(ctx){
    var v = mathlib.coordsInSpace(this.vector,this.transformMatrix);
    this.gradient = ctx.createLinearGradient.apply(ctx,v);
  };
  mylib.LinearGradient = LinearGradient;
}

module.exports = createLinearGradient;

},{}],12:[function(require,module,exports){
function createLine(lib,mylib){
  'use strict';
  function Line(cb,ctx,storageel,parnt){
    mylib.Shape.call(this,ctx,storageel,parnt);
    this.set('content',new mylib.content.Line(this,storageel));
    cb(this);
  }
  lib.inherit(Line,mylib.Shape);
  Line.prototype.tagName = function(){
    return 'line';
  };
  mylib.Line = Line;
}

module.exports = createLine;

},{}],13:[function(require,module,exports){
function createPath(lib,mylib){
  'use strict';
  function Path(cb,ctx,storageel,parnt){
    mylib.Shape.call(this,ctx,storageel,parnt);
    this.set('content',new mylib.content.Path(this,storageel));
    this.svgpathel = storageel.svgpathel;
    this.pathlength = null;//this.svgpathel.getTotalLength();
    cb(this);
  }
  lib.inherit(Path,mylib.Shape);
  Path.prototype.tagName = function(){
    return 'path';
  };
  Path.prototype.get_pathlength = function(){
    if(this.pathlength===null){
      this.pathlength = this.svgpathel.getTotalLength();
    }
    return this.pathlength;
  };
  Path.prototype.pointAtLength = function(proc){
    //var p = this.svgpathel.getPointAtLength(proc*this.pathlength);
    var p = this.svgpathel.getPointAtLength(proc*this.get('pathlength')||0);
    return [p.x,p.y];
  };
  Path.prototype.__cleanUp = function(){
    this.pathlength = null;
    this.svgpathel = null;
    mylib.Shape.prototype.__cleanUp.call(this);
  };
  mylib.Path = Path;
}

module.exports = createPath;

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
function createPolyLine(lib,mylib){
  'use strict';
  function PolyLine(cb,ctx,storageel,parnt){
    mylib.Shape.call(this,ctx,storageel,parnt);
    this.set('content',new mylib.content.PolyLine(this,storageel));
    cb(this);
  }
  lib.inherit(PolyLine,mylib.Shape);
  PolyLine.prototype.tagName = function(){
    return 'polyline';
  };
  mylib.PolyLine = PolyLine;
}

module.exports = createPolyLine;

},{}],16:[function(require,module,exports){
function createPolygon(lib,mylib){
  'use strict';
  function Polygon(cb,ctx,storageel,parnt){
    mylib.Shape.call(this,ctx,storageel,parnt);
    this.set('content',new mylib.content.Polygon(this,storageel));
    cb(this);
  }
  lib.inherit(Polygon,mylib.Shape);
  Polygon.prototype.tagName = function(){
    return 'polygon';
  };
  mylib.Polygon = Polygon;
}

module.exports = createPolygon;

},{}],17:[function(require,module,exports){
function createPositionable(mylib){
  'use strict';
  function Positionable(storageel){
    this.pos = storageel.pos ? storageel.pos.slice() : storageel.content.pos.slice();
  }
  Positionable.prototype.__cleanUp = function(){
    this.pos = null;
  };
  mylib.Positionable = Positionable;
}

module.exports = createPositionable;

},{}],18:[function(require,module,exports){
function createRadialGradient(lib,mathlib,mylib){
  'use strict';
  function RadialGradient(cb,ctx,storageel,parnt){
    this.radials=storageel.radials.slice();
    mylib.Gradient.call(this,ctx,storageel,parnt);
    cb(this);
  }
  lib.inherit(RadialGradient,mylib.Gradient);
  RadialGradient.prototype.tagName = function(){
    return 'radialGradient';
  };
  RadialGradient.prototype.createGradient = function(ctx){
    var r = new Array(this.radials.length);
    mathlib.coordsToSpace(this.radials,this.transformMatrix,r,0,2);
    mathlib.coordsToSpace(this.radials,this.transformMatrix,r,3,2);
    r[2] = mathlib.lengthInSpace(this.radials[2],this.transformMatrix);
    r[5] = mathlib.lengthInSpace(this.radials[5],this.transformMatrix);
    this.gradient = ctx.createRadialGradient.apply(ctx,r);
  };
  mylib.RadialGradient = RadialGradient;
}

module.exports = createRadialGradient;


},{}],19:[function(require,module,exports){
function createRect(lib,mylib){
  'use strict';
  function Rect(cb,ctx,storageel,parnt){
    mylib.Shape.call(this,ctx,storageel,parnt);
    this.set('content',new mylib.content.Rect(this,storageel));
    cb(this);
  }
  lib.inherit(Rect,mylib.Shape);
  Rect.prototype.tagName = function(){
    return 'rect';
  };
  mylib.Rect = Rect;
}

module.exports = createRect;

},{}],20:[function(require,module,exports){
function createRenderUnit(lib,commonlib,mylib){
  'use strict';
  function RenderUnit(stack){
    lib.Destroyable.call(this);
    lib.Child.call(this);
    lib.Listenable.call(this);
    this.content = stack.pop(); //once stack is popped, MatrixStack can come into play
    this.display = new commonlib.ANDStackedProperty('display',stack);
    this.transformMatrix = new commonlib.LazyDynamicStackedProperty('transformMatrix',stack);
  }
  lib.inherit(RenderUnit,commonlib.MatrixStack);
  RenderUnit.prototype.destroy = lib.Destroyable.prototype.destroy;
  RenderUnit.prototype.attachListener = lib.Listenable.prototype.attachListener;
  RenderUnit.prototype.isPath = function(patharry){
    if(this.stack.length!==patharry.length){return false;}
    for(var i in patharry){
      if(this.stack[i] !== patharry[i]){
        return false;
      }
    }
    return true;
  };
  RenderUnit.prototype.render = function(ctx){
    if(!this.display.get()){return;}
    ctx.save();
    ctx.transform.apply(ctx,this.transformMatrix.get());
    this.content.render(ctx);
    ctx.restore();
  };
  RenderUnit.prototype.__cleanUp = function(){
    this.transformMatrix.destroy();
    this.transformMatrix = null;
    this.display.destroy();
    this.display = null;
    this.content = null;
    lib.Listenable.prototype.__cleanUp.call(this);
    lib.Child.prototype.__cleanUp.call(this);
    lib.Destroyable.prototype.__cleanUp.call(this);
  };
  mylib.RenderUnit = RenderUnit;
}

module.exports = createRenderUnit;

},{}],21:[function(require,module,exports){
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


},{}],22:[function(require,module,exports){
function createSprite(lib,storagelib,mylib){
  'use strict';
  function Sprite(cb,ctx,storageel,parnt){
    mylib.Shape.call(this,ctx,storageel,parnt);
    this.set('content',new mylib.content.Raster(this,storageel));
    this.pos_constraints = null;
    cb(this);
  }
  lib.inherit(Sprite,mylib.Shape);
  Sprite.prototype.__cleanUp = function () {
    this.pos_constraints = null;
    mylib.Shape.prototype.__cleanUp.call(this);
  };

  Sprite.prototype.onRemoteLoaded = function(img){
    var dimensions, pos;
    if (this.pos_constraints) {
      dimensions = [img.width,img.height]; 
      pos = [0,0];
      this.pos_constraints.calculate(dimensions, pos);
    }else{
      dimensions = this.content.dimensions.slice();
      pos = this.content.pos.slice();
    }
    this.content = new mylib.content.Raster(this,{
      id:this.content.id,
      pos:pos,
      dimensions:dimensions,
      image:img
    }
    );
    this.fireEvent('content',this.content);
  };
  Sprite.prototype.loadRemote = function(url){
    return storagelib.Sprite.loadRemote(url).then(this.onRemoteLoaded.bind(this));
  };
  Sprite.prototype.tagName = function(){
    return 'image';
  };
  mylib.Sprite = Sprite;
}

module.exports = createSprite;

},{}],23:[function(require,module,exports){
function createStatik(lib,mylib){
  'use strict';
  function Statik(ctx,storageel,parnt){
    mylib.Group.call(this,ctx,storageel,parnt);
  }
  lib.inherit(Statik,mylib.Group);
  mylib.Statik = Statik;
}

module.exports = createStatik;

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
function createText(lib,mylib){
  'use strict';
  function Text(cb,ctx,storageel,parnt){
    lib.Settable.call(this);
    mylib.Shape.call(this,ctx,storageel,parnt);
    this.set('content',new mylib.content.Text(ctx,this,storageel));
    cb(this);
  }
  lib.inherit(Text,mylib.Shape);
  Text.prototype.get_text = function(){
    return this.content.text;
  };
  Text.prototype.set_text = function(val){
    this.content.set_text(val);
  };
  Text.prototype.__cleanUp = function(){
    mylib.Shape.prototype.__cleanUp.call(this);
    lib.Settable.prototype.__cleanUp.call(this);
  };
  Text.prototype.tagName = function(){
    return 'text';
  };

  Text.prototype.get_width = function () {
    return this.get('content')._boundingBox[2];
  };
  mylib.Text = Text;
}

module.exports = createText;

},{}],29:[function(require,module,exports){
function createUse(lib,mathlib,hierarchymixinslib,mylib){
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
    hierarchymixinslib.Parent.prototype.addChild.call(this,chld);
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

},{}],30:[function(require,module,exports){
function createSticky(lib, mylibAlgorithms) {
  'use strict';
  var Settable = lib.Settable, 
  Gettable = lib.Gettable, 
  Destroyable = lib.Destroyable;

  function Sticky (boundingBox, moveEvaluator, decisionpercx, decisionpercy, xprop, yprop) {
    Settable.call(this);
    Gettable.call(this);
    Destroyable.call(this);

    this.boundingBox = boundingBox;
    this.decisionpercx = decisionpercx;
    this.decisionpercy = decisionpercy;
    this.initialBB = this.boundingBox.get();
    this.moveEvaluator = moveEvaluator;
    this.xprop_name = xprop;
    this.yprop_name = yprop;
  }

  lib.inherit(Sticky, Destroyable);
  Sticky.prototype.set = Settable.prototype.set;
  Sticky.prototype.get = Gettable.prototype.get;

  Sticky.prototype.__cleanUp = function () {
    this.xprop_name = null;
    this.yprop_name = null;
    this.moveEvaluator = null;
    this.initialBB = null;
    this.decisionpercy = null;
    this.decisionpercx = null;
    this.boundingBox = null;
    Settable.prototype.__cleanUp.call(this);
    Gettable.prototype.__cleanUp.call(this);
    Destroyable.prototype.__cleanUp.call(this);
  };


  Sticky.prototype.decide = function () {
    var bb = this.boundingBox.get(),
      dx = this.initialBB[0]-bb[0], adx = Math.abs(dx), sdx = dx>0?1:-1,
      dy = this.initialBB[1]-bb[1], ady = Math.abs(dy), sdy = dy>0?1:-1,
      totalpath,trajectory,direction;

    if (adx<0.01 && ady<0.01) {
      return;
    }

    var other = null;

    ///if equal, go for x ... both are considerable ...
    if (adx >= ady) {
      direction = this.xprop_name;
      totalpath = this.initialBB[0];
      if(adx>bb[2]*this.decisionpercx){
        trajectory = bb[0]+sdx*bb[2];
      }else{
        trajectory = bb[0];
      }
      other = {axis:this.yprop_name, amount: dy};
    }else{
      direction = this.yprop_name;
      totalpath = this.initialBB[1];
      if(ady>bb[3]*this.decisionpercy){
        trajectory = bb[1]+sdy*bb[3];
      }else{
        trajectory = bb[1];
      }
      other = {axis: this.xprop_name, amount: dx};
    }

    var po = {};
    po[direction] = {amount:totalpath-trajectory};
    var s = this.moveEvaluator.speed || 1;
    var dur = Math.min(Math.abs(totalpath-trajectory)/s, 300);
    return{
      po : po,
      dur: dur,
      other : other
    };
  };

  Sticky.prototype.reset = function () {
    this.initialBB = this.boundingBox.get();
  };

  Sticky.isValidStickyConfigVal = function (val) {
    return val > 0 && val < 1;
  };
  mylibAlgorithms.Sticky = Sticky;
}

module.exports = createSticky;

},{}],31:[function(require,module,exports){
function createCircleContent(lib,mylibContent,mylib){
  'use strict';
  function Circle(rendershape,storageel){
    mylibContent.VectorContent.call(this,rendershape);
    this.center = storageel.center ? storageel.center.slice() : storageel.content.center.slice();
    this.radius = 'undefined' !== typeof storageel.radius ? storageel.radius : storageel.content.radius;
  }
  lib.inherit(Circle,mylibContent.VectorContent);
  Circle.prototype.renderContents = function(ctx){
    ctx.arc(this.center[0],this.center[1],this.radius,0,2*Math.PI);
  };
  Circle.prototype.boundingBox = function(){
    return [this.center[0]-this.radius,this.center[1]-this.radius,this.center[0]+this.radius,this.center[1]+this.radius];
  };
  Circle.prototype.__cleanUp = function(){
    this.radius = null;
    this.center = null;
    mylib.Areable.prototype.__cleanUp.call(this);
    mylibContent.VectorContent.prototype.__cleanUp.call(this);
  };
  mylibContent.Circle = Circle;
}

module.exports = createCircleContent;


},{}],32:[function(require,module,exports){
function createContentContent(lib,mylibContent,mylib){
  'use strict';
  function Content(mylibshape){
    this.shape = mylibshape;
    if(!(this.shape && typeof this.shape.style === 'object')){
      throw "No shape given";
    }
    lib.Destroyable.call(this);
    lib.Changeable.call(this);
    lib.Settable.call(this);
  }
  lib.inherit(Content,lib.Settable);
  Content.prototype.set = function(name,val){
    if(lib.Settable.prototype.set.call(this,name,val)){
      this.cache = null;
    }
  };
  Content.prototype.get = lib.Gettable.prototype.get;
  Content.prototype.attachListener = lib.Listenable.prototype.attachListener;
  Content.prototype.boundingBox = function(){
    return [0,0,1,1];
  };
  Content.prototype.destroy = lib.Destroyable.prototype.destroy;
  Content.prototype.__cleanUp = function(){
    lib.Settable.prototype.__cleanUp.call(this);
    lib.Changeable.prototype.__cleanUp.call(this);
    lib.Destroyable.prototype.__cleanUp.call(this);
    this.id = null;
  };
  mylibContent.Content = Content;
}

module.exports = createContentContent;

},{}],33:[function(require,module,exports){
function createLineContent(lib,mylibContent){
  'use strict';
  function Line(rendershape,storageel){
    mylibContent.PolyLine.call(this,rendershape,storageel);
  }
  lib.inherit(Line,mylibContent.PolyLine);
  Line.prototype.renderContents = function(ctx){
    mylibContent.PolyLine.prototype.renderContents.call(this,ctx);
  };
  mylibContent.Line = Line;
}

module.exports = createLineContent;


},{}],34:[function(require,module,exports){
function createPathContent(lib,mylibContent){
  'use strict';
  function Path(rendershape,storageel){
    mylibContent.VectorContent.call(this,rendershape);
    this.__curveactions = null;
    this._boundingBox = null;
    if(storageel.content){
      this.__curveactions = storageel.content.__curveactions.slice();
      this._boundingBox = storageel.content.boundingBox().slice();
    }else{
      this.__curveactions = storageel.__curveactions.slice();
      this._boundingBox = storageel.boundingBox.slice();
    }
  }
  lib.inherit(Path,mylibContent.VectorContent);
  Path.prototype.render = function(ctx,doclip){
    if(!this.__curveactions.length){return;}
    mylibContent.VectorContent.prototype.render.call(this,ctx,doclip);
  };
  Path.prototype.boundingBox = function(){
    return this._boundingBox;
  };
  function applyCurveAction(ctx,ca){
    ca(ctx);
  }
  Path.prototype.renderContents = function(ctx){
    this.__curveactions.forEach (applyCurveAction.bind(null,ctx));
  };
  Path.prototype.__cleanUp = function(){
    this.__curveactions = null;
    mylibContent.VectorContent.prototype.__cleanUp.call(this);
  };
  mylibContent.Path = Path;
}

module.exports = createPathContent;


},{}],35:[function(require,module,exports){
function createPolyLineContent(lib,mylibContent,mylib){
  'use strict';
  function PolyLine(rendershape,storageel){
    mylib.Areable.call(this,storageel);
    mylibContent.VectorContent.call(this,rendershape);
    this.points = (storageel.content ? storageel.content : storageel).points.slice();
  }
  lib.inherit(PolyLine,mylibContent.VectorContent);
  PolyLine.prototype.isClosed = function(){
    return false;
  };
  PolyLine.prototype.lineTo = function(ctx,point,pointindex){
    if(pointindex===0){
      return;
    }
    ctx.lineTo.apply(ctx,point);
  };
  PolyLine.prototype.renderContents = function(ctx){
    ctx.moveTo.apply(ctx,this.points[0]);
    this.points.forEach(this.lineTo.bind(this,ctx));
  };
  PolyLine.prototype.boundingBox = function(){
    return this.pos.concat(this.dimensions);
  };
  PolyLine.prototype.__cleanUp = function(){
    this.points = null;
    mylib.Areable.prototype.__cleanUp.call(this);
    mylibContent.VectorContent.prototype.__cleanUp.call(this);
  };
  mylibContent.PolyLine = PolyLine;
}

module.exports = createPolyLineContent;


},{}],36:[function(require,module,exports){
function createPolygonContent(lib,mylibContent){
  'use strict';
  function Polygon(rendershape,storageel){
    mylibContent.PolyLine.call(this,rendershape,storageel);
  }
  lib.inherit(Polygon,mylibContent.PolyLine);
  Polygon.prototype.renderContents = function(ctx){
    mylibContent.PolyLine.prototype.renderContents.call(this,ctx);
  };
  Polygon.prototype.isClosed = function(){
    return true;
  };
  mylibContent.Polygon = Polygon;
}

module.exports = createPolygonContent;

},{}],37:[function(require,module,exports){
function createRasterContent(lib,mylibContent,mylib){
  'use strict';
  function Raster(rendershape,storageel){
    mylibContent.Content.call(this,rendershape);
    mylib.Areable.call(this,storageel);
    var sprite = storageel.content ? storageel.content.sprite : storageel;
    this.sprite = sprite;
    if(sprite.attachListener){
      sprite.attachListener('changed',this.originalChanged.bind(this));
    }/*else{
      //I'm on my own with this sprite...
    }*/
  }
  lib.inherit(Raster,mylibContent.Content);
  Raster.prototype.set_image = function(img){
    this.sprite.image = img;
  };
  Raster.prototype.get_image = function(){
    return this.sprite.image;
  };
  Raster.prototype.originalChanged = function(){
    this.changed.fire();
  };
  Raster.prototype.render= function(ctx){
    ctx.drawImage(this.sprite.image,this.pos[0],this.pos[1],this.dimensions[0],this.dimensions[1]);
  };
  Raster.prototype.applyFillAndStroke = lib.dummyFunc;
  Raster.prototype.__cleanUp = function(){
    this.sprite = null;
    mylibContent.Content.prototype.__cleanUp.call(this);
    mylib.Areable.prototype.__cleanUp.call(this);
  };
  mylibContent.Raster = Raster;
}

module.exports = createRasterContent;

},{}],38:[function(require,module,exports){
function createRectContent(lib,mylibContent,mylib){
  'use strict';
  function Rect(rendershape,storageel){
    mylib.Areable.call(this,storageel);
    mylibContent.VectorContent.call(this,rendershape);
    this.rounding = storageel.rounding ? storageel.rounding.slice() : storageel.content.rounding.slice();
  }
  lib.inherit(Rect,mylibContent.VectorContent);
  Rect.prototype.renderContents = function(ctx){
    if(this.rounding && (this.rounding[0] || this.rounding[1])){
      var x = this.pos[0], y = this.pos[1], width = this.dimensions[0], height = this.dimensions[1], rx = this.rounding[0], ry = this.rounding[1];
      ctx.moveTo(x + rx, y);
      ctx.lineTo(x + width - rx, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + ry);
      ctx.lineTo(x + width, y + height - ry);
      ctx.quadraticCurveTo(x + width, y + height, x + width - rx, y + height);
      ctx.lineTo(x + rx, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - ry);
      ctx.lineTo(x, y + ry);
      ctx.quadraticCurveTo(x, y, x + rx, y);
    }else{
      ctx.rect(this.pos[0],this.pos[1],this.dimensions[0],this.dimensions[1]);
    }
  };
  Rect.prototype.boundingBox = function(){
    return this.pos.concat(this.dimensions);
  };
  Rect.prototype.__cleanUp = function(){
    this.rounding = null;
    mylib.Areable.prototype.__cleanUp.call(this);
    mylibContent.VectorContent.prototype.__cleanUp.call(this);
  };
  mylibContent.Rect = Rect;
}

module.exports = createRectContent;

},{}],39:[function(require,module,exports){
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



},{}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
function createContentSwitcher(lib, commonlib, mylibMixins) {
  'use strict';

  var CContentSwitcher = commonlib.ContentSwitcher;


  function addToCs (cs, el, index) {
    cs.add(index, el);
  }

  function ContentSwitcher (el, index_regexp) {
    this._cs = new CContentSwitcher();
    el.getIndexedChildren(index_regexp).forEach (addToCs.bind(null, this._cs));
  }
  ContentSwitcher.prototype.__cleanUp = function () {
    this._cs.destroy();
    this._cs = null;
  };

  ContentSwitcher.prototype.hideAll = function () {
    this._cs.hideAll();
  };

  ContentSwitcher.prototype.showIndex = function (index) {
    return this._cs.show(index);
  };

  ContentSwitcher.addMethods = function (chld) {
    lib.inheritMethods (chld, ContentSwitcher, 'hideAll', 'showIndex');
  };


  mylibMixins.ContentSwitcher = ContentSwitcher;

}

module.exports = createContentSwitcher;

},{}],42:[function(require,module,exports){
function createMouseEnvironmentableMixin (execlib, mylibMixins) {
  'use strict';

  var lib = execlib.lib;

  function MouseEnvironmentableMixin () {
    this.mouseEnvironment = null;
  }
  MouseEnvironmentableMixin.prototype.destroy = function () {
    if (this.mouseEnvironment) {
      //this.mouseEnvironment.__cleanUp();
      this.mouseEnvironment.destroy();
    }
    this.mouseEnvironment = null;
  };
  MouseEnvironmentableMixin.prototype.getMouseEnvironment = function () {
    var controllerslib = execlib.execSuite.libRegistry.get('vektr_controllerslib');
    if (!this.mouseEnvironment) {
      if (!controllerslib) {
        throw new Error('Cannot create a mouseEnvironment because vektr_controllerslib is not loaded.');
      }
      this.mouseEnvironment = new controllerslib.SvgMouseEnvironment(this);
    }
    return this.mouseEnvironment;
  };

  MouseEnvironmentableMixin.addMethods = function (klass) {
    lib.inheritMethods(klass, MouseEnvironmentableMixin, 
      'getMouseEnvironment'
    );

  };

  mylibMixins.MouseEnvironmentableMixin = MouseEnvironmentableMixin;
};

module.exports = createMouseEnvironmentableMixin;

},{}],43:[function(require,module,exports){
function createTearable(lib,commonlib, mylib,mylibMixins){
  'use strict';
  function Tearable () {}

  function find_uses (el, item) {
    var use = (item instanceof mylib.Use) ? item : el.childAtPath(item);
    return use.tearOffUseD();
  }

  Tearable.prototype.tear = function (el, to_tear, method_or_function) {
    if (!method_or_function) method_or_function = '_tearOffUseDone';
    lib.q.allSettled(to_tear.map(find_uses.bind(null, el))).done(callIfPossible.bind(null, this, lib.isFunction (method_or_function) ? method_or_function  : this[method_or_function].bind(this), to_tear));
  };

  function callIfPossible (obj, cb, list, results) {
    if (!obj.destroyed) return; /// forget it, element was destroyed
    cb.call(null, results, list);
  }

  function traverse (should_show, cb, item, itemindex, arr) {
    if (lib.isFunction(cb)) cb(item.value, itemindex, arr);
    if (should_show) item.value.show();
  }

  Tearable.prototype.traverseResults = function (results, should_show, cb){
    if (!results) return;
    results.forEach(traverse.bind(null, should_show, cb));
  };
  Tearable.prototype.__cleanUp = lib.dummyFunc;
  Tearable.addMethods = function (chld) {
    lib.inheritMethods (chld, Tearable, 'tear', 'traverseResults');
  };

  mylibMixins.Tearable = Tearable;
}

module.exports = createTearable;

},{}],44:[function(require,module,exports){
function createTriggerChildChanged(lib,commonlib,mylibMixins){
  'use strict';
  function TriggerChildChanged(parents) {
    this._tcc_parents = parents;
  }
  TriggerChildChanged.prototype.__cleanUp = function () {
    lib.arryNullAll(this._tcc_parents);
    this._tcc_parents = null;
  };

  function fire(p) {
    if (!p) return;
    //console.log('CHILD CHANGED ...');
    p.childChanged();
  }
  TriggerChildChanged.prototype.triggerChildChanged = function () {
    this._tcc_parents.forEach(fire);
  };
  TriggerChildChanged.addMethods = function (chld) {
    lib.inheritMethods(chld, TriggerChildChanged, 'triggerChildChanged');
  };

  mylibMixins.TriggerChildChanged = TriggerChildChanged;
}

module.exports = createTriggerChildChanged;

},{}],45:[function(require,module,exports){
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

},{}]},{},[1]);
