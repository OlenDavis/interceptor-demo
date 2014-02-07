(function() {
  var root;

  root = window;

  root.argumentsToArray = function(args) {
    var array;
    array = new Array();
    array.push.apply(array, args);
    return array;
  };

  root.camelToUnderscores = function(someText) {
    return someText != null ? someText.replace(/([a-z])([A-Z])/g, function(match, lowerPart, upperPart) {
      return lowerPart + '_' + upperPart.toLowerCase();
    }).toLowerCase() : void 0;
  };

  root.camelToDashes = function(someText) {
    return someText != null ? someText.replace(/([a-z])([A-Z])/g, function(match, lowerPart, upperPart) {
      return lowerPart + '-' + upperPart.toLowerCase();
    }).toLowerCase() : void 0;
  };

  root.underscorize = function(something) {
    return something != null ? something.toLowerCase().replace(/[^\w]/g, '_').replace(/_+/g, '_') : void 0;
  };

  root.lowercaseNoWhitespace = function(something) {
    return something != null ? something.toLowerCase().replace(/\s/g, '') : void 0;
  };

  root.prototypallyExtendPropertyObject = function(target, propertyName) {
    if (target.constructor.__super__ != null) {
      return _.extend(prototypallyExtendPropertyObject(target.constructor.__super__, propertyName), target.constructor.prototype[propertyName] || {});
    } else {
      return target.constructor.prototype[propertyName] || {};
    }
  };

  root.prototypallyMergePropertyArray = function(target, propertyName) {
    if (target.constructor.__super__ != null) {
      return _.union(prototypallyMergePropertyArray(target.constructor.__super__, propertyName), target.constructor.prototype[propertyName] || new Array());
    } else {
      return target.constructor.prototype[propertyName] || new Array();
    }
  };

  root["delete"] = function(object, property) {
    object[property] = void 0;
    try {
      return delete object[property];
    } catch (_error) {

    }
  };

  root.escapeColons = function(text) {
    return text != null ? text.replace(/:/g, '\\:') : void 0;
  };

  root.indexOfByProperty = function(haystack, needle, property) {
    var anotherNeedle, i, index, needleWrapper, theNeedle, _i, _len;
    if (property == null) {
      property = 'id';
    }
    theNeedle = !angular.isObject(needle) ? (needleWrapper = {}, needleWrapper[property] = needle, needleWrapper) : needle;
    index = -1;
    for (i = _i = 0, _len = haystack.length; _i < _len; i = ++_i) {
      anotherNeedle = haystack[i];
      if (angular.equals(theNeedle[property], anotherNeedle[property])) {
        index = i;
        break;
      }
    }
    return index;
  };

  root.findByProperty = function(haystack, needle, property) {
    var index;
    index = root.indexOfByProperty.apply(root, arguments);
    if (index >= 0) {
      return haystack[index];
    } else {
      return null;
    }
  };

  root.removeByProperty = function(haystack, needle, property) {
    var index;
    index = root.indexOfByProperty.apply(root, arguments);
    if (index >= 0) {
      return haystack.splice(index, 1);
    }
  };

}).call(this);
