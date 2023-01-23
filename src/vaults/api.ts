/**
 * Spin
 */
import {VaultsSpin} from './api.types';
import {CoreConfig} from '../types';
/**
 * Vaults
 */
import {vaultsCancelDeposit} from './vaults/vaultsCancelDeposit';
import {vaultsCancelWithdraw} from './vaults/vaultsCancelWithdraw';
import {vaultsDeposit} from './vaults/vaultsDeposit';
import {vaultsWithdraw} from './vaults/vaultsWithdraw';
import {vaultsTakeout} from './vaults/vaultsTakeout';
import {vaultsGetPendingDeposit} from './vaults/vaultsGetPendingDeposit';
import {vaultsGetPendingTakeout} from './vaults/vaultsGetPendingTakeout';
import {vaultsGetPendingWithdraw} from './vaults/vaultsGetPendingWithdraw';
import {vaultsGetEpoch} from './vaults/vaultsGetEpoch';
import {vaultsGetLastEpochId} from './vaults/vaultsGetLastEpochId';
import {vaultsGetVault} from './vaults/vaultsGetVault';
import {vaultsGetVaults} from './vaults/vaultsGetVaults';
import {vaultsGetVaultsAmount} from './vaults/vaultsGetVaultsAmount';
/**
 * Mft
 */
import {mftGetBalance} from './mft/mftGetBalance';
import {mftGetVaultBalance} from './mft/mftGetVaultBalance';
import {mftGetTotalSupply} from './mft/mftGetTotalSupply';
import {mftGetVaultTotalSupply} from './mft/mftGetVaultTotalSupply';
import {mftGetMetadata} from './mft/mftGetMetadata';
import {mftGetVaultMetadata} from './mft/mftGetVaultMetadata';
/**
 * Storage
 */
import {storageDeposit} from './storage/storageDeposit';
import {storageGetStorage} from './storage/storageGetStorage';
/**
 * Auction
 */
import {auctionDeposit} from './auction/auctionDeposit';
import {auctionGetAuction} from './auction/auctionGetAuction';
import {auctionGetAuctions} from './auction/auctionGetAuctions';
import {auctionGetCount} from './auction/auctionGetCount';
import {auctionGetDeposits} from './auction/auctionGetDeposits';
import {auctionGetOrder} from './auction/auctionGetOrder';
import {auctionGetOrderbook} from './auction/auctionGetOrderbook';
import {auctionGetOrders} from './auction/auctionGetOrders';
import {auctionPlaceBid} from './auction/auctionPlaceBid';
import {auctionCancelOrder} from './auction/auctionCancelOrder';
import {auctionWithdraw} from './auction/auctionWithdraw';
/**
 * Oft
 */
import {oftExecute} from './oft/oftExecute';
import {oftWithdraw} from './oft/oftWithdraw';
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
import {getMetadataFt} from '../native/getMetadataFt';
/**
 * Bundler
 */
import {createVaultsBundler} from './bundler/bundler';

export const createVaultsSpin = (config: CoreConfig): VaultsSpin => {
  return {
    vaults: {
      cancelDeposit: vaultsCancelDeposit.createMethod(config),
      cancelWithdraw: vaultsCancelWithdraw.createMethod(config),
      deposit: vaultsDeposit.createMethod(config),
      withdraw: vaultsWithdraw.createMethod(config),
      takeout: vaultsTakeout.createMethod(config),
      getPendingDeposit: vaultsGetPendingDeposit.createMethod(config),
      getPendingTakeout: vaultsGetPendingTakeout.createMethod(config),
      getPendingWithdraw: vaultsGetPendingWithdraw.createMethod(config),
      getEpoch: vaultsGetEpoch.createMethod(config),
      getLastEpochId: vaultsGetLastEpochId.createMethod(config),
      getVault: vaultsGetVault.createMethod(config),
      getVaults: vaultsGetVaults.createMethod(config),
      getVaultsAmount: vaultsGetVaultsAmount.createMethod(config),
    },
    mft: {
      getBalance: mftGetBalance.createMethod(config),
      getVaultBalance: mftGetVaultBalance.createMethod(config),
      getTotalSupply: mftGetTotalSupply.createMethod(config),
      getVaultTotalSupply: mftGetVaultTotalSupply.createMethod(config),
      getMetadata: mftGetMetadata.createMethod(config),
      getVaultMetadata: mftGetVaultMetadata.createMethod(config),
    },
    storage: {
      getStorage: storageGetStorage.createMethod(config),
      deposit: storageDeposit.createMethod(config),
    },
    auction: {
      deposit: auctionDeposit.createMethod(config),
      getAuction: auctionGetAuction.createMethod(config),
      getAuctions: auctionGetAuctions.createMethod(config),
      getCount: auctionGetCount.createMethod(config),
      getDeposits: auctionGetDeposits.createMethod(config),
      getOrder: auctionGetOrder.createMethod(config),
      getOrderbook: auctionGetOrderbook.createMethod(config),
      getOrders: auctionGetOrders.createMethod(config),
      placeBid: auctionPlaceBid.createMethod(config),
      cancelOrder: auctionCancelOrder.createMethod(config),
      withdraw: auctionWithdraw.createMethod(config),
    },
    oft: {
      execute: oftExecute.createMethod(config),
      withdraw: oftWithdraw.createMethod(config),
    },
    native: {
      getBalance: getBalance.createMethod(config),
      getBalanceFt: getBalanceFt.createMethod(config),
      getBalanceNear: getBalanceNear.createMethod(config),
      getBalanceStorage: getBalanceStorage.createMethod(config),
      transferFt: transferFt.createMethod(config),
      getTransactionStatus: getTransactionStatus.createMethod(config),
      getBalanceStorageBounds: getBalanceStorageBounds.createMethod(config),
      getMetadataFt: getMetadataFt.createMethod(config),
      depositStorage: depositStorage.createMethod(config),
    },
    bundle: createVaultsBundler(config),
  };
};
