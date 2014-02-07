(function() {
  var FormattedMoment, FormattedMomentController, root, _ref, _ref1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  FormattedMomentController = (function(_super) {
    __extends(FormattedMomentController, _super);

    function FormattedMomentController() {
      this.onDatePickerSelect = __bind(this.onDatePickerSelect, this);
      this.format = __bind(this.format, this);
      this.parse = __bind(this.parse, this);
      _ref = FormattedMomentController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    FormattedMomentController.prototype.$_name = 'FormattedMomentController';

    FormattedMomentController.prototype.$_link = function() {
      var _this = this;
      this.momentFormat = this.$attrs[FormattedMoment.prototype.$_makeName()] || 'MM/DD/YYYY';
      this.jqueryFormat = this.$attrs.jqueryFormat || 'mm/dd/yy';
      this.startOf = this.$attrs.startOf || 'day';
      this.$element.attr('placeholder', this.momentFormat);
      this.ngModel.$formatters.unshift(this.format);
      this.ngModel.$parsers.unshift(this.parse);
      this.$element.datepicker({
        dateFormat: this.jqueryFormat,
        onSelect: this.onDatePickerSelect
      });
      this.$scope.$watch('afterMoment', function() {
        return _this.parse(_this.ngModel.$viewValue);
      });
      return this.$scope.$watch('beforeMoment', function() {
        return _this.parse(_this.ngModel.$viewValue);
      });
    };

    FormattedMomentController.prototype.parse = function(dateString) {
      var dateMoment, _ref1, _ref2;
      dateMoment = (_ref1 = moment(dateString, this.momentFormat)) != null ? _ref1.startOf(this.startOf) : void 0;
      if (!(dateMoment != null ? dateMoment.isValid() : void 0)) {
        dateMoment = (_ref2 = moment(dateString)) != null ? _ref2.startOf(this.startOf) : void 0;
      }
      if (!(dateMoment != null ? dateMoment.isValid() : void 0)) {
        this.ngModel.$setValidity('moment', false);
        return void 0;
      } else {
        this.ngModel.$setValidity('moment', true);
        if (this.$attrs.afterMoment != null) {
          this.ngModel.$setValidity('afterMoment', dateMoment.isAfter(this.$scope.afterMoment) || dateMoment.isSame(this.$scope.afterMoment));
        }
        if (this.$attrs.beforeMoment != null) {
          this.ngModel.$setValidity('beforeMoment', dateMoment.isBefore(this.$scope.beforeMoment) || dateMoment.isSame(this.$scope.afterMoment));
        }
        return dateMoment;
      }
    };

    FormattedMomentController.prototype.format = function(dateMoment) {
      if (dateMoment == null) {
        return '';
      }
      return moment(dateMoment).format(this.momentFormat);
    };

    FormattedMomentController.prototype.onDatePickerSelect = function(dateText) {
      return this.ngModel.$setViewValue(dateText);
    };

    return FormattedMomentController;

  })(root.BaseDirectiveController);

  FormattedMoment = (function(_super) {
    __extends(FormattedMoment, _super);

    function FormattedMoment() {
      _ref1 = FormattedMoment.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    FormattedMoment.prototype.$_name = 'FormattedMoment';

    FormattedMoment.prototype.controller = FormattedMomentController;

    FormattedMoment.prototype.require = 'ngModel';

    FormattedMoment.prototype.notIsolated = true;

    FormattedMoment.prototype.scope = {
      afterMoment: '=?',
      beforeMoment: '=?'
    };

    return FormattedMoment;

  })(root.BaseDirective);

  root.addDirective(FormattedMoment);

}).call(this);
