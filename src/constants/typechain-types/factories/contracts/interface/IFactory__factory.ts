/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IFactory,
  IFactoryInterface,
} from "../../../contracts/interface/IFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "getExchange",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IFactory__factory {
  static readonly abi = _abi;
  static createInterface(): IFactoryInterface {
    return new utils.Interface(_abi) as IFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IFactory {
    return new Contract(address, _abi, signerOrProvider) as IFactory;
  }
}
