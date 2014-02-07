root = window

root.MainController = class MainController extends root.BaseController
	$_name: 'MainController'

	$_dependencies: [ '$http' ]

	constructor: ->
		super

		@request = @newRequest()

	newRequest: ->
		request = new root.Request()
		request.ruinable = yes
		request

	makeRequest: ->
		@$http @request