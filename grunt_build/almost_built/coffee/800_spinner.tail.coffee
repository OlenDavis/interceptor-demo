root = window

class Spinner extends root.BaseTemplatedDirective
	$_name: 'Spinner'

	transclude: yes

	scope:
		imgSrc: '@'

	notIsolated: yes

root.addDirective Spinner