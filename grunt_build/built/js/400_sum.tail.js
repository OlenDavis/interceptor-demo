(function() {
  var Sum, root, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  Sum = (function(_super) {
    __extends(Sum, _super);

    function Sum() {
      _ref = Sum.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Sum.prototype.$_name = 'Sum';

    Sum.prototype.filter = function(list, field) {
      var sum, value, _i, _j, _len, _len1;
      sum = 0;
      if (angular.isArray(list)) {
        if (field != null) {
          for (_i = 0, _len = list.length; _i < _len; _i++) {
            value = list[_i];
            sum += value[field];
          }
        } else {
          for (_j = 0, _len1 = list.length; _j < _len1; _j++) {
            value = list[_j];
            sum += value;
          }
        }
      } else if (angular.isObject(list)) {
        if (field != null) {
          for (value in list) {
            sum += value[field];
          }
        } else {
          for (value in list) {
            sum += value;
          }
        }
      }
      return sum;
    };

    return Sum;

  })(root.BaseFilter);

  root.addFilter(Sum);

}).call(this);
