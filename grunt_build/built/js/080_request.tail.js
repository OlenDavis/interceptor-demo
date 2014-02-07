(function() {
  var Request, root;

  root = window;

  root.Request = Request = (function() {
    Request.prototype.type = {
      get: 0,
      post: 1,
      put: 2,
      "delete": 3
    };

    Request.prototype.method = {
      get: 'GET',
      post: 'POST',
      put: 'PUT',
      "delete": 'DELETE'
    };

    Request.prototype.$_maxLeadingCommentCount = 3;

    Request.prototype.$_maxTrailingCommentCount = 3;

    Request.prototype.$_defaultAllowedRerequests = 10;

    function Request(request, comment) {
      angular.extend(this, request);
      this.$_rejected = false;
      this.$_creationTime = this.$_creationTime || new Date().getTime();
      this.$_comments = this.$_comments || new Array();
      this.$_commentCount = this.$_commentCount || 0;
      this.$_lastCommentTime = this.$_lastCommentTime || -1;
      this.$_lastInterceptor = this.$_lastInterceptor || "(None yet)";
      this.$_lastInterceptionWasPreRequest = this.$_lastInterceptionWasPreRequest != null ? this.$_lastInterceptionWasPreRequest : true;
      this.allowedRerequests = this.allowedRerequests || this.$_defaultAllowedRerequests;
      this.$_rerequestCount = this.$_rerequestCount || 0;
      if (comment != null) {
        this.addComment(comment);
      }
    }

    Request.prototype.mayBeRerequested = function() {
      return (this.allowedRerequests < 0) || this.$_rerequestCount <= this.allowedRerequests;
    };

    Request.prototype.makeRerequest = function(request, comment) {
      request.$_rerequestCount++;
      return new this.constructor(request, comment);
    };

    Request.prototype.addComment = function(request, comment) {
      var actualCommentsMissing, commentsToRemove, now;
      if (comment == null) {
        comment = request;
        request = this;
      }
      request.$_commentCount++;
      now = new Date().getTime();
      if (request.$_lastCommentTime > 0) {
        comment = "(" + (now - request.$_lastCommentTime) + " ms later)\t" + comment;
      }
      request.$_comments.unshift(comment);
      request.$_lastCommentTime = now;
      if ((!(request.$_maxLeadingCommentCount < 0 && request.$_maxTrailingCommentCount)) && request.$_comments.length > Request.prototype.$_maxLeadingCommentCount) {
        commentsToRemove = request.$_comments.length - (Request.prototype.$_maxLeadingCommentCount + Request.prototype.$_maxTrailingCommentCount);
        request.$_comments.splice(Request.prototype.$_maxLeadingCommentCount, commentsToRemove);
        actualCommentsMissing = request.$_commentCount - (Request.prototype.$_maxLeadingCommentCount + Request.prototype.$_maxTrailingCommentCount);
        if (actualCommentsMissing > 0) {
          return request.$_comments.splice(Request.prototype.$_maxLeadingCommentCount, 0, "(Removed " + actualCommentsMissing + ")");
        }
      }
    };

    Request.prototype.getComment = function(request) {
      request = request || this;
      return request.$_comments.join("\n\t<- ");
    };

    Request.prototype.getDescription = function(request) {
      var comment, description;
      request = request || this;
      comment = this.getComment(request);
      description = "" + request.method + ": " + request.url;
      if (comment.length > 0) {
        description += "\tWith comments (" + request.$_commentCount + "):\n\t" + comment;
      }
      return description;
    };

    Request.prototype.isSameRequest = function(request, otherRequest) {
      if (otherRequest == null) {
        otherRequest = request;
        request = this;
      }
      return angular.equals(request.url, otherRequest.url) && angular.equals(request.method, otherRequest.method) && angular.equals(request.params, otherRequest.params) && angular.equals(request.data, otherRequest.data) && angular.equals(request.responseType, otherRequest.responseType);
    };

    Request.prototype.getAge = function(request) {
      request = request || this;
      return new Date().getTime() - request.$_creationTime;
    };

    Request.prototype.setLastInterceptor = function(interceptor, wasPreRequest) {
      this.$_lastInterceptor = interceptor.$_makeName();
      return this.$_lastInterceptionWasPreRequest = wasPreRequest;
    };

    Request.prototype.isWhatItIs = function(possibleRequest) {
      return ((possibleRequest.$_rejected == null) || !possibleRequest.$_rejected) && (possibleRequest.method != null) && (_.has(possibleRequest, 'method')) && (possibleRequest.url != null) && (_.has(possibleRequest, 'url'));
    };

    return Request;

  })();

}).call(this);
