(function() {
  var MainController, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.MainController = MainController = (function(_super) {
    __extends(MainController, _super);

    MainController.prototype.$_name = 'MainController';

    MainController.prototype.$_dependencies = ['$http'];

    function MainController() {
      MainController.__super__.constructor.apply(this, arguments);
      this.request = this.newRequest();
    }

    MainController.prototype.newRequest = function() {
      var request;
      request = new root.Request();
      request.ruinable = true;
      return request;
    };

    MainController.prototype.makeRequest = function() {
      return this.$http(this.request);
    };

    return MainController;

  })(root.BaseController);

}).call(this);
