(function() {
  var BaseBlock, root, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.BaseBlock = BaseBlock = (function(_super) {
    __extends(BaseBlock, _super);

    function BaseBlock() {
      _ref = BaseBlock.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BaseBlock.prototype.$_checkName = function() {};

    return BaseBlock;

  })(root.NamedDependent);

}).call(this);
