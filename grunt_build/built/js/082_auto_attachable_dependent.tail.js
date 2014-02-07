(function() {
  var AutoAttachableDependent, root, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.AutoAttachableDependent = AutoAttachableDependent = (function(_super) {
    __extends(AutoAttachableDependent, _super);

    function AutoAttachableDependent() {
      _ref = AutoAttachableDependent.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AutoAttachableDependent.prototype.$_autoAttachToDependency = null;

    AutoAttachableDependent.prototype.$_makeDependencyArray = function() {
      var _ref1;
      AutoAttachableDependent.__super__.$_makeDependencyArray.apply(this, arguments);
      if (((_ref1 = this.$_autoAttachToDependency) != null ? _ref1.length : void 0) > 0) {
        (this.$_dependencies = _.without(this.$_dependencies, this.$_autoAttachToDependency)).unshift(this.$_autoAttachToDependency);
      }
      return this.$_dependencies.slice(0);
    };

    AutoAttachableDependent.prototype.$_dependentConstructor = function() {
      var dependent, _ref1;
      dependent = AutoAttachableDependent.__super__.$_dependentConstructor.apply(this, arguments);
      if (((_ref1 = this.$_autoAttachToDependency) != null ? _ref1.length : void 0) > 0) {
        arguments[0][this.$_name] = dependent;
      }
      return dependent;
    };

    return AutoAttachableDependent;

  })(root.NamedDependent);

}).call(this);
