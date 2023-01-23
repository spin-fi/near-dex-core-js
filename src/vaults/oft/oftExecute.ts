import type {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {invariant} from '@spinfi/shared';

import {createUnit} from '../../utils/createUnit';
import {selectorErrorMessage} from './messages';

export type OftExecuteResponse = FinalExecutionOutcome | void;

export type OftExecuteRequest = {
  /**
   * Token ID
   */
  tokenId: string;
  /**
   * Amount to execute
   */
  amount?: BigInt;
};

export type OftExecuteConfig = {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
  /**
   * Deposit in decimal
   */
  deposit?: BigInt;
};

const GAS = '300000000000000';

const DEPOSIT = '0';

const METHOD_NAME = 'oft_execute';

export const oftExecute = createUnit<OftExecuteRequest, OftExecuteConfig>(
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
                  token_id: request.tokenId,
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

      return async (request, unitConfig): Promise<OftExecuteResponse> => {
        invariant(config.selector, selectorErrorMessage('oftExecute'));

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
