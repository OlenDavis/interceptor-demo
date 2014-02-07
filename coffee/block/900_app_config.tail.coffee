root = window

class AppConfig extends root.StatefulConfigBlock

	$_dependencies: [ '$urlRouterProvider' ]

	constructor: ->
		super

		@$urlRouterProvider.otherwise '/main'

	setupStates: ->
		@addState 'main',
			url        : '/main'
			templateUrl: 'main.html'
			controller : root.MainController

	setupInterceptors: ->
		@addHighestPrecedenceInterceptor root.AuthenticationInterceptor
		@addHighestPrecedenceInterceptor root.CommunicationInterceptor

		@addHighestPrecedenceInterceptor root.RuinousInterceptor

root.addConfigBlock AppConfig