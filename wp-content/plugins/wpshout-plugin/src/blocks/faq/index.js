import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

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
} );