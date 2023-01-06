import { tokens } from "../tokens/5"
import { SerializedFarmConfig } from "../types"

const farms: SerializedFarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'ETH-MANA LP',
    lpAddress: '0x9bD2d96FC5eFCfbe250f961071061c4585C8bB24',
    token: tokens[0],
    quoteToken: tokens[1]
  },
  {
    pid: 1,
    lpSymbol: 'ETH-MOONSTONE LP',
    lpAddress: '0x8446194F5cea23ce86e6479dDb07f9Ec6c15e274',
    token: tokens[0],
    quoteToken: tokens[2]
  },
]

export default farms
