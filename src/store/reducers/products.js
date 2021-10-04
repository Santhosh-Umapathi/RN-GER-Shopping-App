import PRODUCTS from "../../data/dummy-data";
import Product from "../../model/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((item) => item.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      const productId = action.payload;
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (item) => item.id !== productId
        ),
        availableProducts: state.availableProducts.filter(
          (item) => item.id !== productId
        ),
      };

    case CREATE_PRODUCT:
      const { id, title, description, image, price } = action.payload;

      const createdProduct = new Product(
        id,
        "u1",
        title,
        image,
        description,
        price
      );

      return {
        ...state,
        availableProducts: [...state.availableProducts, createdProduct],
        userProducts: [...state.userProducts, createdProduct],
      };

    case UPDATE_PRODUCT:
      const {
        id: uId,
        title: uTitle,
        description: uDescription,
        image: uImage,
      } = action.payload;

      const index = state.userProducts.findIndex((item) => item.id === uId);
      const updatedProduct = new Product(
        uId,
        state.userProducts[index].ownerId,
        uTitle,
        uImage,
        uDescription,
        state.userProducts[index].price
      );

      const updatedUserProduct = [...state.userProducts];
      updatedUserProduct[index] = updatedProduct;

      const indexA = state.availableProducts.findIndex(
        (item) => item.id === uId
      );
      const updatedAProduct = new Product(
        uId,
        state.availableProducts[indexA].ownerId,
        uTitle,
        uImage,
        uDescription,
        state.availableProducts[indexA].price
      );

      const updatedvailableProduct = [...state.availableProducts];
      updatedvailableProduct[indexA] = updatedAProduct;

      return {
        ...state,
        availableProducts: updatedvailableProduct,
        userProducts: updatedUserProduct,
      };

    case SET_PRODUCT:
      const loadedProducts = action.payload;
      return {
        ...state,
        userProducts: loadedProducts.filter((item) => item.id !== productId),
        availableProducts: loadedProducts,
      };

    default:
      return state;
  }
};
