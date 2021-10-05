import React, { useEffect, useRef } from "react";

import { NavigationActions } from "react-navigation";
import { useSelector } from "react-redux";
import ShopNavigator from "./ShopNavigator";

const NavigationContainer = () => {
  const isAuth = useSelector((state) => !!state.auth.token); //true or false

  const ref = useRef();

  useEffect(() => {
    if (!isAuth) {
      ref.current.dispatch(NavigationActions.navigate({ routeName: "Auth" }));
    }
  }, [isAuth]);

  return <ShopNavigator ref={ref} />;
};

export default NavigationContainer;
