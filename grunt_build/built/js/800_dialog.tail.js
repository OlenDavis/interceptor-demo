(function() {
  var Dialog, DialogController, root, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  DialogController = (function(_super) {
    __extends(DialogController, _super);

    function DialogController() {
      _ref = DialogController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DialogController.prototype.$_name = 'DialogController';

    return DialogController;

  })(root.BaseDirectiveController);

  root.Dialog = Dialog = (function(_super) {
    __extends(Dialog, _super);

    Dialog.prototype.$_name = 'Dialog';

    Dialog.prototype.transclude = true;

    Dialog.prototype.controller = DialogController;

    Dialog.prototype.scope = {
      shown: '=',
      screenClass: '@',
      title: '@',
      wholeWidth: '=?'
    };

    Dialog.prototype.notIsolated = true;

    function Dialog() {
      Dialog.__super__.constructor.apply(this, arguments);
      this.$body = angular.element('body');
    }

    Dialog.prototype.link = function(scope, iElement) {
      Dialog.__super__.link.apply(this, arguments);
      iElement.appendTo(this.$body);
      return scope.$on('$destroy', function() {
        return setTimeout(function() {
          return iElement.remove();
        });
      });
    };

    return Dialog;

  })(root.BaseTemplatedDirective);

  root.addDirective(Dialog);

}).call(this);
