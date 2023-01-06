import { ethers, BigNumber } from 'ethers';
import { getTokenBalanceAndSymbol, getAccountBalance, getTokenExchangeAddressFromFactory } from '../utils/ether';

//Exchange 컨트랙트의 이더, 토큰 잔액 가져오는 함수
export async function getReserves(tokenAddress: string, network: number) {
    const exchangeAddress = await getTokenExchangeAddressFromFactory(tokenAddress, network);//Exchange 컨트랙트의 주소
    const ethReserve = (await getAccountBalance(exchangeAddress)).balance; //이더 잔액
    const tokenReserve = (await getTokenBalanceAndSymbol(exchangeAddress, tokenAddress)).balance; //그레이 토큰 잔액

    return [ethReserve, tokenReserve];
}

//프론트에서 swap 버튼 누르면 호출되는 함수
export async function getEthToTokenOutputAmount(inputAmount: string, tokenAddress: string, network: number) {
    const [EthReserve, TokenReserve] = await getReserves(tokenAddress, network); //이더 잔액, 토큰 잔액
    console.log(`입금액 : ${inputAmount}`)
    console.log(`이더 잔액 : ${EthReserve}`);
    console.log(`그레이토큰 잔액 : ${TokenReserve}`)

    return getOutputAmount(ethers.utils.parseEther(inputAmount), ethers.utils.parseEther(EthReserve), ethers.utils.parseEther(TokenReserve));
    //ethers.utils.parseEther()하면 string -> 10^18이 곱해진 BigNumber로 변환
}

//솔리디티로 작성된 받을 토큰양 정하는 함수
// function getOutputAmount(
//     uint256 inputAmount,  //트레이더가 넣은 이더양
//     uint256 inputReserve, //기존에 컨트랙트가 가진 이더양
//     uint256 outputReserve //기존에 컨트랙트가 가진 토큰양
//     ) public pure returns (uint256) {
//         uint256 inputAmountWithFee = inputAmount * 99;  
//         //1% 수수료를 포함한 트레이더의 입금 이더양 (100개 넣었지만 99개 넣은 것으로 계산, 나머지 1개는 풀에 축적)
        
//         uint256 numerator = outputReserve * inputAmountWithFee; //풀 안의 토큰양 * 트레이더가 넣는 수수료 포함 이더양
//         uint256 denominator = inputReserve * 100 + inputAmountWithFee;//풀 안의 이더양 * 100 + 트레이더가 넣는 수수료 포함 이더양
//         return numerator / denominator;
// }
//위의 함수를 typescript 형식으로 수정
export function getOutputAmount(
    inputAmount:BigNumber,  //트레이더가 넣은 이더양
    inputReserve:BigNumber, //기존에 컨트랙트가 가진 이더양
    outputReserve:BigNumber //기존에 컨트랙트가 가진 토큰양
    ){
        const inputAmountWithFee = inputAmount.mul(BigNumber.from(99));  
        //1% 수수료를 포함한 트레이더의 입금 이더양 (100개 넣었지만 99개 넣은 것으로 계산, 나머지 1개는 풀에 축적)
        
        const numerator = inputAmountWithFee.mul(outputReserve); //풀 안의 토큰양 * 트레이더가 넣는 수수료 포함 이더양
        const denominator = inputReserve.mul(BigNumber.from(100)).add(inputAmountWithFee);//풀 안의 이더양 * 100 + 트레이더가 넣는 수수료 포함 이더양
        
        console.log(ethers.utils.formatEther(numerator.div(denominator)));
        return numerator.div(denominator);
}

//LP토큰 양 구하는 함수
export async function getLPTokenAmount(tokenAddress: string, accountAddress: string, network: number) {
    const exchangeAddress = await getTokenExchangeAddressFromFactory(tokenAddress, network);
    const tokenReserve = (await getTokenBalanceAndSymbol(accountAddress, exchangeAddress)).balance;
    return tokenReserve;
}

//슬리피지 계산하는 함수
export function calculateSlippage(slippage: number, amount: BigNumber) {
    const offset = amount.mul(slippage).div(BigNumber.from(10000)) //200/10000=0.02
    const minimum = amount.sub(offset); //입력값 - 슬리피지 계산값
    const maximum = amount.add(offset); //입력값 + 슬리피지 계산값

    return {
        minimum: minimum,
        maximum: maximum
    }
}