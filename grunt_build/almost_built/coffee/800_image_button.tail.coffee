root = window

class ImageButton extends root.BaseTemplatedDirective
	$_name: 'ImageButton'

	scope:
		src: '@'

		maxWidth   : '@'
		width      : '@'
		interactive: '@' # will only be interactive if this evaluates to 'true'

root.addDirective ImageButton