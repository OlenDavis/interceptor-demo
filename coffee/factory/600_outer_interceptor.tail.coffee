root = window

root.OuterInterceptor = class OuterInterceptor extends root.BaseHttpInterceptor
	$_name: 'OuterInterceptor'

	interceptRequest: ( request ) ->
		request.pending = yes if request.ruinable

		super

	interceptResponse: ( response ) ->
		response.pending = no if response.ruinable

		super

	interceptResponse: ( rejectedResponse ) ->
		rejectedResponse.pending = no if rejectedResponse.ruinable

		super

root.addFactory OuterInterceptor