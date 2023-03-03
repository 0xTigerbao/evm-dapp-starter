/* eslint-disable consistent-return */

import {useAccount, useDisconnect, useSwitchNetwork as useSwitchNetworkWallet} from 'wagmi'
import {useCallback, useMemo, useState} from "react";
import {ConnectorNames} from "@/configs/wallets";


export function useSwitchNetwork() {
    const [loading, setLoading] = useState(false)
    const {
        switchNetworkAsync: _switchNetworkAsync,
        isLoading: _isLoading,
        switchNetwork: _switchNetwork,
        ...switchNetworkArgs
    } = useSwitchNetworkWallet()

    const {isConnected, connector} = useAccount()
    const {disconnectAsync} = useDisconnect()

    const isLoading = _isLoading || loading

    const switchNetworkAsync = useCallback(
        async (chainId: number) => {
            if (isConnected && typeof _switchNetworkAsync === 'function') {
                if (isLoading) return
                setLoading(true)
                return _switchNetworkAsync(chainId)
                    .then((c) => {
                        // well token pocket
                        if (window.ethereum?.isTokenPocket === true) {
                            window.location.reload()
                        }
                        return c
                    })
                    .catch(async () => {
                        await disconnectAsync()
                        // TODO: review the error
                    })
                    .finally(() => setLoading(false))
            }
            return new Promise(() => {

            })
        },
        [isConnected, _switchNetworkAsync, isLoading, setLoading],
    )

    const switchNetwork = useCallback(
        (chainId: number) => {
            if (isConnected && typeof _switchNetwork === 'function') {
                return _switchNetwork(chainId)
            }
        },
        [_switchNetwork, isConnected],
    )

    const canSwitch = useMemo(
        () =>
            isConnected
                ? !!_switchNetworkAsync &&
                connector && connector.id !== ConnectorNames.WalletConnect &&
                !(
                    typeof window !== 'undefined' &&
                    // @ts-ignore // TODO: add type later
                    (window.ethereum?.isSafePal || window.ethereum?.isMathWallet)
                )
                : true,
        [_switchNetworkAsync, isConnected, connector],
    )

    return {
        ...switchNetworkArgs,
        switchNetwork,
        switchNetworkAsync,
        isLoading,
        canSwitch,
    }
}
