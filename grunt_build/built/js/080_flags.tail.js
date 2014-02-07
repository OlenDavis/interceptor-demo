(function() {
  var Flags, root;

  root = window;

  root.Flags = Flags = (function() {
    function Flags(value) {
      this.value = value != null ? value : 0;
    }

    Flags.prototype.isSet = function(flag) {
      if (flag == null) {
        flag = null;
      }
      if (flag != null) {
        return flag === (this.value & flag);
      } else {
        return this.value !== 0;
      }
    };

    Flags.prototype.set = function(flag) {
      return this.value |= flag;
    };

    Flags.prototype.unset = function(flag) {
      return this.value &= !flag;
    };

    Flags.prototype.toggle = function(flags) {
      var flagsToSet, flagsToUnset;
      flagsToUnset = flags & this.value;
      flagsToSet = flags ^ this.value;
      this.unset(flagsToUnset);
      return this.set(flagsToSet);
    };

    return Flags;

  })();

}).call(this);
