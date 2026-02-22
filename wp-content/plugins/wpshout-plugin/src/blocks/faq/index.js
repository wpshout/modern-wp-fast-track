import { registerBlockType, registerBlockCollection, createBlock } from '@wordpress/blocks';
import { BlockControls, InnerBlocks, InspectorControls, useBlockProps, store as blockEditorStore } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { Button, CheckboxControl, Modal, PanelBody, Placeholder, TextareaControl, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { details, pencil } from '@wordpress/icons';

import { ReactComponent as Icon } from './icon.svg';

const MOCK_SUGGESTIONS = [
    {
        question: 'What is the return policy?',
        answer: 'Our return policy allows you to return everything 30 days after the purchase',
    },
    {
        question: 'How do I contact support?',
        answer: 'You can contact our support team via email at support@example.com.',
    },
    {
        question: 'Do you offer international shipping?',
        answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on the destination.',
    },
    {
        question: 'Can I change or cancel my order?',
        answer: 'You can change or cancel your order within 24 hours of placing it. Please contact our support team for assistance.',
    },
];

registerBlockType( 'wpshout/faq', {
    edit: ( { attributes, setAttributes, clientId } ) => {
        const { open } = attributes;
        const blockProps = useBlockProps();

        const blockIds = useSelect( ( select ) => {
            const childBlock = select( blockEditorStore ).getBlocks( clientId ) ?? [];

            return childBlock.map( ( block ) => block.clientId );
        }, [ clientId ] );

        const { insertBlock, updateBlockAttributes } = useDispatch( blockEditorStore );

        const [ isModalOpen, setModalOpen ] = useState( false );
        const [ modalPrompt, setModalPrompt ] = useState( 'Generate suggestions for questions and answers for this page using the original language and tone.' );
        const [ suggestions, setSuggestions ] = useState( [] );
        const [ selectedSuggestions, setSelectedSuggestions ] = useState( [] );
        const [ isGenerating, setIsGenerating ] = useState( false );

        const generateSuggestions = ( prompt ) => {
            return new Promise( ( resolve ) => {
                setTimeout( () => {
                    const suggestions = [ ...MOCK_SUGGESTIONS ].sort( () => 0.5 - Math.random() ).slice( 0, 2 );
                    resolve( suggestions );
                }, 2000 );
            } );
        }

        return (
            <div { ...blockProps }>
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarButton
                            icon={ pencil }
                            onClick={ () => { setModalOpen( true ) } }
                            label="Generate suggested questions and answers"
                        />
                    </ToolbarGroup>
                </BlockControls>
                <InspectorControls>
                    <PanelBody title="FAQ Settings">
                        <CheckboxControl
                            label="Expand answers by default"
                            help="Individual FAQ items can override this setting"
                            checked={ open }
                            onChange={ ( value ) => setAttributes( { open: value } ) }
                        />
                        <Button
                            variant="link"
                            onClick={ () => {
                                blockIds.forEach( ( id ) => {
                                    updateBlockAttributes( id, { open: null } );
                                } );
                            } }>
                            Reset expanded state of FAQ items
                        </Button>
                    </PanelBody>
                </InspectorControls>
                { ! blockIds.length && (
                    <Placeholder
                        icon={ details }
                        label="Add FAQ items"
                        instructions="Add an FAQ item or generate suggestions for questions and answers">
                        <Button
                            variant="primary"
                            onClick={ () => insertBlock( createBlock( 'wpshout/faq-item', {} ), 0, clientId ) }>
                            Insert Question
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={ () => { setModalOpen( true ) } }>
                            Generate Suggestions
                        </Button>
                    </Placeholder>
                ) }
                { isModalOpen && (
                    <Modal
                        title="Generate Suggestions for Questions and Answers"
                        onRequestClose={ () => setModalOpen( false ) }
                    >
                        <TextareaControl
                            label="Enter prompt for suggestions"
                            value={ modalPrompt }
                            onChange={ ( value ) => setModalPrompt( value ) }
                            help="Help AI understand the goal of these questions and answers, provide additional context."
                        />
                        <Button
                            variant="primary"
                            isBusy={ isGenerating }
                            disabled={ isGenerating }
                            onClick={ () => {
                                setIsGenerating( true );
                                generateSuggestions( modalPrompt )
                                    .then( ( suggestions ) => setSuggestions( suggestions ) )
                                    .finally( () => setIsGenerating( false ) );
                            } }
                        >
                            Generate Suggestions
                        </Button>
                        { suggestions.length > 0 && (
                            <>
                                { suggestions.map( ( suggestion, index ) => (
                                    <div key={ index }>
                                        <h3>
                                            <CheckboxControl
                                                label={ suggestion.question }
                                                checked={ selectedSuggestions.includes( index ) }
                                                onChange={ ( selected ) => {
                                                    if ( selected ) {
                                                        setSelectedSuggestions( [ ...selectedSuggestions, index ] );
                                                    } else {
                                                        setSelectedSuggestions( selectedSuggestions.filter( ( i ) => i !== index ) );
                                                    }
                                                } }
                                            />
                                        </h3>
                                        <p>{ suggestion.answer }</p>
                                    </div>
                                ) ) }
                                <Button
                                    variant="primary"
                                    disabled={ ! selectedSuggestions.length }
                                    onClick={ () => {
                                        selectedSuggestions.forEach( ( index, suggestionIndex ) => {
                                            const suggestion = suggestions[ index ];
                                            const suggestedBlock = createBlock( 
                                                'wpshout/faq-item', 
                                                {
                                                    question: suggestion.question,
                                                },
                                                [
                                                    createBlock( 'core/paragraph', { content: suggestion.answer } )
                                                ]
                                            );

                                            insertBlock( suggestedBlock, blockIds.length + suggestionIndex, clientId );
                                        } );
                                    } }
                                >
                                    Insert Suggestions
                                </Button>
                            </>
                        ) }
                    </Modal>
                ) }
                <InnerBlocks />
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