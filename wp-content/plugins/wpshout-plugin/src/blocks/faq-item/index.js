import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';
import { CheckboxControl } from '@wordpress/components';

registerBlockType( 'wpshout/faq-item', {
    edit: ( { attributes, setAttributes } ) => {
        const { question, open } = attributes;
        const blockProps = useBlockProps();

        return (
            <div { ...blockProps }>
                <CheckboxControl
                    label="Expand question by default"
                    checked={ open }
                    onChange={ ( value ) => setAttributes( { open: value } ) }
                />
                <RichText
                    value={ question }
                    tagName="h2"
                    placeholder="FAQ Question"
                    onChange={ ( value ) => setAttributes( { question: value } ) }
                />
                <InnerBlocks />
            </div>
        );
    },
    save: ( { attributes } ) => {
        const { question, open } = attributes;
        const blockProps = useBlockProps.save();
        
        return (
            <details { ...blockProps } open={ open }>
                <RichText.Content tagName="summary" value={ question } />
                <InnerBlocks.Content />
            </details>
        );
    },
} );