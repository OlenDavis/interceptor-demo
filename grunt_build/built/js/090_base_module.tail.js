(function() {
  var BaseModule, root, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.BaseModule = BaseModule = (function(_super) {
    __extends(BaseModule, _super);

    function BaseModule() {
      _ref = BaseModule.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BaseModule.prototype.configBlocks = new Array();

    BaseModule.prototype.runBlocks = new Array();

    BaseModule.prototype.factories = new Array();

    BaseModule.prototype.filters = new Array();

    BaseModule.prototype.directives = new Array();

    BaseModule.prototype.controllers = new Array();

    BaseModule.prototype.addConfigBlock = function(configBlock) {
      return this.configBlocks.push(configBlock);
    };

    BaseModule.prototype.addRunBlock = function(runBlock) {
      return this.runBlocks.push(runBlock);
    };

    BaseModule.prototype.addFactory = function(factory) {
      return this.factories.push(factory);
    };

    BaseModule.prototype.addFilter = function(filter) {
      return this.filters.push(filter);
    };

    BaseModule.prototype.addDirective = function(directive) {
      return this.directives.push(directive);
    };

    BaseModule.prototype.addController = function(controller) {
      return this.controllers.push(controller);
    };

    BaseModule.prototype.$_dependencies = ['ng'];

    BaseModule.prototype.$_addToAngular = function() {
      var configBlock, controller, directive, factory, filter, module, runBlock, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
      BaseModule.__super__.$_addToAngular.apply(this, arguments);
      this.$_dependencies = root.prototypallyMergePropertyArray(this, '$_dependencies');
      module = angular.module(this.$_makeName(), this.$_dependencies);
      _ref1 = this.configBlocks;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        configBlock = _ref1[_i];
        configBlock.prototype.$_addToAngular(module);
      }
      _ref2 = this.runBlocks;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        runBlock = _ref2[_j];
        runBlock.prototype.$_addToAngular(module);
      }
      _ref3 = this.factories;
      for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
        factory = _ref3[_k];
        factory.prototype.$_addToAngular(module);
      }
      _ref4 = this.filters;
      for (_l = 0, _len3 = _ref4.length; _l < _len3; _l++) {
        filter = _ref4[_l];
        filter.prototype.$_addToAngular(module);
      }
      _ref5 = this.directives;
      for (_m = 0, _len4 = _ref5.length; _m < _len4; _m++) {
        directive = _ref5[_m];
        directive.prototype.$_addToAngular(module);
      }
      _ref6 = this.controllers;
      for (_n = 0, _len5 = _ref6.length; _n < _len5; _n++) {
        controller = _ref6[_n];
        controller.prototype.$_addToAngular(module);
      }
      return module;
    };

    return BaseModule;

  })(root.Named);

}).call(this);
