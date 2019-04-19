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
