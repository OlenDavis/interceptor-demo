root = window

class CenteredDivController extends root.BaseDirectiveController
	$_name: 'CenteredDivController'

class CenteredDiv extends root.BaseTemplatedDirective
	$_name: 'CenteredDiv'

	controller: CenteredDivController

	transclude: yes

	scope:
		wholeWidth: '=?'

	notIsolated: yes

root.addDirective CenteredDiv