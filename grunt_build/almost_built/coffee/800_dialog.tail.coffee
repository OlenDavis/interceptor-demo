root = window

class DialogController extends root.BaseDirectiveController
	$_name: 'DialogController'

root.Dialog = class Dialog extends root.BaseTemplatedDirective
	$_name: 'Dialog'

	transclude: yes

	controller: DialogController

	scope:
		shown      : '='
		screenClass: '@'
		title      : '@'
		wholeWidth : '=?'

	notIsolated: yes

	constructor: ->
		super
		
		@$body = angular.element 'body'

	link: ( scope, iElement ) ->
		super
		
		iElement.appendTo @$body

		scope.$on '$destroy', -> setTimeout -> iElement.remove()

root.addDirective Dialog