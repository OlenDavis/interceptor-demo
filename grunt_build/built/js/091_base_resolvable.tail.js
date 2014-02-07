(function() {
  var BaseResolvable, root, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.BaseResolvable = BaseResolvable = (function(_super) {
    __extends(BaseResolvable, _super);

    function BaseResolvable() {
      _ref = BaseResolvable.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BaseResolvable.prototype.resolve = function() {
      return null;
    };

    BaseResolvable.prototype.$_dependentConstructor = function() {
      var resolvable;
      resolvable = BaseResolvable.__super__.$_dependentConstructor.apply(this, arguments);
      return resolvable.resolve();
    };

    BaseResolvable.prototype.$_addToAngular = function(resolvables) {
      BaseResolvable.__super__.$_addToAngular.apply(this, arguments);
      return resolvables[this.$_makeName()] = this.$_makeConstructorArray();
    };

    return BaseResolvable;

  })(root.NamedDependent);

}).call(this);
