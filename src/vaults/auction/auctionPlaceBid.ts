import {invariant} from '@spinfi/shared';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {createUnit} from '../../utils/createUnit';
import {selectorErrorMessage} from './messages';

export type AuctionPlaceBidResponse = FinalExecutionOutcome | void;

export type AuctionPlaceBidRequest = {
  /**
   * Auction Id
   */
  auctionId: number;
  /**
   * Price
   */
  price: BigInt;
  /**
   * Quantity
   */
  quantity: BigInt;
};

export type AuctionPlaceBidConfig = {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
};

const GAS = '300000000000000';

const METHOD_NAME = 'auction_place_bid';

export const auctionPlaceBid = createUnit<AuctionPlaceBidRequest, AuctionPlaceBidConfig>(
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
                  price: request.price.toString(),
                  quantity: request.quantity.toString(),
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

      return async (request, unitConfig): Promise<AuctionPlaceBidResponse> => {
        invariant(config.selector, selectorErrorMessage('auctionPlaceBid'));

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
