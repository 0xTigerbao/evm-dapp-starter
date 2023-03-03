import memoize from 'lodash/memoize'
import invert from 'lodash/invert'
import {CHAINS} from "@/configs/wagmi";
import * as process from "process";

export enum ChainId {
    ETHEREUM = 1,
    BSC = 56,
    BSC_TESTNET = 97,
    ARBITRUM = 42161
}

export const DEFAULT_CHAIN_ID = process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as number || ChainId.ETHEREUM

export const isChainSupported = (chainId: number) => {
    return Boolean(CHAINS.map(f => +f.id).includes(chainId))
}

export const CHAIN_QUERY_NAME = {
    [ChainId.ETHEREUM]: 'eth',
    [ChainId.BSC]: 'bsc',
    [ChainId.BSC_TESTNET]: 'bscTestnet',
    [ChainId.ARBITRUM]: 'arbitrum'
} satisfies Record<ChainId, string>

const CHAIN_QUERY_NAME_TO_ID = invert(CHAIN_QUERY_NAME)

export const getChainId = memoize((chainName: string) => {
    if (!chainName) return undefined
    return CHAIN_QUERY_NAME_TO_ID[chainName] ? +CHAIN_QUERY_NAME_TO_ID[chainName] : undefined
})
