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
