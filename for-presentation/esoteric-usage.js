angular.module( 'app' ).config( function( $q ) {

	function resolved( resolution ) { alert( 'Resolved with: ' + resolution ); }
	function rejected( rejection  ) { alert( 'Rejected with: ' + rejection  ); }

	$q.when(            'a resolution'  ).then( resolved, rejected );
	$q.when( $q.reject( 'a rejection' ) ).then( resolved, rejected );

} );