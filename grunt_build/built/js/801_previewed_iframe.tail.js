(function() {
  var PreviewedIframe, root, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = window;

  PreviewedIframe = (function(_super) {
    __extends(PreviewedIframe, _super);

    function PreviewedIframe() {
      _ref = PreviewedIframe.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PreviewedIframe.prototype.$_name = 'PreviewedIframe';

    PreviewedIframe.prototype.transclude = true;

    PreviewedIframe.prototype.scope = {
      imgSrc: '@',
      iframeSrc: '@',
      ratioWidth: '@',
      ratioHeight: '@'
    };

    PreviewedIframe.prototype.scopeDefaults = {
      ratioWidth: 4,
      ratioHeight: 3
    };

    PreviewedIframe.prototype.notIsolated = true;

    return PreviewedIframe;

  })(root.FixedProportionDiv);

  root.addDirective(PreviewedIframe);

}).call(this);
