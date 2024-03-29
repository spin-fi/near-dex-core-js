import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

/**
 * Spin
 */
import {CoreParams} from '../../../types/selector';
/**
 * Contract
 */
import type {CancelOrderRequest, CancelOrderConfig} from '../../contract/cancelOrder';
import type {CancelOrdersRequest, CancelOrdersConfig} from '../../contract/cancelOrders';
import type {DepositRequest, DepositConfig} from '../../contract/deposit';
import type {PlaceAskRequest, PlaceAskConfig} from '../../contract/placeAsk';
import type {PlaceBidRequest, PlaceBidConfig} from '../../contract/placeBid';
import type {WithdrawRequest, WithdrawConfig} from '../../contract/withdraw';
/**
 * Native
 */
import {TransferFtRequest, TransferFtConfig} from '../../../native/transferFt';
import {DepositStorageRequest, DepositStorageConfig} from '../../../native/depositStorage';

export type PerpBundlerUnit = () => Promise<CoreParams | undefined>;

export type CustomCreator = () => PerpBundlerUnit;

export interface PerpBundlerCmd {
  /**
   * TODO
   */
  cancelOrder: (request: CancelOrderRequest, config?: CancelOrderConfig) => PerpBundlerUnit;
  /**
   * TODO
   */
  cancelOrders: (request: CancelOrdersRequest, config?: CancelOrdersConfig) => PerpBundlerUnit;
  /**
   * TODO
   */
  deposit: (request: DepositRequest, config?: DepositConfig) => PerpBundlerUnit;
  /**
   * TODO
   */
  placeAsk: (request: PlaceAskRequest, config?: PlaceAskConfig) => PerpBundlerUnit;
  /**
   * TODO
   */
  placeBid: (request: PlaceBidRequest, config?: PlaceBidConfig) => PerpBundlerUnit;
  /**
   * TODO
   */
  withdraw: (request: WithdrawRequest, config?: WithdrawConfig) => PerpBundlerUnit;
  /**
   * Native
   */
  /**
   * TODO
   */
  transferFt: (request: TransferFtRequest, config?: TransferFtConfig) => PerpBundlerUnit;
  /**
   * TODO
   */
  depositStorage: (
    request: DepositStorageRequest,
    config?: DepositStorageConfig,
  ) => PerpBundlerUnit;
}

export interface PerpBundler {
  /**
   * TODO
   */
  call: () => Promise<FinalExecutionOutcome[] | void>;
  /**
   * TODO
   */
  custom: (creator: CustomCreator) => PerpBundler;
  /**
   * TODO
   */
  map: (fn: (cmds: PerpBundlerCmd) => PerpBundlerUnit[]) => PerpBundler;
  /**
   * Contract
   */
  /**
   * TODO
   */
  cancelOrder: (request: CancelOrderRequest, config?: CancelOrderConfig) => PerpBundler;
  /**
   * TODO
   */
  cancelOrders: (request: CancelOrdersRequest, config?: CancelOrdersConfig) => PerpBundler;
  /**
   * TODO
   */
  deposit: (request: DepositRequest, config?: DepositConfig) => PerpBundler;
  /**
   * TODO
   */
  placeAsk: (request: PlaceAskRequest, config?: PlaceAskConfig) => PerpBundler;
  /**
   * TODO
   */
  placeBid: (request: PlaceBidRequest, config?: PlaceBidConfig) => PerpBundler;
  /**
   * TODO
   */
  withdraw: (request: WithdrawRequest, config?: WithdrawConfig) => PerpBundler;
  /**
   * Native
   */
  /**
   * TODO
   */
  transferFt: (request: TransferFtRequest, config?: TransferFtConfig) => PerpBundler;
  /**
   * TODO
   */
  depositStorage: (request: DepositStorageRequest, config?: DepositStorageConfig) => PerpBundler;
}
