import {invariant} from '@spinfi/shared';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {selectorErrorMessage} from './messages';
import {createUnit} from '../utils/createUnit';

/**
 * @category transferFt
 */
export type TransferFtResponse = FinalExecutionOutcome | void;

/**
 * @category transferFt
 */
export interface TransferFtRequest {
  /**
   * Receiver ID
   */
  receiverId: string;
  /**
   * Token Address
   */
  tokenAddress: string;
  /**
   * Amount in decimal
   */
  amount: BigInt;
  /**
   * Message
   */
  message?: string;
}

/**
 * @category transferFt
 */
export interface TransferFtConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
  /**
   * Attached Deposit in decimal
   */
  deposit?: BigInt;
}

const GAS = '300000000000000';

const DEPOSIT = '1';

const METHOD_NAME = 'ft_transfer_call';

export const transferFt = createUnit<TransferFtRequest, TransferFtConfig>(
  ({paramsify, methodify}) => {
    const createGetParams = paramsify(() => {
      return async (request, unitConfig) => {
        return {
          receiverId: request.tokenAddress,
          actions: [
            {
              type: 'FunctionCall',
              params: {
                methodName: METHOD_NAME,
                args: {
                  receiver_id: request.receiverId,
                  amount: request.amount.toString(),
                  msg: request.message ?? '',
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

      return async (request, unitConfig): Promise<TransferFtResponse> => {
        invariant(config.selector, selectorErrorMessage('transferFt'));

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
