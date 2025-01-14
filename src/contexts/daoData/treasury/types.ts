import { BigNumber } from "ethers";

export interface TokenEvent {
  transactionHash: string;
  blockNumber: number;
}

export interface TokenDepositEvent extends TokenEvent {
  address: string;
  amount: BigNumber;
}

export interface TokenWithdrawEvent extends TokenEvent {
  addresses: string[];
  amount: BigNumber;
}
export interface ERC20TokenEvent extends TokenEvent {
  contractAddresses: string[];
  amounts: BigNumber[];
}

export interface TreasuryAsset {
  name: string;
  symbol: string;
  decimals: number;
  contractAddress: string;
  totalAmount: BigNumber;
  formatedTotal: string;
}
