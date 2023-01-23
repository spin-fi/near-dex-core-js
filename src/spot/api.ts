/**
 * Spin
 */
import {SpotSpin} from './api.types';
import {CoreConfig} from '../types';
/**
 * Contract
 */
import {getOrderbook} from './contract/getOrderbook';
import {getMarket} from './contract/getMarket';
import {getCurrencies} from './contract/getCurrencies';
import {getOrders} from './contract/getOrders';
import {getOrder} from './contract/getOrder';
import {getMarkets} from './contract/getMarkets';
import {getDeposits} from './contract/getDeposits';
import {cancelOrder} from './contract/cancelOrder';
import {placeAsk} from './contract/placeAsk';
import {placeBid} from './contract/placeBid';
import {withdraw} from './contract/withdraw';
import {cancelOrders} from './contract/cancelOrders';
import {batchOps} from './contract/batchOps';
import {depositNear} from './contract/depositNear';
import {deposit} from './contract/deposit';
import {swap} from './contract/swap';
import {swapFt} from './contract/swapFt';
import {swapNear} from './contract/swapNear';
import {getDryRunSwap} from './contract/getDryRunSwap';
/**
 * Native
 */
import {getBalanceStorage} from '../native/getBalanceStorage';
import {getBalanceNear} from '../native/getBalanceNear';
import {getBalance} from '../native/getBalance';
import {getBalanceFt} from '../native/getBalanceFt';
import {transferFt} from '../native/transferFt';
import {getTransactionStatus} from '../native/getTransactionStatus';
import {getBalanceStorageBounds} from '../native/getBalanceStorageBounds';
import {depositStorage} from '../native/depositStorage';
/**
 * Websocket
 */
import {getCandles} from './websocket/getCandles';
import {getOrdersHistory} from './websocket/getOrdersHistory';
import {getTrades} from './websocket/getTrades';
import {getUserTrades} from './websocket/getUserTrades';
import {listenAccountBalances} from './websocket/listenAccountBalances';
import {listenAccountOrders} from './websocket/listenAccountOrders';
import {listenAccountTrades} from './websocket/listenAccountTrades';
import {listenBookL1} from './websocket/listenBookL1';
import {listenBookL2} from './websocket/listenBookL2';
import {listenBookL3} from './websocket/listenBookL3';
import {listenOrders} from './websocket/listenOrders';
import {listenTrades} from './websocket/listenTrades';
/**
 * Bundler
 */
import {createSpotBundler} from './bundler/bundler';

export const createSpotSpin = (config: CoreConfig): SpotSpin => {
  return {
    /**
     * Contract
     */
    batchOps: batchOps.createMethod(config),
    cancelOrder: cancelOrder.createMethod(config),
    cancelOrders: cancelOrders.createMethod(config),
    deposit: deposit.createMethod(config),
    depositNear: depositNear.createMethod(config),
    getCurrencies: getCurrencies.createMethod(config),
    getDeposits: getDeposits.createMethod(config),
    getMarket: getMarket.createMethod(config),
    getMarkets: getMarkets.createMethod(config),
    getOrder: getOrder.createMethod(config),
    getOrderbook: getOrderbook.createMethod(config),
    getOrders: getOrders.createMethod(config),
    placeAsk: placeAsk.createMethod(config),
    placeBid: placeBid.createMethod(config),
    withdraw: withdraw.createMethod(config),
    swap: swap.createMethod(config),
    swapFt: swapFt.createMethod(config),
    swapNear: swapNear.createMethod(config),
    getDryRunSwap: getDryRunSwap.createMethod(config),
    /**
     * Native
     */
    getBalance: getBalance.createMethod(config),
    getBalanceFt: getBalanceFt.createMethod(config),
    getBalanceNear: getBalanceNear.createMethod(config),
    getBalanceStorage: getBalanceStorage.createMethod(config),
    transferFt: transferFt.createMethod(config),
    getTransactionStatus: getTransactionStatus.createMethod(config),
    getBalanceStorageBounds: getBalanceStorageBounds.createMethod(config),
    depositStorage: depositStorage.createMethod(config),
    /**
     * Websocket
     */
    getCandles: getCandles.createMethod(config),
    getOrdersHistory: getOrdersHistory.createMethod(config),
    getTrades: getTrades.createMethod(config),
    getUserTrades: getUserTrades.createMethod(config),
    listenAccountOrders: listenAccountOrders.createMethod(config),
    listenAccountBalances: listenAccountBalances.createMethod(config),
    listenAccountTrades: listenAccountTrades.createMethod(config),
    listenBookL1: listenBookL1.createMethod(config),
    listenBookL2: listenBookL2.createMethod(config),
    listenBookL3: listenBookL3.createMethod(config),
    listenOrders: listenOrders.createMethod(config),
    listenTrades: listenTrades.createMethod(config),
    /**
     * Bundler
     */
    bundle: createSpotBundler(config),
  };
};
