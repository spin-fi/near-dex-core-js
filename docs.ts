/**
 * @category near-api-js
 */
export type {WalletConnection} from 'near-api-js';

/**
 * @category near-api-js
 */
export type {
  FinalExecutionOutcome,
  ExecutionOutcomeWithId,
  FinalExecutionStatus,
  FinalExecutionStatusBasic,
} from 'near-api-js/lib/providers';

/**
 * @category near-api-js
 */
export type {
  ExecutionOutcome,
  ExecutionError,
  ExecutionStatus,
  ExecutionStatusBasic,
} from 'near-api-js/lib/providers/provider';

/**
 * @category near-api-js
 */
export type {Action, Transaction, SignedTransaction} from 'near-api-js/lib/transaction';

/**
 * @category near-transaction-manager
 */
export type {
  TransactionManager,
  TransactionCreator,
  TransactionSender,
  TransactionSigner,
  TransactionManagerOptions,
  CreateTransactionOptions,
} from 'near-transaction-manager';

/**
 * @category near-api-js
 */
export type {Account, AccountBalance} from 'near-api-js/lib/account';

/**
 * @category @spinfi/websocket
 */
export type {
  Websocket,
  NotifyConfig,
  MethodConfig,
  Call,
  CallError,
  CallOk,
  Update,
  UnsubConfig,
  UpdateError,
  UpdateOk,
  JsonRpc,
  Request,
  RequestPayload,
  JsonRpcError,
} from '@spinfi/websocket';

/**
 * @category rxjs
 */
export type {Subscription} from 'rxjs';

/**
 * @category spin spot
 */
export * from './src/spot';
