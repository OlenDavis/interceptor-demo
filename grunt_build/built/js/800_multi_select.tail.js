(function() {
  var MultiSelect, MultiSelectController, root, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  MultiSelectController = (function(_super) {
    __extends(MultiSelectController, _super);

    MultiSelectController.prototype.$_name = 'MultiSelectController';

    function MultiSelectController() {
      this.setSelection = __bind(this.setSelection, this);
      var _this = this;
      MultiSelectController.__super__.constructor.apply(this, arguments);
      this.options = {};
      this.$scope.$watch('options', this.setSelection, true);
      this.$scope.$watch('selection', this.setSelection, true);
      this.$scope.$watch('allSelected', function(allSelected) {
        if (allSelected) {
          return _this.updateSelection('all');
        }
      });
      this.$scope.$watch('noneSelected', function(noneSelected) {
        if (noneSelected) {
          return _this.updateSelection('none');
        }
      });
    }

    MultiSelectController.prototype.getOptionValue = function(option) {
      return option.value || option;
    };

    MultiSelectController.prototype.getOptionLabel = function(option) {
      return option.label || option.value || option;
    };

    MultiSelectController.prototype.getOptionName = function(option) {
      return option.name || option.label || option.value || option;
    };

    MultiSelectController.prototype.isSelected = function(option) {
      return -1 !== _.indexOf(this.$scope.selection, this.getOptionValue(option));
    };

    MultiSelectController.prototype.setSelection = function() {
      var option, _i, _len, _ref, _results;
      if (this.$scope.options == null) {
        return;
      }
      _ref = this.$scope.options;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        _results.push(this.options[this.getOptionValue(option)] = this.isSelected(option));
      }
      return _results;
    };

    MultiSelectController.prototype.toggleOption = function(option) {
      if (this.$scope.options == null) {
        return;
      }
      this.options[this.getOptionValue(option)] = !!!this.options[this.getOptionValue(option)];
      this.updateSelection();
      if (this.options[this.getOptionValue(option)]) {
        return this.$scope.onOptionSelected({
          option: option
        });
      } else {
        return this.$scope.onOptionDeselected({
          option: option
        });
      }
    };

    MultiSelectController.prototype.updateSelection = function(to) {
      var newSelection, option, _i, _len, _ref;
      newSelection = new Array();
      if (!this.$scope.selection) {
        this.$scope.selection = new Array();
      }
      if (to === 'all' && this.isAllSelected()) {
        return;
      }
      if (to === 'none' && this.isNoneSelected()) {
        return;
      }
      if (to !== 'none') {
        _ref = this.$scope.options;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          option = _ref[_i];
          if ((to === 'all') || this.options[this.getOptionValue(option)] === true) {
            newSelection.push(this.getOptionValue(option));
          }
        }
      }
      angular.copy(newSelection, this.$scope.selection);
      this.$scope.allSelected = this.isAllSelected();
      return this.$scope.noneSelected = this.isNoneSelected();
    };

    MultiSelectController.prototype.isAllSelected = function() {
      var _ref;
      return this.$scope.options.length === ((_ref = this.$scope.selection) != null ? _ref.length : void 0);
    };

    MultiSelectController.prototype.isNoneSelected = function() {
      var _ref;
      return ((_ref = this.$scope.selection) != null ? _ref.length : void 0) === 0;
    };

    MultiSelectController.prototype.getOptionClass = function(option) {
      var classes;
      classes = {};
      classes[this.$scope.optionClass] = true;
      classes[this.$scope.optionSelectedClass] = this.isSelected(option);
      return classes;
    };

    return MultiSelectController;

  })(root.BaseDirectiveController);

  root.MultiSelect = MultiSelect = (function(_super) {
    __extends(MultiSelect, _super);

    function MultiSelect() {
      _ref = MultiSelect.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MultiSelect.prototype.$_name = 'MultiSelect';

    MultiSelect.prototype.controller = MultiSelectController;

    MultiSelect.prototype.scope = {
      selection: '=',
      options: '=',
      optionClass: '@',
      optionSelectedClass: '@',
      allSelected: '=?',
      noneSelected: '=?',
      onOptionSelected: '&',
      onOptionDeselected: '&'
    };

    MultiSelect.prototype.scopeDefaults = {
      optionClass: 'inline-block less lr-margin',
      optionSelectedClass: ''
    };

    return MultiSelect;

  })(root.BaseTemplatedDirective);

  root.addDirective(MultiSelect);

}).call(this);
