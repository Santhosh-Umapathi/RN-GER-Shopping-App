import Firebase from "../../constants/Firebase";
import Product from "../../model/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

//Middleware
export const createProduct = (title, description, image, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      Firebase.URL_ENDPOINT + `/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          image,
          price,
          ownerId: userId,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        id: resData.name,
        title,
        description,
        image,
        price,
        ownerId: userId,
      },
    });
  };
};

export const setProduct = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        Firebase.URL_ENDPOINT + `/products.json?auth=${token}`
      );

      const resData = await response.json();

      const loadedProducts = [];
      for (let key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].image,
            resData[key].description,
            +resData[key].price
          )
        );
      }

      if (!response.ok) {
        // console.log("🚀 --- return --- response", response);
        throw new Error("Something went wrong");
      }

      dispatch({
        type: SET_PRODUCT,
        payload: {
          loadedProducts,
          userProducts: loadedProducts.filter(
            (item) => item.ownerId === userId
          ),
        },
      });
    } catch (error) {
      // console.log("🚀 --- return --- error", error);
      throw error;
    }
  };
};

export const updateProduct = (id, title, description, image) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const updateResponse = await fetch(
        Firebase.URL_ENDPOINT + `/products/${id}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            image,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Update failed");
      }

      dispatch({
        type: UPDATE_PRODUCT,
        payload: { id, title, description, image },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = (producId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const deleteResponse = await fetch(
        Firebase.URL_ENDPOINT + `/products/${producId}.json?auth=${token}`,
        {
          method: "DELETE",
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Something went wrong");
      }

      dispatch({
        type: DELETE_PRODUCT,
        payload: producId,
      });
    } catch (error) {
      throw error;
    }
  };
};
