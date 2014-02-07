root = window

class ActionDialogController extends root.Dialog::controller
	$_name: 'ActionDialogController'

	$_dependencies: [ '$q' ]

	doPrimaryAction: ->
		@closing = yes
		@$q.when( @$scope.onPrimaryAction() ).then(
			# Primary action is done and resolved, so actually close the dialog
			( result ) =>
				@$scope.shown = no
				result

			# Secondary action is done but rejected, so keep the dialog open by doing nothing
			null
		).finally => @closing = @$scope.shieldShown = no

	doSecondaryAction: ->
		@closing = yes
		@$q.when( @$scope.onSecondaryAction() ).then(
			# Primary action is done and resolved, so actually close the dialog
			( result ) =>
				@$scope.shown = no
				result

			# Secondary action is done but rejected, so keep the dialog open by doing nothing
			null
		).finally => @closing = @$scope.shieldShown = no

class ActionDialog extends root.Dialog
	$_name: 'ActionDialog'

	controller: ActionDialogController

	scope:
		primaryActionText  : '@'
		secondaryActionText: '@'
		onPrimaryAction    : '&?'
		onSecondaryAction  : '&?'
		shieldShown        : '=?'

	scopeDefaults:
		primaryActionText  : 'OK'
		secondaryActionText: 'Cancel'

root.addDirective ActionDialog