import {invariant, guardNotUndefined} from '@spinfi/shared';

/**
 * Spin
 */
import {VaultsBundler, VaultsBundlerUnit} from './types';
import {CoreConfig} from '../../types';
import {selectorErrorMessage, contractIdErrorMessage} from './messages';
/**
 * Vaults
 */
import {vaultsCancelDeposit} from '../vaults/vaultsCancelDeposit';
import {vaultsCancelWithdraw} from '../vaults/vaultsCancelWithdraw';
import {vaultsDeposit} from '../vaults/vaultsDeposit';
import {vaultsWithdraw} from '../vaults/vaultsWithdraw';
import {vaultsTakeout} from '../vaults/vaultsTakeout';
/**
 * Storage
 */
import {storageDeposit} from '../storage/storageDeposit';
/**
 * Auction
 */
import {auctionDeposit} from '../auction/auctionDeposit';
import {auctionPlaceBid} from '../auction/auctionPlaceBid';
import {auctionCancelOrder} from '../auction/auctionCancelOrder';
import {auctionWithdraw} from '../auction/auctionWithdraw';
/**
 * Oft
 */
import {oftExecute} from '../oft/oftExecute';
import {oftWithdraw} from '../oft/oftWithdraw';
/**
 * Native
 */
import {transferFt} from '../../native/transferFt';
import {depositStorage} from '../../native/depositStorage';

export const createVaultsBundler = (config: CoreConfig) => {
  const vaults = {
    getCancelDepositParams: vaultsCancelDeposit.createGetParams(config),
    getCancelWithdrawParams: vaultsCancelWithdraw.createGetParams(config),
    getDepositParams: vaultsDeposit.createGetParams(config),
    getWithdrawParams: vaultsWithdraw.createGetParams(config),
    getTakeoutParams: vaultsTakeout.createGetParams(config),
  };

  const storage = {
    getDepositParams: storageDeposit.createGetParams(config),
  };

  const auction = {
    getDepositParams: auctionDeposit.createGetParams(config),
    getPlaceBidParams: auctionPlaceBid.createGetParams(config),
    getCancelOrder: auctionCancelOrder.createGetParams(config),
    getWithdrawParams: auctionWithdraw.createGetParams(config),
  };

  const oft = {
    getExecuteParams: oftExecute.createGetParams(config),
    getWithdrawParams: oftWithdraw.createGetParams(config),
  };

  const native = {
    getTransferFtParams: transferFt.createGetParams(config),
    getDepositStorageParams: depositStorage.createGetParams(config),
  };

  const bundler = (untis: VaultsBundlerUnit[] = []): VaultsBundler => {
    return {
      vaults: {
        cancelDeposit: (...args) => {
          return bundler([
            ...untis,
            () => {
              return vaults.getCancelDepositParams(...args);
            },
          ]);
        },
        cancelWithdraw: (...args) => {
          return bundler([
            ...untis,
            () => {
              return vaults.getCancelWithdrawParams(...args);
            },
          ]);
        },
        deposit: (...args) => {
          return bundler([
            ...untis,
            () => {
              return vaults.getDepositParams(...args);
            },
          ]);
        },
        withdraw: (...args) => {
          return bundler([
            ...untis,
            () => {
              return vaults.getWithdrawParams(...args);
            },
          ]);
        },
        takeout: (...args) => {
          return bundler([
            ...untis,
            () => {
              return vaults.getTakeoutParams(...args);
            },
          ]);
        },
      },
      storage: {
        deposit: (...args) => {
          return bundler([
            ...untis,
            () => {
              return storage.getDepositParams(...args);
            },
          ]);
        },
      },
      auction: {
        deposit: (...args) => {
          return bundler([
            ...untis,
            () => {
              return auction.getDepositParams(...args);
            },
          ]);
        },
        placeBid: (...args) => {
          return bundler([
            ...untis,
            () => {
              return auction.getPlaceBidParams(...args);
            },
          ]);
        },
        cancelOrder: (...args) => {
          return bundler([
            ...untis,
            () => {
              return auction.getCancelOrder(...args);
            },
          ]);
        },
        withdraw: (...args) => {
          return bundler([
            ...untis,
            () => {
              return auction.getWithdrawParams(...args);
            },
          ]);
        },
      },
      oft: {
        execute: (...args) => {
          return bundler([
            ...untis,
            () => {
              return oft.getExecuteParams(...args);
            },
          ]);
        },
        withdraw: (...args) => {
          return bundler([
            ...untis,
            () => {
              return oft.getWithdrawParams(...args);
            },
          ]);
        },
      },
      native: {
        transferFt: (...args) => {
          return bundler([
            ...untis,
            () => {
              return native.getTransferFtParams(...args);
            },
          ]);
        },
        depositStorage: (...args) => {
          return bundler([
            ...untis,
            () => {
              return native.getDepositStorageParams(...args);
            },
          ]);
        },
      },
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
        return bundler([
          ...untis,
          creator({
            vaults,
            storage,
            auction,
            oft,
            native,
          }),
        ]);
      },
    };
  };

  return bundler;
};
