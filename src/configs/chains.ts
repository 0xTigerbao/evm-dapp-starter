import memoize from 'lodash/memoize'
import invert from 'lodash/invert'

export enum ChainId {
    ETHEREUM = 1,
    BSC = 56,
    BSC_TESTNET = 97
}

export const CHAIN_QUERY_NAME = {
    [ChainId.ETHEREUM]: 'eth',
    [ChainId.BSC]: 'bsc',
    [ChainId.BSC_TESTNET]: 'bscTestnet',
} satisfies Record<ChainId, string>

const CHAIN_QUERY_NAME_TO_ID = invert(CHAIN_QUERY_NAME)

export const getChainId = memoize((chainName: string) => {
    if (!chainName) return undefined
    return CHAIN_QUERY_NAME_TO_ID[chainName] ? +CHAIN_QUERY_NAME_TO_ID[chainName] : undefined
})
