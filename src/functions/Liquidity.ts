import { ethers } from "ethers";
import { onAddLiquidity } from "../utils/ether";

export async function addLiquidity(reserves: string[], inputEthAmount: string, inputTokenAmount: string, addTokenAddress: string, network: number) {
    if (reserves[0] == "0.0" && reserves[1] == "0.0") {
        await onAddLiquidity(ethers.utils.parseEther(inputEthAmount), ethers.utils.parseEther(inputTokenAmount), addTokenAddress, network);
    } else {
        await onAddLiquidity(ethers.utils.parseEther(inputEthAmount), ethers.utils.parseEther(inputTokenAmount), addTokenAddress, network);
    }
    
}
