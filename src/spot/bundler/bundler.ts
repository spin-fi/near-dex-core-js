import {invariant, guardNotUndefined} from '@spinfi/shared';

/**
 * Spin
 */
import {SpotBundler, SpotBundlerUnit} from './types';
import {CoreConfig} from '../../types';
import {selectorErrorMessage, contractIdErrorMessage} from './messages';
/**
 * Contract
 */
import {batchOps} from '../contract/batchOps';
import {cancelOrder} from '../contract/cancelOrder';
import {cancelOrders} from '../contract/cancelOrders';
import {deposit} from '../contract/deposit';
import {depositNear} from '../contract/depositNear';
import {placeAsk} from '../contract/placeAsk';
import {placeBid} from '../contract/placeBid';
import {swap} from '../contract/swap';
import {swapFt} from '../contract/swapFt';
import {swapNear} from '../contract/swapNear';
import {withdraw} from '../contract/withdraw';
/**
 * Native
 */
import {transferFt} from '../../native/transferFt';
import {depositStorage} from '../../native/depositStorage';

export const createSpotBundler = (config: CoreConfig) => {
  /**
   * Contract
   */
  const getBatchOpsParams = batchOps.createGetParams(config);
  const getCancelOrderParams = cancelOrder.createGetParams(config);
  const getCancelOrdersParams = cancelOrders.createGetParams(config);
  const getDepositParams = deposit.createGetParams(config);
  const getDepositNearParams = depositNear.createGetParams(config);
  const getPlaceAskParams = placeAsk.createGetParams(config);
  const getPlaceBidParams = placeBid.createGetParams(config);
  const getSwapParams = swap.createGetParams(config);
  const getSwapFtParams = swapFt.createGetParams(config);
  const getSwapNearParams = swapNear.createGetParams(config);
  const getWithdrawParams = withdraw.createGetParams(config);
  /**
   * Native
   */
  const getTransferFtParams = transferFt.createGetParams(config);
  const getDepositStorageParams = depositStorage.createGetParams(config);

  const bundler = (untis: SpotBundlerUnit[] = []): SpotBundler => {
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
      custom: (creator) => {
        return bundler([...untis, creator()]);
      },
      /**
       * Contract
       */
      batchOps: (...args) => {
        return bundler([
          ...untis,
          () => {
            return getBatchOpsParams(...args);
          },
        ]);
      },
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
      depositNear: (...args) => {
        return bundler([
          ...untis,
          () => {
            return getDepositNearParams(...args);
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
      swap: (...args) => {
        return bundler([
          ...untis,
          () => {
            return getSwapParams(...args);
          },
        ]);
      },
      swapFt: (...args) => {
        return bundler([
          ...untis,
          () => {
            return getSwapFtParams(...args);
          },
        ]);
      },
      swapNear: (...args) => {
        return bundler([
          ...untis,
          () => {
            return getSwapNearParams(...args);
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
