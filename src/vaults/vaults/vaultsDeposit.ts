import type {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {invariant} from '@spinfi/shared';

import {transferFt} from '../../native/transferFt';
import {createUnit} from '../../utils/createUnit';
import {contractIdErrorMessage} from './messages';

export type VaultsDepositResponse = FinalExecutionOutcome | void;

export interface VaultsDepositRequest {
  /**
   * Token Address
   */
  tokenAddress: string;
  /**
   * Vault Id
   */
  vaultId: string;
  /**
   * Amount in decimal
   */
  amount: BigInt;
}

export interface VaultsDepositConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
}

export const vaultsDeposit = createUnit<VaultsDepositRequest, VaultsDepositConfig>(
  ({paramsify, methodify}) => {
    const createGetParams = paramsify((config) => {
      const getTransferFtParams = transferFt.createGetParams(config);

      return async (request, unitConfig) => {
        invariant(config.contractId, contractIdErrorMessage('deposit'));

        return await getTransferFtParams(
          {
            ...request,
            receiverId: config.contractId,
            message: `vault-${request.vaultId}`,
          },
          unitConfig,
        );
      };
    });

    const createMethod = methodify((config) => {
      const transferFtMethod = transferFt.createMethod(config);

      return async (request, unitConfig): Promise<VaultsDepositResponse> => {
        invariant(config.contractId, contractIdErrorMessage('vaultsDeposit'));

        return await transferFtMethod(
          {
            ...request,
            receiverId: config.contractId,
            message: `vault-${request.vaultId}`,
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
