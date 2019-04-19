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
