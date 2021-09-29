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

const ProductsOverviewScreen = (props) => {
  const { navigation } = props;

  const state = useSelector((state) => state.products);

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.title}</Text>
      </View>
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

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
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
