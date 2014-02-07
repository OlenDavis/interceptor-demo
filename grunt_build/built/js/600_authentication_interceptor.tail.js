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

    AuthenticationInterceptor.prototype.interceptRejectedRequest = function(rejectedRequest) {
      return AuthenticationInterceptor.__super__.interceptRejectedRequest.apply(this, arguments);
    };

    return AuthenticationInterceptor;

  })(root.BaseHttpInterceptor);

  root.addFactory(AuthenticationInterceptor);

}).call(this);
