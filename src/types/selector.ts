import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

/**
 * @category spin
 */
export interface CoreAction {
  type: 'FunctionCall';
  params: {
    methodName: string;
    args: object;
    gas: string;
    deposit: string;
  };
}

/**
 * @category spin
 */
export interface CoreParams {
  signerId?: string;
  receiverId?: string;
  actions: CoreAction[];
}

/**
 * @category spin
 */
export interface BundlerCoreParams {
  signerId?: string;
  receiverId: string;
  actions: CoreAction[];
}

/**
 * @category spin
 */
export interface CoreParamsTransactions {
  transactions: BundlerCoreParams[];
}

/**
 * @category spin
 */
export interface CoreSelector {
  wallet: () => Promise<{
    signAndSendTransaction: (param: CoreParams) => Promise<FinalExecutionOutcome | void>;
    signAndSendTransactions: (
      params: CoreParamsTransactions,
    ) => Promise<Array<FinalExecutionOutcome> | void>;
  }>;
}
