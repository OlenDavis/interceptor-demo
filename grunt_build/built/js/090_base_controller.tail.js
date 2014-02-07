(function() {
  var BaseController, root, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.BaseController = BaseController = (function(_super) {
    __extends(BaseController, _super);

    function BaseController() {
      _ref = BaseController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BaseController.prototype.$_autoAttachToDependency = '$scope';

    BaseController.prototype.$_addToAngular = function(module) {
      BaseController.__super__.$_addToAngular.apply(this, arguments);
      if (module != null) {
        return module.controller(this.$_makeName(), this.$_makeConstructorArray());
      } else {
        return this.$_makeConstructorArray();
      }
    };

    return BaseController;

  })(root.AutoAttachableDependent);

}).call(this);
