root = window

class App extends root.BaseModule
	$_name: 'App'

	$_dependencies: [ 'ui.router', 'ngCookies', 'ngResource', 'ngSanitize' ]

root.addModule App
root.setTargetModule App