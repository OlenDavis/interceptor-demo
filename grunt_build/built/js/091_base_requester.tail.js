(function() {
  var BaseRequester, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.BaseRequester = BaseRequester = (function(_super) {
    __extends(BaseRequester, _super);

    BaseRequester.prototype.$_dependencies = ['$resource', '$q', '$timeout', '$injector'];

    BaseRequester.prototype.$_apiScheme = root.defaultScheme;

    BaseRequester.prototype.$_apiDomain = root.apiDomain;

    BaseRequester.prototype.$_actions = {};

    BaseRequester.prototype.$_actionDefaults = {};

    BaseRequester.prototype.$_allowedActionMethods = ['GET', 'PUT', 'POST', 'DELETE'];

    BaseRequester.prototype.isHttpMethod = function(method) {
      return -1 !== _.indexOf(this.$_allowedActionMethods, method);
    };

    function BaseRequester() {
      this.$_mergeIntoResponseResourceArray = __bind(this.$_mergeIntoResponseResourceArray, this);
      this.error = __bind(this.error, this);
      this.success = __bind(this.success, this);
      this.$_action = __bind(this.$_action, this);
      var actionDefinition, actionName, notAttachedOnlyActions, _ref, _ref1, _ref2,
        _this = this;
      BaseRequester.__super__.constructor.apply(this, arguments);
      this.$_actionStats = {};
      if ((this.$_resourceClass != null) && !(((_ref = this.$_apiPath) != null ? _ref.length : void 0) > 0)) {
        this.$_apiPath = this.$_resourceClass.prototype.$_makeApiPath();
      }
      this.$_actionDefaults = root.prototypallyExtendPropertyObject(this, '$_actionDefaults');
      this.$_actions = root.prototypallyExtendPropertyObject(this, '$_actions');
      notAttachedOnlyActions = {};
      _ref1 = this.$_actions;
      for (actionName in _ref1) {
        actionDefinition = _ref1[actionName];
        actionDefinition = angular.extend({}, this.$_actionDefaults, actionDefinition);
        actionDefinition.$_hasArray = actionDefinition.$_hasArray || actionDefinition.isArray || false;
        if ((_ref2 = actionDefinition.$_apiPath) != null ? _ref2.length : void 0) {
          actionDefinition.url = "" + this.$_apiScheme + (root.escapeColons(this.$_apiDomain)) + actionDefinition.$_apiPath;
        }
        this.$_actionStats[actionName] = new root.Stats(this.$injector);
        if (!actionDefinition.$_attachedOnly) {
          notAttachedOnlyActions[actionName] = actionDefinition;
        }
      }
      this.$_stats = new root.Stats(this.$injector);
      this.resource = this.$resource("" + this.$_apiScheme + (root.escapeColons(this.$_apiDomain)) + this.$_apiPath, null, notAttachedOnlyActions);
      _.each(notAttachedOnlyActions, function(actionDefinition, actionName) {
        return _this.constructor.prototype[actionName] = function(parameters, postData, theirSuccess, theirError) {
          var responseResource;
          responseResource = _this.$_newResponseResource(actionDefinition, parameters, postData);
          return _this.$_action(responseResource, actionDefinition, actionName, parameters, postData, theirSuccess, theirError);
        };
      });
    }

    BaseRequester.prototype.$_newResponseResource = function(actionDefinition, parameters, postData) {
      var newResource;
      if (actionDefinition == null) {
        actionDefinition = {};
      }
      if (parameters == null) {
        parameters = {};
      }
      if (postData == null) {
        postData = null;
      }
      if (actionDefinition.$_rawResponse) {
        newResource = this.$_initResourceStats(actionDefinition.$_hasArray ? new Array() : {});
      } else {
        if (!actionDefinition.$_hasArray) {
          newResource = new this.$_resourceClass();
        } else {
          newResource = new Array();
          newResource.$_parameters = parameters;
          newResource.$_postData = postData;
        }
        this.$_attachRequesterMethods(newResource);
      }
      return newResource;
    };

    BaseRequester.prototype.$_initResourceStats = function(resource) {
      var actionName, _i, _len, _ref;
      resource.$_actionStats = resource.$_actionStats || {};
      _ref = _.keys(this.$_actions);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        actionName = _ref[_i];
        resource.$_actionStats[actionName] = resource.$_actionStats[actionName] || new root.Stats(this.$injector);
      }
      resource.$_stats = resource.$_stats || new root.Stats(this.$injector);
      return resource;
    };

    BaseRequester.prototype.$_attachRequesterMethods = function(resourceInstance) {
      var _this = this;
      this.$_initResourceStats(resourceInstance);
      _.each(this.$_actions, function(actionDefinition, actionName) {
        var actualAction;
        actualAction = _this.$_action;
        return resourceInstance["$" + actionName] = function(parameters, postData, theirSuccess, theirError) {
          var theirWrappedError, theirWrappedSuccess,
            _this = this;
          if (!actionDefinition.$_hasArray) {
            parameters = this.$_parameters = angular.extend({}, actionDefinition.params || {}, this.$_getApiParameters(), parameters);
            if (actionDefinition.method !== 'GET') {
              postData = this.$_postData = angular.extend({}, actionDefinition.data || {}, this.$_toJson(this), postData);
            }
          } else {
            parameters = this.$_parameters = angular.extend({}, actionDefinition.params || {}, this.$_parameters, parameters);
            if (actionDefinition.method !== 'GET') {
              postData = this.$_postData = angular.extend({}, actionDefinition.data || {}, this.$_postData, postData);
            }
            theirSuccess = actionDefinition.method !== 'GET' ? theirSuccess : theirError;
            theirError = actionDefinition.method !== 'GET' ? theirError : theirSuccess;
          }
          theirWrappedSuccess = function() {
            var _name;
            if (typeof _this[_name = "$" + actionName + "Success"] === "function") {
              _this[_name].apply(_this, arguments);
            }
            return typeof theirSuccess === "function" ? theirSuccess.apply(null, arguments) : void 0;
          };
          theirWrappedError = function() {
            var _name;
            if (typeof _this[_name = "$" + actionName + "Error"] === "function") {
              _this[_name].apply(_this, arguments);
            }
            return typeof theirError === "function" ? theirError.apply(null, arguments) : void 0;
          };
          return actualAction(this, actionDefinition, actionName, parameters, postData, theirWrappedSuccess, theirWrappedError);
        };
      });
      return resourceInstance;
    };

    BaseRequester.prototype.$_action = function(responseResource, actionDefinition, actionName, parameters, postData, theirSuccess, theirError) {
      var deferred, error, success,
        _this = this;
      if (actionDefinition.method === 'GET') {
        theirError = theirSuccess;
        theirSuccess = postData;
        postData = null;
      }
      deferred = this.$q.defer();
      responseResource.$_promise = deferred.promise;
      success = function(responseData, headersGetter) {
        return _this.success(responseResource, responseData, headersGetter, theirSuccess, theirError, deferred, actionName, actionDefinition, parameters, postData);
      };
      error = function(rejectedResponse) {
        return _this.error(responseResource, rejectedResponse, theirError, deferred, actionName, actionDefinition, parameters, postData);
      };
      this.$_stats.addPending();
      this.$_actionStats[actionName].addPending();
      responseResource.$_stats.addPending();
      responseResource.$_actionStats[actionName].addPending();
      if (actionDefinition.method === 'GET') {
        this.resource[actionName](parameters, success, error);
      } else {
        this.resource[actionName](parameters, postData, success, error);
      }
      deferred.promise.then(function(result) {
        _this.$_stats.pendingResolved(result);
        _this.$_actionStats[actionName].pendingResolved(result);
        responseResource.$_stats.pendingResolved(result);
        return responseResource.$_actionStats[actionName].pendingResolved(result);
      }, function(rejection) {
        _this.$_stats.pendingRejected(rejection);
        _this.$_actionStats[actionName].pendingRejected(rejection);
        responseResource.$_stats.pendingRejected(rejection);
        return responseResource.$_actionStats[actionName].pendingRejected(rejection);
      });
      return responseResource;
    };

    BaseRequester.prototype.success = function(responseResource, responseData, headersGetter, theirSuccess, theirError, deferred, actionName, actionDefinition, parameters, postData) {
      var newResources, responseDatum, _i, _len,
        _this = this;
      if (postData == null) {
        postData = null;
      }
      responseData = actionDefinition.$_hasArray ? this.$_getResponseArray(responseData) : this.$_getResponseObject(responseData);
      if (!actionDefinition.$_rawResponse) {
        if (actionDefinition.$_hasArray) {
          newResources = new Array();
          for (_i = 0, _len = responseData.length; _i < _len; _i++) {
            responseDatum = responseData[_i];
            newResources.push(this.$_makeResponseResource(this.$_newResponseResource(), responseDatum, parameters));
          }
          this.$_mergeIntoResponseResourceArray(newResources, responseResource);
        } else {
          this.$_makeResponseResource(responseResource, responseData, parameters);
        }
      } else {
        angular.extend(responseResource, responseData);
      }
      return this.$q.when(angular.isFunction(this["" + actionName + "Success"]) ? this["" + actionName + "Success"](responseResource, headersGetter, parameters, postData) : null).then(function() {
        return _this.$q.when(angular.isFunction(theirSuccess) ? theirSuccess(responseResource, headersGetter, parameters, postData) : null).then(function() {
          return deferred.resolve(responseResource);
        });
      }, function(rejection) {
        return _this.error(responseResource, rejection, theirError, deferred, actionName, actionDefinition, parameters, postData);
      });
    };

    BaseRequester.prototype.error = function(responseResource, rejectedResponse, theirError, deferred, actionName, actionDefinition, parameters, postData) {
      if (postData == null) {
        postData = null;
      }
      if (angular.isFunction(this["" + actionName + "Error"])) {
        this["" + actionName + "Error"](rejectedResponse, parameters, postData);
      }
      if (angular.isFunction(theirError)) {
        theirError(rejectedResponse, parameters, postData);
      }
      return deferred.reject(rejectedResponse);
    };

    BaseRequester.prototype.$_makeResponseResource = function(responseResource, responseDatum, parameters) {
      responseResource.$_setApiParameters(parameters);
      return this.$_fromJson(responseResource, responseDatum);
    };

    BaseRequester.prototype.$_mergeIntoResponseResourceArray = function(newResources, responseResource) {
      responseResource.length = 0;
      return responseResource.push.apply(responseResource, newResources);
    };

    BaseRequester.prototype.$_getResponseArray = function(responseData) {
      return responseData;
    };

    BaseRequester.prototype.$_getResponseObject = function(responseData) {
      return responseData;
    };

    BaseRequester.prototype.$_toJson = function(resource) {
      return resource.$_toJson();
    };

    BaseRequester.prototype.$_fromJson = function(resource, json) {
      return resource.$_fromJson(json);
    };

    return BaseRequester;

  })(root.BaseFactory);

}).call(this);
