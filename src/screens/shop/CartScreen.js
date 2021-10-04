import React, { useState, useEffect, useCallback } from "react";
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
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";

const CartScreen = (props) => {
  const { navigation } = props;

  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const items = [];
  for (const key in state.items) {
    if (key)
      items.push({
        productId: key,
        productTitle: state.items[key].productTitle,
        productPrice: state.items[key].productPrice,
        quantity: state.items[key].quantity,
        sum: state.items[key].sum,
      });
  }

  const renderItem = ({ item }) => {
    return (
      <CartItem
        item={item}
        deletable
        onPress={() => {
          dispatch(cartActions.removeFromCart(item.productId));
        }}
      />
    );
  };

  return (
    <View style={styles.containerView}>
      <View style={styles.summary}>
        <Text style={styles.text}>
          Total:{" "}
          <Text style={styles.total}>
            ${Math.round(state.totalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          title="Order now"
          onPress={() => {
            dispatch(orderActions.addToCart(items, state.totalAmount));
          }}
          disabled={items.length <= 0}
          color={Colors.accentColor}
        />
      </View>
      <View>
        <Text style={styles.text}>Cart Items</Text>
        {items.length > 0 && (
          <FlatList
            data={items}
            keyExtractor={(key) => key.productId}
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
  );
};

CartScreen.navigationOptions = (props) => {
  const { navigation } = props;
  // const item = navigation.getParam("item");

  return {
    headerTitle: "Your Cart",
  };
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#eee",
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    padding: 10,
    justifyContent: "space-between",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    fontFamily: "open-sans",
    textAlign: "center",
    paddingVertical: 5,
  },
  total: {
    color: Colors.primaryColor,
    fontFamily: "open-sans-bold",
    margin: 10,
  },
});

export default CartScreen;
