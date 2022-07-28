import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

/**
 * Spin
 */
import {CoreParams} from '../../../types/selector';
/**
 * Contract
 */
import type {BatchOpsRequest, BatchOpsConfig} from '../../contract/batchOps';
import type {CancelOrderRequest, CancelOrderConfig} from '../../contract/cancelOrder';
import type {CancelOrdersRequest, CancelOrdersConfig} from '../../contract/cancelOrders';
import type {DepositRequest, DepositConfig} from '../../contract/deposit';
import type {DepositNearRequest, DepositNearConfig} from '../../contract/depositNear';
import type {PlaceAskRequest, PlaceAskConfig} from '../../contract/placeAsk';
import type {PlaceBidRequest, PlaceBidConfig} from '../../contract/placeBid';
import type {SwapRequest, SwapConfig} from '../../contract/swap';
import type {SwapFtRequest, SwapFtConfig} from '../../contract/swapFt';
import type {SwapNearRequest, SwapNearConfig} from '../../contract/swapNear';
import type {WithdrawRequest, WithdrawConfig} from '../../contract/withdraw';
/**
 * Native
 */
import {TransferFtRequest, TransferFtConfig} from '../../../native/transferFt';
import {DepositStorageRequest, DepositStorageConfig} from '../../../native/depositStorage';

export interface SpotBundler {
  /**
   * TODO
   */
  call: () => Promise<FinalExecutionOutcome[] | void>;
  /**
   * Contract
   */
  /**
   * TODO
   */
  batchOps: (request: BatchOpsRequest, config?: BatchOpsConfig) => SpotBundler;
  /**
   * TODO
   */
  cancelOrder: (request: CancelOrderRequest, config?: CancelOrderConfig) => SpotBundler;
  /**
   * TODO
   */
  cancelOrders: (request: CancelOrdersRequest, config?: CancelOrdersConfig) => SpotBundler;
  /**
   * TODO
   */
  deposit: (request: DepositRequest, config?: DepositConfig) => SpotBundler;
  /**
   * TODO
   */
  depositNear: (request: DepositNearRequest, config?: DepositNearConfig) => SpotBundler;
  /**
   * TODO
   */
  placeAsk: (request: PlaceAskRequest, config?: PlaceAskConfig) => SpotBundler;
  /**
   * TODO
   */
  placeBid: (request: PlaceBidRequest, config?: PlaceBidConfig) => SpotBundler;
  /**
   * TODO
   */
  swap: (request: SwapRequest, config?: SwapConfig) => SpotBundler;
  /**
   * TODO
   */
  swapFt: (request: SwapFtRequest, config?: SwapFtConfig) => SpotBundler;
  /**
   * TODO
   */
  swapNear: (request: SwapNearRequest, config?: SwapNearConfig) => SpotBundler;
  /**
   * TODO
   */
  withdraw: (request: WithdrawRequest, config?: WithdrawConfig) => SpotBundler;
  /**
   * Native
   */
  /**
   * TODO
   */
  transferFt: (request: TransferFtRequest, config?: TransferFtConfig) => SpotBundler;
  /**
   * TODO
   */
  depositStorage: (request: DepositStorageRequest, config?: DepositStorageConfig) => SpotBundler;
}

export type SpotBundlerUnit = () => Promise<CoreParams | undefined>;
