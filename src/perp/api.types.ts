import {NotifyWithStateConfig, MethodConfig, NotifyConfig} from '@spinfi/websocket';
import {Subscription} from 'rxjs';

/**
 * Contract
 */
import {GetMarketRequest, GetMarketResponse} from './contract/getMarket';
import {GetMarketsResponse} from './contract/getMarkets';
import {GetOrderbookRequest, GetOrderbookResponse} from './contract/getOrderbook';
import {PlaceAskRequest, PlaceAskResponse, PlaceAskConfig} from './contract/placeAsk';
import {PlaceBidRequest, PlaceBidResponse, PlaceBidConfig} from './contract/placeBid';
import {GetBaseCurrencyResponse} from './contract/getBaseCurrency';
import {GetBalancesRequest, GetBalancesResponse} from './contract/getBalances';
import {GetFundingInfoRequest, GetFundingInfoResponse} from './contract/getFundingInfo';
import {GetPositionsRequest, GetPositionsResponse} from './contract/getPositions';
import {WithdrawRequest, WithdrawResponse, WithdrawConfig} from './contract/withdraw';
import {DepositRequest, DepositResponse, DepositConfig} from './contract/deposit';
import {GetOrderRequest, GetOrderResponse} from './contract/getOrder';
import {GetOrdersRequest, GetOrdersResponse} from './contract/getOrders';
import {CancelOrderRequest, CancelOrderResponse, CancelOrderConfig} from './contract/cancelOrder';
import {
  CancelOrdersRequest,
  CancelOrdersResponse,
  CancelOrdersConfig,
} from './contract/cancelOrders';
import {GetMarketPricesResponse} from './contract/getMarketPrices';
/**
 * Native
 */
import {GetBalanceRequest, GetBalanceResponse} from '../native/getBalance';
import {GetBalanceFtRequest, GetBalanceFtResponse} from '../native/getBalanceFt';
import {GetBalanceNearRequest, GetBalanceNearResponse} from '../native/getBalanceNear';
import {GetBalanceStorageRequest, GetBalanceStorageResponse} from '../native/getBalanceStorage';
import {TransferFtRequest, TransferFtResponse, TransferFtConfig} from '../native/transferFt';
import {
  GetTransactionStatusRequest,
  GetTransactionStatusResponse,
} from '../native/getTransactionStatus';
import {
  GetBalanceStorageBoundsRequest,
  GetBalanceStorageBoundsResponse,
} from '../native/getBalanceStorageBounds';
import {
  DepositStorageRequest,
  DepositStorageResponse,
  DepositStorageConfig,
} from '../native/depositStorage';
/**
 * Websocket
 */
import {ListenBookL1Request, BookL1Notify} from './websocket/listenBookL1';
import {ListenBookL2Request, BookL2Notify} from './websocket/listenBookL2';
import {ListenBookL3Request, BookL3State, BookL3Notify} from './websocket/listenBookL3';
import {ListenTradesRequest, TradesNotify} from './websocket/listenTrades';
import {ListenAccountTradesRequest, AccountTradesNotify} from './websocket/listenAccountTrades';
import {GetTradesRequest, GetTradesResponse} from './websocket/getTrades';
import {GetUserTradesRequest, GetUserTradesResponse} from './websocket/getUserTrades';
import {
  ListenAccountOrdersRequest,
  AccountOrdersNotify,
  AccountOrdersState,
} from './websocket/listenAccountOrders';
import {GetOrdersHistoryRequest, GetOrdersHistoryResponse} from './websocket/getOrdersHistory';
/**
 * Bundler
 */
import {PerpBundler, PerpBundlerUnit} from './bundler/types';

/**
 * @category spin
 */
export interface PerpSpin {
  /**
   * Contract
   */
  /**
   * Returns market info by ID supported by the contract
   *
   * @example
   * ```js
   * const response = await spin.getMarket(request);
   * ```
   */
  getMarket: (request: GetMarketRequest) => Promise<GetMarketResponse>;
  /**
   * Returns all markets info supported by the contract
   *
   * @example
   * ```js
   * const response = await spin.getMarkets();
   * ```
   */
  getMarkets: () => Promise<GetMarketsResponse>;
  /**
   * TODO
   */
  getOrderbook: (request: GetOrderbookRequest) => Promise<GetOrderbookResponse>;
  /**
   * TODO
   */
  placeAsk: (request: PlaceAskRequest, unitConfig?: PlaceAskConfig) => Promise<PlaceAskResponse>;
  /**
   * TODO
   */
  placeBid: (request: PlaceBidRequest, unitConfig?: PlaceBidConfig) => Promise<PlaceBidResponse>;
  /**
   * TODO
   */
  getBaseCurrency: () => Promise<GetBaseCurrencyResponse>;
  /**
   * TODO
   */
  getBalances: (request: GetBalancesRequest) => Promise<GetBalancesResponse>;
  /**
   * TODO
   */
  getFundingInfo: (request: GetFundingInfoRequest) => Promise<GetFundingInfoResponse>;
  /**
   * TODO
   */
  getPositions: (request: GetPositionsRequest) => Promise<GetPositionsResponse>;
  /**
   * TODO
   */
  withdraw: (request: WithdrawRequest, unitConfig?: WithdrawConfig) => Promise<WithdrawResponse>;
  /**
   * TODO
   */
  deposit: (request: DepositRequest, unitConfig?: DepositConfig) => Promise<DepositResponse>;
  /**
   * TODO
   */
  getOrder: (request: GetOrderRequest) => Promise<GetOrderResponse>;
  /**
   * TODO
   */
  getOrders: (request: GetOrdersRequest) => Promise<GetOrdersResponse>;
  /**
   * TODO
   */
  cancelOrder: (
    request: CancelOrderRequest,
    unitConfig?: CancelOrderConfig,
  ) => Promise<CancelOrderResponse>;
  /**
   * TODO
   */
  cancelOrders: (
    request: CancelOrdersRequest,
    unitConfig?: CancelOrdersConfig,
  ) => Promise<CancelOrdersResponse>;
  /**
   * TODO
   */
  getMarketPrices: () => Promise<GetMarketPricesResponse>;
  /**
   * Native
   */
  /**
   * Get balance
   *
   * @example
   * ```js
   * const response = await spin.getBalance(request);
   * ```
   */
  getBalance: (request: GetBalanceRequest) => Promise<GetBalanceResponse>;
  /**
   * Get balance ft
   *
   * @example
   * ```js
   * const response = await spin.getBalanceFt(request);
   * ```
   */
  getBalanceFt: (request: GetBalanceFtRequest) => Promise<GetBalanceFtResponse>;
  /**
   * Get balance near
   *
   * @example
   * ```js
   * const response = await spin.getBalanceNear(request);
   * ```
   */
  getBalanceNear: (request: GetBalanceNearRequest) => Promise<GetBalanceNearResponse>;
  /**
   * Get balance storage
   *
   * @example
   * ```js
   * const response = await spin.getBalanceStorage(request);
   * ```
   */
  getBalanceStorage: (request: GetBalanceStorageRequest) => Promise<GetBalanceStorageResponse>;
  /**
   * Transfer ft
   *
   * @example
   * ```js
   * const response = await spin.transferFt(request);
   * ```
   */
  transferFt: (
    request: TransferFtRequest,
    unitConfig?: TransferFtConfig,
  ) => Promise<TransferFtResponse>;
  /**
   * TODO
   */
  getTransactionStatus: (
    request: GetTransactionStatusRequest,
  ) => Promise<GetTransactionStatusResponse>;
  /**
   * TODO
   */
  getBalanceStorageBounds: (
    request: GetBalanceStorageBoundsRequest,
  ) => Promise<GetBalanceStorageBoundsResponse>;
  /**
   * TODO
   */
  depositStorage: (
    request: DepositStorageRequest,
    unitConfig?: DepositStorageConfig,
  ) => Promise<DepositStorageResponse>;
  /**
   * Websocket
   */
  /**
   * TODO
   */
  listenBookL1: (request: ListenBookL1Request, config?: NotifyConfig<BookL1Notify>) => Subscription;
  /**
   * TODO
   */
  listenBookL2: (request: ListenBookL2Request, config?: NotifyConfig<BookL2Notify>) => Subscription;
  /**
   * TODO
   */
  listenBookL3: (
    request: ListenBookL3Request,
    config?: NotifyWithStateConfig<BookL3State, BookL3Notify>,
  ) => Subscription;
  /**
   * TODO
   */
  listenTrades: (request: ListenTradesRequest, config?: NotifyConfig<TradesNotify>) => Subscription;
  /**
   * TODO
   */
  listenAccountTrades: (
    request: ListenAccountTradesRequest,
    config?: NotifyConfig<AccountTradesNotify>,
  ) => Subscription;
  /**
   * TODO
   */
  getTrades: (request: GetTradesRequest, config?: MethodConfig<GetTradesResponse>) => Subscription;
  /**
   * TODO
   */
  getUserTrades: (
    request: GetUserTradesRequest,
    config?: MethodConfig<GetUserTradesResponse>,
  ) => Subscription;
  /**
   * TODO
   */
  listenAccountOrders: (
    request: ListenAccountOrdersRequest,
    config?: NotifyWithStateConfig<AccountOrdersState, AccountOrdersNotify>,
  ) => Subscription;
  /**
   * TODO
   */
  getOrdersHistory: (
    request: GetOrdersHistoryRequest,
    config?: MethodConfig<GetOrdersHistoryResponse>,
  ) => Subscription;
  /**
   * Bundler
   */
  bundle: (units?: PerpBundlerUnit[]) => PerpBundler;
}
