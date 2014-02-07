(function() {
  var MainController, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.MainController = MainController = (function(_super) {
    __extends(MainController, _super);

    MainController.prototype.$_name = 'MainController';

    MainController.prototype.$_dependencies = ['$http'];

    function MainController() {
      this.requestFailed = __bind(this.requestFailed, this);
      this.requestSucceeded = __bind(this.requestSucceeded, this);
      MainController.__super__.constructor.apply(this, arguments);
      this.request = this.newRequest();
      this.succeededRequests = new Array();
      this.failedRequests = new Array();
    }

    MainController.prototype.newRequest = function() {
      var request;
      request = new root.Request();
      request.ruinable = true;
      request.method = 'GET';
      return request;
    };

    MainController.prototype.makeRequest = function() {
      return this.$http(this.request).then(this.requestSucceeded, this.requestFailed);
    };

    MainController.prototype.requestSucceeded = function(response) {
      return this.succeededRequests.push(response != null ? response.config : void 0);
    };

    MainController.prototype.requestFailed = function(rejectedResponse) {
      return this.failedRequests.push(typeof response !== "undefined" && response !== null ? response.config : void 0);
    };

    return MainController;

  })(root.BaseController);

}).call(this);
