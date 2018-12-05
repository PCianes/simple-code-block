/**
 * Block dependencies
 */

import classnames from 'classnames';
import AceEditor from 'react-ace';
import './brace-dependencies';
import 'brace/ext/language_tools';
import Inspector from './inspector';
//import './style.scss';
//import './editor.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

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
      attributes: {
				mode: {
					source: 'attribute',
					selector: 'pre',
					attribute: 'data-mode',
					default: 'php'
				},
				theme: {
					source: 'attribute',
					selector: 'pre',
					attribute: 'data-theme',
					default: 'monokai'
				},
				fontsize: {
					source: 'attribute',
					selector: 'pre',
					attribute: 'data-fontsize',
					default: '14'
				},
				lines: {
					source: 'attribute',
					selector: 'pre',
					attribute: 'data-lines',
					default: 'Infinity'
				},
				code: {
					source: 'text',
					selector: 'pre',
					default: '<?php'
				}
			},
			supports: {
				html: false,
			},
			edit: props => {
				const { attributes, className, setAttributes } = props;
				const {  mode, theme, code, fontsize } = attributes;
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
							showGutter={true}
							highlightActiveLine={true}
							enableBasicAutocompletion={true}
							enableLiveAutocompletion={true}
							showLineNumbers= {true}
							tabSize={4}
							/>
					</div>
				);
			},
			save( { attributes: { mode, theme, lines, fontsize, code } } ) {
				return (
					<pre data-mode={ mode } data-theme={ theme } data-fontsize={ fontsize } data-lines={ lines }>{ code }</pre>
				)
			},
		}
);
