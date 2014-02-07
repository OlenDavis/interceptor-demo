root = window

class IndependentlyScrollableContainerController extends root.BaseDirectiveController
	$_name: 'IndependentlyScrollableContainerController'

	constructor: ->
		super

		# @$headerElement = @$element.

	transcludeNotScrollableContent: ( notScrollableTransclude ) ->

	transcludeScrollableContent: ( scrollableTransclude ) ->

class IndependentlyScrollableContainer extends root.BaseDirective
	$_name: 'IndependentlyScrollableContainer'

	# templateUrl: 'independently-scrollable-container.html'

	controller: IndependentlyScrollableContainerController

class ScrollableContent extends root.BaseDirective
	$_name: 'ScrollableContent'

	transclude: 'element'

	$_requireParents: [ IndependentlyScrollableContainer ]

	link: ( scope ) ->
		super

		scope.IndependentlyScrollableContainerController.transcludeScrollableContent @transcludeFn

class NotScrollableContent extends root.BaseDirective
	$_name: 'NotScrollableContent'

	transclude: 'element'

	$_requireParents: [ IndependentlyScrollableContainer ]

	link: ( scope ) ->
		super

		scope.IndependentlyScrollableContainerController.transcludeNotScrollableContent @transcludeFn

root.addDirective IndependentlyScrollableContainer
root.addDirective ScrollableContent
root.addDirective NotScrollableContent
