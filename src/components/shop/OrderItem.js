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
import CartItem from "../../components/shop/CartItem";
import moment from "moment";

const OrderItem = (props) => {
  const { navigation, item } = props;

  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.containerView}>
      <View style={styles.summary}>
        <Text style={styles.date}>
          {
            moment(item.date).format("MMMM Do YYYY, hh:mm")
            /* item.date.toLocaleString("en-EN", year: "numeric",month: "long",day: "numeric",hour: "2-digit" minute: "2-digit"}) Doesn't format on Android*/
          }
        </Text>
        <Text style={styles.total}>${item.totalAmount.toFixed(2)}</Text>
      </View>
      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => setShowDetails((prevState) => !prevState)}
      />
      {showDetails && (
        <View style={{ width: "100%" }}>
          {item.items.map((cItem) => {
            return <CartItem item={cItem} key={cItem.productId} />;
          })}
        </View>
      )}
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
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    width: "90%",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    margin: 15,
  },
  total: { fontFamily: "open-sans-bold", fontSize: 16 },
  date: { fontFamily: "open-sans", fontSize: 16, color: "#888" },
});

export default OrderItem;
