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
