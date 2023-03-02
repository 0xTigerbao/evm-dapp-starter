import 'antd/dist/reset.css';
import '@/styles/globals.css'

import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider} from 'react-query';
import AntdProvider from "@/providers/AntdProvider";

const queryClient = new QueryClient()

export default function App({Component, pageProps}: AppProps) {
    return <AntdProvider>
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
    </AntdProvider>
}
