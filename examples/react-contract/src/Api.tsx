import {createContext, useContext, useState, useEffect, FC, ReactNode} from 'react';
import {createSpotApi, SpotApi} from '@spinfi/browser';

export const ApiContext = createContext<SpotApi | null>(null);

export const useApi = () => {
  return useContext(ApiContext);
};

export type ApiProviderProps = {
  children?: ReactNode;
};

export const ApiProvider: FC<ApiProviderProps> = ({children}) => {
  const [api, setApi] = useState<SpotApi | null>(null);

  useEffect(() => {
    const init = async () => {
      const api = await createSpotApi({
        contractId: 'v1.spot.spin-fi.testnet',
        network: 'testnet',
      });

      setApi(api);
    };

    init();
  }, []);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
