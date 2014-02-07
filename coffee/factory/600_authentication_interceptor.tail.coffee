root = window

root.AuthenticationInterceptor = class AuthenticationInterceptor extends root.BaseHttpInterceptor
	$_name: 'AuthenticationInterceptor'

	interceptRejectedRequest: ( rejectedRequest ) ->
		super

root.addFactory AuthenticationInterceptor