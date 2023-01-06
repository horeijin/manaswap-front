import { ethers } from "ethers"

export const FACTORY_ADDRESSES: any = {
    //1: '',
    5: '0xEDb905F24de7DA8171200D77119A5c4C7a2dA9bB', //goerli에 배포한 Factory 컨트랙트의 주소
}

export const MULTICALL_ADDRESSES: any = {
    5: '0x3294284e1F5719Cd38ef9e7916c6DbA0E718368b',
}

export const MASTERCHEF_ADDRESSES: any = {
    5: '0xB897855ECEDC2983072cC2832684b7C5DE22b10C',
}

export const MANA_ADDRESS = '0xeD5a4E8d105aC51418165CF968aa8F8048b1bC0D'; //Mana TokenV2 컨트랙트의 주소

export const BSC_BLOCK_TIME = 15
export const BLOCKS_PER_YEAR = (60 / BSC_BLOCK_TIME) * 60 * 24 * 365 // 2102400
export const REWARD_PER_BLOCK = "10";


