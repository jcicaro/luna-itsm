// Add class to acf_forms
(function($) {
	
	let GLOBAL_ENABLE_DEBUG = WPGLOBAL.ENABLE_DEBUG;
	
	_log('Executed: acf.js');  
	_log('GLOBAL_ENABLE_DEBUG in acf.js', GLOBAL_ENABLE_DEBUG);  
	_log('WPGLOBAL', WPGLOBAL);  
	 
	let test = 'hello, es6...';
	_log(test);
	
	
	$('.acf-field').addClass('form-group');
	$('.acf-input select, .acf-input input').addClass('form-control');
	$('.button.button-primary').addClass('btn btn-primary');
	
	
	
	// Helpers only below
	
	function _log() {
		if (GLOBAL_ENABLE_DEBUG) {
        	console.log.apply(null, arguments);
        }
	}
	
})(jQuery);