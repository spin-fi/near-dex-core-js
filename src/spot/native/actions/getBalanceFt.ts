import {NativeConfig} from '../../types';

/**
 * @category getBalanceFt
 */
export type GetBalanceFtResponse = string;

/**
 * @category getBalanceFt
 */
export interface GetBalanceFtRequest {
  /**
   * Token Address
   */
  tokenAddress: string;
}

const METHOD_NAME = 'ft_balance_of';

export const createGetBalanceFt = ({account}: NativeConfig) => {
  return async (request: GetBalanceFtRequest): Promise<GetBalanceFtResponse> => {
    return await account.viewFunction(request.tokenAddress, METHOD_NAME, {
      account_id: account.accountId,
    });
  };
};
