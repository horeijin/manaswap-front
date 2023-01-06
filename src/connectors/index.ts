import { InjectedConnector } from '@web3-react/injected-connector';

//https://docs.metamask.io/guide/ethereum-provider.html#basic-usage
//메타마스크 문서에서 네트워크 체인id 확인가능
export const injected = new InjectedConnector({
  supportedChainIds: [1, 5] //1:mainnet, 5:goerli
})