root = window

class EditRequest extends root.BaseTemplatedDirective
	$_name: 'EditRequest'

	scope:
		request: '='

root.addDirective EditRequest