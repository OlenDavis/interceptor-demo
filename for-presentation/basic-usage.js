angular.module( 'app' ).config( function( $q ) {

	fakeHttp( { url: 'stuff' } ).then(
		// success/resolve callback
		function( response ) {
			$rootScope.response         = response;
			$rootScope.rejectedResponse = undefined;
		},
		// error/reject callback
		function( rejection ) {
			$rootScope.response         = undefined;
			$rootScope.rejectedResponse = rejection;
		}
	);

	function fakeHttp( request ) {
		var deferredResponse = $q.defer();

		setTimeout( function() {

			var response = { request: request };

			response.status = 200;

			deferredResponse.resolve( response );

		}, 1000 ); // wait a second

		return deferredResponse.promise;
	}

} );