(function() {
  var AppConfig, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  AppConfig = (function(_super) {
    __extends(AppConfig, _super);

    AppConfig.prototype.$_dependencies = ['$urlRouterProvider'];

    function AppConfig() {
      AppConfig.__super__.constructor.apply(this, arguments);
      this.$urlRouterProvider.otherwise('/main');
    }

    AppConfig.prototype.setupStates = function() {
      return this.addState('main', {
        url: '/main',
        templateUrl: 'main.html',
        controller: root.MainController
      });
    };

    AppConfig.prototype.setupInterceptors = function() {
      this.addHighestPrecedenceInterceptor(root.AuthenticationInterceptor);
      this.addHighestPrecedenceInterceptor(root.CommunicationInterceptor);
      return this.addHighestPrecedenceInterceptor(root.RuinousInterceptor);
    };

    return AppConfig;

  })(root.StatefulConfigBlock);

  root.addConfigBlock(AppConfig);

}).call(this);
