angular.module( 'app' )
.factory( 'communicationInterceptor', function() {
	return {
		request: function( config ) {
			if ( alreadyRetryingAnother( config ) ) { // If we've already run into a request that failed due to a communication failure,
				// Wait for that request to succeed or fail, and then either try again or fail immediately
				return waitToResumeRequest( config ); // This is a promise that resolves to this config if the retries succeed, or rejected version of this config if they don't.
			} else { // If we're not already retrying something though,
				return config; // Let it through.
			}
		},
		response: function( response ) {
			// If this is the response for the request we originally retried,
			if ( waitingForThis( response ) ) {
				// Then resolve the retry exponential backoff loop (which will release all other requests/rejected responses waiting for this to finish).
				return resolveRetryWith( response );
			}
			// If it's just some other successful response,
			else {
				// Let it through.
				return response;
			}
		},
		responseError: function( rejectedResponse ) {
			if ( isRejectionConnectionRelated( rejectedResponse ) ) { // If this rejection is connection related,
				if ( alreadyRetryingAnother( rejectedResponse.config ) ) { // and we've already run into a request that failed due to a communication failure,
					// Then ditto lines 6-7 except resolving to either the promise of a new $http request with this rejectedResponse's original config if the retries succeed, or this rejectedResponse if they don't.
					return waitToRetryRejectedResponse( rejectedResponse );
				} else { // Otherwise either this is the first time a request failed (because of communication failure) or this is yet another failure of that same request that first failed, so
					incrementCurrentBackoff();
					if ( mayStillRetry() ) { // And if we can still retry
						// Try again with the current backoff, which will eventually be resolved/rejected with the ultimately successful response or this, the ultimately rejected response
						return retry( rejectedResponse );
					}
					else { // Otherwise, fail outright, which will not result in this request being rejected with this rejectedResponse, but all other paused requests/delayed rejectedResponses that were waiting for this.
						return giveUp( rejectedResponse );
					}
				}
			}
			else {
				return rejectedResponse;
			}
		}
	};
} );