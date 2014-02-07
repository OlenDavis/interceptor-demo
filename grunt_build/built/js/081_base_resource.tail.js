(function() {
  var BaseResource, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.BaseResource = BaseResource = (function(_super) {
    __extends(BaseResource, _super);

    BaseResource.prototype.$_prefix = '';

    BaseResource.prototype.$_makeName = function() {
      this.$_checkName();
      return root.camelToDashes(BaseResource.__super__.$_makeName.apply(this, arguments));
    };

    BaseResource.prototype.$_idProperty = null;

    BaseResource.prototype.$_makeApiPath = function() {
      var apiPath, _ref;
      apiPath = "/" + (this.$_makeName());
      if ((_ref = this.$_idProperty) != null ? _ref.length : void 0) {
        apiPath += "/:" + (root.camelToUnderscores(this.$_idProperty));
      }
      return apiPath;
    };

    BaseResource.prototype.$_propertyToJsonMapping = {};

    BaseResource.prototype.$_propertyToApiMapping = {};

    BaseResource.prototype.$_properties = {};

    BaseResource.prototype.$_propertyToResourceMapping = {};

    BaseResource.prototype.$_useThis = true;

    function BaseResource() {
      this.copy = __bind(this.copy, this);
      var inApi, inJson, property, propertyUsage, resourceMapping, underscorizedProperty, _ref, _ref1;
      if (!(this.constructor.prototype.hasOwnProperty('$_propertiesConfigured') && this.constructor.prototype.$_propertiesConfigured)) {
        this.constructor.prototype.$parse = angular.injector(['ng']).get("$parse");
        this.constructor.prototype.$_properties = root.prototypallyExtendPropertyObject(this, '$_properties');
        this.constructor.prototype.$_propertyToJsonMapping = root.prototypallyExtendPropertyObject(this, '$_propertyToJsonMapping');
        this.constructor.prototype.$_propertyToApiMapping = root.prototypallyExtendPropertyObject(this, '$_propertyToApiMapping');
        this.constructor.prototype.$_propertyToResourceMapping = root.prototypallyExtendPropertyObject(this, '$_propertyToResourceMapping');
        this.constructor.prototype.$_allProperties = _.union(_.keys(this.constructor.prototype.$_properties), _.keys(this.constructor.prototype.$_propertyToJsonMapping), _.keys(this.constructor.prototype.$_propertyToApiMapping), _.keys(this.constructor.prototype.$_propertyToResourceMapping));
        if (((_ref = this.$_idProperty) != null ? _ref.length : void 0) && (this.$_properties[this.$_idProperty] == null)) {
          this.constructor.prototype.$_properties[this.$_idProperty] = '=@';
        }
        _ref1 = this.$_properties;
        for (property in _ref1) {
          propertyUsage = _ref1[property];
          underscorizedProperty = root.camelToUnderscores(property);
          if (angular.isString(propertyUsage)) {
            inJson = -1 !== propertyUsage.indexOf('=');
            inApi = -1 !== propertyUsage.indexOf('@');
            if (inJson) {
              this.constructor.prototype.$_propertyToJsonMapping[property] = underscorizedProperty;
            }
            if (inApi) {
              this.constructor.prototype.$_propertyToApiMapping[property] = underscorizedProperty;
            }
          } else if (angular.isFunction(propertyUsage)) {
            resourceMapping = {};
            resourceMapping[underscorizedProperty] = propertyUsage;
            this.constructor.prototype.$_propertyToResourceMapping[property] = resourceMapping;
          }
        }
        this.constructor.prototype.$_propertiesConfigured = true;
      }
      this.$_init();
    }

    BaseResource.prototype.copy = function(anotherResource, excludeProperties) {
      var field, _i, _len, _ref, _results;
      if (excludeProperties == null) {
        excludeProperties = {};
      }
      _ref = this.$_allProperties;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        field = _ref[_i];
        if (!excludeProperties[field]) {
          _results.push(this[field] = angular.copy(anotherResource[field]));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    BaseResource.prototype.$_init = function() {};

    BaseResource.prototype.$_toJson = function() {
      var json,
        _this = this;
      json = {};
      if (this.$_useThis) {
        json["this"] = json;
      }
      angular.forEach(this.$_propertyToJsonMapping, function(jsonExpression, propertyExpression) {
        var jsonExpressionSetter, propertyExpressionGetter;
        propertyExpressionGetter = _this.$parse(propertyExpression);
        jsonExpressionSetter = _this.$parse(jsonExpression).assign;
        return jsonExpressionSetter(json, propertyExpressionGetter(_this));
      });
      angular.forEach(this.$_propertyToResourceMapping, function(aggregateResourceDefinition, propertyExpression) {
        var propertyExpressionGetter;
        propertyExpressionGetter = _this.$parse(propertyExpression);
        return angular.forEach(aggregateResourceDefinition, function(resourceClass, jsonExpression) {
          var aggregatedResource, aggregatedResourceObjectOrArray, isPropertyArray, jsonAggregateResources, jsonExpressionSetter, _i, _len;
          jsonExpressionSetter = _this.$parse(jsonExpression).assign;
          jsonAggregateResources = new Array();
          isPropertyArray = false;
          aggregatedResourceObjectOrArray = propertyExpressionGetter(_this);
          if (!angular.isDefined(aggregatedResourceObjectOrArray)) {
            return;
          }
          if (aggregatedResourceObjectOrArray instanceof resourceClass) {
            jsonAggregateResources.push(aggregatedResourceObjectOrArray.$_toJson());
          } else if (angular.isArray(aggregatedResourceObjectOrArray)) {
            isPropertyArray = true;
            for (_i = 0, _len = aggregatedResourceObjectOrArray.length; _i < _len; _i++) {
              aggregatedResource = aggregatedResourceObjectOrArray[_i];
              if (aggregatedResource instanceof resourceClass) {
                jsonAggregateResources.push(aggregatedResource.$_toJson());
              }
            }
          } else if (angular.isObject(aggregatedResourceObjectOrArray)) {
            isPropertyArray = true;
            for (aggregatedResource in aggregatedResourceObjectOrArray) {
              if (aggregatedResource instanceof resourceClass) {
                jsonAggregateResources.push(aggregatedResource.$_toJson());
              }
            }
          }
          if (isPropertyArray || jsonAggregateResources.length > 1) {
            return jsonExpressionSetter(json, jsonAggregateResources);
          } else {
            if (jsonAggregateResources[0] != null) {
              return jsonExpressionSetter(json, jsonAggregateResources[0]);
            }
          }
        });
      });
      if (this.$_useThis) {
        root["delete"](json, 'this');
      }
      return json;
    };

    BaseResource.prototype.$_fromJson = function(json) {
      var _this = this;
      json = json || {};
      if (this.$_useThis) {
        json["this"] = json;
      }
      angular.forEach(this.$_propertyToJsonMapping, function(jsonExpression, propertyExpression) {
        var jsonExpressionGetter, jsonValue, propertyExpressionGetter, propertyExpressionSetter;
        jsonExpressionGetter = _this.$parse(jsonExpression);
        jsonValue = jsonExpressionGetter(json);
        propertyExpressionGetter = _this.$parse(propertyExpression);
        propertyExpressionSetter = propertyExpressionGetter.assign;
        return propertyExpressionSetter(_this, jsonValue);
      });
      angular.forEach(this.$_propertyToResourceMapping, function(aggregateResourceDefinition, propertyExpression) {
        var isPropertyArray, jsonResources, propertyExpressionGetter, propertyExpressionSetter;
        isPropertyArray = false;
        jsonResources = new Array();
        propertyExpressionGetter = _this.$parse(propertyExpression);
        propertyExpressionSetter = propertyExpressionGetter.assign;
        angular.forEach(aggregateResourceDefinition, function(resourceClass, jsonExpression) {
          var jsonExpressionGetter, jsonResourceDatum, jsonResourceObjectOrArray, _i, _len, _results;
          jsonExpressionGetter = _this.$parse(jsonExpression);
          jsonResourceObjectOrArray = jsonExpressionGetter(json);
          if (angular.isArray(jsonResourceObjectOrArray)) {
            isPropertyArray = isPropertyArray || true;
            _results = [];
            for (_i = 0, _len = jsonResourceObjectOrArray.length; _i < _len; _i++) {
              jsonResourceDatum = jsonResourceObjectOrArray[_i];
              _results.push(jsonResources.push(new resourceClass().$_fromJson(jsonResourceDatum)));
            }
            return _results;
          } else {
            return jsonResources.push(new resourceClass().$_fromJson(jsonResourceObjectOrArray));
          }
        });
        if (isPropertyArray || jsonResources.length > 1) {
          return propertyExpressionSetter(_this, jsonResources);
        } else {
          if (jsonResources[0] != null) {
            return propertyExpressionSetter(_this, jsonResources[0]);
          }
        }
      });
      if (this.$_useThis) {
        root["delete"](json, 'this');
      }
      this.$_init();
      return this;
    };

    BaseResource.prototype.$_getApiParameters = function() {
      var apiParameter, parameters, property, _ref;
      parameters = {};
      _ref = this.$_propertyToApiMapping;
      for (property in _ref) {
        apiParameter = _ref[property];
        if (this[property] != null) {
          parameters[apiParameter] = this[property];
        }
      }
      return parameters;
    };

    BaseResource.prototype.$_setApiParameters = function(parameters) {
      var apiParameter, property, _ref;
      _ref = this.$_propertyToApiMapping;
      for (property in _ref) {
        apiParameter = _ref[property];
        if ((parameters != null ? parameters[apiParameter] : void 0) != null) {
          this[property] = parameters[apiParameter];
        }
      }
      return this;
    };

    return BaseResource;

  })(root.Named);

}).call(this);
