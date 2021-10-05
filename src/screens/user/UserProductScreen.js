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
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";

const UserProductScreen = (props) => {
  const { navigation } = props;

  const state = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    Alert.alert("Are you sure", "Do you want to proceed", [
      {
        text: "No",
        style: "cancel",
        onPress: () => {
          return;
        },
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          {
            console.log("Delete pressed");
            dispatch(productsActions.deleteProduct(id));
          }
        },
      },
    ]);
  };

  if (state.userProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No Products available</Text>
      </View>
    );
  }

  return (
    <View style={styles.containerView}>
      <FlatList
        data={state.userProducts}
        keyExtractor={(key) => key.id}
        renderItem={({ item }) => {
          return (
            <ProductItem
              item={item}
              onSelect={() => {
                navigation.navigate("EditProducts", {
                  item,
                  title: "Edit Products",
                });
              }}
            >
              <Button
                title="Edit"
                onPress={() => {
                  navigation.navigate("EditProducts", {
                    item,
                    title: "Edit Products",
                  });
                }}
                color={Colors.primaryColor}
              />
              <Button
                title="Delete"
                onPress={() => deleteHandler(item.id)}
                color={Colors.primaryColor}
              />
            </ProductItem>
          );
        }}
      />
    </View>
  );
};

UserProductScreen.navigationOptions = (props) => {
  const { navigation } = props;
  // const item = navigation.getParam("item");

  return {
    headerLeft: (
      <HeaderButton
        iconName="ios-menu"
        onPress={() => navigation.toggleDrawer()}
      />
    ),
    headerRight: (
      <HeaderButton
        iconName="ios-add"
        onPress={() => {
          navigation.navigate("EditProducts", {
            title: "Add Products",
          });
        }}
      />
    ),
    headerTitle: "Your Products",
  };
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
  },
});

export default UserProductScreen;
