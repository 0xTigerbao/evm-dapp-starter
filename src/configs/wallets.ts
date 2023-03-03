import {metaMaskConnector} from "@/configs/wagmi";
import {getTrustWalletProvider} from "@/configs/ortherConnectors/trustWallet";
import {ExtendEthereum} from "@/global";
import {HOME_URL} from "@/configs/index";

export enum ConnectorNames {
    MetaMask = 'metaMask',
    Injected = 'injected',
    WalletConnect = 'walletConnect',
    BSC = 'bsc',
    WalletLink = 'coinbaseWallet',
    Ledger = 'ledger',
    TrustWallet = 'trustWallet',
}

const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t))

const isMetamaskInstalled = () => {
    if (typeof window === 'undefined') {
        return false
    }

    if (window.ethereum?.isMetaMask) {
        return true
    }

    if (window.ethereum?.providers?.some((p) => p.isMetaMask)) {
        return true
    }

    return false
}

export const walletsConfig = [
    {
        id: 'metamask',
        title: 'Metamask',
        icon: '/images/wallets/metamask.png',
        get installed() {
            return isMetamaskInstalled() && metaMaskConnector.ready
        },
        connectorId: ConnectorNames.MetaMask,
        deepLink: 'https://metamask.app.link/dapp/pancakeswap.finance/',
        downloadLink: 'https://metamask.app.link/dapp/pancakeswap.finance/',
    },
    {
        id: 'binance',
        title: 'Binance Wallet',
        icon: '/images/wallets/binance.png',
        get installed() {
            return typeof window !== 'undefined' && Boolean(window.BinanceChain)
        },
        connectorId: ConnectorNames.BSC,
        downloadLink: 'https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp'
    },
    {
        id: 'coinbase',
        title: 'Coinbase Wallet',
        icon: '/images/wallets/coinbase.png',
        connectorId: ConnectorNames.WalletLink,
    },
    {
        id: 'trust',
        title: 'Trust Wallet',
        icon: '/images/wallets/trust.png',
        connectorId: ConnectorNames.TrustWallet,
        get installed() {
            return !!getTrustWalletProvider()
        },
        deepLink: `https://link.trustwallet.com/open_url?coin_id=20000714&url=${HOME_URL}`,
        downloadLink: 'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph',
    },
    {
        id: 'walletconnect',
        title: 'WalletConnect',
        icon: '/images/wallets/walletconnect.png',
        connectorId: ConnectorNames.WalletConnect,
    },
    {
        id: 'opera',
        title: 'Opera Wallet',
        icon: '/images/wallets/opera.png',
        connectorId: ConnectorNames.Injected,
        get installed() {
            return typeof window !== 'undefined' && Boolean(window.ethereum?.isOpera)
        },
        downloadLink: 'https://www.opera.com/crypto/next',
    },
    {
        id: 'brave',
        title: 'Brave Wallet',
        icon: '/images/wallets/brave.png',
        connectorId: ConnectorNames.Injected,
        get installed() {
            return typeof window !== 'undefined' && Boolean(window.ethereum?.isBraveWallet)
        },
        downloadLink: 'https://brave.com/wallet/',
    },
    {
        id: 'tokenpocket',
        title: 'TokenPocket',
        icon: '/images/wallets/tokenpocket.png',
        connectorId: ConnectorNames.Injected,
        get installed() {
            return typeof window !== 'undefined' && Boolean(window.ethereum?.isTokenPocket)
        },
    },
    {
        id: 'safepal',
        title: 'SafePal',
        icon: '/images/wallets/safepal.png',
        connectorId: ConnectorNames.Injected,
        get installed() {
            return typeof window !== 'undefined' && Boolean((window.ethereum as ExtendEthereum)?.isSafePal)
        },
        downloadLink:
            'https://chrome.google.com/webstore/detail/safepal-extension-wallet/lgmpcpglpngdoalbgeoldeajfclnhafa',
    },
    {
        id: 'coin98',
        title: 'Coin98',
        icon: '/images/wallets/coin98.png',
        connectorId: ConnectorNames.Injected,
        get installed() {
            return (
                typeof window !== 'undefined' &&
                (Boolean((window.ethereum as ExtendEthereum)?.isCoin98) || Boolean(window.coin98))
            )
        },
    },
    {
        id: 'ledger',
        title: 'Ledger',
        icon: '/images/wallets/ledger.png',
        connectorId: ConnectorNames.Ledger,
    },
]
