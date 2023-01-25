import {invariant, Nil} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';

export type MftGetBatchBalanceResponse = Nil<string>[] | undefined;

export interface MftGetBatchBalanceRequest {
  /**
   * Account ID
   */
  accountId: string;
  /**
   * Tokens ID
   */
  tokensId: string[];
}

const METHOD_NAME = 'batch_mft_balance_of';

export const mftGetBatchBalance = createView<MftGetBatchBalanceRequest, MftGetBatchBalanceResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('mftGetBatchBalance'));
        invariant(config.contractId, contractIdErrorMessage('mftGetBatchBalance'));

        return await config.near.view(config.contractId, METHOD_NAME, {
          account_id: request.accountId,
          token_ids: request.tokensId,
        });
      };
    });

    return {
      createMethod,
    };
  },
);
