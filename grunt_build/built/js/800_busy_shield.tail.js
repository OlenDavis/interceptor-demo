(function() {
  var BusyShield, root, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  BusyShield = (function(_super) {
    __extends(BusyShield, _super);

    function BusyShield() {
      _ref = BusyShield.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BusyShield.prototype.$_name = 'BusyShield';

    BusyShield.prototype.transclude = true;

    BusyShield.prototype.scope = {
      when: '=',
      shieldClass: '=',
      spinnerClass: '@'
    };

    BusyShield.prototype.scopeDefaults = {
      spinnerClass: 'big h1 heavy thick secondary'
    };

    return BusyShield;

  })(root.BaseTemplatedDirective);

  root.addDirective(BusyShield);

}).call(this);
