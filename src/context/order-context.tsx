import { createContext, useContext, useState } from 'react';
import type { CartItem } from '../types/cart-item';

type CartContextType = {
  itens: CartItem[];
  table: string;
  addTable: (table: string) => void;
  clearTable: () => void;
  handleIncrementItem: (item: CartItem) => void;
  handleDecrementItem: (item: CartItem) => void;
  clearItens: () => void;
};

const OrderContext = createContext({} as CartContextType);

type OrderProviderProps = {
  children: React.ReactNode;
};

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [table, setTable] = useState<string>('');
  const [itens, setItens] = useState<CartItem[]>([]);

  const addTable = (table: string) => {
    setTable(table);
  };

  const clearTable = () => {
    setTable('');
  };

  const handleIncrementItem = (item: CartItem) => {
    const itemExists = itens.findIndex(
      ({ product }) => item.product._id === product._id
    );

    if (itemExists >= 0) {
      setItens(state => {
        return state.map(cartItem => {
          if (cartItem.product._id === item.product._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }

          return cartItem;
        });
      });

      return;
    }

    setItens(state => {
      return [...state, item];
    });
  };

  const handleDecrementItem = (item: CartItem) => {
    const itemExists = itens.find(
      ({ product }) => item.product._id === product._id
    );

    if (itemExists?.quantity && itemExists.quantity > 1) {
      setItens(state => {
        return state.map(cartItem => {
          if (cartItem.product._id === item.product._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            };
          }

          return cartItem;
        });
      });

      return;
    }

    setItens(state => {
      return state.filter(
        cartItem => cartItem.product._id !== item.product._id
      );
    });
  };

  const clearItens = () => {
    setItens([]);
  };

  return (
    <OrderContext.Provider
      value={{
        itens,
        table,
        handleIncrementItem,
        handleDecrementItem,
        clearItens,
        addTable,
        clearTable,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  return useContext(OrderContext);
};
