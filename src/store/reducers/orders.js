import { ADD_ORDER } from "../actions/orders";
import Orders from "../../model/orders";

//Initial State
const initialState = { orders: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const { cartItems, totalAmount } = action.payload;

      const addOrderState = new Orders(
        new Date().toString(),
        cartItems,
        totalAmount,
        new Date()
      );

      return { ...state, orders: state.orders.concat(addOrderState) };

    default:
      return state;
  }
};
