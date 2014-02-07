(function() {
  var BaseResolvableController, root, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  root = window;

  root.BaseResolvableController = BaseResolvableController = (function(_super) {
    __extends(BaseResolvableController, _super);

    function BaseResolvableController() {
      _ref = BaseResolvableController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BaseResolvableController.prototype.$_dependencies = ['$stateParams'];

    BaseResolvableController.prototype.$_resolvables = [];

    BaseResolvableController.prototype.$_addResolvablesToAngular = function(resolvables) {
      var resolvable, _i, _len, _ref1, _results;
      this.$_resolvables = root.prototypallyMergePropertyArray(this, '$_resolvables');
      _ref1 = this.$_resolvables;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        resolvable = _ref1[_i];
        _results.push(resolvable.prototype.$_addToAngular(resolvables));
      }
      return _results;
    };

    BaseResolvableController.prototype.$_makeDependencyArray = function() {
      var _ref1;
      BaseResolvableController.__super__.$_makeDependencyArray.apply(this, arguments);
      this.$_resolvables = root.prototypallyMergePropertyArray(this, '$_resolvables');
      (_ref1 = (this.$_dependencies = _.without.apply(_, [this.$_dependencies].concat(__slice.call(this.$_resolvables))))).push.apply(_ref1, this.$_resolvables);
      return this.$_dependencies.slice(0);
    };

    BaseResolvableController.prototype.$_addToAngular = function() {
      BaseResolvableController.__super__.$_addToAngular.apply(this, arguments);
      return this.$_makeConstructorArray();
    };

    return BaseResolvableController;

  })(root.BaseController);

}).call(this);
