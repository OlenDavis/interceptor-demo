root = window

root.MainController = class MainController extends root.BaseController
	$_name: 'MainController'

	$_dependencies: [ '$http' ]

	constructor: ->
		super

		@request = @newRequest()

		@succeededRequests = new Array()
		@failedRequests    = new Array()

	newRequest: ->
		request = new root.Request()
		request.ruinable = yes
		request.method   = 'GET'
		request

	makeRequest: ->
		@$http( @request ).then @requestSucceeded, @requestFailed

	requestSucceeded: ( response ) =>
		@succeededRequests.push response?.config

	requestFailed: ( rejectedResponse ) =>
		@failedRequests.push response?.config