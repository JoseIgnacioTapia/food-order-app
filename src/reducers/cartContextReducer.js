import { TYPES } from '../actions/cartContextActions';

export const defaultCartState = {
  items: [],
  totalAmount: 0,
};

export function cartContextReducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_ITEM:
      // console.log(action.payload);
      const updatedItems = state.items.concat(action.item);
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

    default:
      return state;
  }
}
