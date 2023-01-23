import {invariant} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {VaultsOptionType} from './types';

export type VaultsEpochStatus = 'NotStarted' | 'Started' | 'Finished';

export type VaultsEpochBootstrap = {
  auction_start_ts: number;
  auction_end_ts: number;
  option_expiration_ts: number;
  auction_min_price: string;
  strike_price: string;
  option_type: VaultsOptionType;
  execution_asset: string;
  underlying_asset: string;
  auction_contract: string;
  oft_contract: string;
  price_feed_id: string;
};

export type VaultsEpochMetadata = {
  status: VaultsEpochStatus;
  auction_id?: string | null;
  oft_id?: string | null;
  minted_quantity?: string | null;
  unrealized_quantity?: string | null;
  income?: string | null;
  bootstrap_params?: VaultsEpochBootstrap | null;
};

export type VaultsEpoch = {
  id?: number;
  status: VaultsEpochStatus;
  start_amount: string;
  end_amount: string;
  shares_on_start: string;
  withdraw_shares: string;
  deposit_amount: string;
  performance_fee: string;
  management_fee: string;
  metadata: VaultsEpochMetadata;
};

export type VaultsGetEpochResponse = VaultsEpoch | undefined;

export interface VaultsGetEpochRequest {
  /**
   * Vault ID
   */
  vaultId: string;
  /**
   * Epoch ID
   */
  epochId?: string;
}

const METHOD_NAME = 'vault_epoch_metadata';

export const vaultsGetEpoch = createView<VaultsGetEpochRequest, VaultsGetEpochResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('vaultsGetEpoch'));
        invariant(config.contractId, contractIdErrorMessage('vaultsGetEpoch'));

        return await config.near.view(config.contractId, METHOD_NAME, {
          vault_id: request.vaultId,
          epoch_id: request.epochId,
        });
      };
    });

    return {
      createMethod,
    };
  },
);
