root = window

differential = 1

class ShelfController extends root.BaseDirectiveController
	$_name: 'ShelfController'

	$_dependencies: [ '$timeout', '$rootScope' ]

	buttonUsed: false

	constructor: ->
		super

		@$scrollContainer = angular.element @$element.find( "ul" )[ 0 ]

		# Watch the latest dimensions for changes, and then apply the new dimensions
		@$scope.$watch ( =>
			latestDimensions = @getLatestDimensions()
		), @dimensionsChanged, yes # This means DO do deep equality checking on the return value of the watch function

		# Watch the latest max scrolls (furthest extents of scrollLeft possible), and then ensure our scrolls are within that.
		@$scope.$watch ( =>
			scrollLeft: @scrollWidth - @width
		), @goToCurrentStep, yes # This means DO do deep equality checking on the return value of the 

		root.$window.resize _.throttle ( => @$scope.$apply @goToCurrentStep ), 500

	getLatestDimensions: ->
		'scrollWidth': @scrollWidth = @$scrollContainer[ 0 ].scrollWidth
		'width'      : @width       = @$scrollContainer.innerWidth()

	dimensionsChanged: =>
		return unless Math.abs( @scrollWidth - @width ) > differential

		@scrollWidth        = @scrollWidth
		@width              = @width
		@horizontalMovement = Math.ceil( @width * @$scope.scrollDistanceRatio )

		@steps = Math.round( @scrollWidth / @horizontalMovement )

	getScrollLeft: ->
		@$scrollContainer.scrollLeft()

	setScrollLeft: ( to ) ->
		@$scrollContainer.stop( yes, yes ).animate { 'scrollLeft': to }, complete: => @$timeout ->  # this ensures the template will be updated by Angular when the scroll finishes
		null # This is to ensure the actual DOM element isn't returned to any Angular expressions that might evaluate this method and throw the "Referencing a DOM node in Expression" $parse error

	goLeft : ->
		@$scope.step = if @$scope.loopAtEnd then ( @currentStep() + @steps - 1 ) % @steps else Math.max 0, @currentStep() - 1
		@goToCurrentStep()
		@constructor::buttonUsed = yes

	goRight: ->
		@$scope.step = if @$scope.loopAtEnd then ( @currentStep() + 1 ) % @steps else Math.min @steps - 1, @currentStep() + 1
		@goToCurrentStep()
		@constructor::buttonUsed = yes

	goToCurrentStep: =>
		@setScrollLeft @currentStep() * @horizontalMovement

	canGoLeft : -> @scrollWidth > @width and @getScrollLeft() > differential
	canGoRight: -> @scrollWidth > @width and ( @scrollWidth - @width ) - @getScrollLeft() > differential

	currentStep: -> @$scope.step or 0

class Shelf extends root.BaseTemplatedDirective
	$_name: 'Shelf'

	transclude: yes

	controller: ShelfController

	scope:
		scrollDistanceRatio: '@'
		loopAtEnd          : '@'
		step               : '=?'
		scrollBar          : '@'

	scopeDefaults:
		scrollDistanceRatio: 1/3
		loopAtEnd          : false

	notIsolated: yes

root.addDirective Shelf