(function() {
  var KeyCodes, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.KeyCodes = KeyCodes = (function(_super) {
    __extends(KeyCodes, _super);

    KeyCodes.prototype.$_name = 'KeyCodes';

    function KeyCodes() {
      this.options = new Array();
      this.options.push({
        value: this.tab = 9,
        label: 'Tab'
      });
      this.options.push({
        value: this.enter = 13,
        label: 'Enter'
      });
      this.options.push({
        value: this.escape = 27,
        label: 'Escape'
      });
      this.options.push({
        value: this.up = 38,
        label: 'Up Arrow'
      });
      this.options.push({
        value: this.down = 40,
        label: 'Down Arrow'
      });
    }

    return KeyCodes;

  })(root.BaseFactory);

  root.addFactory(KeyCodes);

}).call(this);
