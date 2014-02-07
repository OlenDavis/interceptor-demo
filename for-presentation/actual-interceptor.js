angular.module( 'app' )
.factory( 'interceptorHigh', function() {
	return {
		request     : function( config ) { console.log( 'request resolved (High)...\n' ); return            config  ; },
		requestError: function( config ) { console.log( 'request rejected (High)...\n' ); return $q.reject( config ); },

		response     : function( response ) { console.log( 'response resolved (High)...\n' ); return            response  ; },
		responseError: function( response ) { console.log( 'response rejected (High)...\n' ); return $q.reject( response ); },
	};
} )
.factory( 'interceptorLow', function() {
	return {
		request     : function( config ) { console.log( 'request resolved (Low)...\n' ); return            config  ; },
		requestError: function( config ) { console.log( 'request rejected (Low)...\n' ); return $q.reject( config ); },

		response     : function( response ) { console.log( 'response resolved (Low)...\n' ); return            response  ; },
		responseError: function( response ) { console.log( 'response rejected (Low)...\n' ); return $q.reject( response ); },
	};
} )
.config( function( $httpProvider ) {

	$httpProvider.interceptors.unshift( 'interceptorLow'  );
	$httpProvider.interceptors.push(    'interceptorHigh' );

	// Now, for every request, you'll see:
	// request resolved (Low)...
	// request resolved (High)...
	// response resolved (High)...
	// response resolved (Low)...

} );