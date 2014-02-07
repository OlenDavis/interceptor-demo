root = window

root.KeyCodes = class KeyCodes extends root.BaseFactory
	$_name: 'KeyCodes'

	constructor: ->
		@options = new Array()

		@options.push { value: @tab    = 9 , label: 'Tab' }
		@options.push { value: @enter  = 13, label: 'Enter' }
		@options.push { value: @escape = 27, label: 'Escape' }
		@options.push { value: @up     = 38, label: 'Up Arrow' }
		@options.push { value: @down   = 40, label: 'Down Arrow' }

root.addFactory KeyCodes