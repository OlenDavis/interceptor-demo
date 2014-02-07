angular.module( 'app' )
.factory( 'communicationInterceptor', function( $q, $http ) {
	/* ... */
	return {
		request: function( config ) {
			/* ... */

			// This "pauses" the request based on someRetryPromise
			return someRetryPromise.then(
				// and THEN go on with the request, returning the config
				function() { return            config  ; },
				function() { return $q.reject( config ); }
				// or prevent it by returning a rejection of the config
			);
		},
		/* ... */
		responseError: function( rejectedResponse ) {
			/* ... */

			// This "pauses" the rejectedResponse based on someRetryPromise
			return someRetryPromise.then(
				// and THEN return a retry of the rejectedResponse's config
				function() { return $http(     rejectedResponse.config ); },
				function() { return $q.reject( rejectedResponse        ); }
				// or continue on with this rejectedResponse
			);
		}
	};
} );