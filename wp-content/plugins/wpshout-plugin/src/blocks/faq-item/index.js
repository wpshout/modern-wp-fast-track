import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOption as ToggleGroupControlOption } from '@wordpress/components';
import { quote } from '@wordpress/icons';
import { useEffect } from '@wordpress/element';

import './style.scss';

registerBlockType( 'wpshout/faq-item', {
    edit: ( { attributes, setAttributes, context } ) => {
        const { question, open, openDefault } = attributes;
        const openContext = context[ 'wpshout/faq/open' ];
        const blockProps = useBlockProps();

        useEffect( () => {
            setAttributes( { openDefault: openContext } );
        }, [ openContext ] );

        return (
            <div { ...blockProps }>
                <InspectorControls>
                    <PanelBody title="FAQ Settings">
                        <ToggleGroupControl
                            label="Expand Answer"
                            value={ 'boolean' === typeof open ? ( open ? 'expand' : 'collapse' ) : '' }
                            onChange={ ( value ) => {
                                if ( value === 'expand' ) {
                                    setAttributes( { open: true } );
                                } else if ( value === 'collapse' ) {
                                    setAttributes( { open: false } );
                                } else {
                                    setAttributes( { open: null } );
                                }
                            } }
                            isBlock>
                            <ToggleGroupControlOption label="Inherit" value="" />
                            <ToggleGroupControlOption label="Expand" value="expand" />
                            <ToggleGroupControlOption label="Collapse" value="collapse" />
                        </ToggleGroupControl>
                    </PanelBody>
                </InspectorControls>
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
        const { question, open, openDefault } = attributes;
        const blockProps = useBlockProps.save();
        
        return (
            <details { ...blockProps } open={ 'boolean' === typeof open ? open : openDefault }>
                <RichText.Content tagName="summary" value={ question } />
                <InnerBlocks.Content />
            </details>
        );
    },
    icon: quote,
    category: 'marketing',
} );