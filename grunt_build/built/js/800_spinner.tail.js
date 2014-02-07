(function() {
  var Spinner, root, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  Spinner = (function(_super) {
    __extends(Spinner, _super);

    function Spinner() {
      _ref = Spinner.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Spinner.prototype.$_name = 'Spinner';

    Spinner.prototype.transclude = true;

    Spinner.prototype.scope = {
      imgSrc: '@'
    };

    Spinner.prototype.notIsolated = true;

    return Spinner;

  })(root.BaseTemplatedDirective);

  root.addDirective(Spinner);

}).call(this);
