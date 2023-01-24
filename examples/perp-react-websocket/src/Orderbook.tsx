import {useState, useEffect, FC, ReactNode} from 'react';
import {perp} from '@spinfi/core';
import {uniq} from '@spinfi/shared';

import {useApi} from './Api';

import './Orderbook.css';

type OrderbookProps = {
  className?: string;
  children?: ReactNode;
};

export const Orderbook: FC<OrderbookProps> = ({className, children}) => {
  const api = useApi();
  const [orderbook, setOrderbook] = useState<perp.BookL3State | null>(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    const subscription = api.spin.listenBookL3(
      {
        marketId: 1,
      },
      {
        onStateOk: (state) => {
          setOrderbook(state);
        },
        onNotifyOk: (notify) => {
          const asks = notify.price_node_changes.filter((node) => {
            return node.side === 'ask';
          });

          if (!asks.length) {
            return;
          }

          setOrderbook((state) => {
            if (!state) {
              return state;
            }

            return {
              ...state,
              price_nodes: {
                ...state.price_nodes,
                asks: uniq(
                  [
                    ...asks.map((ask) => {
                      return [ask.price, ask.quantity] as perp.BookNode;
                    }),
                    ...state.price_nodes.asks,
                  ],
                  (x) => {
                    return x[0];
                  },
                ).filter((x) => {
                  return x[1] !== '0';
                }),
              },
            };
          });
        },
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [api]);

  return (
    <ul className="Orderbook">
      {orderbook?.price_nodes.asks?.map((ask) => {
        return (
          <li className="Orderbook-Item" key={ask[0]}>
            <span className="Orderbook-Price">{ask[0]}</span>
            <span className="Orderbook-Quantity">{ask[1]}</span>
          </li>
        );
      })}
    </ul>
  );
};
