(function() {
  var BaseRunBlock, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.BaseRunBlock = BaseRunBlock = (function(_super) {
    __extends(BaseRunBlock, _super);

    BaseRunBlock.prototype.$_dependencies = ['$rootScope'];

    function BaseRunBlock() {
      BaseRunBlock.__super__.constructor.apply(this, arguments);
      this.$rootScope.isBrowser = root.isBrowser;
    }

    BaseRunBlock.prototype.$_addToAngular = function(module) {
      return module.run(this.$_makeConstructorArray());
    };

    return BaseRunBlock;

  })(root.BaseBlock);

}).call(this);
