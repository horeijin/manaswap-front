import BigNumber from "bignumber.js";
import { BLOCKS_PER_YEAR } from '../../constants'
import { SerializedFarm } from '../../constants/types'

export const getFarmManaRewardApr = (farm: SerializedFarm, regularManaPerBlock: string) => {
    let cakeRewardsAprAsString = '0'
    
    // const totalLiquidity = FixedNumber.from(farm.lpTotalInQuoteToken)
    const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken!)
      const poolWeight = new BigNumber(farm.poolWeight!)
      if (totalLiquidity.isZero() || poolWeight.isZero()) {
        return cakeRewardsAprAsString
      }
      const yearlyCakeRewardAllocation = poolWeight
    ? poolWeight.multipliedBy(new BigNumber(BLOCKS_PER_YEAR).multipliedBy(new BigNumber(String(regularManaPerBlock))))
    : new BigNumber(0);
    
    const cakeRewardsApr = yearlyCakeRewardAllocation
    .dividedBy(totalLiquidity)
    .multipliedBy(new BigNumber(100))
  if (!cakeRewardsApr.isZero()) {
    cakeRewardsAprAsString = cakeRewardsApr.toFixed(2)
  }
  return cakeRewardsAprAsString
}

