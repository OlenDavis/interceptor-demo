(function() {
  var IndependentlyScrollableContainer, IndependentlyScrollableContainerController, NotScrollableContent, ScrollableContent, root, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  IndependentlyScrollableContainerController = (function(_super) {
    __extends(IndependentlyScrollableContainerController, _super);

    IndependentlyScrollableContainerController.prototype.$_name = 'IndependentlyScrollableContainerController';

    function IndependentlyScrollableContainerController() {
      IndependentlyScrollableContainerController.__super__.constructor.apply(this, arguments);
    }

    IndependentlyScrollableContainerController.prototype.transcludeNotScrollableContent = function(notScrollableTransclude) {};

    IndependentlyScrollableContainerController.prototype.transcludeScrollableContent = function(scrollableTransclude) {};

    return IndependentlyScrollableContainerController;

  })(root.BaseDirectiveController);

  IndependentlyScrollableContainer = (function(_super) {
    __extends(IndependentlyScrollableContainer, _super);

    function IndependentlyScrollableContainer() {
      _ref = IndependentlyScrollableContainer.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    IndependentlyScrollableContainer.prototype.$_name = 'IndependentlyScrollableContainer';

    IndependentlyScrollableContainer.prototype.controller = IndependentlyScrollableContainerController;

    return IndependentlyScrollableContainer;

  })(root.BaseDirective);

  ScrollableContent = (function(_super) {
    __extends(ScrollableContent, _super);

    function ScrollableContent() {
      _ref1 = ScrollableContent.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    ScrollableContent.prototype.$_name = 'ScrollableContent';

    ScrollableContent.prototype.transclude = 'element';

    ScrollableContent.prototype.$_requireParents = [IndependentlyScrollableContainer];

    ScrollableContent.prototype.link = function(scope) {
      ScrollableContent.__super__.link.apply(this, arguments);
      return scope.IndependentlyScrollableContainerController.transcludeScrollableContent(this.transcludeFn);
    };

    return ScrollableContent;

  })(root.BaseDirective);

  NotScrollableContent = (function(_super) {
    __extends(NotScrollableContent, _super);

    function NotScrollableContent() {
      _ref2 = NotScrollableContent.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    NotScrollableContent.prototype.$_name = 'NotScrollableContent';

    NotScrollableContent.prototype.transclude = 'element';

    NotScrollableContent.prototype.$_requireParents = [IndependentlyScrollableContainer];

    NotScrollableContent.prototype.link = function(scope) {
      NotScrollableContent.__super__.link.apply(this, arguments);
      return scope.IndependentlyScrollableContainerController.transcludeNotScrollableContent(this.transcludeFn);
    };

    return NotScrollableContent;

  })(root.BaseDirective);

  root.addDirective(IndependentlyScrollableContainer);

  root.addDirective(ScrollableContent);

  root.addDirective(NotScrollableContent);

}).call(this);
