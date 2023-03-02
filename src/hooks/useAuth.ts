import {useCallback} from 'react'
import {useConnect, useDisconnect, useNetwork,} from 'wagmi'

const useAuth = () => {
    const {connectAsync, connectors} = useConnect()
    const {chain} = useNetwork()
    const {disconnectAsync} = useDisconnect()


    const login = useCallback(async () => {
        },
        [connectors, connectAsync],
    )

    const logout = useCallback(async () => {

    }, [disconnectAsync, chain?.id])

    return {login, logout}
}

export default useAuth
