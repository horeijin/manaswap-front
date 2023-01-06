import { ethers, BigNumber } from "ethers";

import { Token__factory } from "../constants/typechain-types";
import { Factory__factory, Exchange__factory, Multicall__factory, MasterChef__factory } from "../constants/typechain-types";
import { FACTORY_ADDRESSES, MULTICALL_ADDRESSES, MASTERCHEF_ADDRESSES } from "../constants";

//이더리움 네트워크 연결하기 위해 사용
export function getProvider() {
    return new ethers.providers.Web3Provider(window.ethereum);
}

//컨트랙트 호출하기 위해 필요한 signer 불러오기
export function getSigner() {
    return getProvider().getSigner();
}

//Multicall 컨트랙트 가져오기 
export function getMulticallContract(networkId: number) {
    return Multicall__factory.connect(MULTICALL_ADDRESSES[networkId], getSigner());
}

//Masterchef 컨트랙트 가져오기
export function getMasterChefContract(networkId: number) {
    return MasterChef__factory.connect(MASTERCHEF_ADDRESSES[networkId], getSigner());
}

//Factory 컨트랙트 가져오기 (밑의 함수들에서 사용)
export function getFactoryContract(network: number) {
    console.log('factory 컨트랙트 주소 : '+FACTORY_ADDRESSES[network])
    return Factory__factory.connect(FACTORY_ADDRESSES[network], getSigner());
}

//Exchange 컨트랙트 가져오기 (밑의 함수들에서 이거 사용)
export function getExchangeContract(contractAddress: string) {
    return Exchange__factory.connect(contractAddress, getSigner());
}

//프론트에서 swap 버튼 누르면 호출되는 함수
export async function onEthToTokenSwap(inputAmount: BigNumber, outputAmount: BigNumber, tokenAddress: string, network: number) {
    const exchangeAddress = await getFactoryContract(network).getExchange(tokenAddress);
    await getExchangeContract(exchangeAddress).ethToTokenSwap(outputAmount, {value: inputAmount});
}
//프론트에서 유동성 추추가 하면 호출되는 함수
export async function onAddLiquidity(addEthAmount: BigNumber, addTokenAmount: BigNumber, tokenAddress: string, network: number) {
    const exchangeAddress = await getFactoryContract(network).getExchange(tokenAddress);
    await getExchangeContract(exchangeAddress).addLiquidity(addTokenAmount, {value: addEthAmount});
}

//Factory컨트랙트에서 Exchange함수 주소 가져오기
export async function getTokenExchangeAddressFromFactory(tokenAddress: string, network: number) {
    console.log('토큰 주소 : ' + tokenAddress)
    return getFactoryContract(network).getExchange(tokenAddress);
}


export async function getTokenBalanceAndSymbol(accountAddress:string, tokenAddress:string) {
    const token = Token__factory.connect(tokenAddress, getSigner());
    const symbol = await token.symbol();
    const balance = await token.balanceOf(accountAddress);
    return {
        symbol: symbol,
        balance: ethers.utils.formatEther(balance)
    }
}

//잔액과 화폐단위(ETH) 가져오는 함수
export async function getAccountBalance(accountAddress:string) {
    const balance = await getProvider().getBalance(accountAddress);
    return {
        balance: ethers.utils.formatEther(balance),
        symbol: 'ETH'
    }
}

//10^18형태 -> string의 작은값으로 변환하는 함수
export function fromWei(to: BigNumber) {
    return ethers.utils.formatEther(to.toString());
}

//string의 작은 값 -> 10^18형태로 변환하는 함수
export function toWei(to: string) {
    return ethers.utils.parseEther(to);
}

