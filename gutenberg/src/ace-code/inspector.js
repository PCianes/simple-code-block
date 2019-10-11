/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, SelectControl, RangeControl, ToggleControl, TextControl } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

    constructor() {
        super( ...arguments );
    }

    render() {
		const { attributes: { mode, theme, lines, fontsize, showLinesNumber, allowCopy, positionButtonX, positionButtonY }, setAttributes } = this.props;
		let lineOptions = [{ value: 'Infinity', label: __( 'All lines', 'simple-code-block' ) }];
		for ( let i = 5; i <=100; i+=5 ){
			lineOptions.push( { value: i, label: i } );
		}
        return (
			<InspectorControls>
				<PanelBody>
					<SelectControl
						label={ __( 'Languages', 'simple-code-block' ) }
						value={ mode }
						options={ [
							{ value: 'php', label: __( 'PHP', 'simple-code-block' ) },
							{ value: 'css', label: __( 'CSS', 'simple-code-block' ) },
							{ value: 'sass', label: __( 'SASS', 'simple-code-block' ) },
							{ value: 'scss', label: __( 'SCSS', 'simple-code-block' ) },
							{ value: 'less', label: __( 'LESS', 'simple-code-block' ) },
							{ value: 'html', label: __( 'HTML', 'simple-code-block' ) },
							{ value: 'java', label: __( 'JAVA', 'simple-code-block' ) },
							{ value: 'javascript', label: __( 'JAVASCRIPT', 'simple-code-block' ) },
							{ value: 'typescript', label: __( 'TYPESCRIPT', 'simple-code-block' ) },
							{ value: 'tsx', label: __( 'TSX', 'simple-code-block' ) },
							{ value: 'jsx', label: __( 'JSX', 'simple-code-block' ) },
							{ value: 'xml', label: __( 'XML', 'simple-code-block' ) },
							{ value: 'json', label: __( 'JSON', 'simple-code-block' ) },
							{ value: 'text', label: __( 'TEXT', 'simple-code-block' ) },
							{ value: 'plain_text', label: __( 'PLAIN TEXT', 'simple-code-block' ) },
							{ value: 'markdown', label: __( 'MARKDOWN', 'simple-code-block' ) },
							{ value: 'mysql', label: __( 'MYSQL', 'simple-code-block' ) },
							{ value: 'sql', label: __( 'SQL', 'simple-code-block' ) },
							{ value: 'sqlserver', label: __( 'SQLSERVER', 'simple-code-block' ) },
							{ value: 'svg', label: __( 'SVG', 'simple-code-block' ) },
							{ value: 'powershell', label: __( 'POWERSHELL', 'simple-code-block' ) },
							{ value: 'kotlin', label: __( 'KOTLIN', 'simple-code-block' ) },
							{ value: 'swift', label: __( 'SWIFT', 'simple-code-block' ) },
							{ value: 'ruby', label: __( 'RUBY', 'simple-code-block' ) },
							{ value: 'python', label: __( 'PYTHON', 'simple-code-block' ) },
							{ value: 'lua', label: __( 'LUA', 'simple-code-block' ) },
							{ value: 'c_cpp', label: __( 'C++', 'simple-code-block' ) },
							{ value: 'csharp', label: __( 'C#', 'simple-code-block' ) },
							{ value: 'sh', label: __( 'Bash/Shell', 'simple-code-block' ) },
						] }
						onChange={ mode => setAttributes( { mode } ) }
					/>
					<SelectControl
						label={ __( 'Themes', 'simple-code-block' ) }
						value={ theme }
						options={ [
							{ value: 'monokai', label: __( 'Monokai', 'simple-code-block' ) },
							{ value: 'terminal', label: __( 'Terminal', 'simple-code-block' ) },
							{ value: 'ambiance', label: __( 'Ambiance', 'simple-code-block' ) },
							{ value: 'chaos', label: __( 'Chaos', 'simple-code-block' ) },
							{ value: 'github', label: __( 'Github', 'simple-code-block' ) },
							{ value: 'chrome', label: __( 'Chrome', 'simple-code-block' ) },
							{ value: 'clouds', label: __( 'Clouds', 'simple-code-block' ) },
							{ value: 'clouds_midnight', label: __( 'Clouds Midnight', 'simple-code-block' ) },
							{ value: 'cobalt', label: __( 'Cobalt', 'simple-code-block' ) },
							{ value: 'crimson_editor', label: __( 'Crimson Editor', 'simple-code-block' ) },
							{ value: 'dawn', label: __( 'Dawn', 'simple-code-block' ) },
							{ value: 'dracula', label: __( 'Dracula', 'simple-code-block' ) },
							{ value: 'dreamweaver', label: __( 'Dreamweaver', 'simple-code-block' ) },
							{ value: 'eclipse', label: __( 'Eclipse', 'simple-code-block' ) },
							{ value: 'gob', label: __( 'Gob', 'simple-code-block' ) },
							{ value: 'gruvbox', label: __( 'Gruvbox', 'simple-code-block' ) },
							{ value: 'idle_fingers', label: __( 'Idle Fingers', 'simple-code-block' ) },
							{ value: 'iplastic', label: __( 'Iplastic', 'simple-code-block' ) },
							{ value: 'katzenmilch', label: __( 'Katzenmilch', 'simple-code-block' ) },
							{ value: 'kr_theme', label: __( 'KR Theme', 'simple-code-block' ) },
							{ value: 'kuroir', label: __( 'Kuroir', 'simple-code-block' ) },
							{ value: 'merbivore', label: __( 'Merbivore', 'simple-code-block' ) },
							{ value: 'merbivore_soft', label: __( 'Merbivore Soft', 'simple-code-block' ) },
							{ value: 'mono_industrial', label: __( 'Mono Industrial', 'simple-code-block' ) },
							{ value: 'pastel_on_dark', label: __( 'Pastel on Dark', 'simple-code-block' ) },
							{ value: 'solarized_dark', label: __( 'Solarized Dark', 'simple-code-block' ) },
							{ value: 'solarized_light', label: __( 'Solarized Light', 'simple-code-block' ) },
							{ value: 'sqlserver', label: __( 'SQL Server', 'simple-code-block' ) },
							{ value: 'textmate', label: __( 'Textmate', 'simple-code-block' ) },
							{ value: 'tomorrow', label: __( 'Tomorrow', 'simple-code-block' ) },
							{ value: 'tomorrow_night', label: __( 'Tomorrow Night', 'simple-code-block' ) },
							{ value: 'tomorrow_night_blue', label: __( 'Tomorrow Night Blue', 'simple-code-block' ) },
							{ value: 'tomorrow_night_bright', label: __( 'Tomorrow Night Bright', 'simple-code-block' ) },
							{ value: 'tomorrow_night_eighties', label: __( 'Tomorrow Night Eighties', 'simple-code-block' ) },
							{ value: 'twilight', label: __( 'Twilight', 'simple-code-block' ) },
							{ value: 'vibrant_ink', label: __( 'Vibrant Ink', 'simple-code-block' ) },
							{ value: 'xcode', label: __( 'XCode', 'simple-code-block' ) },
						] }
						onChange={ theme => setAttributes( { theme } ) }
					/>
					<RangeControl
						beforeIcon="arrow-left-alt2"
						afterIcon="arrow-right-alt2"
						label={ __( 'Font size px', 'simple-code-block' ) }
						value={ fontsize }
						onChange={ fontsize => setAttributes( { fontsize } ) }
						min={ 8 }
						max={ 28 }
					/>
					<SelectControl
						label={ __( 'Lines to show in frontend without scroll', 'simple-code-block' ) }
						value={ lines }
						options={ lineOptions }
						onChange={ lines => setAttributes( { lines } ) }
					/>
					<ToggleControl
                        label={ __( 'Show lines number', 'simple-code-block' ) }
                        checked={ showLinesNumber }
                        onChange={ showLinesNumber => setAttributes( { showLinesNumber } ) }
                    />
					<ToggleControl
                        label={ __( 'Show copy button', 'simple-code-block' ) }
                        checked={ allowCopy }
                        onChange={ allowCopy => setAttributes( { allowCopy } ) }
                    />
					{ allowCopy &&
						<TextControl
							label={ __( 'Adjust position X', 'simple-code-block' ) }
							type="number"
							value={ positionButtonX }
							onChange={ ( positionButtonX ) => setAttributes( { positionButtonX } ) }
						/>
					}
					{ allowCopy &&
						<TextControl
							label={ __( 'Adjust position Y', 'simple-code-block' ) }
							type="number"
							value={ positionButtonY }
							onChange={ ( positionButtonY ) => setAttributes( { positionButtonY } ) }
						/>
					}
				</PanelBody>
			</InspectorControls>
        );
    }
}
