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
import { useSelector } from "react-redux";

const ProductDetailScreen = (props) => {
  const { navigation } = props;

  const item = navigation.getParam("item");

  const state = useSelector((state) => state.products);

  return (
    <View style={styles.containerView}>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = (props) => {
  const { navigation } = props;
  const item = navigation.getParam("item");

  return {
    headerTitle: item.title,
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

export default ProductDetailScreen;
