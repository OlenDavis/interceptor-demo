(function() {
  var Stats, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  root = window;

  root.Stats = Stats = (function() {
    function Stats($injector) {
      this.$injector = $injector;
      this.notifyPendingResult = __bind(this.notifyPendingResult, this);
      this.pendingRejected = __bind(this.pendingRejected, this);
      this.pendingResolved = __bind(this.pendingResolved, this);
      this.addPending = __bind(this.addPending, this);
      this.init = __bind(this.init, this);
      this.$q = this.$injector.get('$q');
      this.$log = this.$injector.get('$log');
      this.init();
    }

    Stats.prototype.init = function() {
      this.pendingCount = 0;
      this.pendingResults = this.$q.when({
        resolveCount: 0,
        rejectCount: 0
      });
      this.$includesRejection = false;
      this.$_pendingDeferred = null;
      return this.$_currentResults = {
        resolveCount: 0,
        rejectCount: 0
      };
    };

    Stats.prototype.addPending = function() {
      var _this = this;
      if (0 === this.pendingCount++) {
        this.$_pendingDeferred = this.$q.defer();
        this.pendingResults = this.$_pendingDeferred.promise;
        return this.pendingResults["finally"](function() {
          return _this.init();
        });
      }
    };

    Stats.prototype.pendingResolved = function(result) {
      this.$_currentResults.resolveCount++;
      return this.notifyPendingResult(result);
    };

    Stats.prototype.pendingRejected = function(rejection) {
      this.$_currentResults.rejectCount++;
      this.$includesRejection = true;
      return this.notifyPendingResult(this.$q.reject(rejection));
    };

    Stats.prototype.notifyPendingResult = function(result) {
      var _ref, _ref1, _ref2;
      this.pendingCount--;
      if (this.pendingCount < 0) {
        this.pendingCount = 0;
        this.$log.warn("There was an unmatched pending resolved or rejected. You must call pendingResolved or pendingRejected only once for each call to addPending. The easiest way for this to happen is for a JS error to prevent the call to pendingResolved or pendingRejected from being made.");
      }
      if ((_ref = this.$_pendingDeferred) != null) {
        _ref.notify(result);
      }
      if (0 === this.pendingCount) {
        if (this.$includesRejection) {
          if ((_ref1 = this.$_pendingDeferred) != null) {
            _ref1.reject(this.$_currentResults);
          }
        } else {
          if ((_ref2 = this.$_pendingDeferred) != null) {
            _ref2.resolve(result);
          }
        }
        this.$includesRejection = false;
      }
      return result;
    };

    return Stats;

  })();

}).call(this);
