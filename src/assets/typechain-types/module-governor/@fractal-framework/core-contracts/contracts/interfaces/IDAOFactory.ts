/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
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
} from "../../../../common";

export declare namespace IDAOFactory {
  export type CreateDAOParamsStruct = {
    daoImplementation: string;
    daoFactory: string;
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
    string,
    string[],
    string[],
    string[][],
    string[],
    string[][]
  ] & {
    daoImplementation: string;
    daoFactory: string;
    accessControlImplementation: string;
    daoName: string;
    roles: string[];
    rolesAdmins: string[];
    members: string[][];
    daoFunctionDescs: string[];
    daoActionRoles: string[][];
  };
}

export interface IDAOFactoryInterface extends utils.Interface {
  functions: {
    "createDAO(address,(address,address,address,string,string[],string[],address[][],string[],string[][]))": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "createDAO"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createDAO",
    values: [string, IDAOFactory.CreateDAOParamsStruct]
  ): string;

  decodeFunctionResult(functionFragment: "createDAO", data: BytesLike): Result;

  events: {
    "DAOCreated(address,address,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DAOCreated"): EventFragment;
}

export interface DAOCreatedEventObject {
  daoAddress: string;
  accessControl: string;
  sender: string;
  creator: string;
}
export type DAOCreatedEvent = TypedEvent<
  [string, string, string, string],
  DAOCreatedEventObject
>;

export type DAOCreatedEventFilter = TypedEventFilter<DAOCreatedEvent>;

export interface IDAOFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IDAOFactoryInterface;

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
    createDAO(
      creator: string,
      createDAOParams: IDAOFactory.CreateDAOParamsStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  createDAO(
    creator: string,
    createDAOParams: IDAOFactory.CreateDAOParamsStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createDAO(
      creator: string,
      createDAOParams: IDAOFactory.CreateDAOParamsStruct,
      overrides?: CallOverrides
    ): Promise<[string, string]>;
  };

  filters: {
    "DAOCreated(address,address,address,address)"(
      daoAddress?: string | null,
      accessControl?: string | null,
      sender?: string | null,
      creator?: null
    ): DAOCreatedEventFilter;
    DAOCreated(
      daoAddress?: string | null,
      accessControl?: string | null,
      sender?: string | null,
      creator?: null
    ): DAOCreatedEventFilter;
  };

  estimateGas: {
    createDAO(
      creator: string,
      createDAOParams: IDAOFactory.CreateDAOParamsStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createDAO(
      creator: string,
      createDAOParams: IDAOFactory.CreateDAOParamsStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
