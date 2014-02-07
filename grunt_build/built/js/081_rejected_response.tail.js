(function() {
  var RejectedResponse, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.RejectedResponse = RejectedResponse = (function(_super) {
    __extends(RejectedResponse, _super);

    function RejectedResponse(rejectedResponse, reason) {
      RejectedResponse.__super__.constructor.call(this, rejectedResponse);
      this.$_rejected = true;
      if (reason != null) {
        this.addReason(reason);
      }
    }

    RejectedResponse.prototype.addReason = function(rejectedResponse, reason) {
      if (reason == null) {
        reason = rejectedResponse;
        rejectedResponse = this;
      }
      return root.Request.prototype.addComment(rejectedResponse.request, "(Rejection reason)\t" + reason);
    };

    RejectedResponse.prototype.isWhatItIs = function(possibleRejectedResponse) {
      return (possibleRejectedResponse.$_rejected || (possibleRejectedResponse.status < 200 || possibleRejectedResponse.status >= 300)) && (possibleRejectedResponse.data != null) && (_.has(possibleRejectedResponse, 'data')) && (possibleRejectedResponse.status != null) && (_.has(possibleRejectedResponse, 'status')) && (possibleRejectedResponse.headers != null) && (_.has(possibleRejectedResponse, 'headers')) && (possibleRejectedResponse.config != null) && (_.has(possibleRejectedResponse, 'config'));
    };

    RejectedResponse.prototype.fromRejectedRequest = function(rejectedRequest) {
      return new root.RejectedResponse({
        data: {},
        status: 0,
        headers: (function() {}),
        config: rejectedRequest
      }, "Created from rejectedRequest: " + (rejectedRequest.getDescription().replace('\n', '')));
    };

    return RejectedResponse;

  })(root.Response);

}).call(this);
