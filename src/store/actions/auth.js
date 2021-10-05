import Firebase from "../../constants/Firebase";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const signUp = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        Firebase.SIGNUP_ENDPOINT + Firebase.API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const resData = await response.json();

      let errorMessage = "Something went wrong";

      if (!response.ok) {
        const errorId = resData.error.message;

        if (errorId === "EMAIL_NOT_FOUND") {
          errorMessage = "This email is not found";
        } else if (errorId === "INVALID_PASSWORD") {
          errorMessage = "Incorrect Password";
        } else if (errorId === "INVALID_EMAIL") {
          errorMessage = "Email is not valid";
        } else if (errorId === "MISSING_PASSWORD") {
          errorMessage = "Password is not valid";
        } else if (errorId === "EMAIL_EXISTS") {
          errorMessage = "This email already used";
        } else if (errorId === "OPERATION_NOT_ALLOWED") {
          errorMessage = "Not allowed";
        } else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
          errorMessage = "Too many attempts, try again later";
        } else if (errorId === "USER_DISABLED") {
          errorMessage = "Account blocked temporarily";
        }

        throw new Error(errorMessage);
      }

      dispatch({
        type: SIGNUP,
        payload: { token: resData.idToken, userId: resData.localId },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        Firebase.SIGNIN_ENDPOINT + Firebase.API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const resData = await response.json();

      let errorMessage = "Something went wrong";

      if (!response.ok) {
        const errorId = resData.error.message;
        console.log("🚀 --- return --- errorId", errorId);

        if (errorId === "EMAIL_NOT_FOUND") {
          errorMessage = "This email is not found";
        } else if (errorId === "INVALID_PASSWORD") {
          errorMessage = "Incorrect Password";
        } else if (errorId === "INVALID_EMAIL") {
          errorMessage = "Email is not valid";
        } else if (errorId === "MISSING_PASSWORD") {
          errorMessage = "Password is not valid";
        } else if (errorId === "EMAIL_EXISTS") {
          errorMessage = "This email already used";
        } else if (errorId === "OPERATION_NOT_ALLOWED") {
          errorMessage = "Not allowed";
        } else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
          errorMessage = "Too many attempts, try again later";
        } else if (errorId === "USER_DISABLED") {
          errorMessage = "Account blocked temporarily";
        }

        throw new Error(errorMessage);
      }

      dispatch({
        type: LOGIN,
        payload: { token: resData.idToken, userId: resData.localId },
      });
    } catch (error) {
      throw error;
    }
  };
};
