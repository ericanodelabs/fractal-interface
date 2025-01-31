/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IModuleBase,
  IModuleBaseInterface,
} from "../../../../../@fractal-framework/core-contracts/contracts/interfaces/IModuleBase";

const _abi = [
  {
    inputs: [],
    name: "NotAuthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "accessControl",
    outputs: [
      {
        internalType: "contract IAccessControlDAO",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IModuleBase__factory {
  static readonly abi = _abi;
  static createInterface(): IModuleBaseInterface {
    return new utils.Interface(_abi) as IModuleBaseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IModuleBase {
    return new Contract(address, _abi, signerOrProvider) as IModuleBase;
  }
}
