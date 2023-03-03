// import 'antd/dist/reset.css';

import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider} from 'react-query';
import AntdProvider from "@/providers/AntdProvider";
import Head from 'next/head';
import {DefaultSeo} from 'next-seo';
import {SEO} from "@/configs/SEO";
import Script from 'next/script';
import Web3Provider from "@/providers/Web3Provider";
import {wagmiClient} from "@/configs/wagmi";
import React from "react";
import {WagmiConfig} from 'wagmi';

const queryClient = new QueryClient()
export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
                />
                <meta
                    name="description"
                    content="Cheaper and faster than Uniswap? Discover PancakeSwap, the leading DEX on BNB Smart Chain (BSC) with the best farms in DeFi and a lottery for CAKE."
                />
                <meta name="theme-color" content="#1FC7D4"/>
            </Head>
            <DefaultSeo {...SEO} />
            <Script
                strategy="afterInteractive"
                id="google-tag"
                dangerouslySetInnerHTML={{
                    __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTAG}');
          `,
                }}
            />
            <AntdProvider>
                <QueryClientProvider client={queryClient}>
                    <WagmiConfig client={wagmiClient}>
                        <Web3Provider>
                            <Component {...pageProps} />
                        </Web3Provider>
                    </WagmiConfig>
                </QueryClientProvider>
            </AntdProvider>

        </>)
}
