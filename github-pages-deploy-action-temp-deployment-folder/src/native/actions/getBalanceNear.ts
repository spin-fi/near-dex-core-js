import type {AccountBalance} from 'near-api-js/lib/account';

import {NativeConfig} from '../../types';

/**
 * @category getBalanceNear
 */
export type GetBalanceNearResponse = AccountBalance;

export const createGetBalanceNear = ({account}: NativeConfig) => {
  return async (): Promise<GetBalanceNearResponse> => {
    return await account.getAccountBalance();
  };
};
