/**
 * Spin
 */
import {PerpSpin} from './api.types';
import {CoreConfig} from '../types';
/**
 * Contract
 */
import {getMarket} from './contract/getMarket';
import {getMarkets} from './contract/getMarkets';
import {getOrderbook} from './contract/getOrderbook';
import {placeAsk} from './contract/placeAsk';
import {placeBid} from './contract/placeBid';
import {getBaseCurrency} from './contract/getBaseCurrency';
import {getBalances} from './contract/getBalances';
import {getFundingInfo} from './contract/getFundingInfo';
import {getPositions} from './contract/getPositions';
import {withdraw} from './contract/withdraw';
import {deposit} from './contract/deposit';
import {getOrder} from './contract/getOrder';
import {getOrders} from './contract/getOrders';
import {cancelOrder} from './contract/cancelOrder';
import {cancelOrders} from './contract/cancelOrders';
import {getMarketPrices} from './contract/getMarketPrices';
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
import {listenBookL1} from './websocket/listenBookL1';
import {listenBookL2} from './websocket/listenBookL2';
import {listenBookL3} from './websocket/listenBookL3';
import {listenTrades} from './websocket/listenTrades';
import {listenAccountTrades} from './websocket/listenAccountTrades';
import {getTrades} from './websocket/getTrades';
import {getUserTrades} from './websocket/getUserTrades';
import {listenAccountOrders} from './websocket/listenAccountOrders';
import {getOrdersHistory} from './websocket/getOrdersHistory';
/**
 * Bundler
 */
import {createPerpBundler} from './bundler/bundler';

export const createPerpSpin = (config: CoreConfig): PerpSpin => {
  return {
    /**
     * Contract
     */
    getMarket: getMarket.createMethod(config),
    getMarkets: getMarkets.createMethod(config),
    getOrderbook: getOrderbook.createMethod(config),
    placeAsk: placeAsk.createMethod(config),
    placeBid: placeBid.createMethod(config),
    getBaseCurrency: getBaseCurrency.createMethod(config),
    getBalances: getBalances.createMethod(config),
    getFundingInfo: getFundingInfo.createMethod(config),
    getPositions: getPositions.createMethod(config),
    withdraw: withdraw.createMethod(config),
    deposit: deposit.createMethod(config),
    getOrder: getOrder.createMethod(config),
    getOrders: getOrders.createMethod(config),
    cancelOrder: cancelOrder.createMethod(config),
    cancelOrders: cancelOrders.createMethod(config),
    getMarketPrices: getMarketPrices.createMethod(config),
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
    listenBookL1: listenBookL1.createMethod(config),
    listenBookL2: listenBookL2.createMethod(config),
    listenBookL3: listenBookL3.createMethod(config),
    listenTrades: listenTrades.createMethod(config),
    listenAccountTrades: listenAccountTrades.createMethod(config),
    getTrades: getTrades.createMethod(config),
    getUserTrades: getUserTrades.createMethod(config),
    listenAccountOrders: listenAccountOrders.createMethod(config),
    getOrdersHistory: getOrdersHistory.createMethod(config),
    /**
     * Bundler
     */
    bundle: createPerpBundler(config),
  };
};
