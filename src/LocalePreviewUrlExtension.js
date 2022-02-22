import { useState, useEffect } from 'react';
import {
    Stack,
    Button,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import {
    Wrapper,
    useUiExtension
} from '@graphcms/uix-react-sdk'

const LocalePreviewUrlWidget = () => {
    const { allLocales, entry, sidebarConfig, form: { getFieldState } } = useUiExtension();
    const [ slug, setSlug ] = useState('');

    const { WEBSITE_URL } = sidebarConfig;
    const { localizations } = entry;

    const pickLanguageName = (locale) => {
        let filter = allLocales.filter(item => item.apiId === locale);
        return filter[0].displayName;
    }

    useEffect(() => {
        getFieldState('slug').then(({value}) => setSlug(value));
    }, [getFieldState, setSlug, slug]);
    
    // Field UI Extension only
    // if (isTableCell) {
    //     return (
    //         <HStack>
    //             {localizations.map((language) => {
    //                 <a key={language.locale} href={`${WEBSITE_URL}/${language.apiId}/${slug}`}>{language.locale}</a>
    //             })}
    //         </HStack>
    //     )
    // }

    return (
        <Stack>
        {localizations.map((language) => {
            return <Button colorScheme="purple" key={language.locale}>
                <a href={`${WEBSITE_URL}/${language.locale}/${slug}`} target="_blank" rel="noreferrer">
                    <ExternalLinkIcon /> Preview in {pickLanguageName(language.locale)}
                </a>
            </Button>
        })}
        </Stack>
    );
};

const declaration = {
    name: 'Locale Preview URL',
    description: 'Multi language preview URLs',
    extensionType: 'formSidebar', // Options: `field` or `formSidebar`
    // Global configuration
    config: {
        WEBSITE_URL: {
            type: 'string',
            displayName: 'Base URL',
            description: 'Your website base URL',
            required: true,
        }
    },
    // Sidebar UI Extension only
    // This is an instance configuration
    // sidebarConfig: {
    //     API_KEY: {
    //         type: 'string',
    //         displayName: 'API Key',
    //         description: 'Enter your API Key',
    //         required: true,
    //     }
    // }
};

const LocalePreviewUrlExtension = () => {
    return (
        <Wrapper declaration={declaration}>
            <LocalePreviewUrlWidget />
        </Wrapper>
    )
}

export default LocalePreviewUrlExtension;