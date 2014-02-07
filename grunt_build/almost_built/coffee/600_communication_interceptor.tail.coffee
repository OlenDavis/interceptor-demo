root = window

root.CommunicationInterceptor = class CommunicationInterceptor extends root.BaseHttpInterceptor
	$_name: 'CommunicationInterceptor'

	interceptRejectedRequest: ( rejectedRequest ) ->
		super

root.addFactory CommunicationInterceptor