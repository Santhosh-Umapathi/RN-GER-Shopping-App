import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
//Redux
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
//Reducers
import productReducers from "./src/store/reducers/products";
import cartReducers from "./src/store/reducers/cart";
import ordersReducers from "./src/store/reducers/orders";
import authReducers from "./src/store/reducers/auth";
//Navigation
import NavigationContainer from "./src/navigation/NavigationContainer";
//Screens
import SplashScreen from "./SplashScreen";

//Loading fonts
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  const rootReducer = combineReducers({
    products: productReducers,
    cart: cartReducers,
    orders: ordersReducers,
    auth: authReducers,
  });

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );

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
      {showSplash ? <SplashScreen /> : <NavigationContainer />}
    </Provider>
  );
}
