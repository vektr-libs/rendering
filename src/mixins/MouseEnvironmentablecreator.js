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
