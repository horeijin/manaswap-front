import BigNumber from 'bignumber.js';
import { BigNumberish, ethers } from 'ethers';
import { SerializedFarmConfig } from '../../constants/types';
import { BIG_TEN, BIG_TWO, BIG_ZERO } from '../../utils/bigNumber';
import { getMasterChefContract } from '../../utils/ether';
import { fetchMasterChefData } from './fetchMasterChefData';
import { fetchPublicFarmsData } from './fetchPublicFarmData';


export async function fetchFarms (farmsToFetch: SerializedFarmConfig[], chainId: number) {
    const farmResult = await fetchPublicFarmsData(farmsToFetch, chainId)
    const masterChefResult = await fetchMasterChefData(farmsToFetch, chainId)
    return farmsToFetch.map((farm, index) => {
      const [tokenBalanceLP, quoteTokenBalanceLP, lpTokenBalanceMC, lpTotalSupply, quoteTokenDecimals] =
        farmResult[index]
  
      const [info, totalAllocPoint] = masterChefResult[index]
  
      const lpTotalSupplyBN = new BigNumber(lpTotalSupply)
  
      // Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
      const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(lpTotalSupplyBN)
  
      // Raw amount of token in the LP, including those not staked
      const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(18))
      const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))
  
      // Amount of quoteToken in the LP that are staked in the MC
      const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)
  
      // Total staked in LP, in quote token value
      const lpTotalInQuoteToken = quoteTokenAmountMc.times(BIG_TWO)
  
      const allocPoint = info ? new BigNumber(info.allocPoint?._hex) : BIG_ZERO
      const poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO
      
      return {
        ...farm,
        token: farm.token,
        quoteToken: farm.quoteToken,
        tokenAmountTotal: tokenAmountTotal.toJSON(),
        lpTotalSupply: lpTotalSupplyBN.toJSON(),
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
        poolWeight: poolWeight.toJSON(),
        multiplier: `${allocPoint.div(100).toString()}X`,
      }
    })
  }
  
  export async function stake (pid: BigNumberish, amount: string, chainId: number) {
    await getMasterChefContract(chainId).deposit(pid, ethers.utils.parseEther(amount));
  }