(function() {
  var NamedDependent, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.NamedDependent = NamedDependent = (function(_super) {
    __extends(NamedDependent, _super);

    NamedDependent.prototype.$_dependencies = [];

    function NamedDependent(dependencies) {
      var dependency, dependencyIndex, _i, _len, _ref;
      _ref = this.$_dependencies;
      for (dependencyIndex = _i = 0, _len = _ref.length; _i < _len; dependencyIndex = ++_i) {
        dependency = _ref[dependencyIndex];
        if (angular.isString(dependency)) {
          this[dependency] = dependencies[dependencyIndex];
        } else {
          this[dependency.prototype.$_name] = dependencies[dependencyIndex];
        }
      }
    }

    NamedDependent.prototype.$_getDependencyStringArray = function(dependencies) {
      var dependency, i, stringDependencies;
      stringDependencies = new Array();
      stringDependencies = (function() {
        var _i, _len, _results;
        _results = [];
        for (i = _i = 0, _len = dependencies.length; _i < _len; i = ++_i) {
          dependency = dependencies[i];
          if (angular.isString(dependency)) {
            _results.push(dependency);
          } else {
            try {
              _results.push(dependency.prototype.$_makeName());
            } catch (_error) {
              throw new Error("The dependency at index " + i + " of " + this.constructor.name + "'s $_dependencies cannot be depended upon as its name cannot be made.");
            }
          }
        }
        return _results;
      }).call(this);
      return stringDependencies;
    };

    NamedDependent.prototype.$_makeDependencyArray = function() {
      this.$_dependencies = root.prototypallyMergePropertyArray(this, '$_dependencies');
      return this.$_dependencies.slice(0);
    };

    NamedDependent.prototype.$_dependentConstructor = function() {
      return new this.constructor(root.argumentsToArray(arguments));
    };

    NamedDependent.prototype.$_makeConstructorArray = function() {
      var constructorArray,
        _this = this;
      constructorArray = this.$_getDependencyStringArray(this.$_makeDependencyArray());
      constructorArray.push(function() {
        return _this.$_dependentConstructor.apply(_this, arguments);
      });
      return constructorArray;
    };

    return NamedDependent;

  })(root.Named);

}).call(this);
