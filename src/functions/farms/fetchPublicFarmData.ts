import chunk from 'lodash/chunk'

import { SerializedFarm, SerializedFarmConfig } from "../../constants/types"
import { MASTERCHEF_ADDRESSES } from "../../constants"
import { multicall } from "../multicall"
import { Exchange__factory } from "../../constants/typechain-types"

const fetchFarmCalls = (farm: SerializedFarm, chainId: number) => {
    const { lpAddress, quoteToken } = farm
    return [
        // Balance of token in the LP contract
        {
            address: lpAddress,
            name: 'getEthBalance',
            params: [],
        },
        // Balance of quote token on LP contract
        {
            address: quoteToken.address,
            name: 'balanceOf',
            params: [lpAddress],
        },
        // Balance of LP tokens in the master chef contract
        {
            address: lpAddress,
            name: 'balanceOf',
            params: [MASTERCHEF_ADDRESSES[chainId]],
        },
        // Total supply of LP tokens
        {
            address: lpAddress,
            name: 'totalSupply',
        },
        // Token decimals
        // {
        //     address: token.address,
        //     name: 'decimals',
        // },
        // Quote token decimals
        {
            address: quoteToken.address,
            name: 'decimals',
        },
    ]
}

export const fetchPublicFarmsData = async (farms: SerializedFarmConfig[], chainId: number): Promise<any[]> => {
    const farmCalls = farms.flatMap((farm) => fetchFarmCalls(farm, chainId))
    const chunkSize = farmCalls.length / farms.length
    const farmMultiCallResult = await multicall({ abi: Exchange__factory.abi, calls: farmCalls, chainId: chainId })
    return chunk(farmMultiCallResult, chunkSize)
}
