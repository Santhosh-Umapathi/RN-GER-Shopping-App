import Product from "../../model/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const deleteProduct = (producId) => {
  return async (dispatch) => {
    try {
      const deleteResponse = await fetch(
        `https://rn-ger-shopping-app-default-rtdb.europe-west1.firebasedatabase.app/products/${producId}.json`,
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

//Middleware
export const createProduct = (title, description, image, price) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-ger-shopping-app-default-rtdb.europe-west1.firebasedatabase.app/products.json",
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
        }),
      }
    );

    const resData = await response.json();
    console.log("resData", resData);

    dispatch({
      type: CREATE_PRODUCT,
      payload: { id: resData.name, title, description, image, price },
    });
  };
};

export const setProduct = (title, description, image, price) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://rn-ger-shopping-app-default-rtdb.europe-west1.firebasedatabase.app/products.json"
      );

      const resData = await response.json();

      const loadedProducts = [];
      for (let key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].image,
            resData[key].description,
            +resData[key].price
          )
        );
      }

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      dispatch({
        type: SET_PRODUCT,
        payload: loadedProducts,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const updateProduct = (id, title, description, image) => {
  return async (dispatch) => {
    try {
      const updateResponse = await fetch(
        `https://rn-ger-shopping-app-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`,
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
