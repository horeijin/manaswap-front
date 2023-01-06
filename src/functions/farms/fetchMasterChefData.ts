import chunk from 'lodash/chunk'
import { SerializedFarm, SerializedFarmConfig } from "../../constants/types"
import { getMasterChefContract } from "../../utils/ether"
import { MASTERCHEF_ADDRESSES } from "../../constants"
import { MasterChef__factory } from "../../constants/typechain-types";
import { Call, multicall } from "../multicall";

export const fetchMasterChefFarmPoolLength = async (chainId: number) => {
    const poolLength = await getMasterChefContract(chainId).poolLength()
    return poolLength
}

const masterChefFarmCalls = (farm: SerializedFarm, chainId: number) => {
    const { pid } = farm
    return pid || pid === 0
        ? [
            {
                address: MASTERCHEF_ADDRESSES[chainId],
                name: 'poolInfo',
                params: [pid],
            },
            {
                address: MASTERCHEF_ADDRESSES[chainId],
                name: 'totalAllocPoint',
            },
        ]
        : [null, null]
}

export const fetchMasterChefData = async (farms: SerializedFarmConfig[], chainId: number): Promise<any[]> => {
    const masterChefCalls = farms.map((farm) => masterChefFarmCalls(farm, chainId))
    const chunkSize = masterChefCalls.flat().length / farms.length
    const masterChefAggregatedCalls = masterChefCalls
        .filter((masterChefCall) => masterChefCall[0] !== null && masterChefCall[1] !== null)
        .flat()
    const masterChefMultiCallResult = await multicall({ abi: MasterChef__factory.abi, calls: masterChefAggregatedCalls as Call[], chainId: chainId })
    const masterChefChunkedResultRaw = chunk(masterChefMultiCallResult, chunkSize)
    let masterChefChunkedResultCounter = 0
    return masterChefCalls.map((masterChefCall) => {
        if (masterChefCall[0] === null && masterChefCall[1] === null) {
            return [null, null]
        }
        const data = masterChefChunkedResultRaw[masterChefChunkedResultCounter]
        masterChefChunkedResultCounter++
        return data
    })
}
