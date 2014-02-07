(function() {
  var CenteredDiv, CenteredDivController, root, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  CenteredDivController = (function(_super) {
    __extends(CenteredDivController, _super);

    function CenteredDivController() {
      _ref = CenteredDivController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CenteredDivController.prototype.$_name = 'CenteredDivController';

    return CenteredDivController;

  })(root.BaseDirectiveController);

  CenteredDiv = (function(_super) {
    __extends(CenteredDiv, _super);

    function CenteredDiv() {
      _ref1 = CenteredDiv.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    CenteredDiv.prototype.$_name = 'CenteredDiv';

    CenteredDiv.prototype.controller = CenteredDivController;

    CenteredDiv.prototype.transclude = true;

    CenteredDiv.prototype.scope = {
      wholeWidth: '=?'
    };

    CenteredDiv.prototype.notIsolated = true;

    return CenteredDiv;

  })(root.BaseTemplatedDirective);

  root.addDirective(CenteredDiv);

}).call(this);
