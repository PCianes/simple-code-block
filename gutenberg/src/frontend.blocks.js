(function( $ ) {
	'use strict';
	$( window ).load(function() {
		var SCB = $('pre.wp-block-simple-code-block-ace');
		if ( SCB.length > 0 ) {
			SCB.each( function( index ){
				var codeElement = $( this ),
					editor = ace.edit( codeElement[0] ),
					showLines = codeElement.data('showlines');
					editor.setTheme( 'ace/theme/' + codeElement.data('theme') );
					editor.session.setMode( 'ace/mode/' + codeElement.data('mode') );
					editor.setFontSize( codeElement.data('fontsize') );
					editor.setOptions({
						readOnly: true,
						useWorker: false,
						showPrintMargin: false,
						autoScrollEditorIntoView: true,
						maxLines: codeElement.data('lines'),
						highlightActiveLine: false,
						highlightGutterLine: false,
						showLineNumbers: 'undefined' === typeof( showLines ) || showLines ? true : false
					});
					editor.renderer.$cursorLayer.element.style.opacity = 0;

				if( codeElement.parent().hasClass('wp-block-simple-code-block-ace') ){
					codeElement.parent().css('height', editor.renderer.layerConfig.maxHeight );
				}
			});
		}
 	});
})( jQuery );
