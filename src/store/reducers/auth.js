import { LOGIN, SIGNUP } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const loginPayload = action.payload;

      return {
        ...state,
        token: loginPayload.token,
        userId: loginPayload.userId,
      };

    case SIGNUP:
      const signUpPayload = action.payload;

      return {
        ...state,
        token: signUpPayload.token,
        userId: signUpPayload.userId,
      };

    default:
      return state;
  }
};
