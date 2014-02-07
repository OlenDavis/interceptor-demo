(function() {
  var BaseConfigBlock, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.BaseConfigBlock = BaseConfigBlock = (function(_super) {
    __extends(BaseConfigBlock, _super);

    BaseConfigBlock.prototype.$_dependencies = ['$httpProvider', '$interpolateProvider', '$sceProvider'];

    BaseConfigBlock.prototype.templatePath = root.viewTemplatePath || '';

    BaseConfigBlock.prototype.templateSuffix = root.staticFileSuffix || '';

    function BaseConfigBlock() {
      BaseConfigBlock.__super__.constructor.apply(this, arguments);
      this.$interpolateProvider.startSymbol('{[{');
      this.$interpolateProvider.endSymbol('}]}');
      this.$sceProvider.enabled(false);
      this.setupInterceptors();
    }

    BaseConfigBlock.prototype.setupInterceptors = function() {};

    BaseConfigBlock.prototype.addLowestPrecedenceInterceptor = function(interceptor) {
      var _base;
      return this.$httpProvider.interceptors.unshift(angular.isString(interceptor) ? interceptor : interceptor != null ? typeof (_base = interceptor.prototype).$_makeName === "function" ? _base.$_makeName() : void 0 : void 0);
    };

    BaseConfigBlock.prototype.addHighestPrecedenceInterceptor = function(interceptor) {
      var _base;
      return this.$httpProvider.interceptors.push(angular.isString(interceptor) ? interceptor : interceptor != null ? typeof (_base = interceptor.prototype).$_makeName === "function" ? _base.$_makeName() : void 0 : void 0);
    };

    BaseConfigBlock.prototype.$_addToAngular = function(module) {
      BaseConfigBlock.__super__.$_addToAngular.apply(this, arguments);
      return module.config(this.$_makeConstructorArray());
    };

    return BaseConfigBlock;

  })(root.BaseBlock);

}).call(this);
