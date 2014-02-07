angular.module( 'app' ).config( function( $rootScope, $q ) {

	// mostly, requests will not fail
	$rootScope.communicationOdds  = .75;
	$rootScope.authenticationOdds = .75;

	function makeRequest( request ) {
		var deferredResponse = $q.defer();

		setTimeout( function() {

			var response = { request: request };

			var communicationSucceeded  = Math.random() < $rootScope.communicationOdds;
			var authenticationSucceeded = Math.random() < $rootScope.authenticationOdds;

			if ( communicationSucceeded && authenticationSucceeded ) {
				// Sometimes, both communication and authentication succeed
				response.status = 200;

				// So we resolve to the response
				deferredResponse.resolve( response );
			} else {
				// Sometimes, one or the other fail:
				response.status = communicationSucceeded ? 401 : 0;

				// So we result in a rejected response
				deferredResponse.reject( response );
			}

		}, ( 2 - Math.random() ) * 1000 ); // wait between 1 and 2 seconds

		return deferredResponse.promise;
	}
	// Make a deferred

} );