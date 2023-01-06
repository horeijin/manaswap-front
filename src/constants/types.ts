
export interface SerializedFarmConfig extends FarmConfigBaseProps {
    token: SerializedWrappedToken
    quoteToken: SerializedWrappedToken
}

export interface FarmConfigBaseProps {
    pid: number
    v1pid?: number
    vaultPid?: number
    lpSymbol: string
    lpAddress: string
    multiplier?: string
    isCommunity?: boolean
    auctionHostingStartSeconds?: number
    auctionHostingEndDate?: string
    dual?: {
        rewardPerBlock: number
        earnLabel: string
        endBlock: number
    }
    boosted?: boolean
}

export interface SerializedClassicFarmConfig extends FarmConfigBaseProps {
    token: SerializedWrappedToken
    quoteToken: SerializedWrappedToken
}


export interface SerializedFarmPublicData extends SerializedClassicFarmConfig {
    tokenPriceBusd?: string
    quoteTokenPriceBusd?: string
    tokenAmountTotal?: string
    quoteTokenAmountTotal?: string
    lpTotalInQuoteToken?: string
    lpTotalSupply?: string
    tokenPriceVsQuote?: string
    poolWeight?: string
    boosted?: boolean
    infoStableSwapAddress?: string
}

export interface SerializedFarm extends SerializedFarmPublicData {
    userData?: SerializedFarmUserData
}


interface SerializedFarmUserData {
    allowance: string
    tokenBalance: string
    stakedBalance: string
    earnings: string
    proxy?: {
        allowance: string
        tokenBalance: string
        stakedBalance: string
        earnings: string
    }
}


export interface SerializedWrappedToken extends SerializedToken {
    chainId: number
    address: string
    decimals: number
    symbol: string
    name?: string
    projectLink?: string
    logoURI?: string
}


export interface SerializedToken {
    chainId: number
    address: string
    decimals: number
    symbol: string
    name?: string
    projectLink?: string
}
