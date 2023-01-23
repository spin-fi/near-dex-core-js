import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {invariant} from '@spinfi/shared';

import {createUnit} from '../../utils/createUnit';
import {selectorErrorMessage} from './messages';

export type VaultsWithdrawResponse = FinalExecutionOutcome | void;

export interface VaultsWithdrawRequest {
  /**
   * Token Address
   */
  tokenAddress: string;
  /**
   * Vault Id
   */
  vaultId: string;
  /**
   * Amount of vault token to withdraw, if none specified, then all amount is used
   */
  amount?: BigInt;
}

export interface VaultsWithdrawConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
  /**
   * Deposit in decimal
   */
  deposit?: BigInt;
}

const GAS = '50000000000000';

const DEPOSIT = '0';

const METHOD_NAME = 'vault_withdraw';

export const vaultsWithdraw = createUnit<VaultsWithdrawRequest, VaultsWithdrawConfig>(
  ({paramsify, methodify}) => {
    const createGetParams = paramsify(() => {
      return async (request, unitConfig) => {
        return {
          actions: [
            {
              type: 'FunctionCall',
              params: {
                methodName: METHOD_NAME,
                args: {
                  receiver_id: request.tokenAddress,
                  vault_id: request.vaultId,
                  share: request.amount?.toString(),
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

      return async (request, unitConfig): Promise<VaultsWithdrawResponse> => {
        invariant(config.selector, selectorErrorMessage('vaultsWithdraw'));

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
  },
);
