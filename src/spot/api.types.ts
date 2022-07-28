import {MethodConfig, NotifyWithStateConfig, NotifyConfig} from '@spinfi/websocket';
import {Subscription} from 'rxjs';

/**
 * Contract
 */
import {BatchOpsRequest, BatchOpsResponse, BatchOpsConfig} from './contract/batchOps';
import {CancelOrderRequest, CancelOrderResponse, CancelOrderConfig} from './contract/cancelOrder';
import {
  CancelOrdersRequest,
  CancelOrdersResponse,
  CancelOrdersConfig,
} from './contract/cancelOrders';
import {DepositRequest, DepositResponse, DepositConfig} from './contract/deposit';
import {DepositNearRequest, DepositNearResponse, DepositNearConfig} from './contract/depositNear';
import {GetCurrenciesRequest, GetCurrenciesResponse} from './contract/getCurrencies';
import {GetDepositsRequest, GetDepositsResponse} from './contract/getDeposits';
import {GetMarketRequest, GetMarketResponse} from './contract/getMarket';
import {GetMarketsResponse} from './contract/getMarkets';
import {GetOrderRequest, GetOrderResponse} from './contract/getOrder';
import {GetOrderbookRequest, GetOrderbookResponse} from './contract/getOrderbook';
import {GetOrdersRequest, GetOrdersResponse} from './contract/getOrders';
import {PlaceAskRequest, PlaceAskResponse, PlaceAskConfig} from './contract/placeAsk';
import {PlaceBidRequest, PlaceBidResponse, PlaceBidConfig} from './contract/placeBid';
import {WithdrawRequest, WithdrawResponse, WithdrawConfig} from './contract/withdraw';
import {SwapRequest, SwapResponse, SwapConfig} from './contract/swap';
import {SwapFtRequest, SwapFtResponse, SwapFtConfig} from './contract/swapFt';
import {SwapNearRequest, SwapNearResponse, SwapNearConfig} from './contract/swapNear';
import {GetDryRunSwapRequest, GetDryRunSwapResponse} from './contract/getDryRunSwap';
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
import {GetCandlesRequest, GetCandlesResponse} from './websocket/getCandles';
import {GetOrdersHistoryRequest, GetOrdersHistoryResponse} from './websocket/getOrdersHistory';
import {GetTradesRequest, GetTradesResponse} from './websocket/getTrades';
import {GetUserTradesRequest, GetUserTradesResponse} from './websocket/getUserTrades';
import {
  ListenAccountBalancesRequest,
  AccountBalancesNotify,
  AccountBalancesState,
} from './websocket/listenAccountBalances';
import {
  ListenAccountOrdersRequest,
  AccountOrdersNotify,
  AccountOrdersState,
} from './websocket/listenAccountOrders';
import {ListenAccountTradesRequest, AccountTradesNotify} from './websocket/listenAccountTrades';
import {ListenBookL1Request, BookL1Notify} from './websocket/listenBookL1';
import {ListenBookL2Request, BookL2Notify} from './websocket/listenBookL2';
import {ListenBookL3Request, BookL3Notify, BookL3State} from './websocket/listenBookL3';
import {ListenOrdersRequest, OrdersNotify} from './websocket/listenOrders';
import {ListenTradesRequest, TradesNotify} from './websocket/listenTrades';
import {PingResponse} from './websocket/ping';
/**
 * Bundler
 */
import {SpotBundler, SpotBundlerUnit} from './bundler/types';

/**
 * @category spin
 */
export interface SpotSpin {
  /**
   * Contract
   */
  /**
   * Method allows you to perform many operations within a single transaction
   *
   * @example
   * ```js
   * const response = await spin.batchOps(request);
   * ```
   */
  batchOps: (request: BatchOpsRequest, config?: BatchOpsConfig) => Promise<BatchOpsResponse>;
  /**
   * Cancel an order for a specified market by order ID
   *
   * @example
   * ```js
   * const response = await spin.cancelOrder(request);
   * ```
   */
  cancelOrder: (
    request: CancelOrderRequest,
    config?: CancelOrderConfig,
  ) => Promise<CancelOrderResponse>;
  /**
   * Cancel all user orders for a specified market
   *
   * @example
   * ```js
   * const response = await spin.cancelOrders(request);
   * ```
   */
  cancelOrders: (
    request: CancelOrdersRequest,
    config?: CancelOrdersConfig,
  ) => Promise<CancelOrdersResponse>;
  /**
   * Deposit ft and near
   *
   * @example
   * ```js
   * const response = await spin.deposit(request);
   * ```
   */
  deposit: (request: DepositRequest, config?: DepositConfig) => Promise<DepositResponse>;
  /**
   * NEAR token is transferred by attaching them to a transaction.
   * The attached amount will be credited to the trading account.
   * To deposit Fungible Token use it's contract methods
   *
   * @example
   * ```js
   * const response = await spin.depositNear(request);
   * ```
   */
  depositNear: (
    request: DepositNearRequest,
    config?: DepositNearConfig,
  ) => Promise<DepositNearResponse>;
  /**
   * Returns all currencies supported by the contract
   *
   * @example
   * ```js
   * const response = await spin.getCurrencies(request);
   * ```
   */
  getCurrencies: (request: GetCurrenciesRequest) => Promise<GetCurrenciesResponse>;
  /**
   * Returns account balannces by account ID
   *
   * @example
   * ```js
   * const response = await spin.getDeposits(request);
   * ```
   */
  getDeposits: (request: GetDepositsRequest) => Promise<GetDepositsResponse>;
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
   * Returns the current information about order by market ID, order ID and account ID
   *
   * @example
   * ```js
   * const response = await spin.getOrder(request);
   * ```
   */
  getOrder: (request: GetOrderRequest) => Promise<GetOrderResponse>;
  /**
   * Returns the order book information for a given market ID
   *
   * @example
   * ```js
   * const response = await spin.getOrderbook(request);
   * ```
   */
  getOrderbook: (request: GetOrderbookRequest) => Promise<GetOrderbookResponse>;
  /**
   * Returns a list of orders belonging to a given account on a specified market
   *
   * @example
   * ```js
   * const response = await spin.getOrders(request);
   * ```
   */
  getOrders: (request: GetOrdersRequest) => Promise<GetOrdersResponse>;
  /**
   * Place ask
   *
   * @example
   * ```js
   * const response = await spin.placeAsk(request);
   * ```
   */
  placeAsk: (request: PlaceAskRequest, config?: PlaceAskConfig) => Promise<PlaceAskResponse>;
  /**
   * Place bid
   *
   * @example
   * ```js
   * const response = await spin.placeBid(request);
   * ```
   */
  placeBid: (request: PlaceBidRequest, config?: PlaceBidConfig) => Promise<PlaceBidResponse>;
  /**
   * Withdraws token from the trading account to the user's account
   *
   * @example
   * ```js
   * const response = await spin.withdraw(request);
   * ```
   */
  withdraw: (request: WithdrawRequest, config?: WithdrawConfig) => Promise<WithdrawResponse>;
  /**
   * TODO
   */
  swap: (request: SwapRequest, config?: SwapConfig) => Promise<SwapResponse>;
  /**
   * TODO
   */
  swapFt: (request: SwapFtRequest, config?: SwapFtConfig) => Promise<SwapFtResponse>;
  /**
   * TODO
   */
  swapNear: (request: SwapNearRequest, config?: SwapNearConfig) => Promise<SwapNearResponse>;
  /**
   * TODO
   */
  getDryRunSwap: (request: GetDryRunSwapRequest) => Promise<GetDryRunSwapResponse>;
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
    config?: TransferFtConfig,
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
    config?: DepositStorageConfig,
  ) => Promise<DepositStorageResponse>;
  /**
   * Websocket
   */
  /**
   * Returns history of candles to use in OHLC chart
   *
   * @example
   * ```js
   * const unsubscribe = spin.getCandles(request, {
   *   onOk: (data) => console.log(data),
   *   onError: (error) => console.error(error),
   * });
   *
   * unsubscribe();
   * ```
   */
  getCandles: (
    request: GetCandlesRequest,
    config?: MethodConfig<GetCandlesResponse>,
  ) => Subscription;
  /**
   * Returns history of orders that have been partially or fully filled, cancelled or expired
   *
   * @example
   * ```js
   * const unsubscribe = spin.getOrdersHistory(request, {
   *   onOk: (data) => console.log(data),
   *   onError: (error) => console.error(error),
   * });
   *
   * unsubscribe();
   * ```
   */
  getOrdersHistory: (
    request: GetOrdersHistoryRequest,
    config?: MethodConfig<GetOrdersHistoryResponse>,
  ) => Subscription;
  /**
   * Returns the latest trades that have occurred for instruments in a specific market ID
   *
   * @example
   * ```js
   * const unsubscribe = spin.getTrades(request, {
   *   onOk: (data) => console.log(data),
   *   onError: (error) => console.error(error),
   * });
   *
   * unsubscribe();
   * ```
   */
  getTrades: (request: GetTradesRequest, config?: MethodConfig<GetTradesResponse>) => Subscription;
  /**
   * Returns the latest trades of a specific user
   *
   * @example
   * ```js
   * const unsubscribe = spin.getUserTrades(request, {
   *   onOk: (data) => console.log(data),
   *   onError: (error) => console.error(error),
   * });
   *
   * unsubscribe();
   * ```
   */
  getUserTrades: (
    request: GetUserTradesRequest,
    config?: MethodConfig<GetUserTradesResponse>,
  ) => Subscription;
  /**
   * Subscribes to the balance changes stream of a particular account by it's ID
   *
   * @example
   * ```js
   * const unsubscribe = spin.listenAccountBalances(request, {
   *   onNotifyOk: (data) => console.log(data),
   *   onStateOk: (data) => console.log(data),
   *   onSubOk: (data) => console.log(data),
   *   onUnsubOk: (data) => console.log(data),
   *   onSubError: (error) => console.error(error),
   *   onUnsubError: (error) => console.error(error),
   *   onNotifyError: (error) => console.error(error),
   *   onStateError: (error) => console.error(error),
   * });
   *
   * unsubscribe();
   * ```
   */
  listenAccountBalances: (
    request: ListenAccountBalancesRequest,
    config?: NotifyWithStateConfig<AccountBalancesState, AccountBalancesNotify>,
  ) => Subscription;
  /**
   * Subscribes to the all orders stream of a particular account by it's ID
   *
   * @example
   * ```js
   * const unsubscribe = spin.listenAccountOrders(request, {
   *   onNotifyOk: (data) => console.log(data),
   *   onStateOk: (data) => console.log(data),
   *   onSubOk: (data) => console.log(data),
   *   onUnsubOk: (data) => console.log(data),
   *   onSubError: (error) => console.error(error),
   *   onUnsubError: (error) => console.error(error),
   *   onNotifyError: (error) => console.error(error),
   *   onStateError: (error) => console.error(error),
   * });
   *
   * unsubscribe();
   * ```
   */
  listenAccountOrders: (
    request: ListenAccountOrdersRequest,
    config?: NotifyWithStateConfig<AccountOrdersState, AccountOrdersNotify>,
  ) => Subscription;
  /**
   * Subscribes to the trades stream of a particular account by it's ID
   *
   * @example
   * ```js
   * const unsubscribe = spin.listenAccountTrades(request, {
   *   onNotifyOk: (data) => console.log(data),
   *   onSubOk: (data) => console.log(data),
   *   onUnsubOk: (data) => console.log(data),
   *   onSubError: (error) => console.error(error),
   *   onUnsubError: (error) => console.error(error),
   *   onNotifyError: (error) => console.error(error),
   * });
   *
   * unsubscribe();
   * ```
   */
  listenAccountTrades: (
    request: ListenAccountTradesRequest,
    config?: NotifyConfig<AccountTradesNotify>,
  ) => Subscription;
  /**
   * Subscribe to the orderbook L1 data. Notifications are sent every time when best bid or best ask were changed.
   * That changes couldn't be generated more often than block is validated and added in near blockchain,
   * but there can be be multiple changes within one block. Messages order is guaranteed
   *
   * @example
   * ```js
   * const unsubscribe = spin.listenBookL1(request, {
   *   onNotifyOk: (data) => console.log(data),
   *   onSubOk: (data) => console.log(data),
   *   onUnsubOk: (data) => console.log(data),
   *   onSubError: (error) => console.error(error),
   *   onUnsubError: (error) => console.error(error),
   *   onNotifyError: (error) => console.error(error),
   * });
   *
   * unsubscribe();
   * ```
   */
  listenBookL1: (request: ListenBookL1Request, config?: NotifyConfig<BookL1Notify>) => Subscription;
  /**
   * Subscribe to the orderbook L2 data. L2 data consists a snapshot of the bids/asks prices and quantities with a specific depth.
   * Right now notifications are sent every 100 millisecond, but don't forget that each block in blockchain is
   * generated approximately 1 second, so the average time of this type of notification approximately 1 second too.
   * If there is no changes in orderbook notifications won't be sent.
   *
   * @example
   * ```js
   * const unsubscribe = spin.listenBookL2(request, {
   *   onNotifyOk: (data) => console.log(data),
   *   onSubOk: (data) => console.log(data),
   *   onUnsubOk: (data) => console.log(data),
   *   onSubError: (error) => console.error(error),
   *   onUnsubError: (error) => console.error(error),
   *   onNotifyError: (error) => console.error(error),
   * });
   *
   * unsubscribe();
   * ```
   */
  listenBookL2: (request: ListenBookL2Request, config?: NotifyConfig<BookL2Notify>) => Subscription;
  /**
   * Subscribe to the orderbook L3 data. In response you receive an initial snapshot of the orderbook.
   * There is a last_change_id field that is used to validate integrity of the orderbook events sequence.
   * Each next notification will have a sequentially increasing number by 1 in the id field.
   * Each notification means absolutely quantity for a given price level. If quantity is 0,
   * it means there are no orders for a given price level.
   *
   * @example
   * ```js
   * const unsubscribe = spin.listenBookL3(request, {
   *   onNotifyOk: (data) => console.log(data),
   *   onStateOk: (data) => console.log(data),
   *   onSubOk: (data) => console.log(data),
   *   onUnsubOk: (data) => console.log(data),
   *   onSubError: (error) => console.error(error),
   *   onUnsubError: (error) => console.error(error),
   *   onNotifyError: (error) => console.error(error),
   *   onStateError: (error) => console.error(error),
   * });
   *
   * unsubscribe();
   * ```
   */
  listenBookL3: (
    request: ListenBookL3Request,
    config?: NotifyWithStateConfig<BookL3State, BookL3Notify>,
  ) => Subscription;
  /**
   * Subscribes to the all orders stream of a particular market by it's id
   *
   * @example
   * ```js
   * const unsubscribe = spin.listenOrders(request, {
   *   onNotifyOk: (data) => console.log(data),
   *   onSubOk: (data) => console.log(data),
   *   onUnsubOk: (data) => console.log(data),
   *   onSubError: (error) => console.error(error),
   *   onUnsubError: (error) => console.error(error),
   *   onNotifyError: (error) => console.error(error),
   * });
   *
   * unsubscribe();
   * ```
   */
  listenOrders: (request: ListenOrdersRequest, config?: NotifyConfig<OrdersNotify>) => Subscription;
  /**
   * Subscribes to the trades stream of a particular market by it's id
   *
   * @example
   * ```js
   * const unsubscribe = spin.listenTrades(request, {
   *   onNotifyOk: (data) => console.log(data),
   *   onSubOk: (data) => console.log(data),
   *   onUnsubOk: (data) => console.log(data),
   *   onSubError: (error) => console.error(error),
   *   onUnsubError: (error) => console.error(error),
   *   onNotifyError: (error) => console.error(error),
   * });
   *
   * unsubscribe();
   * ```
   */
  listenTrades: (request: ListenTradesRequest, config?: NotifyConfig<TradesNotify>) => Subscription;
  /**
   * Health check method for gateway API
   *
   * @example
   * ```js
   * const unsubscribe = spin.ping(undefined, {
   *   onOk: (data) => console.log(data),
   *   onError: (error) => console.error(error),
   * });
   *
   * unsubscribe();
   * ```
   */
  ping: (request: void, config?: MethodConfig<PingResponse>) => Subscription;
  /**
   * Bundler
   */
  bundle: (units?: SpotBundlerUnit[]) => SpotBundler;
}
