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
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    defaultNavigationOptions,
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primaryColor,
    },
  }
);

export default createAppContainer(DrawerNavigator);
