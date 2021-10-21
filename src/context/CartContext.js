import { createContext } from 'react';
import { useReducer } from 'react';
import {
  defaultCartState,
  cartContextReducer,
} from '../reducers/cartContextReducer';

export const CartContext = createContext();

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(
    cartContextReducer,
    defaultCartState
  );

  const addItemToCartHandler = item => {
    dispatchCartAction({ type: 'ADD_ITEM', payload: item });
  };

  const removeItemFromCartHandler = id => {
    dispatchCartAction({ type: 'DELETE_ITEM', payload: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
