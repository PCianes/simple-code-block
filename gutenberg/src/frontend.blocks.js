(function( $ ) {
	'use strict';
	$( window ).load(function() {
		var SCB = $('pre.wp-block-simple-code-block-ace');
		if ( SCB.length > 0 ) {
			SCB.each( function( index ){
				var codeElement = $( this ),
					editor = ace.edit( codeElement[0] ),
					showLines = codeElement.data('showlines');
					showLines = 'undefined' === typeof( showLines ) || showLines ? true : false;

				editor.setTheme( 'ace/theme/' + codeElement.data('theme') );
				editor.session.setMode( { path: 'ace/mode/' + codeElement.data('mode'), inline: true } );
				editor.setFontSize( codeElement.data('fontsize') );
				editor.setOptions({
					readOnly: true,
					useWorker: false,
					showPrintMargin: false,
					autoScrollEditorIntoView: true,
					maxLines: codeElement.data('lines'),
					highlightActiveLine: false,
					highlightGutterLine: false,
					showLineNumbers: showLines,
					showGutter: showLines
				});
				editor.renderer.$cursorLayer.element.style.opacity = 0;
				editor.renderer.on('afterRender', function() {
					if( codeElement.parent().hasClass('wp-block-simple-code-block-ace') ){
						codeElement.parent().css('height', editor.renderer.layerConfig.height );
					}
				});

				if( codeElement.data('copy') ){
					var copyButton = codeElement.parent().children()[0];
					copyButton.addEventListener( 'click', function(){
						var button = $(this);
						button.css('transform', 'scale(1.1)');
						setTimeout( function(){
							button.css('transform', 'scale(1)');
						}, 200);
						var $temp = $('<textarea>');
						$('body').append($temp);
						$temp.val( editor.getValue() ).select();
						document.execCommand('copy');
						$temp.remove();
					} );
				}
			});
		}
 	});
})( jQuery );
