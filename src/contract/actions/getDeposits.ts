import {ContractConfig} from '../../types';

/**
 * @category getDeposits
 */
export type GetDepositsResponse = Record<string, string>;

const METHOD_NAME = 'get_deposits';

export const createGetDeposits = ({account, contractId}: ContractConfig) => {
  return async (): Promise<GetDepositsResponse> => {
    return await account.viewFunction(contractId, METHOD_NAME, {
      account_id: account.accountId,
    });
  };
};
