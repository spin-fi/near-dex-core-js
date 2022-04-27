import {ContractConfig} from '../../types';
import {Market} from './getMarket';

/**
 * @category getMarkets
 */
export type GetMarketsResponse = Market[];

const METHOD_NAME = 'get_markets';

export const createGetMarkets = ({account, contractId}: ContractConfig) => {
  return async (): Promise<GetMarketsResponse> => {
    return await account.viewFunction(contractId, METHOD_NAME, {});
  };
};
