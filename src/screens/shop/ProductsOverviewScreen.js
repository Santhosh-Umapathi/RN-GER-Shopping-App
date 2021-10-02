import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  FlatList,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";

import HeaderButton from "../../components/UI/HeaderButton";

const ProductsOverviewScreen = (props) => {
  const { navigation } = props;

  const state = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => {
    return (
      <ProductItem
        item={item}
        onViewDetails={() => {
          navigation.navigate("ProductsDetails", {
            item,
          });
        }}
        onAddToCard={() => {
          dispatch(cartActions.addToCart(item));
        }}
      />
    );
  };

  return (
    <View style={styles.containerView}>
      <FlatList
        data={state.availableProducts}
        keyExtractor={(key) => key.id}
        renderItem={renderItem}
      />
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = (props) => {
  const { navigation } = props;

  return {
    headerTitle: "All Products",
    headerLeft: (
      <HeaderButton
        iconName="ios-menu"
        onPress={() => navigation.toggleDrawer()}
      />
    ),
    headerRight: (
      <HeaderButton
        iconName="ios-cart"
        onPress={() => navigation.navigate("Cart")}
      />
    ),
  };
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});

export default ProductsOverviewScreen;
