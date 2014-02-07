angular.module( 'app' ).config( function( $q ) {

	var interceptorHigh = {
		request     : function( result ) { return            result + '...\nrequest resolved (High)'  ; },
		requestError: function( result ) { return $q.reject( result + '...\nrequest rejected (High)' ); },

		response     : function( result ) { return            result + '...\nresponse resolved (High)'  ; },
		responseError: function( result ) { return $q.reject( result + '...\nresponse rejected (High)' ); }
	};

	var interceptorLow = {
		request     : function( result ) { return            result + '...\nrequest resolved (Low)'  ; },
		requestError: function( result ) { return $q.reject( result + '...\nrequest rejected (Low)' ); },

		response     : function( result ) { return            result + '...\nresponse resolved (Low)'  ; },
		responseError: function( result ) { return $q.reject( result + '...\nresponse rejected (Low)' ); }
	};

	function actualRequest( result ) { return result + '...\nactual request'; }

	$q.when( 'something' )
	.then( interceptorLow .request , interceptorLow .requestError  )
	.then( interceptorHigh.request , interceptorHigh.requestError  )
	.then( actualRequest           , undefined                     )
	.then( interceptorHigh.response, interceptorHigh.responseError )
	.then( interceptorLow .response, interceptorLow .responseError )
	.finally( output );
	// outputs:
	// something...
	// request resolved (Low)...
	// request resolved (High)...
	// actual request...
	// response resolved (High)...
	// response resolved (Low)...

	function output( result ) {
		console.log( result );
		return result;
	}

} );