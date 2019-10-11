/**
 * Block dependencies
 */

import classnames from 'classnames';
import AceEditor from 'react-ace';
import './brace-dependencies';
import 'brace/ext/language_tools';
import Inspector from './inspector';
import attributes from './attributes';
import { Icon } from '@wordpress/components';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

function copyButton( positionButtonX, positionButtonY ){
	return (
		<div style={{ position: 'absolute', top: -positionButtonY + 'px', right: -positionButtonX + 'px', cursor: 'pointer' }} className="copy-simple-code-block">
			<Icon icon="admin-page" />
		</div>
	);
}

/**
 * Register block
 */
export default registerBlockType(
  'simple-code-block/ace',
    {
		title: __( 'ACE Code Editor', 'simple-code-block' ),
		description: __( 'A simple block to insert and show code with Ace Editor', 'simple-code-block'),
		category: 'sumapress',
		icon: 'editor-code',
		keywords: [
			__( 'Editor', 'simple-code-block' ),
			__( 'Code', 'simple-code-block' ),
			__( 'Syntax Highlighter', 'simple-code-block' ),
		],
		attributes,
		supports: {
			html: false,
		},
		edit: props => {
			const { attributes, className, setAttributes } = props;
			const {  mode, theme, code, fontsize, showLinesNumber } = attributes;
			return (
				<div className={ classnames( className ) }>
					<Inspector { ...{ setAttributes, ...props} } />
					<AceEditor
						width="100%"
						height="250px"
						minLines={10}
						maxLines= {Infinity}
						fontSize={ parseInt( fontsize ) }
						mode={ mode }
						theme={ theme }
						onChange= { code => setAttributes( { code } ) }
						name="ace-code"
						editorProps={ {	$blockScrolling: Infinity } }
						value={ code }
						onLoad={(editor) => {
							editor.setOptions({
								firstLineNumber: 1,
								useWorker: false,
								mode: 'ace/mode/' + mode
							})
						}}
						showPrintMargin={false}
						showGutter={showLinesNumber}
						highlightActiveLine={true}
						enableBasicAutocompletion={true}
						enableLiveAutocompletion={true}
						showLineNumbers= {showLinesNumber}
						tabSize={4}
						/>
				</div>
			);
		},
		save( { attributes: { mode, theme, lines, fontsize, code, showLinesNumber, allowCopy, positionButtonX, positionButtonY } } ) {
			var preStyle = {
				position: 'absolute',
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			};
			return (
				<div style="height: 250px; position:relative; margin-bottom: 50px;">
					{ allowCopy && copyButton( positionButtonX, positionButtonY ) }
					<pre className="wp-block-simple-code-block-ace" style={ preStyle } data-mode={ mode } data-theme={ theme } data-fontsize={ fontsize } data-lines={ lines } data-showlines={ showLinesNumber } data-copy={ allowCopy }>{ code }</pre>
				</div>
			)
		},
		deprecated: [
			{
				attributes,
				save( { attributes: { mode, theme, lines, fontsize, code } } ) {
					return (
						<pre data-mode={ mode } data-theme={ theme } data-fontsize={ fontsize } data-lines={ lines }>{ code }</pre>
					)
				},
			}
		]
	}
);
