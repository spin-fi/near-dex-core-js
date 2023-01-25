/**
 * Vaults
 */
import {
  VaultsCancelDepositRequest,
  VaultsCancelDepositResponse,
  VaultsCancelDepositConfig,
} from './vaults/vaultsCancelDeposit';
import {
  VaultsCancelWithdrawRequest,
  VaultsCancelWithdrawResponse,
  VaultsCancelWithdrawConfig,
} from './vaults/vaultsCancelWithdraw';
import {
  VaultsDepositRequest,
  VaultsDepositResponse,
  VaultsDepositConfig,
} from './vaults/vaultsDeposit';
import {
  VaultsWithdrawRequest,
  VaultsWithdrawResponse,
  VaultsWithdrawConfig,
} from './vaults/vaultsWithdraw';
import {
  VaultsTakeoutRequest,
  VaultsTakeoutResponse,
  VaultsTakeoutConfig,
} from './vaults/vaultsTakeout';
import {
  VaultsGetPendingDepositRequest,
  VaultsGetPendingDepositResponse,
} from './vaults/vaultsGetPendingDeposit';
import {
  VaultsGetPendingTakeoutRequest,
  VaultsGetPendingTakeoutResponse,
} from './vaults/vaultsGetPendingTakeout';
import {
  VaultsGetPendingWithdrawRequest,
  VaultsGetPendingWithdrawResponse,
} from './vaults/vaultsGetPendingWithdraw';
import {VaultsGetEpochRequest, VaultsGetEpochResponse} from './vaults/vaultsGetEpoch';
import {
  VaultsGetLastEpochIdRequest,
  VaultsGetLastEpochIdResponse,
} from './vaults/vaultsGetLastEpochId';
import {VaultsGetVaultRequest, VaultsGetVaultResponse} from './vaults/vaultsGetVault';
import {VaultsGetVaultsRequest, VaultsGetVaultsResponse} from './vaults/vaultsGetVaults';
import {VaultsGetVaultsAmountResponse} from './vaults/vaultsGetVaultsAmount';
/**
 * Mft
 */
import {MftGetBalanceRequest, MftGetBalanceResponse} from './mft/mftGetBalance';
import {MftGetBatchBalanceRequest, MftGetBatchBalanceResponse} from './mft/mftGetBatchBalance';
import {MftGetVaultBalanceRequest, MftGetVaultBalanceResponse} from './mft/mftGetVaultBalance';
import {MftGetTotalSupplyRequest, MftGetTotalSupplyResponse} from './mft/mftGetTotalSupply';
import {
  MftGetVaultTotalSupplyRequest,
  MftGetVaultTotalSupplyResponse,
} from './mft/mftGetVaultTotalSupply';
import {MftGetMetadataRequest, MftGetMetadataResponse} from './mft/mftGetMetadata';
import {MftGetVaultMetadataRequest, MftGetVaultMetadataResponse} from './mft/mftGetVaultMetadata';
/**
 * Storage
 */
import {
  StorageDepositRequest,
  StorageDepositResponse,
  StorageDepositConfig,
} from './storage/storageDeposit';
import {StorageGetStorageRequest, StorageGetStorageResponse} from './storage/storageGetStorage';
/**
 * Auction
 */
import {AuctionDepositRequest, AuctionDepositResponse} from './auction/auctionDeposit';
import {AuctionGetAuctionsRequest, AuctionGetAuctionsResponse} from './auction/auctionGetAuctions';
import {AuctionGetAuctionRequest, AuctionGetAuctionResponse} from './auction/auctionGetAuction';
import {AuctionGetCountResponse} from './auction/auctionGetCount';
import {AuctionGetDepositsRequest, AuctionGetDepositsResponse} from './auction/auctionGetDeposits';
import {AuctionGetOrderRequest, AuctionGetOrderResponse} from './auction/auctionGetOrder';
import {
  AuctionGetOrderbookRequest,
  AuctionGetOrderbookResponse,
} from './auction/auctionGetOrderbook';
import {AuctionGetOrdersRequest, AuctionGetOrdersResponse} from './auction/auctionGetOrders';
import {
  AuctionPlaceBidRequest,
  AuctionPlaceBidResponse,
  AuctionPlaceBidConfig,
} from './auction/auctionPlaceBid';
import {
  AuctionCancelOrderRequest,
  AuctionCancelOrderResponse,
  AuctionCancelOrderConfig,
} from './auction/auctionCancelOrder';
import {
  AuctionWithdrawRequest,
  AuctionWithdrawResponse,
  AuctionWithdrawConfig,
} from './auction/auctionWithdraw';
import {
  AuctionGetCurrenciesRequest,
  AuctionGetCurrenciesResponse,
} from './auction/auctionGetCurrencies';
/**
 * Oft
 */
import {OftExecuteRequest, OftExecuteResponse, OftExecuteConfig} from './oft/oftExecute';
import {OftWithdrawRequest, OftWithdrawResponse, OftWithdrawConfig} from './oft/oftWithdraw';
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
  DepositStorageRequest as NativeDepositStorageRequest,
  DepositStorageResponse as NativeDepositStorageResponse,
  DepositStorageConfig as NativeDepositStorageConfig,
} from '../native/depositStorage';
import {GetMetadataFtRequest, GetMetadataFtResponse} from '../native/getMetadataFt';
/**
 * Bundler
 */
import {VaultsBundler, VaultsBundlerUnit} from './bundler/types';

export interface VaultsSpin {
  vaults: {
    cancelDeposit: (
      request: VaultsCancelDepositRequest,
      config?: VaultsCancelDepositConfig,
    ) => Promise<VaultsCancelDepositResponse>;
    cancelWithdraw: (
      request: VaultsCancelWithdrawRequest,
      config?: VaultsCancelWithdrawConfig,
    ) => Promise<VaultsCancelWithdrawResponse>;
    deposit: (
      request: VaultsDepositRequest,
      config?: VaultsDepositConfig,
    ) => Promise<VaultsDepositResponse>;
    withdraw: (
      request: VaultsWithdrawRequest,
      config?: VaultsWithdrawConfig,
    ) => Promise<VaultsWithdrawResponse>;
    takeout: (
      request: VaultsTakeoutRequest,
      config?: VaultsTakeoutConfig,
    ) => Promise<VaultsTakeoutResponse>;
    getPendingDeposit: (
      request: VaultsGetPendingDepositRequest,
    ) => Promise<VaultsGetPendingDepositResponse>;
    getPendingTakeout: (
      request: VaultsGetPendingTakeoutRequest,
    ) => Promise<VaultsGetPendingTakeoutResponse>;
    getPendingWithdraw: (
      request: VaultsGetPendingWithdrawRequest,
    ) => Promise<VaultsGetPendingWithdrawResponse>;
    getEpoch: (request: VaultsGetEpochRequest) => Promise<VaultsGetEpochResponse>;
    getLastEpochId: (request: VaultsGetLastEpochIdRequest) => Promise<VaultsGetLastEpochIdResponse>;
    getVault: (request: VaultsGetVaultRequest) => Promise<VaultsGetVaultResponse>;
    getVaults: (request: VaultsGetVaultsRequest) => Promise<VaultsGetVaultsResponse>;
    getVaultsAmount: () => Promise<VaultsGetVaultsAmountResponse>;
  };
  mft: {
    getBalance: (request: MftGetBalanceRequest) => Promise<MftGetBalanceResponse>;
    getBatchBalance: (request: MftGetBatchBalanceRequest) => Promise<MftGetBatchBalanceResponse>;
    getVaultBalance: (request: MftGetVaultBalanceRequest) => Promise<MftGetVaultBalanceResponse>;
    getTotalSupply: (request: MftGetTotalSupplyRequest) => Promise<MftGetTotalSupplyResponse>;
    getVaultTotalSupply: (
      request: MftGetVaultTotalSupplyRequest,
    ) => Promise<MftGetVaultTotalSupplyResponse>;
    getMetadata: (request: MftGetMetadataRequest) => Promise<MftGetMetadataResponse>;
    getVaultMetadata: (request: MftGetVaultMetadataRequest) => Promise<MftGetVaultMetadataResponse>;
  };
  storage: {
    getStorage: (request: StorageGetStorageRequest) => Promise<StorageGetStorageResponse>;
    deposit: (
      request: StorageDepositRequest,
      config?: StorageDepositConfig,
    ) => Promise<StorageDepositResponse>;
  };
  auction: {
    deposit: (request: AuctionDepositRequest) => Promise<AuctionDepositResponse>;
    getAuctions: (request: AuctionGetAuctionsRequest) => Promise<AuctionGetAuctionsResponse>;
    getAuction: (request: AuctionGetAuctionRequest) => Promise<AuctionGetAuctionResponse>;
    getCount: () => Promise<AuctionGetCountResponse>;
    getDeposits: (request: AuctionGetDepositsRequest) => Promise<AuctionGetDepositsResponse>;
    getOrder: (request: AuctionGetOrderRequest) => Promise<AuctionGetOrderResponse>;
    getOrderbook: (request: AuctionGetOrderbookRequest) => Promise<AuctionGetOrderbookResponse>;
    getOrders: (request: AuctionGetOrdersRequest) => Promise<AuctionGetOrdersResponse>;
    placeBid: (
      request: AuctionPlaceBidRequest,
      config?: AuctionPlaceBidConfig,
    ) => Promise<AuctionPlaceBidResponse>;
    cancelOrder: (
      request: AuctionCancelOrderRequest,
      config?: AuctionCancelOrderConfig,
    ) => Promise<AuctionCancelOrderResponse>;
    withdraw: (
      request: AuctionWithdrawRequest,
      config?: AuctionWithdrawConfig,
    ) => Promise<AuctionWithdrawResponse>;
    getCurrencies: (request: AuctionGetCurrenciesRequest) => Promise<AuctionGetCurrenciesResponse>;
  };
  oft: {
    execute: (request: OftExecuteRequest, config?: OftExecuteConfig) => Promise<OftExecuteResponse>;
    withdraw: (
      request: OftWithdrawRequest,
      config?: OftWithdrawConfig,
    ) => Promise<OftWithdrawResponse>;
  };
  native: {
    getBalance: (request: GetBalanceRequest) => Promise<GetBalanceResponse>;
    getBalanceFt: (request: GetBalanceFtRequest) => Promise<GetBalanceFtResponse>;
    getBalanceNear: (request: GetBalanceNearRequest) => Promise<GetBalanceNearResponse>;
    getBalanceStorage: (request: GetBalanceStorageRequest) => Promise<GetBalanceStorageResponse>;
    transferFt: (
      request: TransferFtRequest,
      config?: TransferFtConfig,
    ) => Promise<TransferFtResponse>;
    getTransactionStatus: (
      request: GetTransactionStatusRequest,
    ) => Promise<GetTransactionStatusResponse>;
    getBalanceStorageBounds: (
      request: GetBalanceStorageBoundsRequest,
    ) => Promise<GetBalanceStorageBoundsResponse>;
    getMetadataFt: (request: GetMetadataFtRequest) => Promise<GetMetadataFtResponse>;
    depositStorage: (
      request: NativeDepositStorageRequest,
      config?: NativeDepositStorageConfig,
    ) => Promise<NativeDepositStorageResponse>;
  };
  bundle: (units?: VaultsBundlerUnit[]) => VaultsBundler;
}
