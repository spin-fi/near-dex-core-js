// Spin
import {Config, Spin} from './types';

// Contract
import {createAsyncContractWrapper, createSyncContractWrapper} from './contract/wrapper';
import {createGetOrderbook} from './contract/actions/getOrderbook';
import {createGetMarket} from './contract/actions/getMarket';
import {createGetCurrencies} from './contract/actions/getCurrencies';
import {createGetOrders} from './contract/actions/getOrders';
import {createGetOrder} from './contract/actions/getOrder';
import {createGetMarkets} from './contract/actions/getMarkets';
import {createGetDeposits} from './contract/actions/getDeposits';
import {createCancelOrder} from './contract/actions/cancelOrder';
import {createPlaceAsk} from './contract/actions/placeAsk';
import {createPlaceBid} from './contract/actions/placeBid';
import {createWithdraw} from './contract/actions/withdraw';
import {createCancelOrders} from './contract/actions/cancelOrders';
import {createBatchOps} from './contract/actions/batchOps';
import {createDepositNear} from './contract/actions/depositNear';
import {createDepositFt} from './contract/actions/depositFt';
import {createDeposit} from './contract/actions/deposit';
import {createGetOrderbookPoll} from './contract/actions/getOrderbookPoll';

// Native
import {createAsyncNativeWrapper} from './native/wrapper';
import {createGetBalanceStorage} from './native/actions/getBalanceStorage';
import {createGetBalanceNear} from './native/actions/getBalanceNear';
import {createGetBalance} from './native/actions/getBalance';
import {createGetBalanceFt} from './native/actions/getBalanceFt';
import {createTransferFt} from './native/actions/transferFt';

// Websocket
import {createSyncWebsocketWrapper} from './websocket/wrapper';
import {createGetCandles} from './websocket/actions/getCandles';
import {createGetOrdersHistory} from './websocket/actions/getOrdersHistory';
import {createGetTrades} from './websocket/actions/getTrades';
import {createListenAccountBalances} from './websocket/actions/listenAccountBalances';
import {createListenAccountOrders} from './websocket/actions/listenAccountOrders';
import {createListenAccountTrades} from './websocket/actions/listenAccountTrades';
import {createListenBookL1} from './websocket/actions/listenBookL1';
import {createListenBookL2} from './websocket/actions/listenBookL2';
import {createListenBookL3} from './websocket/actions/listenBookL3';
import {createListenOrders} from './websocket/actions/listenOrders';
import {createListenTrades} from './websocket/actions/listenTrades';
import {createPing} from './websocket/actions/ping';

export const createSpin = (config: Config): Spin => {
  const asyncContract = createAsyncContractWrapper(config);
  const syncContract = createSyncContractWrapper(config);
  const asyncNative = createAsyncNativeWrapper(config);
  const syncWebsocket = createSyncWebsocketWrapper(config);

  return {
    contract: {
      batchOps: asyncContract(createBatchOps),
      cancelOrder: asyncContract(createCancelOrder),
      cancelOrders: asyncContract(createCancelOrders),
      deposit: asyncContract(createDeposit),
      depositFt: asyncContract(createDepositFt),
      depositNear: asyncContract(createDepositNear),
      getCurrencies: asyncContract(createGetCurrencies),
      getDeposits: asyncContract(createGetDeposits),
      getMarket: asyncContract(createGetMarket),
      getMarkets: asyncContract(createGetMarkets),
      getOrder: asyncContract(createGetOrder),
      getOrderbook: asyncContract(createGetOrderbook),
      getOrderbookPoll: syncContract(createGetOrderbookPoll),
      getOrders: asyncContract(createGetOrders),
      placeAsk: asyncContract(createPlaceAsk),
      placeBid: asyncContract(createPlaceBid),
      withdraw: asyncContract(createWithdraw),
    },
    native: {
      getBalance: asyncNative(createGetBalance),
      getBalanceFt: asyncNative(createGetBalanceFt),
      getBalanceNear: asyncNative(createGetBalanceNear),
      getBalanceStorage: asyncNative(createGetBalanceStorage),
      transferFt: asyncNative(createTransferFt),
    },
    websocket: {
      getCandles: syncWebsocket(createGetCandles),
      getOrdersHistory: syncWebsocket(createGetOrdersHistory),
      getTrades: syncWebsocket(createGetTrades),
      listenAccountOrders: syncWebsocket(createListenAccountOrders),
      listenAccountBalances: syncWebsocket(createListenAccountBalances),
      listenAccountTrades: syncWebsocket(createListenAccountTrades),
      listenBookL1: syncWebsocket(createListenBookL1),
      listenBookL2: syncWebsocket(createListenBookL2),
      listenBookL3: syncWebsocket(createListenBookL3),
      listenOrders: syncWebsocket(createListenOrders),
      listenTrades: syncWebsocket(createListenTrades),
      ping: syncWebsocket(createPing),
    },
  };
};
