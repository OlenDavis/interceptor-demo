root = window

class MultiSelectController extends root.BaseDirectiveController
	$_name: 'MultiSelectController'

	constructor: ->
		super

		@options = {}

		@$scope.$watch 'options', @setSelection, yes
		@$scope.$watch 'selection', @setSelection, yes

		@$scope.$watch 'allSelected',  ( allSelected  ) => @updateSelection 'all'  if allSelected
		@$scope.$watch 'noneSelected', ( noneSelected ) => @updateSelection 'none' if noneSelected

	getOptionValue: ( option ) -> option.value or option
	getOptionLabel: ( option ) -> option.label or option.value or option
	getOptionName : ( option ) -> option.name  or option.label or option.value or option

	isSelected: ( option ) -> -1 isnt _.indexOf( @$scope.selection, @getOptionValue( option ) )

	setSelection: =>
		return unless @$scope.options?
		
		@options[ @getOptionValue( option ) ] = @isSelected option for option in @$scope.options

	toggleOption: ( option ) ->
		return unless @$scope.options?
		
		@options[ @getOptionValue( option ) ] = !!! @options[ @getOptionValue( option ) ]

		@updateSelection()

		if @options[ @getOptionValue( option ) ]
			@$scope.onOptionSelected option: option
		else
			@$scope.onOptionDeselected option: option

	updateSelection: ( to ) -> # to can be 'all', 'none' or anything else/null
		newSelection = new Array()
		if not @$scope.selection
			@$scope.selection = new Array()

		return if to is 'all' and @isAllSelected()
		return if to is 'none' and @isNoneSelected()

		unless to is 'none'
			for option in @$scope.options
				newSelection.push @getOptionValue( option ) if ( to is 'all' ) or @options[ @getOptionValue( option ) ] is yes

		angular.copy newSelection, @$scope.selection

		@$scope.allSelected  = @isAllSelected()
		@$scope.noneSelected = @isNoneSelected()

	isAllSelected: ->
		@$scope.options.length is @$scope.selection?.length

	isNoneSelected: ->
		@$scope.selection?.length is 0

	getOptionClass: ( option ) ->
		classes = {}
		classes[ @$scope.optionClass         ] = yes
		classes[ @$scope.optionSelectedClass ] = @isSelected option
		classes

root.MultiSelect = class MultiSelect extends root.BaseTemplatedDirective
	$_name: 'MultiSelect'

	controller: MultiSelectController

	scope:
		selection          : '='
		options            : '='
		optionClass        : '@'
		optionSelectedClass: '@'
		allSelected        : '=?' # this is truthy/falsey
		noneSelected       : '=?' # this is truthy/falsey

		onOptionSelected  : '&'
		onOptionDeselected: '&'

	scopeDefaults:
		optionClass        : 'inline-block less lr-margin'
		optionSelectedClass: ''

root.addDirective MultiSelect