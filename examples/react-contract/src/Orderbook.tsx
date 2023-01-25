import {useState, useEffect, FC, ReactNode} from 'react';
import {spot} from '@spinfi/core';

import {useApi} from './Api';

import './Orderbook.css';

type OrderbookProps = {
  className?: string;
  children?: ReactNode;
};

export const Orderbook: FC<OrderbookProps> = ({className, children}) => {
  const api = useApi();
  const [orderbook, setOrderbook] = useState<spot.GetOrderbookResponse | null>(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    const load = async () => {
      const response = await api.spin.getOrderbook({
        marketId: 1,
      });

      setOrderbook(response);
    };

    load();
  }, [api]);

  return (
    <ul className="Orderbook">
      {orderbook?.ask_orders?.map((ask) => {
        return (
          <li className="Orderbook-Item" key={ask.price}>
            <span className="Orderbook-Price">{ask.price}</span>
            <span className="Orderbook-Quantity">{ask.quantity}</span>
          </li>
        );
      })}
    </ul>
  );
};
