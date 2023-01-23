import type {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {invariant} from '@spinfi/shared';

import {transferFt} from '../../native/transferFt';
import {createUnit} from '../../utils/createUnit';
import {contractIdErrorMessage} from './messages';

export type AuctionDepositResponse = FinalExecutionOutcome | void;

export interface AuctionDepositRequest {
  /**
   * Token Address
   */
  tokenAddress: string;
  /**
   * Amount in decimal
   */
  amount: BigInt;
}

export interface AuctionDepositConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
}

export const auctionDeposit = createUnit<AuctionDepositRequest, AuctionDepositConfig>(
  ({paramsify, methodify}) => {
    const createGetParams = paramsify((config) => {
      const getTransferFtParams = transferFt.createGetParams(config);

      return async (request, unitConfig) => {
        invariant(config.contractId, contractIdErrorMessage('auctionDeposit'));

        return await getTransferFtParams(
          {
            ...request,
            receiverId: config.contractId,
            message: `auction`,
          },
          unitConfig,
        );
      };
    });

    const createMethod = methodify((config) => {
      const transferFtMethod = transferFt.createMethod(config);

      return async (request, unitConfig): Promise<AuctionDepositResponse> => {
        invariant(config.contractId, contractIdErrorMessage('auctionDeposit'));

        return await transferFtMethod(
          {
            ...request,
            receiverId: config.contractId,
            message: `auction`,
          },
          unitConfig,
        );
      };
    });

    return {
      createGetParams,
      createMethod,
    };
  },
);
