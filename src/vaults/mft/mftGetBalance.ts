import {invariant} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';

export type MftGetBalanceResponse = string | undefined;

export interface MftGetBalanceRequest {
  /**
   * Account ID
   */
  accountId: string;
  /**
   * Token ID
   */
  tokenId: string;
}

const METHOD_NAME = 'mft_balance_of';

export const mftGetBalance = createView<MftGetBalanceRequest, MftGetBalanceResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('mftGetBalance'));
        invariant(config.contractId, contractIdErrorMessage('mftGetBalance'));

        return await config.near.view(config.contractId, METHOD_NAME, {
          account_id: request.accountId,
          token_id: request.tokenId,
        });
      };
    });

    return {
      createMethod,
    };
  },
);
