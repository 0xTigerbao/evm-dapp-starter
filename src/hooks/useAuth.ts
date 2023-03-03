import {useCallback, useEffect} from 'react'
import {useConnect, useDisconnect, useNetwork, useSwitchNetwork,} from 'wagmi'
import {useWeb3Active} from "@/hooks/useWeb3Active";

const useAuth = () => {
    const {connectAsync, connectors} = useConnect()
    const {disconnectAsync} = useDisconnect()
    const {defaultChainId} = useWeb3Active()
    const {chain: chainListen} = useNetwork()
    const {switchNetworkAsync} = useSwitchNetwork()

    const login = useCallback(async (name: string) => {
        const wallet = connectors.find(cn => cn.id === name)
        const {chain} = await connectAsync({connector: wallet})
        if (chain.id !== defaultChainId) {
            switchNetworkAsync && await switchNetworkAsync(defaultChainId)
        }
    }, [connectors, defaultChainId])

    const logout = useCallback(async () => {
        await disconnectAsync()
    }, [disconnectAsync])

    useEffect(() => {
        if (chainListen && chainListen.id !== defaultChainId) {

        }
    }, [chainListen])

    return {login, logout}
}

export default useAuth
