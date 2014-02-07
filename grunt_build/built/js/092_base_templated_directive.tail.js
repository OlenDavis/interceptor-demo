(function() {
  var BaseTemplatedDirective, root, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.BaseTemplatedDirective = BaseTemplatedDirective = (function(_super) {
    __extends(BaseTemplatedDirective, _super);

    function BaseTemplatedDirective() {
      _ref = BaseTemplatedDirective.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BaseTemplatedDirective.prototype.restrict = 'E';

    BaseTemplatedDirective.prototype.replace = true;

    BaseTemplatedDirective.prototype.$_makeAngularDefinition = function() {
      if (this.templateUrl == null) {
        this.templateUrl = "" + (root.camelToDashes(this.$_name)) + ".html";
      }
      return BaseTemplatedDirective.__super__.$_makeAngularDefinition.apply(this, arguments);
    };

    BaseTemplatedDirective.prototype.compile = function(tElement) {
      BaseTemplatedDirective.__super__.compile.apply(this, arguments);
      return tElement.addClass(root.camelToDashes(this.$_name));
    };

    return BaseTemplatedDirective;

  })(root.BaseDirective);

}).call(this);
