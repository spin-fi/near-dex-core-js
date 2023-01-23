import {invariant, Nil} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';

export type AuctionOrderPlacement = 'Market' | 'Limit';

export type AuctionOrderSide = 'Ask' | 'Bid';

export type AuctionOrderTriggerKind = 'StopLoss' | 'TakeProfit';

export type AuctionOrderTimeInForce = 'GTC' | 'FOK';

export type AuctionOrderKind = {
  Regular?: Nil<AuctionOrderPlacement>;
  Trigger?: {
    triggered?: Nil<boolean>;
    placement?: Nil<AuctionOrderPlacement>;
    trigger_kind?: Nil<AuctionOrderTriggerKind>;
    price?: Nil<string>;
    side: Nil<AuctionOrderSide>;
  };
};

export type AuctionOrder = {
  id: string;
  acc: string;
  price: string;
  quantity: string;
  remaining: string;
  updated_at: string;
  created_at: string;
  o_type: AuctionOrderSide;
  kind: AuctionOrderKind;
  client_order_id?: Nil<number>;
  time_in_force: AuctionOrderTimeInForce;
  post_only: boolean;
};

export type AuctionGetOrderResponse = AuctionOrder;

export type AuctionGetOrderRequest = {
  /**
   * Auction Id
   */
  auctionId: number;
  /**
   * Account Id
   */
  accountId: string;
  /**
   * Order Id
   */
  orderId: string;
};

const METHOD_NAME = 'auction_get_order';

export const auctionGetOrder = createView<AuctionGetOrderRequest, AuctionGetOrderResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('auctionGetOrder'));
        invariant(config.contractId, contractIdErrorMessage('auctionGetOrder'));

        return await config.near.view(config.contractId, METHOD_NAME, {
          account_id: request.accountId,
          auction_id: request.auctionId,
          order_id: request.orderId,
        });
      };
    });

    return {
      createMethod,
    };
  },
);
