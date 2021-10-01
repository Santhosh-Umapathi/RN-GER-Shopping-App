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
  TouchableNativeFeedback,
} from "react-native";
import Colors from "../../constants/Colors";

const ProductItem = (props) => {
  const { navigation, item, onViewDetails, onAddToCard } = props;

  const TouchableComponent =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <View style={styles.containerView}>
      <TouchableComponent onPress={onViewDetails} useForeground>
        <View>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text2}>${item.price.toFixed(2)}</Text>
          </View>

          <View style={styles.actions}>
            <Button
              title="View Details"
              onPress={onViewDetails}
              color={Colors.primaryColor}
            />
            <Button
              title="To Cart"
              onPress={onAddToCard}
              color={Colors.primaryColor}
            />
          </View>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    height: 300,
    margin: 20,
  },
  image: {
    width: "100%",
    height: "60%",
    borderRadius: 10,
  },
  textContainer: {
    alignItems: "center",
    height: "15%",
  },
  text: {
    fontSize: 20,
    marginVertical: 5,
    fontFamily: "open-sans-bold",
  },
  text2: {
    fontSize: 16,
    color: "#888",
    fontFamily: "open-sans",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "25%",
    paddingHorizontal: 20,
  },
});

export default ProductItem;
