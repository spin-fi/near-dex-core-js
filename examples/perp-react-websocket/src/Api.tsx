import {createContext, useContext, useState, useEffect, FC, ReactNode} from 'react';
import {createPerpApi, PerpApi} from '@spinfi/browser';

export const ApiContext = createContext<PerpApi | null>(null);

export const useApi = () => {
  return useContext(ApiContext);
};

export type ApiProviderProps = {
  children?: ReactNode;
};

export const ApiProvider: FC<ApiProviderProps> = ({children}) => {
  const [api, setApi] = useState<PerpApi | null>(null);

  useEffect(() => {
    const init = async () => {
      const api = await createPerpApi({
        websocket: 'wss://testnet.api.spin.fi/perp/v1/ws',
      });

      setApi(api);
    };

    init();
  }, []);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
