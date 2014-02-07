(function() {
  var module, moduleName, root, _ref;

  root = window;

  _ref = root.modules;
  for (moduleName in _ref) {
    module = _ref[moduleName];
    root.oooooAngularModules[moduleName] = module.prototype.$_addToAngular();
  }

}).call(this);
