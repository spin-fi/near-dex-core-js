import {invariant} from '@spinfi/shared';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {createUnit} from '../../utils/createUnit';
import {selectorErrorMessage} from './messages';

export type AuctionCancelOrderResponse = FinalExecutionOutcome | void;

export type AuctionCancelOrderRequest = {
  /**
   * Auction Id
   */
  auctionId: number;
  /**
   * Order Id
   */
  orderId: string;
};

export type AuctionCancelOrderConfig = {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
};

const GAS = '300000000000000';

const METHOD_NAME = 'auction_cancel_order';

export const auctionCancelOrder = createUnit<AuctionCancelOrderRequest, AuctionCancelOrderConfig>(
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
                  auction_id: request.auctionId,
                  order_id: request.orderId,
                },
                gas: unitConfig?.gas?.toString() ?? GAS,
                deposit: '',
              },
            },
          ],
        };
      };
    });

    const createMethod = methodify((config) => {
      const getParams = createGetParams(config);

      return async (request, unitConfig): Promise<AuctionCancelOrderResponse> => {
        invariant(config.selector, selectorErrorMessage('auctionCancelOrder'));

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
