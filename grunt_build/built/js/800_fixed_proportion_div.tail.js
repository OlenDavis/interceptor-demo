(function() {
  var FixedProportionDiv, root, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.FixedProportionDiv = FixedProportionDiv = (function(_super) {
    __extends(FixedProportionDiv, _super);

    function FixedProportionDiv() {
      _ref = FixedProportionDiv.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    FixedProportionDiv.prototype.$_name = 'FixedProportionDiv';

    FixedProportionDiv.prototype.transclude = true;

    FixedProportionDiv.prototype.scope = {
      ratioWidth: '@',
      ratioHeight: '@',
      scrollable: '@'
    };

    FixedProportionDiv.prototype.scopeDefaults = {
      ratioWidth: 4,
      ratioHeight: 3,
      scrollable: false
    };

    return FixedProportionDiv;

  })(root.BaseTemplatedDirective);

  root.addDirective(FixedProportionDiv);

}).call(this);
