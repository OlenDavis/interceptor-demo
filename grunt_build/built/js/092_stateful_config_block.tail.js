(function() {
  var StatefulConfigBlock, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.StatefulConfigBlock = StatefulConfigBlock = (function(_super) {
    __extends(StatefulConfigBlock, _super);

    StatefulConfigBlock.prototype.$_dependencies = ['$stateProvider'];

    StatefulConfigBlock.prototype.templatePath = root.viewTemplatePath || '';

    StatefulConfigBlock.prototype.templateSuffix = root.staticFileSuffix || '';

    function StatefulConfigBlock() {
      StatefulConfigBlock.__super__.constructor.apply(this, arguments);
      this.$_states = {};
      this.setupStates();
      this.applyStates();
    }

    StatefulConfigBlock.prototype.setupStates = function() {};

    StatefulConfigBlock.prototype.applyStates = function() {
      var state, stateName, _ref, _results;
      _ref = this.$_states;
      _results = [];
      for (stateName in _ref) {
        state = _ref[stateName];
        _results.push(this.$stateProvider.state(stateName, state));
      }
      return _results;
    };

    StatefulConfigBlock.prototype.addState = function(stateName, state) {
      var allResolvables, controllerResolvables, resolvable, stateResolvables, view, viewControllerResolvables, viewName, _base, _base1, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
      if (_.has(this.$_states, stateName)) {
        throw new Error("The state, '" + stateName + "' is already defined for this config block.");
      }
      allResolvables = {};
      if (state.resolve != null) {
        _.extend(allResolvables, state.resolve);
      }
      if (((_ref = state.resolvables) != null ? _ref.length : void 0) > 0) {
        stateResolvables = {};
        _ref1 = state.resolvables;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          resolvable = _ref1[_i];
          resolvable.prototype.$_addToAngular(stateResolvables);
        }
        _.extend(allResolvables, stateResolvables);
      }
      if (state.controller != null) {
        controllerResolvables = {};
        if (typeof (_base = state.controller.prototype).$_addResolvablesToAngular === "function") {
          _base.$_addResolvablesToAngular(controllerResolvables);
        }
        _.extend(allResolvables, controllerResolvables);
        state.controller = state.controller.prototype.$_addToAngular();
      }
      if (state.views != null) {
        _ref2 = state.views;
        for (viewName in _ref2) {
          view = _ref2[viewName];
          if (view.controller != null) {
            viewControllerResolvables = {};
            if (typeof (_base1 = view.controller.prototype).$_addResolvablesToAngular === "function") {
              _base1.$_addResolvablesToAngular(viewControllerResolvables);
            }
            _.extend(allResolvables, viewControllerResolvables);
            view.controller = view.controller.prototype.$_addToAngular();
          }
          if (((_ref3 = view.templateUrl) != null ? _ref3.length : void 0) > 0) {
            if (((_ref4 = this.templatePath) != null ? _ref4.length : void 0) > 0) {
              view.templateUrl = "" + this.templatePath + view.templateUrl + this.templateSuffix;
            }
          }
        }
      }
      state.resolve = allResolvables;
      if (((_ref5 = state.templateUrl) != null ? _ref5.length : void 0) > 0) {
        if (((_ref6 = this.templatePath) != null ? _ref6.length : void 0) > 0) {
          state.templateUrl = "" + this.templatePath + state.templateUrl + this.templateSuffix;
        }
      }
      this.$_states[stateName] = state;
      return state;
    };

    return StatefulConfigBlock;

  })(root.BaseConfigBlock);

}).call(this);
