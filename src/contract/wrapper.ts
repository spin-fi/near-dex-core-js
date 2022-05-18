import {invariant} from '@spinfi/shared';

import {Config, ContractConfig} from '../types';
import {
  ACCOUNT_MESSAGE,
  TRANSACTION_MANAGER_MESSAGE,
  CONTRACT_ID_MESSAGE,
  PROVIDER_MESSAGE,
} from './consts';

export const createAsyncContractWrapper = ({
  account,
  contractId,
  transactionManager,
  provider,
}: Config) => {
  return <T extends any[], R>(create: (config: ContractConfig) => (...args: T) => Promise<R>) => {
    return (...args: T) => {
      invariant(account, ACCOUNT_MESSAGE);
      invariant(transactionManager, TRANSACTION_MANAGER_MESSAGE);
      invariant(contractId, CONTRACT_ID_MESSAGE);
      invariant(provider, PROVIDER_MESSAGE);

      const action = create({
        account,
        transactionManager,
        contractId,
        provider,
      });

      return action(...args);
    };
  };
};

export const createSyncContractWrapper = ({
  account,
  contractId,
  transactionManager,
  provider,
}: Config) => {
  return <T extends any[], R>(create: (config: ContractConfig) => (...args: T) => R) => {
    return (...args: T) => {
      invariant(account, ACCOUNT_MESSAGE);
      invariant(transactionManager, TRANSACTION_MANAGER_MESSAGE);
      invariant(contractId, CONTRACT_ID_MESSAGE);
      invariant(provider, PROVIDER_MESSAGE);

      const action = create({
        account,
        transactionManager,
        contractId,
        provider,
      });

      return action(...args);
    };
  };
};
