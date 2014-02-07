(function() {
  var BaseFilter, root, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.BaseFilter = BaseFilter = (function(_super) {
    __extends(BaseFilter, _super);

    function BaseFilter() {
      this.$_filter = __bind(this.$_filter, this);
      _ref = BaseFilter.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BaseFilter.prototype.$_dependentConstructor = function() {
      var filter;
      filter = new this.constructor(root.argumentsToArray(arguments));
      return filter.$_filter;
    };

    BaseFilter.prototype.$_addToAngular = function(module) {
      BaseFilter.__super__.$_addToAngular.apply(this, arguments);
      return module.filter(this.$_makeName(), this.$_makeConstructorArray());
    };

    BaseFilter.prototype.$_filter = function() {
      return this.filter.apply(this, arguments);
    };

    BaseFilter.prototype.filter = function() {};

    return BaseFilter;

  })(root.NamedDependent);

}).call(this);
