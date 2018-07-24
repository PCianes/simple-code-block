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
const { Spinner, withAPIData, ServerSideRender } = wp.components;

/**
 * To avoid use withAPIData in editor
 * see https://wordpress.org/gutenberg/handbook/blocks/creating-dynamic-blocks/
 * and only return the component ServerSideRender like
 * edit( { attributes } ) {
 * 		return <ServerSideRender block="simple-code-block/block-name-dynamic" attributes={ attributes } />;
	}
 */

registerBlockType(
    'simple-code-block/block-name-dynamic',
    {
        title: __( 'Example - Dynamic Block', 'simple-code-block'),
        description: __( 'A look at how to build a basic dynamic block.', 'simple-code-block'),
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: icon,
        },
        category: 'simple-code-block',
        edit: withAPIData( props => {
                return {
                    posts: `/wp/v2/posts?per_page=3`
                };
            } )( ( { posts, className, isSelected, setAttributes } ) => {
                if ( ! posts.data ) {
                    return (
                        <p className={className} >
                            <Spinner />
                            { __( 'Loading Posts', 'simple-code-block' ) }
                        </p>
                    );
                }
                if ( 0 === posts.data.length ) {
                    return <p>{ __( 'No Posts', 'simple-code-block' ) }</p>;
                }
                return (
                    <ul className={ className }>
                        { posts.data.map( post => {
                            return (
                                <li>
                                    <a className={ className } href={ post.link }>
                                        { post.title.rendered }
                                    </a>
                                </li>
                            );
                        }) }
                    </ul>
                );
            } ) // end withAPIData
        , // end edit
        save() {
            // Rendering in PHP
            return null;
        },
} );
