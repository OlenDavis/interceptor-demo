angular.module( 'app' ).config( function( $rootScope, $q ) {

	fakeHttp( { url: 'stuff' } ).then(
		// success/resolve callback
		function( response ) {
			$rootScope.response         = response;
			$rootScope.rejectedResponse = undefined;
		},
		// error/reject callback
		function( rejection ) {
			$rootScope.response         = undefined;
			$rootScope.rejectedResponse = response;
		}
	);

	// initialize some odds where mostly, requests will not fail
	$rootScope.communicationOdds  = 0.75;
	$rootScope.authenticationOdds = 0.75;

	function fakeHttp( request ) {
		var deferredResponse = $q.defer();

		setTimeout( function() {

			var response = { request: request };

			var communicationSucceeded  = Math.random() < $rootScope.communicationOdds;
			var authenticationSucceeded = Math.random() < $rootScope.authenticationOdds;

			// Sometimes, both communication and authentication succeed
			if ( communicationSucceeded && authenticationSucceeded ) {
				response.status = 200;

				// So we resolve to the response
				deferredResponse.resolve( response );
			}
			// Sometimes, one or the other fail:
			else {
				response.status = communicationSucceeded ? 401 : 0;

				// So we result in a rejected response
				deferredResponse.reject( response );
			}

		}, ( 2 - Math.random() ) * 1000 ); // wait between 1 and 2 seconds

		return deferredResponse.promise;
	}

} );