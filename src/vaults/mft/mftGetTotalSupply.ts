import {invariant} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';

export type MftGetTotalSupplyResponse = string | undefined;

export interface MftGetTotalSupplyRequest {
  /**
   * Token ID
   */
  tokenId: string;
}

const METHOD_NAME = 'mft_total_supply';

export const mftGetTotalSupply = createView<MftGetTotalSupplyRequest, MftGetTotalSupplyResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('mftGetTotalSupply'));
        invariant(config.contractId, contractIdErrorMessage('mftGetTotalSupply'));

        return await config.near.view(config.contractId, METHOD_NAME, {
          token_id: request.tokenId,
        });
      };
    });

    return {
      createMethod,
    };
  },
);
