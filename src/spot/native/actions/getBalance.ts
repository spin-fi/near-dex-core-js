import {isNear} from '@spinfi/shared';

import {NativeConfig} from '../../types';
import {createGetBalanceNear} from './getBalanceNear';
import {createGetBalanceFt} from './getBalanceFt';

/**
 * @category getBalance
 */
export type GetBalanceResponse = string;

/**
 * @category getBalance
 */
export interface GetBalanceRequest {
  /**
   * Token Address
   */
  tokenAddress: string;
}

export const createGetBalance = (config: NativeConfig) => {
  const getBalanceNear = createGetBalanceNear(config);
  const getBalanceFt = createGetBalanceFt(config);

  return async (request: GetBalanceRequest): Promise<GetBalanceResponse> => {
    if (isNear(request.tokenAddress)) {
      const response = await getBalanceNear();
      return response.total;
    } else {
      return await getBalanceFt(request);
    }
  };
};
