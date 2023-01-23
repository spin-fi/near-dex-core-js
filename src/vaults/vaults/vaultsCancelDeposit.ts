import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {invariant} from '@spinfi/shared';

import {createUnit} from '../../utils/createUnit';
import {selectorErrorMessage} from './messages';

export type VaultsCancelDepositResponse = FinalExecutionOutcome | void;

export interface VaultsCancelDepositRequest {
  /**
   * Vault Id
   */
  vaultId: string;
  /**
   * Amount to cancel from deposit, if none is specified, then all pending deposit is cancled
   */
  amount?: BigInt;
}

export interface VaultsCancelDepositConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
  /**
   * Deposit in decimal
   */
  deposit?: BigInt;
}

const GAS = '300000000000000';

const DEPOSIT = '1';

const METHOD_NAME = 'vault_cancel_deposit';

export const vaultsCancelDeposit = createUnit<
  VaultsCancelDepositRequest,
  VaultsCancelDepositConfig
>(({paramsify, methodify}) => {
  const createGetParams = paramsify(() => {
    return async (request, unitConfig) => {
      return {
        actions: [
          {
            type: 'FunctionCall',
            params: {
              methodName: METHOD_NAME,
              args: {
                vault_id: request.vaultId,
                amount: request.amount?.toString(),
              },
              gas: unitConfig?.gas?.toString() ?? GAS,
              deposit: unitConfig?.deposit?.toString() ?? DEPOSIT,
            },
          },
        ],
      };
    };
  });

  const createMethod = methodify((config) => {
    const getParams = createGetParams(config);

    return async (request, unitConfig): Promise<VaultsCancelDepositResponse> => {
      invariant(config.selector, selectorErrorMessage('vaultsCancelDeposit'));

      const wallet = await config.selector.wallet();
      const params = await getParams(request, unitConfig);

      if (!params) {
        return;
      }

      return await wallet.signAndSendTransaction(params);
    };
  });

  return {
    createGetParams,
    createMethod,
  };
});
