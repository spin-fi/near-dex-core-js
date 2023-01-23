import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {invariant} from '@spinfi/shared';

import {createUnit} from '../../utils/createUnit';
import {selectorErrorMessage} from './messages';

export type VaultsCancelWithdrawResponse = FinalExecutionOutcome | void;

export interface VaultsCancelWithdrawRequest {
  /**
   * Vault Id
   */
  vaultId: string;
  /**
   * Amount to cancel from withdraw, if none is specified, then all pending withdraw is cancled
   */
  amount?: BigInt;
}

export interface VaultsCancelWithdrawConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
  /**
   * Withdraw in decimal
   */
  deposit?: BigInt;
}

const GAS = '300000000000000';

const DEPOSIT = '0';

const METHOD_NAME = 'vault_cancel_withdraw';

export const vaultsCancelWithdraw = createUnit<
  VaultsCancelWithdrawRequest,
  VaultsCancelWithdrawConfig
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

    return async (request, unitConfig): Promise<VaultsCancelWithdrawResponse> => {
      invariant(config.selector, selectorErrorMessage('vaultsCancelWithdraw'));

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
