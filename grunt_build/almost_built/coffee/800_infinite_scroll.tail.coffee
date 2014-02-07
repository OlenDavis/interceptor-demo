root = window

class InfiniteScroll extends root.BaseDirective
	$_name: 'InfiniteScroll'

	$_dependencies: [ '$parse', '$log' ]

	replace: no

	scope:
		onCloseEnough         : '&' # This will be called with one argument called 'proximity' that is the pixels away from the scrollable extend of the element on which this directive is declared
		infiniteScrollDistance: '@'
		infiniteScrollDisabled: '@'
		
	notIsolated: yes

	scopeDefaults:
		infiniteScrollDisabled: no
		infiniteScrollDistance: .1

	onScrollDelay: 100
	onResizeDelay: 80

	link: ( scope, iElement, iAttrs ) =>
		super

		@$scope   = scope
		@$element = iElement
		@$attrs   = iAttrs

		@debouncedOnScroll = _.debounce @onScroll, @onScrollDelay
		@debouncedOnResize = _.debounce @onResize, @onResizeDelay

		@attachEvents()
		@$scope.$on '$destroy', @detachEvents

		# @updateElementHeights()
		@checkInfiniteScroll()

		@$scope.getScrollableContentLength = =>
			@$element.html().length
		@$scope.$watch(
			"getScrollableContentLength()"
			_.debounce( 
				=>
					@updateElementHeights()
					@checkInfiniteScroll()
				@onResizeDelay
			)
		)

		@$scope.$watch "infiniteScrollDistance", =>
			@updateMinimumProximity()
			@checkInfiniteScroll()

	attachEvents: ->
		@$element   .on 'scroll', @debouncedOnScroll
		@$element   .on 'resize', @debouncedOnResize
		root.$window.on 'resize', @debouncedOnResize

	detachEvents: =>
		@$element   .off 'scroll', @debouncedOnScroll
		@$element   .off 'resize', @debouncedOnResize
		root.$window.off 'resize', @debouncedOnResize

	updateElementHeights: ->
		@detachEvents()

		@$elementHeight = @$element.height()

		@updateMinimumProximity()

		prevScrollTop = @$element.scrollTop()

		hadClearfixAlready = @$element.hasClass "clearfix"
		unless hadClearfixAlready
			@$element.addClass "clearfix"

		@$element.css
			height  : 'auto'
			overflow: 'auto'

		@$elementScrollableHeight = Math.max @$elementHeight, @$element.height()

		@$element.css
			height  : ''
			overflow: ''

		unless hadClearfixAlready
			@$element.removeClass "clearfix"

		@$element.scrollTop prevScrollTop

		@attachEvents()

	updateMinimumProximity: =>
		@$minimumProximityToScrollableExtent = @$elementHeight * @$scope.infiniteScrollDistance

	checkInfiniteScroll: =>
		return if @$scope.infiniteScrollDisabled
		# @updateElementHeights()

		scrolledDistance            = @$element.scrollTop()     + @$elementHeight
		proximityToScrollableExtent = @$elementScrollableHeight - scrolledDistance

		closeEnough = proximityToScrollableExtent <= @$minimumProximityToScrollableExtent

		if closeEnough
			@$scope.onCloseEnough
				proximity: proximityToScrollableExtent

	onScroll: => 
		@$log.debug "Scrolled infinitely scrolled element."
		@$scope.$apply @checkInfiniteScroll

	onResize: => 
		@$log.debug "Resized infinitely scrolled element."
		@$scope.$apply =>
			@updateElementHeights()
			@checkInfiniteScroll()

root.addDirective InfiniteScroll