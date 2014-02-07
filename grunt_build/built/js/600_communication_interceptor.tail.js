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

    CommunicationInterceptor.prototype.interceptRejectedRequest = function(rejectedRequest) {
      return CommunicationInterceptor.__super__.interceptRejectedRequest.apply(this, arguments);
    };

    return CommunicationInterceptor;

  })(root.BaseHttpInterceptor);

  root.addFactory(CommunicationInterceptor);

}).call(this);
