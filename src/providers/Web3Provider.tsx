import {ReactNode, useEffect} from "react";
import {useNetwork} from "wagmi";
import {useSwitchNetwork} from "@/hooks/useSwitchNetwork";
import {useLocalNetworkChain} from "@/hooks/useActiveChainId";

export default function Web3Provider({children}: { children: ReactNode }) {
    const {switchNetworkAsync, canSwitch} = useSwitchNetwork()
    const {chain} = useNetwork()
    const defaultChainId = useLocalNetworkChain()

    useEffect(() => {
        if (defaultChainId && defaultChainId !== chain?.id && canSwitch) {
            switchNetworkAsync(defaultChainId).then(console.log)
        }
    }, [chain, defaultChainId, canSwitch])

    return <>
        {children}
    </>

}