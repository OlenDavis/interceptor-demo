root = window

class ScrollingClassesController extends root.BaseDirectiveController
	$_name: 'ScrollingClassesController'

	$_dependencies: [ '$parse' ]

	constructor: ->
		super

		scrollingClassesGetter = @$parse @$attrs[ ScrollingClasses::$_makeName() ]
		@scrollingClassesDefinition = scrollingClassesGetter @$scope

		if @scrollingClassesDefinition.target?
			@scrollingClassesDefinition.target = angular.element @scrollingClassesDefinition.target
		else
			@scrollingClassesDefinition.target = @$element

		@alreadyUpdated = no

		debouncedOnScrolled = _.debounce ( => 
			@alreadyUpdated = no
			@onScrolled()
		), @scrollingClassesDefinition.delay      or 1000
		throttledOnScrolled = _.throttle ( =>
			@alreadyUpdated = yes
			@onScrolled()
		), @scrollingClassesDefinition.throttling or 500

		setTimeout @onScrolled, 1 # set classes for initial scroll-state

		@scrollingClassesDefinition.target.scroll =>
			if ( not @alreadyUpdated ) and @atTop() or @atBottom()
				throttledOnScrolled()
			else
				debouncedOnScrolled()
		$window.resize debouncedOnScrolled

	updateScrollDimensions: =>
		# @scrollWidth  = @scrollingClassesDefinition.target[ 0 ].scrollWidth
		@scrollHeight = @scrollingClassesDefinition.target[ 0 ].scrollHeight

		# @width  = @scrollingClassesDefinition.target.innerWidth()
		@height = @scrollingClassesDefinition.target.innerHeight()

		# @scrollLeft = @scrollingClassesDefinition.target.scrollLeft()
		@scrollTop  = @scrollingClassesDefinition.target.scrollTop()

	onScrolled: =>
		@updateScrollDimensions()

		# Removal
		if @atTop()
			@$element.removeClass @scrollingClassesDefinition.notAtTop
		else
			@$element.removeClass @scrollingClassesDefinition.atTop

		if @atBottom()
			@$element.removeClass @scrollingClassesDefinition.notAtBottom
		else
			@$element.removeClass @scrollingClassesDefinition.atBottom

		# Addition
		if @atTop()
			@$element.addClass    @scrollingClassesDefinition.atTop
		else
			@$element.addClass    @scrollingClassesDefinition.notAtTop

		if @atBottom()
			@$element.addClass    @scrollingClassesDefinition.atBottom
		else
			@$element.addClass    @scrollingClassesDefinition.notAtBottom

	atTop: => @scrollTop is 0

	atBottom: => @scrollTop is ( @scrollHeight - @height )

class ScrollingClasses extends root.BaseDirective
	$_name: 'ScrollingClasses'

	controller: ScrollingClassesController

root.addDirective ScrollingClasses