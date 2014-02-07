(function() {
  var Named, root;

  root = window;

  root.Named = Named = (function() {
    function Named() {}

    Named.prototype.$_prefix = root.defaultPrefix || "";

    Named.prototype.$_checkName = function() {
      if (!((this.$_name != null) && _.has(this, "$_name"))) {
        throw new Error("Cannot add injectable, " + this.constructor.name + ", to the given module because it doesn't define its own $_name.");
      }
    };

    Named.prototype.$_makeName = function() {
      return this.$_prefix + this.$_name;
    };

    Named.prototype.$_addToAngular = function() {
      return this.$_checkName();
    };

    return Named;

  })();

}).call(this);
