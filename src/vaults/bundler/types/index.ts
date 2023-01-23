import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

/**
 * Spin
 */
import {CoreParams} from '../../../types/selector';
import {Params} from '../../../utils/createUnit';
/**
 * Vaults
 */
import type {
  VaultsCancelDepositRequest,
  VaultsCancelDepositConfig,
} from '../../vaults/vaultsCancelDeposit';
import type {
  VaultsCancelWithdrawRequest,
  VaultsCancelWithdrawConfig,
} from '../../vaults/vaultsCancelWithdraw';
import type {VaultsDepositRequest, VaultsDepositConfig} from '../../vaults/vaultsDeposit';
import type {VaultsWithdrawRequest, VaultsWithdrawConfig} from '../../vaults/vaultsWithdraw';
import type {VaultsTakeoutRequest, VaultsTakeoutConfig} from '../../vaults/vaultsTakeout';
/**
 * Storage
 */
import type {StorageDepositConfig, StorageDepositRequest} from '../../storage/storageDeposit';
/**
 * Auction
 */
import type {AuctionDepositConfig, AuctionDepositRequest} from '../../auction/auctionDeposit';
import type {AuctionPlaceBidConfig, AuctionPlaceBidRequest} from '../../auction/auctionPlaceBid';
import type {
  AuctionCancelOrderConfig,
  AuctionCancelOrderRequest,
} from '../../auction/auctionCancelOrder';
import type {AuctionWithdrawConfig, AuctionWithdrawRequest} from '../../auction/auctionWithdraw';
/**
 * Oft
 */
import type {OftExecuteConfig, OftExecuteRequest} from '../../oft/oftExecute';
import type {OftWithdrawConfig, OftWithdrawRequest} from '../../oft/oftWithdraw';
/**
 * Native
 */
import {TransferFtRequest, TransferFtConfig} from '../../../native/transferFt';
import {DepositStorageRequest, DepositStorageConfig} from '../../../native/depositStorage';

export type VaultsBundlerUnit = () => Promise<CoreParams | undefined>;

export type CustomCreatorConfig = {
  vaults: {
    getCancelDepositParams: Params<VaultsCancelDepositRequest, VaultsCancelDepositConfig>;
    getCancelWithdrawParams: Params<VaultsCancelWithdrawRequest, VaultsCancelWithdrawConfig>;
    getDepositParams: Params<VaultsDepositRequest, VaultsDepositConfig>;
    getWithdrawParams: Params<VaultsWithdrawRequest, VaultsWithdrawConfig>;
    getTakeoutParams: Params<VaultsTakeoutRequest, VaultsTakeoutConfig>;
  };
  storage: {
    getDepositParams: Params<StorageDepositRequest, StorageDepositConfig>;
  };
  auction: {
    getDepositParams: Params<AuctionDepositRequest, AuctionDepositConfig>;
    getPlaceBidParams: Params<AuctionPlaceBidRequest, AuctionPlaceBidConfig>;
    getCancelOrder: Params<AuctionCancelOrderRequest, AuctionCancelOrderConfig>;
    getWithdrawParams: Params<AuctionWithdrawRequest, AuctionWithdrawConfig>;
  };
  oft: {
    getExecuteParams: Params<OftExecuteRequest, OftExecuteConfig>;
    getWithdrawParams: Params<OftWithdrawRequest, OftWithdrawConfig>;
  };
  native: {
    getTransferFtParams: Params<TransferFtRequest, TransferFtConfig>;
    getDepositStorageParams: Params<DepositStorageRequest, DepositStorageConfig>;
  };
};

export type CustomCreator = (config: CustomCreatorConfig) => VaultsBundlerUnit;

export interface VaultsBundler {
  vaults: {
    cancelDeposit: (
      request: VaultsCancelDepositRequest,
      config?: VaultsCancelDepositConfig,
    ) => VaultsBundler;
    cancelWithdraw: (
      request: VaultsCancelWithdrawRequest,
      config?: VaultsCancelWithdrawConfig,
    ) => VaultsBundler;
    deposit: (request: VaultsDepositRequest, config?: VaultsDepositConfig) => VaultsBundler;
    withdraw: (request: VaultsWithdrawRequest, config?: VaultsWithdrawConfig) => VaultsBundler;
    takeout: (request: VaultsTakeoutRequest, config?: VaultsTakeoutConfig) => VaultsBundler;
  };
  storage: {
    deposit: (request: StorageDepositRequest, config?: StorageDepositConfig) => VaultsBundler;
  };
  auction: {
    deposit: (request: AuctionDepositRequest, config?: AuctionDepositConfig) => VaultsBundler;
    placeBid: (request: AuctionPlaceBidRequest, config?: AuctionPlaceBidConfig) => VaultsBundler;
    cancelOrder: (
      request: AuctionCancelOrderRequest,
      config?: AuctionCancelOrderConfig,
    ) => VaultsBundler;
    withdraw: (request: AuctionWithdrawRequest, config?: AuctionWithdrawConfig) => VaultsBundler;
  };
  oft: {
    execute: (request: OftExecuteRequest, config?: OftExecuteConfig) => VaultsBundler;
    withdraw: (request: OftWithdrawRequest, config?: OftWithdrawConfig) => VaultsBundler;
  };
  native: {
    transferFt: (request: TransferFtRequest, config?: TransferFtConfig) => VaultsBundler;
    depositStorage: (
      request: DepositStorageRequest,
      config?: DepositStorageConfig,
    ) => VaultsBundler;
  };
  call: () => Promise<FinalExecutionOutcome[] | void>;
  custom: (creator: CustomCreator) => VaultsBundler;
}
