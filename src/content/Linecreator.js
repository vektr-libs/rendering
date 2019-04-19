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

