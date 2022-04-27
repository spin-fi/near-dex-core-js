import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {near} from '@spinfi/number';

import {ContractConfig} from '../../types';
import {PlaceAskRequest} from './placeAsk';
import {USide} from '../types';

/**
 * @category batchOps
 */
export type BatchOpsResponse = FinalExecutionOutcome;

/**
 * @category batchOps
 */
export interface BatchOpsPlace extends PlaceAskRequest {
  orderType: USide;
}

/**
 * @category batchOps
 */
export interface BatchOpsItem {
  /**
   * Market ID
   */
  marketId: number;
  /**
   * Contains a list of orders to be drop
   */
  drop?: string[];
  /**
   * Contains a list of orders to place
   */
  place?: BatchOpsPlace[];
}

/**
 * @category batchOps
 */
export interface BatchOpsRequest {
  /**
   * Enumeration of markets and operations on them
   */
  ops: BatchOpsItem[];
}

/**
 * @category batchOps
 */
export interface BatchOpsConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
}

const GAS = near('300000000000000', true).unwrap();

const METHOD_NAME = 'batch_ops';

export const createBatchOps = ({account, contractId}: ContractConfig) => {
  return async (request: BatchOpsRequest, config?: BatchOpsConfig): Promise<BatchOpsResponse> => {
    return await account.functionCall({
      contractId,
      methodName: METHOD_NAME,
      args: {
        ops: request.ops.map((item) => {
          return {
            market_id: item.marketId,
            drop: item.drop,
            place: item.place?.map((placeItem) => {
              return {
                market_id: placeItem.marketId,
                price: placeItem.price,
                quantity: placeItem.quantity,
                market_order: placeItem.marketOrder,
                order_type: placeItem.orderType,
                client_order_id: placeItem.clientOrderId,
              };
            }),
          };
        }),
      },
      gas: config?.gas?.toString() ?? GAS,
    });
  };
};
