import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';

registerBlockType( 'wpshout/faq-item', {
    edit: ( { attributes, setAttributes } ) => {
        const blockProps = useBlockProps();

        return (
            <div { ...blockProps }>
                <RichText
                    value={ attributes.question }
                    tagName="h2"
                    placeholder="FAQ Question"
                    onChange={ ( value ) => setAttributes( { question: value } ) }
                />
                <InnerBlocks />
            </div>
        );
    },
    save: ( { attributes } ) => {
        const blockProps = useBlockProps.save();
        
        return (
            <div { ...blockProps }>
                <RichText.Content tagName="h2" value={ attributes.question } />
                <InnerBlocks.Content />
            </div>
        );
    },
} );