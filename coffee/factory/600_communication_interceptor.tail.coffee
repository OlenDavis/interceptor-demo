root = window

root.CommunicationInterceptor = class CommunicationInterceptor extends root.BaseHttpInterceptor
	$_name: 'CommunicationInterceptor'

	$_dependencies: [ '$rootScope' ]

	interceptRequest: ( request ) ->
		super

	interceptResponse: ( response ) ->
		super

	interceptRejectedResponse: ( rejectedResponse ) ->
		super

root.addFactory CommunicationInterceptor