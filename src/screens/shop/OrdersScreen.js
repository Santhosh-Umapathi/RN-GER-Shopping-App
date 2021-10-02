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
import * as orderActions from "../../store/actions/orders";
import { useDispatch, useSelector } from "react-redux";
import HeaderButton from "../../components/UI/HeaderButton";

const OrdersScreen = (props) => {
  const { navigation } = props;

  const state = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  return (
    <View style={styles.containerView}>
      <Text style={styles.text}>OrdersScreen</Text>
      <FlatList
        data={state.orders}
        keyExtractor={(key) => key.id}
        renderItem={({ item }) => {
          return <Text>{item.id}</Text>;
        }}
      />
    </View>
  );
};

OrdersScreen.navigationOptions = (props) => {
  const { navigation } = props;
  // const item = navigation.getParam("item");

  return {
    headerLeft: (
      <HeaderButton
        iconName="ios-menu"
        onPress={() => navigation.toggleDrawer()}
      />
    ),
    headerTitle: "Your Orders",
  };
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});

export default OrdersScreen;
