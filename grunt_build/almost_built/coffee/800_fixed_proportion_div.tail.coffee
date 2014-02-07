root = window

root.FixedProportionDiv = class FixedProportionDiv extends root.BaseTemplatedDirective
	$_name: 'FixedProportionDiv'

	transclude: yes

	scope:
		ratioWidth : '@'
		ratioHeight: '@'
		scrollable:  '@'

	scopeDefaults:
		ratioWidth : 4
		ratioHeight: 3
		scrollable : no

root.addDirective FixedProportionDiv