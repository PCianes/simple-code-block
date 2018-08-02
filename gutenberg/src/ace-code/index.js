/**
 * Block dependencies
 */
import classnames from 'classnames';
import AceEditor from 'react-ace';
import icon from './icon';

// Import a Mode (languages)
import 'brace/mode/sql';
import 'brace/mode/sqlserver';
import 'brace/mode/svg';
import 'brace/mode/swift';
import 'brace/mode/typescript';
import 'brace/mode/xml';
import 'brace/mode/diff';
import 'brace/mode/plain_text';
import 'brace/mode/text';
import 'brace/mode/css';
import 'brace/mode/json';
import 'brace/mode/php';
import 'brace/mode/javascript';

// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/monokai';
import 'brace/theme/terminal';
import 'brace/theme/ambiance';
import 'brace/theme/chaos';
import 'brace/theme/github';

import 'brace/ext/language_tools';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
    registerBlockType,
} = wp.blocks;
const {
    AlignmentToolbar,
    BlockControls,
    BlockAlignmentToolbar,
} = wp.editor;
const {
    Toolbar,
    Button,
    Tooltip,
} = wp.components;

/**
 * Register block
 */
export default registerBlockType(
    'simple-code-block/ace',
    {
        title: __( 'ACE Code Editor', 'simple-code-block' ),
        description: __( 'A simple block to insert code with Ace Editor', 'simple-code-block'),
        category: 'formatting',
        icon: {
            background: 'rgba(41, 170, 227)',
            src: 'editor-code',
        },
        keywords: [
            __( 'Editor', 'simple-code-block' ),
            __( 'Code', 'simple-code-block' ),
            __( 'Syntax Highlighter', 'simple-code-block' ),
        ],
        attributes: {
				alignment: {
					type: 'string',
				},
				blockAlignment: {
					type: 'string',
				},
				highContrast: {
					type: 'boolean',
					default: false,
				},
				code: {
					source: 'text',
					selector: 'pre',
				},
		},
		supports: {
			html: false,
		},
		edit( { attributes, className, setAttributes } ) {
			const { alignment, blockAlignment, code, highContrast } = attributes;
			return (
				<div className={ classnames( className, { 'high-contrast': highContrast } ) }>
					<BlockControls key="custom-controls">
						<BlockAlignmentToolbar
							value={ blockAlignment }
							onChange={ blockAlignment => setAttributes( { blockAlignment } ) }
						/>
						<AlignmentToolbar
							value={ alignment }
							onChange={ alignment => setAttributes( { alignment } ) }
						/>
						<Toolbar>
							<Tooltip text={ __( 'High Contrast', 'simple-code-block' )  }>
								<Button
									className={ classnames( 'components-icon-button','components-toolbar__control',
										{ 'is-active': highContrast } ) }
									onClick={ () => setAttributes( { highContrast: ! highContrast } ) }
								>
									{ icon }
								</Button>
							</Tooltip>
						</Toolbar>
					</BlockControls>
					<AceEditor
					  width="100%"
						height="250px"
						minLines={10}
						maxLines= {Infinity}
						fontSize={14}
            mode="json"
            theme="monokai"
            onChange= { code => setAttributes( { code } ) }
						name="ace-code"
						editorProps={ {	$blockScrolling: Infinity } }
						value={ code }
						onLoad={(editor) => {
							editor.setOptions({
								firstLineNumber: 1,
								useWorker: false,
								mode: 'ace/mode/php'
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
		save( { attributes: { code } } ) {
			return (
				<pre data-mode="php" data-theme="monokai" data-lines="10">{ code }</pre>
			)
		},
	}
);
