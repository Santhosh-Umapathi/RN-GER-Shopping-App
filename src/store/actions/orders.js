export const ADD_ORDER = "ADD_ORDER";

export const addToCart = (cartItems, totalAmount) => {
  return {
    type: ADD_ORDER,
    payload: { cartItems, totalAmount },
  };
};
