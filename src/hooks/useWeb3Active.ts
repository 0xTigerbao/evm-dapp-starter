import {useAccount, useNetwork, useProvider} from "wagmi";
import {useEffect, useState} from "react";
import {useLocalNetworkChain} from "@/hooks/useActiveChainId";

export const useWeb3Active = () => {
    const {address, ...accountResult} = useAccount()
    const [account, setAccount] = useState<string | undefined>(undefined)
    const defaultChainId = useLocalNetworkChain()
    const {chain} = useNetwork()

    const provider = useProvider({
        chainId: defaultChainId
    })

    useEffect(() => {
        if (address) setAccount(address)
        else setAccount(undefined)
    }, [address, chain])

    return {
        account,
        accountResult,
        provider,
        defaultChainId
    }
}