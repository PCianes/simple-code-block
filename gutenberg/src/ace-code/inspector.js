/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, SelectControl } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

    constructor() {
        super( ...arguments );
    }

    render() {
        const { attributes: { mode, theme, lines }, setAttributes } = this.props;

        return (
			<InspectorControls>
				<PanelBody>
					<SelectControl
						label={ __( 'Languages', 'simple-code-block' ) }
						value={ mode }
						options={ [
							{ value: 'php', label: __( 'PHP', 'simple-code-block' ) },
							{ value: 'css', label: __( 'CSS', 'simple-code-block' ) },
							{ value: 'html', label: __( 'HTML', 'simple-code-block' ) },
							] }
						onChange={ mode => setAttributes( { mode } ) }
					/>
					<SelectControl
						label={ __( 'Themes', 'simple-code-block' ) }
						value={ theme }
						options={ [
							{ value: 'monokai', label: __( 'monokai', 'simple-code-block' ) },
							{ value: 'terminal', label: __( 'terminal', 'simple-code-block' ) },
							{ value: 'ambiance', label: __( 'ambiance', 'simple-code-block' ) },
							] }
						onChange={ theme => setAttributes( { theme } ) }
					/>
					<SelectControl
						label={ __( 'Lines to show in frontend', 'simple-code-block' ) }
						value={ lines }
						options={ [
							{ value: 'Infinity', label: __( 'All lines', 'simple-code-block' ) },
							{ value: '4', label: __( '4', 'simple-code-block' ) },
							{ value: '8', label: __( '8', 'simple-code-block' ) },
							] }
						onChange={ lines => setAttributes( { lines } ) }
					/>
				</PanelBody>
			</InspectorControls>
        );
    }
}
