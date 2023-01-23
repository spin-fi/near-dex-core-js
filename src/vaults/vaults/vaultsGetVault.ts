import {invariant} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {VaultsOptionType} from './types';

export type VaultsVaultInvariant = {
  option_type: VaultsOptionType;
  execution_asset: string;
  underlying_asset: string;
};

export type VaultsVaultPricing = {
  auction_min_price: string;
  price_feed_id: string;
  strike_price: string;
};

export type VaultsVaultTime = {
  auction_duration: string;
  auction_start: string;
  option_expiration: string;
  period: string;
  period_offset: string;
};

export type VaultsVaultFee = {
  collected_management_fee: number | null;
  collected_performance_fee: number | null;
  fee_denominator: number | null;
  management_fee_numerator: number | null;
  performance_fee_numerator: number | null;
};

export type VaultsVaultCapacity = {
  max: string | null;
  min: string | null;
};

export type VaultsVault = {
  id: string;
  invariant: VaultsVaultInvariant;
  pricing: VaultsVaultPricing;
  time: VaultsVaultTime;
  fee?: VaultsVaultFee;
  capacity?: VaultsVaultCapacity;
};

export type VaultsGetVaultResponse = VaultsVault | undefined;

export interface VaultsGetVaultRequest {
  /**
   * Vault ID
   */
  vaultId: string;
}

const METHOD_NAME = 'vault_metadata';

export const vaultsGetVault = createView<VaultsGetVaultRequest, VaultsGetVaultResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('vaultsGetVault'));
        invariant(config.contractId, contractIdErrorMessage('vaultsGetVault'));

        return await config.near.view(config.contractId, METHOD_NAME, {
          vault_id: request.vaultId,
        });
      };
    });

    return {
      createMethod,
    };
  },
);
