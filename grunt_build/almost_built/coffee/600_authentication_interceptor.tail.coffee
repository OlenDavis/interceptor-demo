root = window

root.AuthenticationInterceptor = class AuthenticationInterceptor extends root.BaseHttpInterceptor
	$_name: 'AuthenticationInterceptor'

	$_dependencies: [ '$rootScope' ]

	interceptRequest: ( request ) ->
		super

	interceptResponse: ( response ) ->
		super

	interceptRejectedResponse: ( rejectedResponse ) ->
		super

root.addFactory AuthenticationInterceptor