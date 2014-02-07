(function() {
  var BaseDirective, BaseDirectiveController, root, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  root = window;

  root.BaseDirectiveController = BaseDirectiveController = (function(_super) {
    __extends(BaseDirectiveController, _super);

    function BaseDirectiveController() {
      _ref = BaseDirectiveController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BaseDirectiveController.prototype.$_dependencies = ["$element", "$attrs", "$transclude"];

    BaseDirectiveController.prototype.$_link = function() {};

    return BaseDirectiveController;

  })(root.BaseController);

  root.BaseDirective = BaseDirective = (function(_super) {
    __extends(BaseDirective, _super);

    function BaseDirective() {
      this.link = __bind(this.link, this);
      this.preLink = __bind(this.preLink, this);
      this.compile = __bind(this.compile, this);
      _ref1 = BaseDirective.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    BaseDirective.prototype.$_dependencies = ['$parse', '$interpolate'];

    BaseDirective.prototype.$_makeName = function() {
      return this.$_prefix + (this.$_prefix.length === 0 ? this.$_name.slice(0, 1).toLowerCase() + this.$_name.slice(1) : this.$_name);
    };

    BaseDirective.prototype.$_dependentConstructor = function() {
      var directive;
      directive = BaseDirective.__super__.$_dependentConstructor.apply(this, arguments);
      return directive.$_makeAngularDefinition();
    };

    BaseDirective.prototype.$_requireSiblings = [];

    BaseDirective.prototype.$_requireParents = [];

    BaseDirective.prototype.$_makeAngularDefinition = function() {
      var definition, requireDirective, requireStrings, _i, _j, _k, _len, _len1, _len2, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8,
        _this = this;
      if ((this.scope != null) && angular.isObject(this.scope)) {
        this.scope = root.prototypallyExtendPropertyObject(this, 'scope');
      }
      if ((this.scopeDefaults != null) && angular.isObject(this.scopeDefaults)) {
        this.scopeDefaults = root.prototypallyExtendPropertyObject(this, 'scopeDefaults');
      }
      if ((this.scopeDefaultExpressions != null) && angular.isObject(this.scopeDefaultExpressions)) {
        this.scopeDefaultExpressions = root.prototypallyExtendPropertyObject(this, 'scopeDefaultExpressions');
      }
      if (((_ref2 = this.restrict) != null ? _ref2.indexOf('E') : void 0) === -1 && (((_ref3 = this.scope) != null ? _ref3.$_self : void 0) != null)) {
        this.scope[this.$_makeName] = this.scope.$_self;
        this.$_selfScopeAttribute = this.scope.$_self.match(/^@?=?&?\??\s*(.*)\s*$/)[1] || this.$_makeName();
        root["delete"](this.scope, '$_self');
      }
      if ((this.$_requireSiblings != null) && angular.isArray(this.$_requireSiblings)) {
        this.$_requireSiblings = root.prototypallyMergePropertyArray(this, '$_requireSiblings');
      }
      if ((this.$_requireParents != null) && angular.isArray(this.$_requireParents)) {
        this.$_requireParents = root.prototypallyMergePropertyArray(this, '$_requireParents');
      }
      if (((_ref4 = this.$_requireSiblings) != null ? _ref4.length : void 0) || ((_ref5 = this.$_requireParents) != null ? _ref5.length : void 0)) {
        if (this.require != null) {
          if (!angular.isArray(this.require)) {
            this.require = [this.require];
          }
        } else {
          this.require = new Array();
        }
        _ref6 = this.$_requireSiblings;
        for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
          requireDirective = _ref6[_i];
          this.require.push({
            sibling: requireDirective
          });
        }
        _ref7 = this.$_requireParents;
        for (_j = 0, _len1 = _ref7.length; _j < _len1; _j++) {
          requireDirective = _ref7[_j];
          this.require.push({
            parent: requireDirective
          });
        }
        requireStrings = new Array();
        _ref8 = this.require;
        for (_k = 0, _len2 = _ref8.length; _k < _len2; _k++) {
          requireDirective = _ref8[_k];
          if (angular.isString(requireDirective)) {
            requireStrings.push(requireDirective);
          } else if (angular.isObject(requireDirective)) {
            if (requireDirective.sibling != null) {
              requireStrings.push(requireDirective.sibling.prototype.$_makeName());
            } else if (requireDirective.parent != null) {
              requireStrings.push("^" + (requireDirective.parent.prototype.$_makeName()));
            }
          }
        }
      }
      definition = {};
      if (this.priority != null) {
        definition.priority = this.priority;
      }
      if (requireStrings || this.require) {
        definition.require = requireStrings || this.require;
      }
      if (this.template != null) {
        definition.template = this.template;
      }
      if (this.templateUrl != null) {
        definition.templateUrl = "" + this.templatePath + this.templateUrl + this.templateSuffix;
      }
      if (this.replace != null) {
        definition.replace = this.replace;
      }
      if (this.transclude != null) {
        definition.transclude = this.transclude;
      }
      if (this.restrict != null) {
        definition.restrict = this.restrict;
      }
      if (this.scope != null) {
        definition.scope = this.scope;
      }
      if (this.controller != null) {
        definition.controller = this.controller.prototype.$_makeConstructorArray();
      }
      if (this.notIsolated != null) {
        definition.notIsolated = this.notIsolated;
      }
      definition.compile = function() {
        _this.compile.apply(_this, arguments);
        return {
          pre: _this.preLink,
          post: _this.link
        };
      };
      return definition;
    };

    BaseDirective.prototype.$_addToAngular = function(module) {
      BaseDirective.__super__.$_addToAngular.apply(this, arguments);
      return module.directive(this.$_makeName(), this.$_makeConstructorArray());
    };

    BaseDirective.prototype.compile = function(tElement, tAttrs, transclude) {};

    BaseDirective.prototype.preLink = function(scope, iElement, iAttrs, controller) {
      var directiveController, directiveName, i, modifierMatchRegex, requireDirective, required, _i, _len, _ref2, _ref3, _ref4;
      if ((this.controller != null) && angular.isFunction(this.controller) && (this.require != null)) {
        directiveController = scope[this.controller.prototype.$_name];
        modifierMatchRegex = /\??\^?([^\s]+)/;
        if (angular.isArray(this.require)) {
          _ref2 = this.require;
          for (i = _i = 0, _len = _ref2.length; _i < _len; i = ++_i) {
            requireDirective = _ref2[i];
            directiveName = angular.isString(requireDirective) ? (_ref3 = requireDirective.match(modifierMatchRegex)) != null ? _ref3[1] : void 0 : angular.isObject(requireDirective) ? ((required = requireDirective.sibling || requireDirective.parent).prototype.controller || required).prototype.$_name : void 0;
            if (directiveName != null ? directiveName.length : void 0) {
              directiveController[directiveName] = controller[i];
            }
          }
        } else if (angular.isString(this.require)) {
          directiveController[(_ref4 = this.require.match(modifierMatchRegex)) != null ? _ref4[1] : void 0] = controller;
        }
      }
      if (this.$_hasSelf) {
        return scope.$watch(this.$_selfScopeAttribute, function(selfScopeAttribute) {
          return scope.$_self = selfScopeAttribute;
        });
      }
    };

    BaseDirective.prototype.link = function(scope, iElement, iAttrs, controller) {
      var _ref2, _ref3,
        _this = this;
      angular.forEach(this.scopeDefaultExpressions, function(defaultExpression, attribute) {
        var _ref2, _ref3;
        if (((_ref2 = _this.scope) != null ? (_ref3 = _ref2[attribute]) != null ? _ref3.charAt() : void 0 : void 0) === '@') {
          return iAttrs.$observe(attribute, function(value) {
            if (!angular.isDefined(value)) {
              return scope.$watch(defaultExpression, function(defaultValue) {
                return scope[attribute] = defaultValue;
              });
            }
          });
        }
      });
      angular.forEach(this.scopeDefaults, function(defaultValue, attribute) {
        var _ref2, _ref3;
        if (((_ref2 = _this.scope) != null ? (_ref3 = _ref2[attribute]) != null ? _ref3.charAt() : void 0 : void 0) === '@') {
          return iAttrs.$observe(attribute, function(value) {
            if (!angular.isDefined(value)) {
              return scope[attribute] = defaultValue;
            }
          });
        }
      });
      return (_ref2 = scope[(_ref3 = this.controller) != null ? _ref3.prototype.$_name : void 0]) != null ? typeof _ref2.$_link === "function" ? _ref2.$_link() : void 0 : void 0;
    };

    BaseDirective.prototype.controller = null;

    BaseDirective.prototype.priority = null;

    BaseDirective.prototype.require = null;

    BaseDirective.prototype.template = null;

    BaseDirective.prototype.templateUrl = null;

    BaseDirective.prototype.replace = null;

    BaseDirective.prototype.transclude = null;

    BaseDirective.prototype.restrict = null;

    BaseDirective.prototype.scope = null;

    BaseDirective.prototype.notIsolated = null;

    BaseDirective.prototype.scopeDefaults = {};

    BaseDirective.prototype.scopeDefaultExpressions = {};

    BaseDirective.prototype.templatePath = root.directiveTemplatePath || "";

    BaseDirective.prototype.templateSuffix = root.staticFileSuffix || "";

    return BaseDirective;

  })(root.NamedDependent);

}).call(this);
