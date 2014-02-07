(function() {
  var ScrollingClasses, ScrollingClassesController, root, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  ScrollingClassesController = (function(_super) {
    __extends(ScrollingClassesController, _super);

    ScrollingClassesController.prototype.$_name = 'ScrollingClassesController';

    ScrollingClassesController.prototype.$_dependencies = ['$parse'];

    function ScrollingClassesController() {
      this.atBottom = __bind(this.atBottom, this);
      this.atTop = __bind(this.atTop, this);
      this.onScrolled = __bind(this.onScrolled, this);
      this.updateScrollDimensions = __bind(this.updateScrollDimensions, this);
      var debouncedOnScrolled, scrollingClassesGetter, throttledOnScrolled,
        _this = this;
      ScrollingClassesController.__super__.constructor.apply(this, arguments);
      scrollingClassesGetter = this.$parse(this.$attrs[ScrollingClasses.prototype.$_makeName()]);
      this.scrollingClassesDefinition = scrollingClassesGetter(this.$scope);
      if (this.scrollingClassesDefinition.target != null) {
        this.scrollingClassesDefinition.target = angular.element(this.scrollingClassesDefinition.target);
      } else {
        this.scrollingClassesDefinition.target = this.$element;
      }
      this.alreadyUpdated = false;
      debouncedOnScrolled = _.debounce((function() {
        _this.alreadyUpdated = false;
        return _this.onScrolled();
      }), this.scrollingClassesDefinition.delay || 1000);
      throttledOnScrolled = _.throttle((function() {
        _this.alreadyUpdated = true;
        return _this.onScrolled();
      }), this.scrollingClassesDefinition.throttling || 500);
      setTimeout(this.onScrolled, 1);
      this.scrollingClassesDefinition.target.scroll(function() {
        if ((!_this.alreadyUpdated) && _this.atTop() || _this.atBottom()) {
          return throttledOnScrolled();
        } else {
          return debouncedOnScrolled();
        }
      });
      $window.resize(debouncedOnScrolled);
    }

    ScrollingClassesController.prototype.updateScrollDimensions = function() {
      this.scrollHeight = this.scrollingClassesDefinition.target[0].scrollHeight;
      this.height = this.scrollingClassesDefinition.target.innerHeight();
      return this.scrollTop = this.scrollingClassesDefinition.target.scrollTop();
    };

    ScrollingClassesController.prototype.onScrolled = function() {
      this.updateScrollDimensions();
      if (this.atTop()) {
        this.$element.removeClass(this.scrollingClassesDefinition.notAtTop);
      } else {
        this.$element.removeClass(this.scrollingClassesDefinition.atTop);
      }
      if (this.atBottom()) {
        this.$element.removeClass(this.scrollingClassesDefinition.notAtBottom);
      } else {
        this.$element.removeClass(this.scrollingClassesDefinition.atBottom);
      }
      if (this.atTop()) {
        this.$element.addClass(this.scrollingClassesDefinition.atTop);
      } else {
        this.$element.addClass(this.scrollingClassesDefinition.notAtTop);
      }
      if (this.atBottom()) {
        return this.$element.addClass(this.scrollingClassesDefinition.atBottom);
      } else {
        return this.$element.addClass(this.scrollingClassesDefinition.notAtBottom);
      }
    };

    ScrollingClassesController.prototype.atTop = function() {
      return this.scrollTop === 0;
    };

    ScrollingClassesController.prototype.atBottom = function() {
      return this.scrollTop === (this.scrollHeight - this.height);
    };

    return ScrollingClassesController;

  })(root.BaseDirectiveController);

  ScrollingClasses = (function(_super) {
    __extends(ScrollingClasses, _super);

    function ScrollingClasses() {
      _ref = ScrollingClasses.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ScrollingClasses.prototype.$_name = 'ScrollingClasses';

    ScrollingClasses.prototype.controller = ScrollingClassesController;

    return ScrollingClasses;

  })(root.BaseDirective);

  root.addDirective(ScrollingClasses);

}).call(this);
