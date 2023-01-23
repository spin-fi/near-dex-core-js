import {isNear} from '@spinfi/shared';

import {getBalanceNear} from './getBalanceNear';
import {getBalanceFt} from './getBalanceFt';
import {createView} from '../utils/createView';

/**
 * @category getBalance
 */
export type GetBalanceResponse = string;

/**
 * @category getBalance
 */
export interface GetBalanceRequest {
  /**
   * Account ID
   */
  accountId: string;
  /**
   * Token Address
   */
  tokenAddress: string;
}

export const getBalance = createView<GetBalanceRequest, GetBalanceResponse>(({methodify}) => {
  const createMethod = methodify((config) => {
    const getBalanceNearMethod = getBalanceNear.createMethod(config);
    const getBalanceFtMethod = getBalanceFt.createMethod(config);

    return async (request) => {
      if (isNear(request.tokenAddress)) {
        return await getBalanceNearMethod(request);
      } else {
        return await getBalanceFtMethod(request);
      }
    };
  });

  return {
    createMethod,
  };
});
