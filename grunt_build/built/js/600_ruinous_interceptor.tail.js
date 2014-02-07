(function() {
  var RuinousInterceptor, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.RuinousInterceptor = RuinousInterceptor = (function(_super) {
    __extends(RuinousInterceptor, _super);

    RuinousInterceptor.prototype.$_name = 'RuinousInterceptor';

    RuinousInterceptor.prototype.$_dependencies = ['$rootScope'];

    RuinousInterceptor.prototype.$defaultOdds = .75;

    function RuinousInterceptor() {
      RuinousInterceptor.__super__.constructor.apply(this, arguments);
      this.$rootScope.communicationOdds = this.$rootScope.communicationOdds || this.$defaultOdds;
      this.$rootScope.authenticationOdds = this.$rootScope.authenticationOdds || this.$defaultOdds;
    }

    RuinousInterceptor.prototype.interceptRequest = function(request) {
      if (request.ruinable) {
        request.communicationFailed = Math.random() > this.$rootScope.communicationOdds;
        request.authenticationFailed = Math.random() > this.$rootScope.authenticationOdds;
        if (!(request.communicationFailed || request.authenticationFailed)) {
          return RuinousInterceptor.__super__.interceptRequest.apply(this, arguments);
        } else {
          return new root.RejectedRequest(request);
        }
      } else {
        return RuinousInterceptor.__super__.interceptRequest.apply(this, arguments);
      }
    };

    RuinousInterceptor.prototype.interceptRejectedRequest = function(rejectedRequest) {
      if (rejectedRequest.communicationFailed || rejectedRequest.authenticationFailed) {
        console.log("Request '" + rejectedRequest.name + "' failed because of " + (rejectedRequest.communicationFailed ? 'a communication failure' : 'an authentication failure') + ".");
      }
      return RuinousInterceptor.__super__.interceptRejectedRequest.apply(this, arguments);
    };

    return RuinousInterceptor;

  })(root.BaseHttpInterceptor);

  root.addFactory(RuinousInterceptor);

}).call(this);
