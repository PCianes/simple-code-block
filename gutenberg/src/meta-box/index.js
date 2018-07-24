/**
 * Block dependencies
 */
import icon from './icon';
import './style.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, RichText } = wp.editor;
const { TextControl, PanelBody, isSelected } = wp.components;

/**
 * Register example block
 */
export default registerBlockType(
    'simple-code-block/meta-box',
    {
        title: __( 'Example - Meta Box', 'simple-code-block' ),
        description: __( 'An example of how to build a block with a meta box field.', 'simple-code-block'),
        category: 'simple-code-block',
        supports: {
            multiple: false,
        },
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: icon,
        },
        keywords: [
            __( 'Meta', 'simple-code-block' ),
            __( 'Custom field', 'simple-code-block' ),
            __( 'Box', 'simple-code-block' ),
        ],
        attributes: {
            meta: {
                type: 'string',
                source: 'meta',
                meta: 'simple-code-block-meta-key-name',
            },
            text: {
                type: 'string',
                source: 'text',
                selector: 'p',
            }
        },
        edit( { attributes, className, setAttributes, isSelected } ) {
            const { text, meta } = attributes;
            return [
                <InspectorControls>
                    <PanelBody>
                        <TextControl
                            label={ __( 'Meta box', 'simple-code-block' ) }
                            value={ text }
                            onChange={ text => setAttributes( { text, meta: text } ) }
                        />
                    </PanelBody>
                </InspectorControls>,
                <div className={ className } >
                        <TextControl
                            label={ __( 'Meta box', 'simple-code-block' ) }
                            value={ text }
                            onChange={ text => setAttributes( { text, meta: text } ) }
                        />
                 </div>
            ];
        },
        save( { attributes: { text } } ){
            return (
                <p>{ text }</p>
            );
        },
    },
);
