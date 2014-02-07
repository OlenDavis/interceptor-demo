(function() {
  var BaseFactory, root, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.BaseFactory = BaseFactory = (function(_super) {
    __extends(BaseFactory, _super);

    function BaseFactory() {
      _ref = BaseFactory.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BaseFactory.prototype.$_addToAngular = function(module) {
      BaseFactory.__super__.$_addToAngular.apply(this, arguments);
      return module.factory(this.$_makeName(), this.$_makeConstructorArray());
    };

    return BaseFactory;

  })(root.AutoAttachableDependent);

}).call(this);
