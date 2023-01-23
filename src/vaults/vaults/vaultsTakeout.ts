import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {invariant} from '@spinfi/shared';

import {createUnit} from '../../utils/createUnit';
import {selectorErrorMessage} from './messages';

export type VaultsTakeoutResponse = FinalExecutionOutcome | void;

export interface VaultsTakeoutRequest {
  /**
   * Vault Id
   */
  vaultId: string;
}

export interface VaultsTakeoutConfig {
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

const METHOD_NAME = 'vault_takeout';

export const vaultsTakeout = createUnit<VaultsTakeoutRequest, VaultsTakeoutConfig>(
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
                  vault_id: request.vaultId,
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

      return async (request, unitConfig): Promise<VaultsTakeoutResponse> => {
        invariant(config.selector, selectorErrorMessage('vaultsTakeout'));

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
