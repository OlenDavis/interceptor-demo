root = window

class BusyShield extends root.BaseTemplatedDirective
	$_name: 'BusyShield'

	transclude: yes

	scope:
		when        : '='
		shieldClass : '='
		spinnerClass: '@'

	scopeDefaults:
		spinnerClass: 'big h1 heavy thick secondary'

root.addDirective BusyShield