angular.module('myApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('http://localhost/grunt_build/built/template/directive/action-dialog.html',
    "<div class=action-dialog><div ng-if=ActionDialogController.$scope.shown><div class=\"fixed tl whole-width whole-height way-way-above coloring mostly-opaque\" ng-class=screenClass></div><div class=\"fixed tl whole-height whole-width way-way-above overflow-scroll\"><my-centered-div class=\"absolute whole-width whole-height\" whole-width=wholeWidth><div class=\"relative block margin coloring rounded shadow whole-max-width overflow-scroll\"><div class=\"padded relative clearfix\" ng-transclude=\"\"></div><div class=\"inverse coloring\"><div class=\"t-bordered heavy thick secondary\"></div><div class=\"padded text-right nowrap shadow h4 light extra-lined clearfix overflow-scroll\"><div class=\"h3 light left\" ng-if=title><span>{[{ title }]}</span></div><a class=\"link inline-block appearance-none no-border less lr-padded lr-margin no-margin-when-last rounded button\" ng-click=ActionDialogController.doSecondaryAction()>{[{ secondaryActionText }]}</a> <a class=\"link inline-block appearance-none no-border less lr-padded lr-margin no-margin-when-last rounded button secondary\" ng-click=ActionDialogController.doPrimaryAction()>{[{ primaryActionText }]}</a></div></div><my-busy-shield when=\"ActionDialogController.$scope.shieldShown || ActionDialogController.closing\" shield-class=\"'inverse'\"></my-busy-shield></div></my-centered-div></div></div></div>"
  );


  $templateCache.put('http://localhost/grunt_build/built/template/directive/busy-shield.html',
    "<div><div ng-if=when class=\"absolute tl tr bl br whole-width whole-height fade-in\"><div class=\"absolute tl whole-width whole-height rounded coloring mostly-opaque\" ng-class=shieldClass></div><my-centered-div class=\"absolute tl whole-width whole-height\"><span class=\"spinner {[{ spinnerClass }]}\"></span><div ng-transclude=\"\"></div></my-centered-div></div></div>"
  );


  $templateCache.put('http://localhost/grunt_build/built/template/directive/centered-div.html',
    "<div class=table><div class=table-row><div class=\"table-cell valign-center text-center no-overflow\"><div class=text-left ng-class=\"{ 'inline-block': ! wholeWidth }\" ng-transclude=\"\"></div></div></div></div>"
  );


  $templateCache.put('http://localhost/grunt_build/built/template/directive/dialog.html',
    "<div><div ng-if=DialogController.$scope.shown><div class=\"fixed tl whole-width whole-height way-way-above coloring mostly-opaque\" ng-class=screenClass></div><div class=\"fixed tl whole-height whole-width way-way-above overflow-scroll\"><my-centered-div class=\"absolute whole-width whole-height\" whole-width=wholeWidth><div class=\"relative block margin coloring rounded shadow whole-max-width overflow-scroll\"><div class=\"h3 b-bordered padded\" ng-if=title><span class=\"more r-padded\">{[{ title }]}</span></div><div class=\"more margin\"><div class=\"less padded clearfix\"><div class=relative ng-transclude=\"\"></div></div></div><a class=\"absolute tr h4 label-padded flat-button rounded\" ng-click=\"DialogController.$scope.shown = false\"><span class=icon-remove></span></a></div></my-centered-div></div></div></div>"
  );


  $templateCache.put('http://localhost/grunt_build/built/template/directive/edit-request.html',
    "<div><div class=relative><input class=\"relative rounded text-input block whole-width less t-margin no-margin-when-first\" placeholder=\"Enter name for the request\" ng-model=request.name><input class=\"relative rounded text-input block whole-width less t-margin no-margin-when-first\" placeholder=\"Enter a URL\" ng-model=request.name></div></div>"
  );


  $templateCache.put('http://localhost/grunt_build/built/template/directive/fixed-proportion-div.html',
    "<div><div class=\"relative whole-width transitions\" ng-style=\"{ 'padding-top': ( ratioHeight / ratioWidth * 100 ) + '%' }\"><div class=\"absolute whole-width whole-height tl\" ng-class=\"{ 'overflow-scroll': scrollable }\" ng-transclude=\"\"></div></div></div>"
  );


  $templateCache.put('http://localhost/grunt_build/built/template/directive/image-button.html',
    "<div class=\"inline-block relative\"><img ng-if=src.length class=\"inline-block rounded\" ng-src=\"{[{ src }]}\" ng-style=\"{\n" +
    "\t\t\t'max-width': maxWidth && maxWidth || 'auto',\n" +
    "\t\t\twidth      : width    && width    || 'auto'\n" +
    "\t\t}\"><div class=\"absolute tl whole-width whole-height rounded button-shadow\" ng-class=\"{\n" +
    "\t\t\t'button-shadow': interactive != 'true',\n" +
    "\t\t\tbutton         : interactive\n" +
    "\t\t}\"></div></div>"
  );


  $templateCache.put('http://localhost/grunt_build/built/template/directive/independently-scrollable-container.html',
    "<div class=\"table absolute tl whole-width whole-height\"><div class=table-row><div class=table-cell></div></div><div class=\"table-row whole-height\"><div class=\"table-cell relative whole-height\"><div class=\"relative whole-width whole-height\"><div class=\"absolute whole-width whole-height overflow-scroll\"></div></div></div></div></div>"
  );


  $templateCache.put('http://localhost/grunt_build/built/template/directive/multi-select.html',
    "<div><div class=link ng-repeat=\"option in options\" ng-click=\"MultiSelectController.toggleOption( option )\" ng-class=\"MultiSelectController.getOptionClass( option )\"><input type=checkbox ng-checked=\"MultiSelectController.isSelected( option )\" name=\"{[{ MultiSelectController.getOptionName( option ) }]}\"><span>{[{ MultiSelectController.getOptionLabel( option ) }]}</span></div></div>"
  );


  $templateCache.put('http://localhost/grunt_build/built/template/directive/previewed-iframe.html',
    "<div class=\"previewed-iframe relative\" ng-init=\"loadIframe = false\" ng-click=\"loadIframe = true\"><my-fixed-proportion-div ratio-width=\"{[{ ratioWidth }]}\" ratio-height=\"{[{ ratioHeight }]}\"><div ng-if=imgSrc class=\"absolute tl whole-width whole-height text-center\"><img class=\"absolute block whole-width whole-height hardware-render\" ng-src=\"{[{ imgSrc }]}\"></div><div class=\"link absolute tl whole-width whole-height\" ng-transclude=\"\"></div><iframe class=\"absolute tl whole-width whole-height\" ng-if=loadIframe ng-src=\"{[{ iframeSrc }]}\" frameborder=0 allowfullscreen=\"\"></my-fixed-proportion-div></div>"
  );


  $templateCache.put('http://localhost/grunt_build/built/template/directive/shelf.html',
    "<div><div class=\"relative whole-height whole-width\"><div class=\"shelf-content-container relative\"><div class=relative><ul class=\"shelf-content whole-width whole-height no-overflow nowrap\" ng-transclude=\"\"></ul><div ng-if=\"ShelfController.steps > 1 && scrollBar\" class=\"absolute sheer fade-in\" ng-class=\"{\n" +
    "\t\t\t\t\t\t'tl tr': scrollBar == 'top',\n" +
    "\t\t\t\t\t\t'bl br': scrollBar != 'top'\n" +
    "\t\t\t\t\t}\"><div class=\"transitions secondary b-bordered heavy relative\" ng-style=\"{\n" +
    "\t\t\t\t\t\twidth: ( 100 / ShelfController.steps * ShelfController.width / ShelfController.horizontalMovement ) + '%',\n" +
    "\t\t\t\t\t\tleft: ( ShelfController.currentStep() / ShelfController.steps * 100 ) + '%'\n" +
    "\t\t\t\t\t}\"></div></div></div></div><div ng-click=\"ShelfController.canGoLeft() && ShelfController.goLeft()\" class=\"shelf-left not-selectable absolute above rounded secondary shallow-button transitions lr-padded no-overflow tl bl\" ng-class=\"{\n" +
    "\t\t\t\ttransparent               : ! ShelfController.canGoLeft(),\n" +
    "\t\t\t\t'link opaque-when-hovered': ShelfController.canGoLeft(),\n" +
    "\t\t\t\t'mostly-opaque'           : ShelfController.canGoLeft() && ShelfController.buttonUsed\n" +
    "\t\t\t}\"><my-centered-div class=\"absolute tl-when-ff whole-width whole-height\"><span class=\"h4 b icon-angle-left\"></span></my-centered-div></div><div ng-click=\"ShelfController.canGoRight() && ShelfController.goRight()\" class=\"shelf-right not-selectable absolute above rounded secondary shallow-button transitions lr-padded no-overflow tr br\" ng-class=\"{\n" +
    "\t\t\t\ttransparent               : ! ShelfController.canGoRight(),\n" +
    "\t\t\t\t'link opaque-when-hovered': ShelfController.canGoRight(),\n" +
    "\t\t\t\t'mostly-opaque'           : ShelfController.canGoRight() && ShelfController.buttonUsed\n" +
    "\t\t\t}\"><my-centered-div class=\"absolute tl-when-ff whole-width whole-height\"><span class=\"h4 b icon-angle-right\"></span></my-centered-div></div></div></div>"
  );


  $templateCache.put('http://localhost/grunt_build/built/template/directive/spinner.html',
    "<span class=\"heavy scale-in\"><div><my-centered-div class=\"absolute whole-width whole-height\"><img ng-if=imgSrc class=\"block whole-rounded no-overflow\" style=\"width: 1em\" ng-src=\"{[{ imgSrc }]}\"><div ng-if=\"! imgSrc\" ng-transclude=\"\"></div></my-centered-div></div></span>"
  );


  $templateCache.put('http://localhost/grunt_build/built/template/view/main.html',
    "<div class=\"absolute tl br overflow-scroll padded inverse-this coloring\"><h1 class=\"b-margin text-shadowed\">The 3 WTFs of Angular Interceptors</h1><div class=\"rounded coloring inverse-shadow\"><div class=\"rounded inset-shadow padded clearfix\"><my-edit-request class=\"rounded less padded bordered\" request=MainController.request></my-edit-request><div class=clear></div><a class=\"right inline-block rounded hybrid-button less lr-padded t-margin\" ng-click=MainController.makeRequest()>Make Request</a></div></div></div>"
  );

}]);
