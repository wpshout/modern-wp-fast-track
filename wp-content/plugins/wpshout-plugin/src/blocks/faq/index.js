import { registerBlockType, registerBlockCollection } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { ReactComponent as Icon } from './icon.svg';

const TEMPLATE = [
    [ 'wpshout/faq-item', {} ],
];

registerBlockType( 'wpshout/faq', {
    edit: () => {
        const blockProps = useBlockProps();

        return (
            <div { ...blockProps }>
                <h1>FAQ Block</h1>
                <InnerBlocks 
                    template={ TEMPLATE }
                />
            </div>
        );
    },
    save: () => {
        const blockProps = useBlockProps.save();
        
        return (
            <div { ...blockProps }>
                <InnerBlocks.Content />
            </div>
        );
    },
    keywords: [
        __( 'faq', 'wpshout' ),
        __( 'question', 'wpshout' ),
        __( 'answer', 'wpshout' ),
    ],
    icon: {
        src: Icon,
        foreground: '#7A61D2',
    }
} );

registerBlockCollection( 'wpshout', {
    title: __( 'WPShout', 'wpshout' ),
} );