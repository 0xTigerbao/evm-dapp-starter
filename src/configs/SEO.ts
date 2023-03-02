import {DefaultSeoProps} from 'next-seo'

export const SEO: DefaultSeoProps = {
    titleTemplate: '%s | Home',
    defaultTitle: 'Hello World',
    description:
        "Qui Voluptatem Commodi Voluptatem Est Voluptatibus Dignissimos",
    twitter: {
        cardType: 'summary_large_image',
        handle: '@PancakeSwap',
        site: '@PancakeSwap',
    },
    openGraph: {
        title: 'Qui Voluptatem Commodi Voluptatem Est Voluptatibus Dignissimos',
        description:
            'Qui Voluptatem Commodi Voluptatem Est Voluptatibus Dignissimos',
        images: [{url: "/preview.png"}],
    },
}
