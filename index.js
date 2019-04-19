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
  require('./src/Usecreator')(lib,mathlib, ret);
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
