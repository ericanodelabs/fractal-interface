import { useState } from "react";
import { BigNumber } from "ethers";

import useDAOContract from "./useDAOContract";
import useDAOName from "./useDAOName";
import useAccessControlAddress from "./useAccessControlAddress";
import useAccessControlContract from "./useAccessControlContract";
import useModuleAddresses from "./useModuleAddresses";
import useGovernorModuleContract from "./useGovernorModuleContract";
import useTokenContract from "./useTokenContract";
import useTokenData from "./useTokenData";
import useProposals from "./useProposals";
import { ProposalData } from "./useProposals";
import { GovernorModule } from "../../assets/typechain-types/module-governor";
import { TreasuryModule } from "../../assets/typechain-types/module-treasury";
import { VotesTokenWithSupply } from "../../assets/typechain-types/votes-token";
import { useBlockchainData } from "../blockchainData";
import useTreasuryModuleContract from "./treasury/useTreasuryModuleContract";
import useTreasuryEvents from "./treasury/useTreasuryEvents";
import useTreasuryAssets from "./treasury/useTreasuryAssets";
import { TreasuryAsset } from "./treasury/types";

export interface DAOData {
  daoAddress: string | undefined;
  name: string | undefined;
  accessControlAddress: string | undefined;
  moduleAddresses: string[] | undefined;
  proposals: ProposalData[] | undefined;
  governorModuleContract: GovernorModule | undefined;
  tokenContract: VotesTokenWithSupply | undefined;
  tokenData: {
    name: string | undefined;
    symbol: string | undefined;
    decimals: number | undefined;
    userBalance: BigNumber | undefined;
    delegatee: string | undefined;
    votingWeight: BigNumber | undefined;
    address: string | undefined;
  };
  treasuryModuleContract?: TreasuryModule;
  treasuryAssets: TreasuryAsset[];
}

type SetDAOAddressFn = React.Dispatch<React.SetStateAction<string | undefined>>;
export type DAODataContext = readonly [DAOData, SetDAOAddressFn];

export const defaultDAODataResponse = [{} as DAOData, (() => undefined) as SetDAOAddressFn] as const;

const useDAODatas = () => {
  const [daoAddress, setDAOAddress] = useState<string>();
  const daoContract = useDAOContract(daoAddress);
  const name = useDAOName(daoContract);
  const accessControlAddress = useAccessControlAddress(daoContract);
  const accessControlContract = useAccessControlContract(accessControlAddress);
  const moduleAddresses = useModuleAddresses(daoContract, accessControlContract);

  // ***** Module Hooks ****** //
  const governorModuleContract = useGovernorModuleContract(moduleAddresses);
  const treasuryModuleContract = useTreasuryModuleContract(moduleAddresses);
  const { nativeDeposits, nativeWithdraws, erc20TokenDeposits, erc20TokenWithdraws } = useTreasuryEvents(treasuryModuleContract);
  const treasuryAssets = useTreasuryAssets(nativeDeposits, nativeWithdraws, erc20TokenDeposits, erc20TokenWithdraws);
  // ************************* //

  const tokenContract = useTokenContract(governorModuleContract);
  const tokenData = useTokenData(tokenContract);
  const { currentBlockNumber } = useBlockchainData();
  const proposals = useProposals(governorModuleContract, currentBlockNumber);
  const daoData: DAOData = {
    daoAddress,
    name,
    accessControlAddress,
    moduleAddresses,
    proposals,
    governorModuleContract,
    tokenContract,
    tokenData,
    treasuryModuleContract,
    treasuryAssets,
  };

  return [daoData, setDAOAddress] as const;
};

export default useDAODatas;
