(function() {
  var Shelf, ShelfController, differential, root, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  differential = 1;

  ShelfController = (function(_super) {
    __extends(ShelfController, _super);

    ShelfController.prototype.$_name = 'ShelfController';

    ShelfController.prototype.$_dependencies = ['$timeout', '$rootScope'];

    ShelfController.prototype.buttonUsed = false;

    function ShelfController() {
      this.goToCurrentStep = __bind(this.goToCurrentStep, this);
      this.dimensionsChanged = __bind(this.dimensionsChanged, this);
      var _this = this;
      ShelfController.__super__.constructor.apply(this, arguments);
      this.$scrollContainer = angular.element(this.$element.find("ul")[0]);
      this.$scope.$watch((function() {
        var latestDimensions;
        return latestDimensions = _this.getLatestDimensions();
      }), this.dimensionsChanged, true);
      this.$scope.$watch((function() {
        return {
          scrollLeft: _this.scrollWidth - _this.width
        };
      }), this.goToCurrentStep, true);
      root.$window.resize(_.throttle((function() {
        return _this.$scope.$apply(_this.goToCurrentStep);
      }), 500));
    }

    ShelfController.prototype.getLatestDimensions = function() {
      return {
        'scrollWidth': this.scrollWidth = this.$scrollContainer[0].scrollWidth,
        'width': this.width = this.$scrollContainer.innerWidth()
      };
    };

    ShelfController.prototype.dimensionsChanged = function() {
      if (!(Math.abs(this.scrollWidth - this.width) > differential)) {
        return;
      }
      this.scrollWidth = this.scrollWidth;
      this.width = this.width;
      this.horizontalMovement = Math.ceil(this.width * this.$scope.scrollDistanceRatio);
      return this.steps = Math.round(this.scrollWidth / this.horizontalMovement);
    };

    ShelfController.prototype.getScrollLeft = function() {
      return this.$scrollContainer.scrollLeft();
    };

    ShelfController.prototype.setScrollLeft = function(to) {
      var _this = this;
      this.$scrollContainer.stop(true, true).animate({
        'scrollLeft': to
      }, {
        complete: function() {
          return _this.$timeout(function() {});
        }
      });
      return null;
    };

    ShelfController.prototype.goLeft = function() {
      this.$scope.step = this.$scope.loopAtEnd ? (this.currentStep() + this.steps - 1) % this.steps : Math.max(0, this.currentStep() - 1);
      this.goToCurrentStep();
      return this.constructor.prototype.buttonUsed = true;
    };

    ShelfController.prototype.goRight = function() {
      this.$scope.step = this.$scope.loopAtEnd ? (this.currentStep() + 1) % this.steps : Math.min(this.steps - 1, this.currentStep() + 1);
      this.goToCurrentStep();
      return this.constructor.prototype.buttonUsed = true;
    };

    ShelfController.prototype.goToCurrentStep = function() {
      return this.setScrollLeft(this.currentStep() * this.horizontalMovement);
    };

    ShelfController.prototype.canGoLeft = function() {
      return this.scrollWidth > this.width && this.getScrollLeft() > differential;
    };

    ShelfController.prototype.canGoRight = function() {
      return this.scrollWidth > this.width && (this.scrollWidth - this.width) - this.getScrollLeft() > differential;
    };

    ShelfController.prototype.currentStep = function() {
      return this.$scope.step || 0;
    };

    return ShelfController;

  })(root.BaseDirectiveController);

  Shelf = (function(_super) {
    __extends(Shelf, _super);

    function Shelf() {
      _ref = Shelf.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Shelf.prototype.$_name = 'Shelf';

    Shelf.prototype.transclude = true;

    Shelf.prototype.controller = ShelfController;

    Shelf.prototype.scope = {
      scrollDistanceRatio: '@',
      loopAtEnd: '@',
      step: '=?',
      scrollBar: '@'
    };

    Shelf.prototype.scopeDefaults = {
      scrollDistanceRatio: 1 / 3,
      loopAtEnd: false
    };

    Shelf.prototype.notIsolated = true;

    return Shelf;

  })(root.BaseTemplatedDirective);

  root.addDirective(Shelf);

}).call(this);
