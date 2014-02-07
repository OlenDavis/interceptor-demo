angular.module( 'app' ).config( function( $rootScope, $q ) {

	$rootScope.communicationOdds  = $rootScope.communicationOdds  || .75;
	$rootScope.authenticationOdds = $rootScope.authenticationOdds || .75;

	function fakeHttp( request ) {
		var deferredResponse = $q.defer(); // a new promise is created

		// Asynchronously do the request, where sometimes:
		// - the request succeeds
		// - the request fails because of a communication failure
		// - the request fails because of an authentication failure
		setTimeout( function() {

			var communicationChance = Math.random();
			var authenticatedChance = Math.random();

			var response = { request: request };

			var communicationSucceeded  = communicationChance  < $rootScope.communicationOdds;
			var authenticationSucceeded = authenticationChance < $rootScope.authenticationOdds;

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
	};

	var highPriorityInterceptor = {
		request: function( request ) {
			request.history += "...high-priority interceptor";
		},
		requestError: function( rejectedRequest ) {
			rejectedRequest.history += "...high-priority interceptor";
		},
		response: function( response ) {
			response.request.history += "...high-priority interceptor";
		},
		responseError: function( rejectedResponse ) {
			rejectedResponse.request.history += "...high-priority interceptor";
		}
	};

	var lowPriorityInterceptor = {
		request: function( request ) {
			request.history += "...low-priority interceptor";
		},
		requestError: function( rejectedRequest ) {
			rejectedRequest.history += "...low-priority interceptor";
		},
		response: function( response ) {
			response.request.history += "...low-priority interceptor";
		},
		responseError: function( rejectedResponse ) {
			rejectedResponse.request.history += "...low-priority interceptor";
		}
	};

	var interceptors = [
		highPriorityInterceptor,
		lowPriorityInterceptor
	];

	$rootScope.makeRequest = function() {
		// Initialize the request object - i.e. with an empty history
		var request = { history: '' };

		// Here's where things start to get weird. We begin by constructing our chain
		// of callbacks in the center.
		// Notice that there's no reject callback. When there's no reject callback, we
		// directly pass the rejection through to the next reject callback.
		var chain = [ fakeHttp, undefined ];

		angular.forEach( interceptors, function( interceptor ) {
			if (interceptor.request || interceptor.requestError) {
				chain.unshift(interceptor.request, interceptor.requestError);
			}
			if (interceptor.response || interceptor.responseError) {
				chain.push(interceptor.response, interceptor.responseError);
			}
		} );
		
		// This is the weirdest, most magical part:
		var promise = $q.when( request );
		// That make a promise out of request which will automatically resolve

		while( chain.length ) {
			var resolveCallback = chain.shift(); // this is always the odd function
			var rejectCallback = chain.shift(); // this is always the even function

			/*
			We build the final promise as the promise of each step in the interception
			chain where the center pair is:

			var chain = [ fakeHttp, undefined ];

			That way, if by the last request callback, the request hasn't been righted,
			then the request fails straight through to the first responseError callback.
			*/
			promise = promise.then( resolveCallback, rejectCallback );
		}
	}

} );