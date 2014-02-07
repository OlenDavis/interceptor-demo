(function() {
  var ActionDialog, ActionDialogController, root, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  ActionDialogController = (function(_super) {
    __extends(ActionDialogController, _super);

    function ActionDialogController() {
      _ref = ActionDialogController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ActionDialogController.prototype.$_name = 'ActionDialogController';

    ActionDialogController.prototype.$_dependencies = ['$q'];

    ActionDialogController.prototype.doPrimaryAction = function() {
      var _this = this;
      this.closing = true;
      return this.$q.when(this.$scope.onPrimaryAction()).then(function(result) {
        _this.$scope.shown = false;
        return result;
      }, null)["finally"](function() {
        return _this.closing = _this.$scope.shieldShown = false;
      });
    };

    ActionDialogController.prototype.doSecondaryAction = function() {
      var _this = this;
      this.closing = true;
      return this.$q.when(this.$scope.onSecondaryAction()).then(function(result) {
        _this.$scope.shown = false;
        return result;
      }, null)["finally"](function() {
        return _this.closing = _this.$scope.shieldShown = false;
      });
    };

    return ActionDialogController;

  })(root.Dialog.prototype.controller);

  ActionDialog = (function(_super) {
    __extends(ActionDialog, _super);

    function ActionDialog() {
      _ref1 = ActionDialog.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    ActionDialog.prototype.$_name = 'ActionDialog';

    ActionDialog.prototype.controller = ActionDialogController;

    ActionDialog.prototype.scope = {
      primaryActionText: '@',
      secondaryActionText: '@',
      onPrimaryAction: '&?',
      onSecondaryAction: '&?',
      shieldShown: '=?'
    };

    ActionDialog.prototype.scopeDefaults = {
      primaryActionText: 'OK',
      secondaryActionText: 'Cancel'
    };

    return ActionDialog;

  })(root.Dialog);

  root.addDirective(ActionDialog);

}).call(this);
