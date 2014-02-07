(function() {
  var Response, root;

  root = window;

  root.Response = Response = (function() {
    function Response(response, comment) {
      if (response instanceof root.Request || root.Request.prototype.isWhatItIs(response) || root.RejectedRequest.prototype.isWhatItIs(response)) {
        response = {
          data: '',
          status: 0,
          headers: function() {},
          config: response
        };
      }
      angular.extend(this, response);
      this.request = new root.Request(this.request || this.config);
      this.$_lastInterceptor = this.request.$_lastInterceptor || "(None yet)";
      this.$_lastInterceptionWasPreRequest = this.request.$_lastInterceptionWasPreRequest;
      this.$_commentCount = this.request.$_commentCount;
      if (comment != null) {
        this.addComment(comment);
      }
    }

    Response.prototype.addComment = function(response, comment) {
      if (comment == null) {
        comment = response;
        response = this;
      }
      return root.Request.prototype.addComment(response.request, comment);
    };

    Response.prototype.getComment = function(response) {
      response = response || this;
      return root.Request.prototype.getComment(response.request);
    };

    Response.prototype.getDescription = function(response) {
      var comment, description, _ref;
      response = response || this;
      comment = this.getComment();
      description = "" + response.config.method + ": " + response.config.url + "\tStatus: " + response.status + "\tData: " + (angular.toJson(response.data));
      if (((_ref = response.$_lastInterceptor) != null ? _ref.length : void 0) > 0) {
        description += "\tLast intercepted by: " + response.$_lastInterceptor;
      }
      if (comment.length > 0) {
        description += "\tWith comments (" + response.$_commentCount + "):\n\t" + comment;
      }
      return description;
    };

    Response.prototype.setLastInterceptor = function() {
      var _ref;
      return (_ref = this.request).setLastInterceptor.apply(_ref, arguments);
    };

    Response.prototype.isWhatItIs = function(possibleResponse) {
      return ((possibleResponse.$_rejected == null) || !possibleResponse.$_rejected) && (_.has(possibleResponse, 'data')) && (possibleResponse.status != null) && (_.has(possibleResponse, 'status')) && (possibleResponse.headers != null) && (_.has(possibleResponse, 'headers')) && (possibleResponse.config != null) && (_.has(possibleResponse, 'config'));
    };

    return Response;

  })();

}).call(this);
