root = window

class PreviewedIframe extends root.FixedProportionDiv
	$_name: 'PreviewedIframe'

	transclude: yes

	scope:
		imgSrc: '@'
		iframeSrc    : '@'
		ratioWidth   : '@'
		ratioHeight  : '@'

	scopeDefaults:
		ratioWidth : 4
		ratioHeight: 3

	notIsolated: yes
		
root.addDirective PreviewedIframe