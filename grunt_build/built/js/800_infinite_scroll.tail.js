(function() {
  var InfiniteScroll, root, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  InfiniteScroll = (function(_super) {
    __extends(InfiniteScroll, _super);

    function InfiniteScroll() {
      this.onResize = __bind(this.onResize, this);
      this.onScroll = __bind(this.onScroll, this);
      this.checkInfiniteScroll = __bind(this.checkInfiniteScroll, this);
      this.updateMinimumProximity = __bind(this.updateMinimumProximity, this);
      this.detachEvents = __bind(this.detachEvents, this);
      this.link = __bind(this.link, this);
      _ref = InfiniteScroll.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    InfiniteScroll.prototype.$_name = 'InfiniteScroll';

    InfiniteScroll.prototype.$_dependencies = ['$parse', '$log'];

    InfiniteScroll.prototype.replace = false;

    InfiniteScroll.prototype.scope = {
      onCloseEnough: '&',
      infiniteScrollDistance: '@',
      infiniteScrollDisabled: '@'
    };

    InfiniteScroll.prototype.notIsolated = true;

    InfiniteScroll.prototype.scopeDefaults = {
      infiniteScrollDisabled: false,
      infiniteScrollDistance: .1
    };

    InfiniteScroll.prototype.onScrollDelay = 100;

    InfiniteScroll.prototype.onResizeDelay = 80;

    InfiniteScroll.prototype.link = function(scope, iElement, iAttrs) {
      var _this = this;
      InfiniteScroll.__super__.link.apply(this, arguments);
      this.$scope = scope;
      this.$element = iElement;
      this.$attrs = iAttrs;
      this.debouncedOnScroll = _.debounce(this.onScroll, this.onScrollDelay);
      this.debouncedOnResize = _.debounce(this.onResize, this.onResizeDelay);
      this.attachEvents();
      this.$scope.$on('$destroy', this.detachEvents);
      this.checkInfiniteScroll();
      this.$scope.getScrollableContentLength = function() {
        return _this.$element.html().length;
      };
      this.$scope.$watch("getScrollableContentLength()", _.debounce(function() {
        _this.updateElementHeights();
        return _this.checkInfiniteScroll();
      }, this.onResizeDelay));
      return this.$scope.$watch("infiniteScrollDistance", function() {
        _this.updateMinimumProximity();
        return _this.checkInfiniteScroll();
      });
    };

    InfiniteScroll.prototype.attachEvents = function() {
      this.$element.on('scroll', this.debouncedOnScroll);
      this.$element.on('resize', this.debouncedOnResize);
      return root.$window.on('resize', this.debouncedOnResize);
    };

    InfiniteScroll.prototype.detachEvents = function() {
      this.$element.off('scroll', this.debouncedOnScroll);
      this.$element.off('resize', this.debouncedOnResize);
      return root.$window.off('resize', this.debouncedOnResize);
    };

    InfiniteScroll.prototype.updateElementHeights = function() {
      var hadClearfixAlready, prevScrollTop;
      this.detachEvents();
      this.$elementHeight = this.$element.height();
      this.updateMinimumProximity();
      prevScrollTop = this.$element.scrollTop();
      hadClearfixAlready = this.$element.hasClass("clearfix");
      if (!hadClearfixAlready) {
        this.$element.addClass("clearfix");
      }
      this.$element.css({
        height: 'auto',
        overflow: 'auto'
      });
      this.$elementScrollableHeight = Math.max(this.$elementHeight, this.$element.height());
      this.$element.css({
        height: '',
        overflow: ''
      });
      if (!hadClearfixAlready) {
        this.$element.removeClass("clearfix");
      }
      this.$element.scrollTop(prevScrollTop);
      return this.attachEvents();
    };

    InfiniteScroll.prototype.updateMinimumProximity = function() {
      return this.$minimumProximityToScrollableExtent = this.$elementHeight * this.$scope.infiniteScrollDistance;
    };

    InfiniteScroll.prototype.checkInfiniteScroll = function() {
      var closeEnough, proximityToScrollableExtent, scrolledDistance;
      if (this.$scope.infiniteScrollDisabled) {
        return;
      }
      scrolledDistance = this.$element.scrollTop() + this.$elementHeight;
      proximityToScrollableExtent = this.$elementScrollableHeight - scrolledDistance;
      closeEnough = proximityToScrollableExtent <= this.$minimumProximityToScrollableExtent;
      if (closeEnough) {
        return this.$scope.onCloseEnough({
          proximity: proximityToScrollableExtent
        });
      }
    };

    InfiniteScroll.prototype.onScroll = function() {
      this.$log.debug("Scrolled infinitely scrolled element.");
      return this.$scope.$apply(this.checkInfiniteScroll);
    };

    InfiniteScroll.prototype.onResize = function() {
      var _this = this;
      this.$log.debug("Resized infinitely scrolled element.");
      return this.$scope.$apply(function() {
        _this.updateElementHeights();
        return _this.checkInfiniteScroll();
      });
    };

    return InfiniteScroll;

  })(root.BaseDirective);

  root.addDirective(InfiniteScroll);

}).call(this);
