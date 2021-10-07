import { TYPES } from '../actions/cartContextActions';

export const defaultCartState = {
  items: [],
  totalAmount: 0, // Total Price $
};

export function cartContextReducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_ITEM:
      // console.log(action.payload);
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;

      const existingCartItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

    default:
      return state;
  }
}
