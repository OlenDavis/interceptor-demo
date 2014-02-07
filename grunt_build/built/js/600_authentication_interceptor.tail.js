(function() {
  var AuthenticationInterceptor, root, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.AuthenticationInterceptor = AuthenticationInterceptor = (function(_super) {
    __extends(AuthenticationInterceptor, _super);

    function AuthenticationInterceptor() {
      _ref = AuthenticationInterceptor.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AuthenticationInterceptor.prototype.$_name = 'AuthenticationInterceptor';

    AuthenticationInterceptor.prototype.$_dependencies = ['$rootScope'];

    AuthenticationInterceptor.prototype.interceptRequest = function(request) {
      return AuthenticationInterceptor.__super__.interceptRequest.apply(this, arguments);
    };

    AuthenticationInterceptor.prototype.interceptResponse = function(response) {
      return AuthenticationInterceptor.__super__.interceptResponse.apply(this, arguments);
    };

    AuthenticationInterceptor.prototype.interceptRejectedResponse = function(rejectedResponse) {
      return AuthenticationInterceptor.__super__.interceptRejectedResponse.apply(this, arguments);
    };

    return AuthenticationInterceptor;

  })(root.BaseHttpInterceptor);

  root.addFactory(AuthenticationInterceptor);

}).call(this);
