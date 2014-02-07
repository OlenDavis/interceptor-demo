(function() {
  var root, targetModuleIndex, targetModuleNames;

  root = window;

  root.modules = {};

  root.oooooAngularModules = {};

  targetModuleNames = new Array();

  targetModuleIndex = function(module) {
    return _.indexOf(targetModuleNames, module.prototype.$_makeName());
  };

  root.setTargetModule = function(module) {
    if (-1 === targetModuleIndex(module)) {
      return targetModuleNames.push(module.prototype.$_makeName());
    }
  };

  root.unsetTargetModule = function(module) {
    if (-1 !== targetModuleIndex(module)) {
      return targetModuleNames.splice(moduleIndex, 1);
    }
  };

  root.addModule = function(module) {
    return root.modules[module.prototype.$_makeName()] = module;
  };

  root.getTargetModules = function() {
    return targetModuleNames;
  };

  root.addController = function(controller) {
    var targetModule, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = targetModuleNames.length; _i < _len; _i++) {
      targetModule = targetModuleNames[_i];
      _results.push(root.modules[targetModule].prototype.addController(controller));
    }
    return _results;
  };

  root.addDirective = function(directive) {
    var targetModule, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = targetModuleNames.length; _i < _len; _i++) {
      targetModule = targetModuleNames[_i];
      _results.push(root.modules[targetModule].prototype.addDirective(directive));
    }
    return _results;
  };

  root.addFactory = function(factory) {
    var targetModule, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = targetModuleNames.length; _i < _len; _i++) {
      targetModule = targetModuleNames[_i];
      _results.push(root.modules[targetModule].prototype.addFactory(factory));
    }
    return _results;
  };

  root.addFilter = function(filter) {
    var targetModule, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = targetModuleNames.length; _i < _len; _i++) {
      targetModule = targetModuleNames[_i];
      _results.push(root.modules[targetModule].prototype.addFilter(filter));
    }
    return _results;
  };

  root.addRunBlock = function(block) {
    var targetModule, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = targetModuleNames.length; _i < _len; _i++) {
      targetModule = targetModuleNames[_i];
      _results.push(root.modules[targetModule].prototype.addRunBlock(block));
    }
    return _results;
  };

  root.addConfigBlock = function(block) {
    var targetModule, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = targetModuleNames.length; _i < _len; _i++) {
      targetModule = targetModuleNames[_i];
      _results.push(root.modules[targetModule].prototype.addConfigBlock(block));
    }
    return _results;
  };

}).call(this);
