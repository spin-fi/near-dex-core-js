import {invariant} from '@spinfi/shared';

import {nearErrorMessage} from './messages';
import {createView} from '../utils/createView';

/**
 * @category getBalanceNear
 */
export type GetBalanceNearResponse = string;

/**
 * @category getBalanceNear
 */
export interface GetBalanceNearRequest {
  /**
   * Account ID
   */
  accountId: string;
}

export const getBalanceNear = createView<GetBalanceNearRequest, GetBalanceNearResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('getBalanceNear'));

        return await config.near.balance(request.accountId);
      };
    });

    return {
      createMethod,
    };
  },
);
