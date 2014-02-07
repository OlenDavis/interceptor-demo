root = window

class FormattedMomentController extends root.BaseDirectiveController
	$_name: 'FormattedMomentController'

	$_link: ->
		@momentFormat = @$attrs[ FormattedMoment::$_makeName() ] or 'MM/DD/YYYY'
		@jqueryFormat = @$attrs.jqueryFormat     or 'mm/dd/yy'
		@startOf      = @$attrs.startOf          or 'day'

		@$element.attr 'placeholder', @momentFormat

		@ngModel.$formatters.unshift @format
		@ngModel.$parsers   .unshift @parse

		@$element.datepicker
			dateFormat: @jqueryFormat
			onSelect  : @onDatePickerSelect

		@$scope.$watch 'afterMoment',  => @parse @ngModel.$viewValue
		@$scope.$watch 'beforeMoment', => @parse @ngModel.$viewValue

	parse: ( dateString ) =>
		dateMoment = moment( dateString, @momentFormat )?.startOf @startOf
		unless dateMoment?.isValid()
			dateMoment = moment( dateString )?.startOf @startOf

		unless dateMoment?.isValid()
			@ngModel.$setValidity 'moment', no
			return undefined
		else
			@ngModel.$setValidity 'moment', yes

			if @$attrs.afterMoment?
				@ngModel.$setValidity 'afterMoment', dateMoment.isAfter( @$scope.afterMoment ) or dateMoment.isSame @$scope.afterMoment

			if @$attrs.beforeMoment?
				@ngModel.$setValidity 'beforeMoment', dateMoment.isBefore( @$scope.beforeMoment ) or dateMoment.isSame @$scope.afterMoment

			return dateMoment

	format: ( dateMoment ) =>
		return '' unless dateMoment?

		moment( dateMoment ).format @momentFormat

	onDatePickerSelect: ( dateText ) => @ngModel.$setViewValue dateText

class FormattedMoment extends root.BaseDirective
	$_name: 'FormattedMoment'

	controller: FormattedMomentController

	require: 'ngModel'

	notIsolated: yes

	scope:
		afterMoment : '=?'
		beforeMoment: '=?'

root.addDirective FormattedMoment