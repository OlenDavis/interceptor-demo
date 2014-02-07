function $HttpProvider() {

	/*...*/

	this.$get = ['$httpBackend', '$browser', '$cacheFactory', '$rootScope', '$q', '$injector',
		function($httpBackend, $browser, $cacheFactory, $rootScope, $q, $injector) {

			/*...*/

			function $http(requestConfig) {

				/*...*/

				/*

Here, we initialize our chain's callbacks. In the end, it'll look like this:

[	~ Resolve Callbacks ~     ~ Reject Callbacks ~
	3rd request resolve,      3rd request error
	2nd request resolve,      2nd request error
	1st request resolve,      1st request error
	serverRequest,            undefined
	1st response resolve,     1st response error
	2nd response resolve,     2nd response error
	3rd response resolve,     3rd response error
]

Basically, the odd entries will be RESOLVE callback functions.
And the even entries will be REJECT callback functions.

So you can see that if we add a 

			

				*/
				var chain = [serverRequest, undefined];
				var promise = $q.when(config);

				// apply interceptors
				forEach(reversedInterceptors, function(interceptor) {
					if (interceptor.request || interceptor.requestError) {
						chain.unshift(interceptor.request, interceptor.requestError);
					}
					if (interceptor.response || interceptor.responseError) {
						chain.push(interceptor.response, interceptor.responseError);
					}
				});

				while(chain.length) {
					var thenFn = chain.shift();
					var rejectFn = chain.shift();

					promise = promise.then(thenFn, rejectFn);
				}

				/*...*/

				return promise;

				/*...*/

			}

			/*...*/

			return $http;

			/*...*/

		}
	];
}