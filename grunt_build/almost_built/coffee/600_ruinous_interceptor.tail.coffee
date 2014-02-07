root = window

root.RuinousInterceptor = class RuinousInterceptor extends root.BaseHttpInterceptor
	$_name: 'RuinousInterceptor'

	$_dependencies: [ '$rootScope' ]

	$defaultOdds: .75

	constructor: ->
		super

		@$rootScope.communicationOdds  = @$rootScope.communicationOdds  or @$defaultOdds
		@$rootScope.authenticationOdds = @$rootScope.authenticationOdds or @$defaultOdds

	interceptRequest: ( request ) ->
		if request.ruinable
			request.communicationFailed  = Math.random() > @$rootScope.communicationOdds
			request.authenticationFailed = Math.random() > @$rootScope.authenticationOdds

			unless request.communicationFailed or request.authenticationFailed
				super
			else
				return new root.RejectedRequest request
		else
			super

	interceptRejectedRequest: ( rejectedRequest ) ->
		if rejectedRequest.communicationFailed or rejectedRequest.authenticationFailed
			console.log "Request '#{ rejectedRequest.name }' failed because of #{ if rejectedRequest.communicationFailed then 'a communication failure' else 'an authentication failure' }."

		super

root.addFactory RuinousInterceptor