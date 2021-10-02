import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import ShopNavigator from "./src/navigation/ShopNavigator";
import { composeWithDevTools } from "redux-devtools-extension";
//Reducers
import productReducers from "./src/store/reducers/products";
import cartReducers from "./src/store/reducers/cart";
import ordersReducers from "./src/store/reducers/orders";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

//Loading fonts
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const rootReducer = combineReducers({
    products: productReducers,
    cart: cartReducers,
    orders: ordersReducers,
  });

  const store = createStore(rootReducer, composeWithDevTools());

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={() => console.log("error app loading")}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
