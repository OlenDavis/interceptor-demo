(function() {
  var RejectedRequest, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  root.RejectedRequest = RejectedRequest = (function(_super) {
    __extends(RejectedRequest, _super);

    function RejectedRequest(rejectedRequest, reason) {
      RejectedRequest.__super__.constructor.call(this, rejectedRequest);
      this.$_rejected = true;
      if (reason != null) {
        this.addReason(reason);
      }
    }

    RejectedRequest.prototype.addReason = function(rejectedRequest, reason) {
      if (reason == null) {
        reason = rejectedRequest;
        rejectedRequest = this;
      }
      return root.Request.prototype.addComment(rejectedRequest, "(Rejection reason)\t" + reason);
    };

    RejectedRequest.prototype.isWhatItIs = function(possibleRejectedRequest) {
      return possibleRejectedRequest.$_rejected && (possibleRejectedRequest.method != null) && (_.has(possibleRejectedRequest, 'method')) && (possibleRejectedRequest.url != null) && (_.has(possibleRejectedRequest, 'url'));
    };

    return RejectedRequest;

  })(root.Request);

}).call(this);
