import {Account} from 'near-api-js';
import {TransactionManager} from 'near-transaction-manager';
import {Websocket, MethodConfig, NotifyConfig} from '@spinfi/websocket';
import {ResponsifySync, ResponsifyAsync} from '@spinfi/shared';
import {Subscription} from 'rxjs';

// Contract
import {BatchOpsRequest, BatchOpsResponse, BatchOpsConfig} from './contract/actions/batchOps';
import {
  CancelOrderRequest,
  CancelOrderResponse,
  CancelOrderConfig,
} from './contract/actions/cancelOrder';
import {
  CancelOrdersRequest,
  CancelOrdersResponse,
  CancelOrdersConfig,
} from './contract/actions/cancelOrders';
import {DepositRequest, DepositResponse, DepositConfig} from './contract/actions/deposit';
import {DepositFtRequest, DepositFtResponse, DepositFtConfig} from './contract/actions/depositFt';
import {
  DepositNearRequest,
  DepositNearResponse,
  DepositNearConfig,
} from './contract/actions/depositNear';
import {GetCurrenciesRequest, GetCurrenciesResponse} from './contract/actions/getCurrencies';
import {GetDepositsResponse} from './contract/actions/getDeposits';
import {GetMarketRequest, GetMarketResponse} from './contract/actions/getMarket';
import {GetMarketsResponse} from './contract/actions/getMarkets';
import {GetOrderRequest, GetOrderResponse} from './contract/actions/getOrder';
import {GetOrderbookRequest, GetOrderbookResponse} from './contract/actions/getOrderbook';
import {
  GetOrderbookPollRequest,
  GetOrderbookPollResponse,
  GetOrderbookPollConfig,
} from './contract/actions/getOrderbookPoll';
import {GetOrdersRequest, GetOrdersResponse} from './contract/actions/getOrders';
import {PlaceAskRequest, PlaceAskResponse, PlaceAskConfig} from './contract/actions/placeAsk';
import {PlaceBidRequest, PlaceBidResponse, PlaceBidConfig} from './contract/actions/placeBid';
import {WithdrawRequest, WithdrawResponse, WithdrawConfig} from './contract/actions/withdraw';

// Native
import {GetBalanceRequest, GetBalanceResponse} from './native/actions/getBalance';
import {GetBalanceFtRequest, GetBalanceFtResponse} from './native/actions/getBalanceFt';
import {GetBalanceNearResponse} from './native/actions/getBalanceNear';
import {
  GetBalanceStorageRequest,
  GetBalanceStorageResponse,
} from './native/actions/getBalanceStorage';
import {TransferFtRequest, TransferFtResponse, TransferFtConfig} from './native/actions/transferFt';

// Websocket
import {GetCandlesRequest, GetCandlesResponse} from './websocket/actions/getCandles';
import {
  GetOrdersHistoryRequest,
  GetOrdersHistoryResponse,
} from './websocket/actions/getOrdersHistory';
import {GetTradesRequest, GetTradesResponse} from './websocket/actions/getTrades';
import {
  ListenAccountBalancesRequest,
  AccountBalancesNotify,
  AccountBalancesState,
} from './websocket/actions/listenAccountBalances';
import {
  ListenAccountOrdersRequest,
  AccountOrdersNotify,
  AccountOrdersState,
} from './websocket/actions/listenAccountOrders';
import {
  ListenAccountTradesRequest,
  AccountTradesNotify,
} from './websocket/actions/listenAccountTrades';
import {ListenBookL1Request, BookL1Notify} from './websocket/actions/listenBookL1';
import {ListenBookL2Request, BookL2Notify} from './websocket/actions/listenBookL2';
import {ListenBookL3Request, BookL3Notify, BookL3State} from './websocket/actions/listenBookL3';
import {ListenOrdersRequest, OrdersNotify} from './websocket/actions/listenOrders';
import {ListenTradesRequest, TradesNotify} from './websocket/actions/listenTrades';
import {PingResponse} from './websocket/actions/ping';

/**
 * @category spin
 */
export interface Config {
  /**
   * Contarct ID
   */
  contractId?: string;
  /**
   * near-api-js account instance
   */
  account?: Account;
  /**
   * near-transaction-manager transaction manager instance
   */
  transactionManager?: TransactionManager;
  /**
   * @spinfi/websocket instance
   */
  websocket?: Websocket;
}

/**
 * @category spin
 */
export interface ContractConfig {
  /**
   * Contarct ID
   */
  contractId: string;
  /**
   * near-api-js account instance
   */
  account: Account;
  /**
   * near-transaction-manager transaction manager instance
   */
  transactionManager: TransactionManager;
}

/**
 * @category spin
 */
export interface NativeConfig {
  /**
   * near-api-js account instance
   */
  account: Account;
}

/**
 * @category spin
 */
export interface WebsocketConfig {
  /**
   * @spinfi/websocket instance
   */
  websocket: Websocket;
}

/**
 * @category spin
 */
export interface SpinContract {
  /**
   * Method allows you to perform many operations within a single transaction
   *
   * @example
   * ```js
   * const response = await api().spin.contract.batchOps(request);
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   *
   * if (response.type === 'OK') {
   *   console.log(response.data);
   * }
   * ```
   */
  batchOps: ResponsifyAsync<
    (request: BatchOpsRequest, config?: BatchOpsConfig) => Promise<BatchOpsResponse>
  >;
  /**
   * Cancel an order for a specified market by order ID
   *
   * @example
   * ```js
   * const response = await api().spin.contract.cancelOrder(request);
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   *
   * if (response.type === 'OK') {
   *   console.log(response.data);
   * }
   * ```
   */
  cancelOrder: ResponsifyAsync<
    (request: CancelOrderRequest, config?: CancelOrderConfig) => Promise<CancelOrderResponse>
  >;
  /**
   * Cancel all user orders for a specified market
   *
   * @example
   * ```js
   * const response = await api().spin.contract.cancelOrders(request);
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   *
   * if (response.type === 'OK') {
   *   console.log(response.data);
   * }
   * ```
   */
  cancelOrders: ResponsifyAsync<
    (request: CancelOrdersRequest, config?: CancelOrdersConfig) => Promise<CancelOrdersResponse>
  >;
  /**
   * Deposit ft and near
   *
   * @example
   * ```js
   * const response = await api().spin.contract.deposit(request);
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   *
   * if (response.type === 'OK') {
   *   console.log(response.data);
   * }
   * ```
   */
  deposit: ResponsifyAsync<
    (request: DepositRequest, config?: DepositConfig) => Promise<DepositResponse>
  >;
  /**
   * To deposit tokens to your spor account you need to call ft_transfer_call of
   * the token contract and send as a receiver
   *
   * @example
   * ```js
   * const response = await api().spin.contract.depositFt(request);
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   *
   * if (response.type === 'OK') {
   *   console.log(response.data);
   * }
   * ```
   */
  depositFt: ResponsifyAsync<
    (request: DepositFtRequest, config?: DepositFtConfig) => Promise<DepositFtResponse>
  >;
  /**
   * NEAR token is transferred by attaching them to a transaction.
   * The attached amount will be credited to the trading account.
   * To deposit Fungible Token use it's contract methods
   *
   * @example
   * ```js
   * const response = await api().spin.contract.depositNear(request);
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   *
   * if (response.type === 'OK') {
   *   console.log(response.data);
   * }
   * ```
   */
  depositNear: ResponsifyAsync<
    (request: DepositNearRequest, config?: DepositNearConfig) => Promise<DepositNearResponse>
  >;
  /**
   * Returns all currencies supported by the contract
   *
   * @example
   * ```js
   * const response = await api().spin.contract.getCurrencies(request);
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   *
   * if (response.type === 'OK') {
   *   console.log(response.data);
   * }
   * ```
   */
  getCurrencies: ResponsifyAsync<(request: GetCurrenciesRequest) => Promise<GetCurrenciesResponse>>;
  /**
   * Returns account balannces by account ID
   *
   * @example
   * ```js
   * const response = await api().spin.contract.getDeposits();
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   *
   * if (response.type === 'OK') {
   *   console.log(response.data);
   * }
   * ```
   */
  getDeposits: ResponsifyAsync<() => Promise<GetDepositsResponse>>;
  /**
   * Returns market info by ID supported by the contract
   *
   * @example
   * ```js
   * const response = await api().spin.contract.getMarket(request);
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   *
   * if (response.type === 'OK') {
   *   console.log(response.data);
   * }
   * ```
   */
  getMarket: ResponsifyAsync<(request: GetMarketRequest) => Promise<GetMarketResponse>>;
  /**
   * Returns all markets info supported by the contract
   *
   * @example
   * ```js
   * const response = await api().spin.contract.getMarkets();
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   *
   * if (response.type === 'OK') {
   *   console.log(response.data);
   * }
   * ```
   */
  getMarkets: ResponsifyAsync<() => Promise<GetMarketsResponse>>;
  /**
   * Returns the current information about order by market ID, order ID and account ID
   *
   * @example
   * ```js
   * const response = await api().spin.contract.getOrder(request);
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   *
   * if (response.type === 'OK') {
   *   console.log(response.data);
   * }
   * ```
   */
  getOrder: ResponsifyAsync<(request: GetOrderRequest) => Promise<GetOrderResponse>>;
  /**
   * Returns the order book information for a given market ID
   *
   * @example
   * ```js
   * const response = await api().spin.contract.getOrderbook(request);
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   *
   * if (response.type === 'OK') {
   *   console.log(response.data);
   * }
   * ```
   */
  getOrderbook: ResponsifyAsync<(request: GetOrderbookRequest) => Promise<GetOrderbookResponse>>;
  /**
   * Orderbook polling
   *
   * @example
   * ```js
   * const response = api().spin.contract.getOrderbookPoll(request, {
   *   onOk: (data) => console.log(data),
   *   onError: (error) => console.error(error),
   * });
   *
   * if (response.type === 'ERROR') {
   *   console.warn("Polling not started");
   * }
   *
   * if (response.type === 'OK') {
   *   response.data.stop();
   * }
   * ```
   */
  getOrderbookPoll: ResponsifySync<
    (request: GetOrderbookPollRequest, config?: GetOrderbookPollConfig) => GetOrderbookPollResponse
  >;
  /**
   * Returns a list of orders belonging to a given account on a specified market
   *
   * @example
   * ```js
   * const response = await api().spin.contract.getOrders(request);
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   *
   * if (response.type === 'OK') {
   *   console.log(response.data);
   * }
   * ```
   */
  getOrders: ResponsifyAsync<(request: GetOrdersRequest) => Promise<GetOrdersResponse>>;
  /**
   * Place ask
   *
   * @example
   * ```js
   * const response = await api().spin.contract.placeAsk(request);
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   *
   * if (response.type === 'OK') {
   *   console.log(response.data);
   * }
   * ```
   */
  placeAsk: ResponsifyAsync<
    (request: PlaceAskRequest, config?: PlaceAskConfig) => Promise<PlaceAskResponse>
  >;
  /**
   * Place bid
   *
   * @example
   * ```js
   * const response = await api().spin.contract.placeBid(request);
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   *
   * if (response.type === 'OK') {
   *   console.log(response.data);
   * }
   * ```
   */
  placeBid: ResponsifyAsync<
    (request: PlaceBidRequest, config?: PlaceBidConfig) => Promise<PlaceBidResponse>
  >;
  /**
   * Withdraws token from the trading account to the user's account
   *
   * @example
   * ```js
   * const response = await api().spin.contract.withdraw(request);
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   *
   * if (response.type === 'OK') {
   *   console.log(response.data);
   * }
   * ```
   */
  withdraw: ResponsifyAsync<
    (request: WithdrawRequest, config?: WithdrawConfig) => Promise<WithdrawResponse>
  >;
}

/**
 * @category spin
 */
export interface SpinNative {
  /**
   * Get balance
   *
   * @example
   * ```js
   * const response = await api().spin.native.getBalance(request);
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   * ```
   */
  getBalance: ResponsifyAsync<(request: GetBalanceRequest) => Promise<GetBalanceResponse>>;
  /**
   * Get balance ft
   *
   * @example
   * ```js
   * const response = await api().spin.native.getBalanceFt(request);
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   * ```
   */
  getBalanceFt: ResponsifyAsync<(request: GetBalanceFtRequest) => Promise<GetBalanceFtResponse>>;
  /**
   * Get balance near
   *
   * @example
   * ```js
   * const response = await api().spin.native.getBalanceNear();
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   * ```
   */
  getBalanceNear: ResponsifyAsync<() => Promise<GetBalanceNearResponse>>;
  /**
   * Get balance storage
   *
   * @example
   * ```js
   * const response = await api().spin.native.getBalanceStorage(request);
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   * ```
   */
  getBalanceStorage: ResponsifyAsync<
    (request: GetBalanceStorageRequest) => Promise<GetBalanceStorageResponse>
  >;
  /**
   * Transfer ft
   *
   * @example
   * ```js
   * const response = await api().spin.native.transferFt(request);
   *
   * if (response.type === 'ERROR') {
   *   console.error(response.error);
   * }
   * ```
   */
  transferFt: ResponsifyAsync<
    (request: TransferFtRequest, config?: TransferFtConfig) => Promise<TransferFtResponse>
  >;
}

/**
 * @category spin
 */
export interface SpinWebsocket {
  /**
   * Returns history of candles to use in OHLC chart
   *
   * @example
   * ```js
   * const response = api().spin.websocket.getCandles(request, {
   *   onOk: (data) => console.log(data),
   *   onError: (error) => console.error(error),
   * });
   *
   * if (response.type === 'ERROR') {
   *   console.warn('Method not sended');
   * }
   *
   * if (response.type === 'OK') {
   *   response.data.unsubscribe();
   * }
   * ```
   */
  getCandles: ResponsifySync<
    (request: GetCandlesRequest, config?: MethodConfig<GetCandlesResponse>) => Subscription
  >;
  /**
   * Returns history of orders that have been partially or fully filled, cancelled or expired
   *
   * @example
   * ```js
   * const response = api().spin.websocket.getOrdersHistory(request, {
   *   onOk: (data) => console.log(data),
   *   onError: (error) => console.error(error),
   * });
   *
   * if (response.type === 'ERROR') {
   *   console.warn('Method not sended');
   * }
   *
   * if (response.type === 'OK') {
   *   response.data.unsubscribe();
   * }
   * ```
   */
  getOrdersHistory: ResponsifySync<
    (
      request: GetOrdersHistoryRequest,
      config?: MethodConfig<GetOrdersHistoryResponse>,
    ) => Subscription
  >;
  /**
   * Returns the latest trades that have occurred for instruments in a specific market ID
   *
   * @example
   * ```js
   * const response = api().spin.websocket.getTrades(request, {
   *   onOk: (data) => console.log(data),
   *   onError: (error) => console.error(error),
   * });
   *
   * if (response.type === 'ERROR') {
   *   console.warn('Method not sended');
   * }
   *
   * if (response.type === 'OK') {
   *   response.data.unsubscribe();
   * }
   * ```
   */
  getTrades: ResponsifySync<
    (request: GetTradesRequest, config?: MethodConfig<GetTradesResponse>) => Subscription
  >;
  /**
   * Subscribes to the balance changes stream of a particular account by it's ID
   *
   * @example
   * ```js
   * const response = api().spin.websocket.listenAccountBalances(request, {
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
   * if (response.type === 'ERROR') {
   *   console.warn('Listening not established');
   * }
   *
   * if (response.type === 'OK') {
   *   response.data.unsubscribe();
   * }
   * ```
   */
  listenAccountBalances: ResponsifySync<
    (
      request: ListenAccountBalancesRequest,
      config?: NotifyConfig<AccountBalancesState, AccountBalancesNotify>,
    ) => Subscription
  >;
  /**
   * Subscribes to the all orders stream of a particular account by it's ID
   *
   * @example
   * ```js
   * const response = api().spin.websocket.listenAccountOrders(request, {
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
   * if (response.type === 'ERROR') {
   *   console.warn('Listening not established');
   * }
   *
   * if (response.type === 'OK') {
   *   response.data.unsubscribe();
   * }
   * ```
   */
  listenAccountOrders: ResponsifySync<
    (
      request: ListenAccountOrdersRequest,
      config?: NotifyConfig<AccountOrdersState, AccountOrdersNotify>,
    ) => Subscription
  >;
  /**
   * Subscribes to the trades stream of a particular account by it's ID
   *
   * @example
   * ```js
   * const response = api().spin.websocket.listenAccountTrades(request, {
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
   * if (response.type === 'ERROR') {
   *   console.warn('Listening not established');
   * }
   *
   * if (response.type === 'OK') {
   *   response.data.unsubscribe();
   * }
   * ```
   */
  listenAccountTrades: ResponsifySync<
    (
      request: ListenAccountTradesRequest,
      config?: NotifyConfig<void, AccountTradesNotify>,
    ) => Subscription
  >;
  /**
   * Subscribe to the orderbook L1 data. Notifications are sent every time when best bid or best ask were changed.
   * That changes couldn't be generated more often than block is validated and added in near blockchain,
   * but there can be be multiple changes within one block. Messages order is guaranteed
   *
   * @example
   * ```js
   * const response = api().spin.websocket.listenBookL1(request, {
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
   * if (response.type === 'ERROR') {
   *   console.warn('Listening not established');
   * }
   *
   * if (response.type === 'OK') {
   *   response.data.unsubscribe();
   * }
   * ```
   */
  listenBookL1: ResponsifySync<
    (request: ListenBookL1Request, config?: NotifyConfig<void, BookL1Notify>) => Subscription
  >;
  /**
   * Subscribe to the orderbook L2 data. L2 data consists a snapshot of the bids/asks prices and quantities with a specific depth.
   * Right now notifications are sent every 100 millisecond, but don't forget that each block in blockchain is
   * generated approximately 1 second, so the average time of this type of notification approximately 1 second too.
   * If there is no changes in orderbook notifications won't be sent.
   *
   * @example
   * ```js
   * const response = api().spin.websocket.listenBookL2(request, {
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
   * if (response.type === 'ERROR') {
   *   console.warn('Listening not established');
   * }
   *
   * if (response.type === 'OK') {
   *   response.data.unsubscribe();
   * }
   * ```
   */
  listenBookL2: ResponsifySync<
    (request: ListenBookL2Request, config?: NotifyConfig<void, BookL2Notify>) => Subscription
  >;
  /**
   * Subscribe to the orderbook L3 data. In response you receive an initial snapshot of the orderbook.
   * There is a last_change_id field that is used to validate integrity of the orderbook events sequence.
   * Each next notification will have a sequentially increasing number by 1 in the id field.
   * Each notification means absolutely quantity for a given price level. If quantity is 0,
   * it means there are no orders for a given price level.
   *
   * @example
   * ```js
   * const response = api().spin.websocket.listenBookL3(request, {
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
   * if (response.type === 'ERROR') {
   *   console.warn('Listening not established');
   * }
   *
   * if (response.type === 'OK') {
   *   response.data.unsubscribe();
   * }
   * ```
   */
  listenBookL3: ResponsifySync<
    (request: ListenBookL3Request, config?: NotifyConfig<BookL3State, BookL3Notify>) => Subscription
  >;
  /**
   * Subscribes to the all orders stream of a particular market by it's id
   *
   * @example
   * ```js
   * const response = api().spin.websocket.listenOrders(request, {
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
   * if (response.type === 'ERROR') {
   *   console.warn('Listening not established');
   * }
   *
   * if (response.type === 'OK') {
   *   response.data.unsubscribe();
   * }
   * ```
   */
  listenOrders: ResponsifySync<
    (request: ListenOrdersRequest, config?: NotifyConfig<void, OrdersNotify>) => Subscription
  >;
  /**
   * Subscribes to the trades stream of a particular market by it's id
   *
   * @example
   * ```js
   * const response = api().spin.websocket.listenTrades(request, {
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
   * if (response.type === 'ERROR') {
   *   console.warn('Listening not established');
   * }
   *
   * if (response.type === 'OK') {
   *   response.data.unsubscribe();
   * }
   * ```
   */
  listenTrades: ResponsifySync<
    (request: ListenTradesRequest, config?: NotifyConfig<void, TradesNotify>) => Subscription
  >;
  /**
   * Health check method for gateway API
   *
   * @example
   * ```js
   * const response = api().spin.websocket.ping({
   *   onOk: (data) => console.log(data),
   *   onError: (error) => console.error(error),
   * });
   *
   * if (response.type === 'ERROR') {
   *   console.warn('Method not sended');
   * }
   *
   * if (response.type === 'OK') {
   *   response.data.unsubscribe();
   * }
   * ```
   */
  ping: ResponsifySync<(config?: MethodConfig<PingResponse>) => Subscription>;
}

/**
 * @category spin
 */
export interface Spin {
  contract: SpinContract;
  native: SpinNative;
  websocket: SpinWebsocket;
}
