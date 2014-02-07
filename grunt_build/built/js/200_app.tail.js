(function() {
  var App, root, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  App = (function(_super) {
    __extends(App, _super);

    function App() {
      _ref = App.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    App.prototype.$_name = 'App';

    App.prototype.$_dependencies = ['ui.router', 'ngCookies', 'ngResource', 'ngSanitize'];

    return App;

  })(root.BaseModule);

  root.addModule(App);

  root.setTargetModule(App);

}).call(this);
