import {atom, useAtom, useAtomValue} from "jotai"
import {DEFAULT_CHAIN_ID, getChainId, isChainSupported} from "@/configs/chains";
import {useRouter} from "next/router";

const queryChainIdAtom = atom(-1) // -1 unload, 0 no chainId on query
const sessionChainIdAtom = atom(0)

queryChainIdAtom.onMount = (set) => {
    const params = new URL(window.location.href).searchParams
    let chainId = params.get('chainId')

    if (chainId && isChainSupported(+chainId)) {
        set(+chainId)
    } else {
        set(DEFAULT_CHAIN_ID)
    }
}


export const useSessionChainId = () => {
    return useAtom(sessionChainIdAtom)
}

export function useLocalNetworkChain() {
    const [sessionChainId] = useSessionChainId()
    // useRouter is kind of slow, we only get this query chainId once
    const queryChainId = useAtomValue(queryChainIdAtom)

    const {query} = useRouter()

    const chainId = +(sessionChainId || getChainId(query.chain as string) || queryChainId)

    if (isChainSupported(chainId)) {
        return chainId
    }

    return undefined
}