angular.module( 'app' )
.factory( 'communicationInterceptor', function( $q ) {
	return {
		request: function( config ) {
			// just moves on to the eventual actual request
			return config;
		},
		/* ... */
		responseError: function( rejectedResponse ) {
			// just moves on to be a rejected response
			return $q.reject( rejectedResponse );

			// And note that THIS would NOT result in a REJECTED
			// response 'cause it's not a rejection--it has be a
			// rejection because of $q.reject(...) to continue
			// down the promise chain as a rejection.
			return rejectedResponse;
		}
	};
} );