/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";

export declare namespace IDAOFactory {
  export type CreateDAOParamsStruct = {
    daoImplementation: string;
    accessControlImplementation: string;
    daoName: string;
    roles: string[];
    rolesAdmins: string[];
    members: string[][];
    daoFunctionDescs: string[];
    daoActionRoles: string[][];
  };

  export type CreateDAOParamsStructOutput = [
    string,
    string,
    string,
    string[],
    string[],
    string[][],
    string[],
    string[][]
  ] & {
    daoImplementation: string;
    accessControlImplementation: string;
    daoName: string;
    roles: string[];
    rolesAdmins: string[];
    members: string[][];
    daoFunctionDescs: string[];
    daoActionRoles: string[][];
  };
}

export declare namespace IMetaFactory {
  export type ModuleFactoryCallDataStruct = {
    factory: string;
    data: BytesLike[];
    value: BigNumberish;
    newContractAddressesToPass: BigNumberish[];
    addressesReturned: BigNumberish;
  };

  export type ModuleFactoryCallDataStructOutput = [
    string,
    string[],
    BigNumber,
    BigNumber[],
    BigNumber
  ] & {
    factory: string;
    data: string[];
    value: BigNumber;
    newContractAddressesToPass: BigNumber[];
    addressesReturned: BigNumber;
  };

  export type ModuleActionDataStruct = {
    contractIndexes: BigNumberish[];
    functionDescs: string[];
    roles: string[][];
  };

  export type ModuleActionDataStructOutput = [
    BigNumber[],
    string[],
    string[][]
  ] & {
    contractIndexes: BigNumber[];
    functionDescs: string[];
    roles: string[][];
  };
}

export interface IMetaFactoryInterface extends utils.Interface {
  functions: {
    "createDAOAndModules(address,uint256,(address,address,string,string[],string[],address[][],string[],string[][]),(address,bytes[],uint256,uint256[],uint256)[],(uint256[],string[],string[][]),uint256[][])": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "createDAOAndModules"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createDAOAndModules",
    values: [
      string,
      BigNumberish,
      IDAOFactory.CreateDAOParamsStruct,
      IMetaFactory.ModuleFactoryCallDataStruct[],
      IMetaFactory.ModuleActionDataStruct,
      BigNumberish[][]
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "createDAOAndModules",
    data: BytesLike
  ): Result;

  events: {
    "DAOAndModulesCreated(address,address,address[])": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DAOAndModulesCreated"): EventFragment;
}

export interface DAOAndModulesCreatedEventObject {
  dao: string;
  accessControl: string;
  modules: string[];
}
export type DAOAndModulesCreatedEvent = TypedEvent<
  [string, string, string[]],
  DAOAndModulesCreatedEventObject
>;

export type DAOAndModulesCreatedEventFilter =
  TypedEventFilter<DAOAndModulesCreatedEvent>;

export interface IMetaFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IMetaFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createDAOAndModules(
      daoFactory: string,
      metaFactoryTempRoleIndex: BigNumberish,
      createDAOParams: IDAOFactory.CreateDAOParamsStruct,
      moduleFactoriesCallData: IMetaFactory.ModuleFactoryCallDataStruct[],
      moduleActionData: IMetaFactory.ModuleActionDataStruct,
      roleModuleMembers: BigNumberish[][],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  createDAOAndModules(
    daoFactory: string,
    metaFactoryTempRoleIndex: BigNumberish,
    createDAOParams: IDAOFactory.CreateDAOParamsStruct,
    moduleFactoriesCallData: IMetaFactory.ModuleFactoryCallDataStruct[],
    moduleActionData: IMetaFactory.ModuleActionDataStruct,
    roleModuleMembers: BigNumberish[][],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createDAOAndModules(
      daoFactory: string,
      metaFactoryTempRoleIndex: BigNumberish,
      createDAOParams: IDAOFactory.CreateDAOParamsStruct,
      moduleFactoriesCallData: IMetaFactory.ModuleFactoryCallDataStruct[],
      moduleActionData: IMetaFactory.ModuleActionDataStruct,
      roleModuleMembers: BigNumberish[][],
      overrides?: CallOverrides
    ): Promise<string[]>;
  };

  filters: {
    "DAOAndModulesCreated(address,address,address[])"(
      dao?: null,
      accessControl?: null,
      modules?: null
    ): DAOAndModulesCreatedEventFilter;
    DAOAndModulesCreated(
      dao?: null,
      accessControl?: null,
      modules?: null
    ): DAOAndModulesCreatedEventFilter;
  };

  estimateGas: {
    createDAOAndModules(
      daoFactory: string,
      metaFactoryTempRoleIndex: BigNumberish,
      createDAOParams: IDAOFactory.CreateDAOParamsStruct,
      moduleFactoriesCallData: IMetaFactory.ModuleFactoryCallDataStruct[],
      moduleActionData: IMetaFactory.ModuleActionDataStruct,
      roleModuleMembers: BigNumberish[][],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createDAOAndModules(
      daoFactory: string,
      metaFactoryTempRoleIndex: BigNumberish,
      createDAOParams: IDAOFactory.CreateDAOParamsStruct,
      moduleFactoriesCallData: IMetaFactory.ModuleFactoryCallDataStruct[],
      moduleActionData: IMetaFactory.ModuleActionDataStruct,
      roleModuleMembers: BigNumberish[][],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}