import {configureChains, createClient, mainnet} from "wagmi";
import {jsonRpcProvider} from 'wagmi/providers/jsonRpc'
import {arbitrum, bsc, bscTestnet, polygonMumbai} from "wagmi/chains";
import {InjectedConnector} from "wagmi/connectors/injected";
import {CoinbaseWalletConnector} from "wagmi/connectors/coinbaseWallet";
import {WalletConnectConnector} from "wagmi/connectors/walletConnect";
import {MetaMaskConnector} from "wagmi/connectors/metaMask";
import {LedgerConnector} from "wagmi/connectors/ledger";
import {SafeConnector} from "wagmi/connectors/safe";
import {APP_NAME} from "@/configs/index";

export const CHAINS = [bsc, mainnet, bscTestnet, polygonMumbai, arbitrum]

export const {provider, chains} = configureChains(CHAINS, [
    jsonRpcProvider({
        rpc: (chain) => {
            return {http: chain.rpcUrls.default.http[0]}
        },
    }),
])

export const injectedConnector = new InjectedConnector({
    chains,
    options: {
        shimDisconnect: false,
        shimChainChangedDisconnect: true,
    },
})

export const trustWalletConnector = new InjectedConnector({
    chains,
    options: {
        shimDisconnect: false,
        shimChainChangedDisconnect: true,
    },
})
export const coinbaseConnector = new CoinbaseWalletConnector({
    chains,
    options: {
        appName: APP_NAME,
        appLogoUrl: '',
    },
})

export const walletConnectConnector = new WalletConnectConnector({
    chains,
    options: {
        qrcode: true,
    },
})

export const metaMaskConnector = new MetaMaskConnector({
    chains,
    options: {
        shimDisconnect: false,
        shimChainChangedDisconnect: true,
    },
})

const ledgerConnector = new LedgerConnector({
    chains,
})

export const wagmiClient = createClient({
    autoConnect: true,
    provider,
    connectors: [
        new SafeConnector({chains}),
        metaMaskConnector,
        injectedConnector,
        coinbaseConnector,
        walletConnectConnector,
        ledgerConnector,
        trustWalletConnector,
    ],
})