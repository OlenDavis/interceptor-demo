(function() {
  var StatefulRunBlock, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.StatefulRunBlock = StatefulRunBlock = (function(_super) {
    __extends(StatefulRunBlock, _super);

    StatefulRunBlock.prototype.$_dependencies = ['$rootScope', '$state', '$stateParams'];

    function StatefulRunBlock() {
      StatefulRunBlock.__super__.constructor.apply(this, arguments);
      this.$rootScope.$state = this.$state;
      this.$rootScope.$stateParams = this.$stateParams;
    }

    return StatefulRunBlock;

  })(root.BaseRunBlock);

}).call(this);
