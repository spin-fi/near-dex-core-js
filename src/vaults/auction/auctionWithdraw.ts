import {invariant} from '@spinfi/shared';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {createUnit} from '../../utils/createUnit';
import {selectorErrorMessage} from './messages';

export type AuctionWithdrawResponse = FinalExecutionOutcome | void;

export type AuctionWithdrawRequest = {
  /**
   * Token
   */
  token: string;
  /**
   * Amount in decimal
   */
  amount: BigInt;
};

export type AuctionWithdrawConfig = {
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

const DEPOSIT = '1';

const METHOD_NAME = 'auction_withdraw';

export const auctionWithdraw = createUnit<AuctionWithdrawRequest, AuctionWithdrawConfig>(
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
                  token: request.token,
                  amount: request.amount.toString(),
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

      return async (request, unitConfig): Promise<AuctionWithdrawResponse> => {
        invariant(config.selector, selectorErrorMessage('auctionWithdraw'));

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
