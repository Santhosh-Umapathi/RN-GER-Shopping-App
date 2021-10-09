import React from "react";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

//Constants
import Colors from "../constants/Colors";
//Screens
import ProductsOverviewScreen, {
  productsOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, {
  screenOptions as productDetailScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import CartScreen, {
  screenOptions as cartScreenOptions,
} from "../screens/shop/CartScreen";
import OrdersScreen, {
  screenOptions as ordersScreenOptions,
} from "../screens/shop/OrdersScreen";
import UserProductScreen, {
  screenOptions as userProductScreenOptions,
} from "../screens/user/UserProductScreen";
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from "../screens/user/EditProductScreen";
import SplashScreen from "../screens/SplashScreen";
import AuthScreen from "../screens/user/AuthScreen";
//Redux
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

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

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => (
  <ProductsStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
    <ProductsStackNavigator.Screen
      name="ProductsOverview"
      component={ProductsOverviewScreen}
      options={productsOverviewScreenOptions}
    />
    <ProductsStackNavigator.Screen
      name="ProductsDetails"
      component={ProductDetailScreen}
      options={productDetailScreenOptions}
    />
    <ProductsStackNavigator.Screen
      name="Cart"
      component={CartScreen}
      options={cartScreenOptions}
    />
  </ProductsStackNavigator.Navigator>
);

// createStackNavigator(
//   //   {
//   //     ProductsOverview: ProductsOverviewScreen,
//   //     ProductsDetails: ProductDetailScreen,
//   //     Cart: CartScreen,
//   //   },
//   {
//     // defaultNavigationOptions,
//     navigationOptions: {
//       drawerIcon: (props) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
//           size={25}
//           color={props.tintColor}
//         />
//       ),
//     },
//   }
// );

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => (
  <OrdersStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
    <OrdersStackNavigator.Screen
      name="Orders"
      component={OrdersScreen}
      options={ordersScreenOptions}
    />
  </OrdersStackNavigator.Navigator>
);

// const OrdersNavigator = createStackNavigator(
//   {
//     Orders: OrdersScreen,
//   },
//   {
//     defaultNavigationOptions,
//     navigationOptions: {
//       drawerIcon: (props) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-list" : "ios-list"}
//           size={25}
//           color={props.tintColor}
//         />
//       ),
//     },
//   }
// );

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => (
  <AdminStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
    <AdminStackNavigator.Screen
      name="UserProducts"
      component={UserProductScreen}
      options={userProductScreenOptions}
    />
    <AdminStackNavigator.Screen
      name="EditProducts"
      component={EditProductScreen}
      options={editProductScreenOptions}
    />
  </AdminStackNavigator.Navigator>
);

// const AdminNavigator = createStackNavigator(
//   {
//     UserProducts: UserProductScreen,
//     EditProducts: EditProductScreen,
//   },
//   {
//     defaultNavigationOptions,
//     navigationOptions: {
//       drawerIcon: (props) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-create" : "ios-create"}
//           size={25}
//           color={props.tintColor}
//         />
//       ),
//     },
//   }
// );

// const DrawerNavigator = createDrawerNavigator(
//   {
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator,
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primaryColor,
//     },
//     contentComponent: (props) => {
//       const dispatch = useDispatch();

//       return (
//         <View style={{ flex: 1, padding: 20 }}>
//           <SafeAreaView>
//             <DrawerItems {...props} />
//             <Button
//               title="Logout"
//               color={Colors.primaryColor}
//               onPress={() => dispatch(authActions.logout())}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     },
//   }
// );

// const AuthNavigator = createStackNavigator(
//   {
//     Auth: AuthScreen,
//   },
//   {
//     defaultNavigationOptions,
//   }
// );

// const MainNavigator = createSwitchNavigator({
//   Splash: SplashScreen,
//   Auth: AuthNavigator,
//   Shop: DrawerNavigator,
// });

// export default createAppContainer(MainNavigator);
