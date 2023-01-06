import { Interface } from '@ethersproject/abi'
import { CallOverrides, Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'
import { getMulticallContract } from '../utils/ether'

interface MulticallParams {
    abi: any[]
    calls: Call[]
    chainId?: number
    options?: MulticallOptions
    provider?: Provider
}

export interface Call {
    address: string //컨트랙트 주소
    name: string // 컨트랙스 안에 작성되 함수명
    params?: any[] //함수의 파라미터들
}

export interface MulticallOptions extends CallOverrides {
    requireSuccess?: boolean
}

export type MultiCall = <T = any>(params: MulticallParams) => Promise<T>

export const multicall: MultiCall = async ({ abi, calls, chainId, options }) => {
    const { requireSuccess = true, ...overrides } = options || {}
    const multi = getMulticallContract(chainId as number);
    if (!multi) throw new Error(`Multicall Provider missing for ${chainId}`)
    const itf = new Interface(abi)

    const calldata = calls.map((call) => ({
        target: call.address.toLowerCase(),
        callData: itf.encodeFunctionData(call.name, call.params),
    }))

    const { returnData } = await multi.callStatic.aggregate(calldata)
    const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))

    return res as any
}