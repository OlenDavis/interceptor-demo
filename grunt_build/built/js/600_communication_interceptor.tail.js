(function() {
  var CommunicationInterceptor, root, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.CommunicationInterceptor = CommunicationInterceptor = (function(_super) {
    __extends(CommunicationInterceptor, _super);

    function CommunicationInterceptor() {
      _ref = CommunicationInterceptor.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CommunicationInterceptor.prototype.$_name = 'CommunicationInterceptor';

    CommunicationInterceptor.prototype.$_dependencies = ['$rootScope'];

    CommunicationInterceptor.prototype.interceptRequest = function(request) {
      return CommunicationInterceptor.__super__.interceptRequest.apply(this, arguments);
    };

    CommunicationInterceptor.prototype.interceptResponse = function(response) {
      return CommunicationInterceptor.__super__.interceptResponse.apply(this, arguments);
    };

    CommunicationInterceptor.prototype.interceptRejectedResponse = function(rejectedResponse) {
      return CommunicationInterceptor.__super__.interceptRejectedResponse.apply(this, arguments);
    };

    return CommunicationInterceptor;

  })(root.BaseHttpInterceptor);

  root.addFactory(CommunicationInterceptor);

}).call(this);
