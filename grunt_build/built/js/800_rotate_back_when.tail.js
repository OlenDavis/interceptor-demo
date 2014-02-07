(function() {
  var RotateBackWhen, root, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  RotateBackWhen = (function(_super) {
    __extends(RotateBackWhen, _super);

    function RotateBackWhen() {
      this.link = __bind(this.link, this);
      _ref = RotateBackWhen.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    RotateBackWhen.prototype.$_name = 'RotateBackWhen';

    RotateBackWhen.prototype.rotateBackClass = 'fade-out-rotate-back';

    RotateBackWhen.prototype.rotateForwardClass = 'fade-in-rotate-forward';

    RotateBackWhen.prototype.$_dependencies = ['$timeout'];

    RotateBackWhen.prototype.link = function($scope, $element, $attrs) {
      var _this = this;
      this.$scope = $scope;
      this.$element = $element;
      this.$attrs = $attrs;
      return this.$scope.$watch((function() {
        return !!_this.$scope.$eval(_this.$attrs[_this.$_makeName()]);
      }), function(truthy) {
        _this.$element.removeClass("" + _this.rotateBackClass + " " + _this.rotateForwardClass);
        if (truthy) {
          return _this.$element.addClass(_this.rotateBackClass);
        } else {
          _this.$element.addClass(_this.rotateForwardClass);
          return _this.$timeout((function() {
            return _this.$element.removeClass(_this.rotateForwardClass);
          }), 600);
        }
      });
    };

    return RotateBackWhen;

  })(root.BaseDirective);

  root.addDirective(RotateBackWhen);

}).call(this);
