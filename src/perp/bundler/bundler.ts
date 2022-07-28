import {invariant, guardNotUndefined} from '@spinfi/shared';

/**
 * Spin
 */
import {PerpBundler, PerpBundlerUnit} from './types';
import {Config} from '../../types';
import {selectorErrorMessage, contractIdErrorMessage} from './messages';
/**
 * Contract
 */
import {cancelOrder} from '../contract/cancelOrder';
import {cancelOrders} from '../contract/cancelOrders';
import {deposit} from '../contract/deposit';
import {placeAsk} from '../contract/placeAsk';
import {placeBid} from '../contract/placeBid';
import {withdraw} from '../contract/withdraw';
/**
 * Native
 */
import {transferFt} from '../../native/transferFt';
import {depositStorage} from '../../native/depositStorage';

export const createPerpBundler = (config: Config) => {
  /**
   * Contract
   */
  const getCancelOrderParams = cancelOrder.createGetParams(config);
  const getCancelOrdersParams = cancelOrders.createGetParams(config);
  const getDepositParams = deposit.createGetParams(config);
  const getPlaceAskParams = placeAsk.createGetParams(config);
  const getPlaceBidParams = placeBid.createGetParams(config);
  const getWithdrawParams = withdraw.createGetParams(config);
  /**
   * Native
   */
  const getTransferFtParams = transferFt.createGetParams(config);
  const getDepositStorageParams = depositStorage.createGetParams(config);

  const bundler = (untis: PerpBundlerUnit[] = []): PerpBundler => {
    return {
      call: async () => {
        invariant(config.selector, selectorErrorMessage());
        invariant(config.contractId, contractIdErrorMessage());

        const wallet = await config.selector.wallet();
        const params = await Promise.all(untis.map((unit) => unit()));

        return await wallet.signAndSendTransactions({
          transactions: params.filter(guardNotUndefined).map((param) => {
            return {
              ...param,
              receiverId: param.receiverId ?? config.contractId ?? '',
            };
          }),
        });
      },
      /**
       * Contract
       */
      cancelOrder: (...args) => {
        return bundler([
          ...untis,
          () => {
            return getCancelOrderParams(...args);
          },
        ]);
      },
      cancelOrders: (...args) => {
        return bundler([
          ...untis,
          () => {
            return getCancelOrdersParams(...args);
          },
        ]);
      },
      deposit: (...args) => {
        return bundler([
          ...untis,
          () => {
            return getDepositParams(...args);
          },
        ]);
      },
      placeAsk: (...args) => {
        return bundler([
          ...untis,
          () => {
            return getPlaceAskParams(...args);
          },
        ]);
      },
      placeBid: (...args) => {
        return bundler([
          ...untis,
          () => {
            return getPlaceBidParams(...args);
          },
        ]);
      },
      withdraw: (...args) => {
        return bundler([
          ...untis,
          () => {
            return getWithdrawParams(...args);
          },
        ]);
      },
      /**
       * Native
       */
      transferFt: (...args) => {
        return bundler([
          ...untis,
          () => {
            return getTransferFtParams(...args);
          },
        ]);
      },
      depositStorage: (...args) => {
        return bundler([
          ...untis,
          () => {
            return getDepositStorageParams(...args);
          },
        ]);
      },
    };
  };

  return bundler;
};
