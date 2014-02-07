(function() {
  var BaseHttpInterceptor, root, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.BaseHttpInterceptor = BaseHttpInterceptor = (function(_super) {
    __extends(BaseHttpInterceptor, _super);

    function BaseHttpInterceptor() {
      this.responseError = __bind(this.responseError, this);
      this.response = __bind(this.response, this);
      this.requestError = __bind(this.requestError, this);
      this.request = __bind(this.request, this);
      _ref = BaseHttpInterceptor.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BaseHttpInterceptor.prototype.$_dependencies = ['$q', '$injector'];

    BaseHttpInterceptor.prototype.$_hasHttp = false;

    BaseHttpInterceptor.prototype.$_makeDependencyArray = function() {
      this.$_dependencies = BaseHttpInterceptor.__super__.$_makeDependencyArray.apply(this, arguments);
      this.$_hasHttp = _.indexOf(this.$_dependencies, '$http') >= 0;
      this.$_dependencies = _.without(this.$_dependencies, '$http');
      return this.$_dependencies.slice(0);
    };

    BaseHttpInterceptor.prototype.injectCircularDependencies = function() {
      if (this.$_hasHttp && (this.$http == null)) {
        return this.$http = this.$injector.get('$http');
      }
    };

    BaseHttpInterceptor.prototype.interceptRequest = function(request) {
      return request;
    };

    BaseHttpInterceptor.prototype.interceptRejectedRequest = function(rejectedRequest) {
      return rejectedRequest;
    };

    BaseHttpInterceptor.prototype.interceptResponse = function(response) {
      return response;
    };

    BaseHttpInterceptor.prototype.interceptRejectedResponse = function(rejectedResponse) {
      return rejectedResponse;
    };

    BaseHttpInterceptor.prototype.request = function(config) {
      var result, wrappedRequest;
      this.injectCircularDependencies();
      wrappedRequest = this.checkRequest(config);
      result = this.checkRequestResult(this.interceptRequest(wrappedRequest), false);
      return result;
    };

    BaseHttpInterceptor.prototype.requestError = function(rejectedRequest) {
      var result, wrappedRejectedRequest;
      this.injectCircularDependencies();
      wrappedRejectedRequest = this.checkRejectedRequest(rejectedRequest);
      result = this.checkRequestResult(this.interceptRejectedRequest(wrappedRejectedRequest), true);
      return result;
    };

    BaseHttpInterceptor.prototype.response = function(response) {
      var result, wrappedResponse;
      this.injectCircularDependencies();
      wrappedResponse = this.checkResponse(response);
      result = this.checkResponseResult(this.interceptResponse(wrappedResponse), false);
      return result;
    };

    BaseHttpInterceptor.prototype.responseError = function(rejectedResponse) {
      var result, wrappedRejectedResponse;
      this.injectCircularDependencies();
      wrappedRejectedResponse = this.checkRejectedResponse(rejectedResponse);
      result = this.checkResponseResult(this.interceptRejectedResponse(wrappedRejectedResponse), true);
      return result;
    };

    BaseHttpInterceptor.prototype.checkRequest = function(request) {
      var errorMessage;
      if (!root.Request.prototype.isWhatItIs(request)) {
        errorMessage = "The request intercepted by the '" + (this.$_makeName()) + "' interceptor wasn't actually a request (in JSON):\n\t\t" + (angular.toJson(request));
        if (request.$_lastInterceptor != null) {
          errorMessage += "\n(The problem likely originates somewhere in " + request.$_lastInterceptor + "'s interceptRequest method.)";
        }
        throw new Error(errorMessage);
      } else {
        return new root.Request(request);
      }
    };

    BaseHttpInterceptor.prototype.checkRejectedRequest = function(rejectedRequest) {
      var errorMessage;
      if (!root.RejectedRequest.prototype.isWhatItIs(rejectedRequest)) {
        errorMessage = "The rejectedRequest intercepted by the '" + (this.$_makeName()) + "' interceptor wasn't actually a rejectedRequest (in JSON):\n\t\t" + (angular.toJson(rejectedRequest));
        if (rejectedRequest.$_lastInterceptor != null) {
          errorMessage += "\n(The problem likely originates somewhere in " + rejectedRequest.$_lastInterceptor + "'s interceptRejectedRequest method.)";
        }
        throw new Error(errorMessage);
      } else {
        return new root.RejectedRequest(rejectedRequest);
      }
    };

    BaseHttpInterceptor.prototype.checkRequestResult = function(requestResult, fromRejection) {
      var _this = this;
      if (!((fromRejection && requestResult instanceof root.RejectedRequest) || (!fromRejection && requestResult instanceof root.Request) || (this.isPromise(requestResult)))) {
        throw new Error("The result of the '" + (this.$_makeName()) + "' interceptor's " + (fromRejection ? 'interceptRejectedRequest' : 'interceptRequest') + " was not a valid Request, RejectedRequest, or promise object (in JSON):\n\t\t" + (angular.toJson(requestResult)));
      } else {
        if (!this.isPromise(requestResult)) {
          requestResult.setLastInterceptor(this, true);
        }
        if (requestResult instanceof root.RejectedRequest) {
          return this.$q.reject(requestResult);
        } else if (requestResult instanceof root.Request) {
          return requestResult;
        } else {
          return requestResult.then((function(eventualRequest) {
            return _this.checkRequestResult(eventualRequest, false);
          }), (function(eventualRejectedRequest) {
            return _this.checkRequestResult(eventualRejectedRequest, true);
          }));
        }
      }
    };

    BaseHttpInterceptor.prototype.checkResponse = function(response) {
      var errorMessage;
      if (!root.Response.prototype.isWhatItIs(response)) {
        errorMessage = "The response intercepted by the '" + (this.$_makeName()) + "' interceptor wasn't actually a response (in JSON):\n\t\t" + (angular.toJson(response));
        if (response.$_lastInterceptor != null) {
          errorMessage += "\n(The problem likely originates somewhere in " + response.$_lastInterceptor + "'s interceptResponse method.)";
        }
        throw new Error(errorMessage);
      } else {
        return new root.Response(response);
      }
    };

    BaseHttpInterceptor.prototype.checkRejectedResponse = function(rejectedResponse) {
      var errorMessage;
      if (!(root.RejectedResponse.prototype.isWhatItIs(rejectedResponse) || rejectedResponse instanceof root.RejectedRequest)) {
        errorMessage = "The rejectedResponse intercepted by the '" + (this.$_makeName()) + "' interceptor wasn't actually a rejectedResponse (in JSON):\n\t\t" + (angular.toJson(rejectedResponse));
        if (rejectedResponse.$_lastInterceptor != null) {
          errorMessage += "\n(The problem likely originates somewhere in " + rejectedResponse.$_lastInterceptor + "'s interceptRejectedResponse method.)";
        }
        throw new Error(errorMessage);
      } else {
        if (!(rejectedResponse instanceof root.RejectedRequest)) {
          return new root.RejectedResponse(rejectedResponse);
        } else {
          return root.RejectedResponse.prototype.fromRejectedRequest(rejectedResponse);
        }
      }
    };

    BaseHttpInterceptor.prototype.checkResponseResult = function(responseResult, fromRejection) {
      var _this = this;
      if (!((fromRejection && responseResult instanceof root.RejectedResponse) || (!fromRejection && responseResult instanceof root.Response) || (this.isPromise(responseResult)))) {
        throw new Error("The result of the '" + (this.$_makeName()) + "' interceptor's " + (fromRejection ? 'interceptRejectedResponse' : 'interceptResponse') + " was not a valid Response, RejectedResponse, or promise object (in JSON):\n\t\t" + (angular.toJson(responseResult)));
      } else {
        if (!this.isPromise(responseResult)) {
          responseResult.setLastInterceptor(this, true);
        }
        if (responseResult instanceof root.RejectedResponse) {
          return this.$q.reject(responseResult);
        } else if (responseResult instanceof root.Response) {
          return responseResult;
        } else {
          return responseResult.then((function(eventualResponse) {
            return _this.checkResponseResult(eventualResponse, false);
          }), (function(eventualRejectedResponse) {
            return _this.checkResponseResult(eventualRejectedResponse, true);
          }));
        }
      }
    };

    BaseHttpInterceptor.prototype.isPromise = function(promise) {
      return _.isFunction(promise.then);
    };

    BaseHttpInterceptor.prototype.isConfig = function(config) {
      return _.has(config, 'method') && _.has(config, 'url') && !root.Request.prototype.isWhatItIs(config);
    };

    BaseHttpInterceptor.prototype.isRawResponse = function(response) {
      return _.has(response, 'status') && _.has(response, 'config') && _.has(response, 'data') && _.isFunction(response.headers);
    };

    return BaseHttpInterceptor;

  })(root.BaseFactory);

}).call(this);
