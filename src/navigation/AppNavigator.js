import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
//Navigator
import { ProductsNavigator } from "./ShopNavigator";

const AppNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.token); //true or false

  return (
    <NavigationContainer>
      <ProductsNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
