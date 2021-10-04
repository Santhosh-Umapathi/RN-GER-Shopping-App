import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
} from "react-navigation";
import Colors from "../constants/Colors";
//Screens
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductScreen from "../screens/user/UserProductScreen";

import { Ionicons } from "@expo/vector-icons";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: { fontFamily: "open-sans" },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductsDetails: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions,
    navigationOptions: {
      drawerIcon: (props) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={25}
          color={props.tintColor}
        />
      ),
    },
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    defaultNavigationOptions,
    navigationOptions: {
      drawerIcon: (props) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={25}
          color={props.tintColor}
        />
      ),
    },
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductScreen,
  },
  {
    defaultNavigationOptions,
    navigationOptions: {
      drawerIcon: (props) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={25}
          color={props.tintColor}
        />
      ),
    },
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primaryColor,
    },
  }
);

export default createAppContainer(DrawerNavigator);
