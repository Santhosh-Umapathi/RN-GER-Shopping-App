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
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";

import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = (props) => {
  const { navigation } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const state = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const loadProducts = async (params) => {
    setIsError(false);
    setIsRefreshing(true);
    try {
      await dispatch(productActions.setProduct());
    } catch (error) {
      setIsError(true);
    }
    setIsRefreshing(false);
  };

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const focus = props.navigation.addListener("willFocus", loadProducts);

    return () => {
      focus.remove();
    };
  }, [loadProducts]);

  const renderItem = ({ item }) => {
    return (
      <ProductItem
        item={item}
        onSelect={() => {
          navigation.navigate("ProductsDetails", {
            item,
          });
        }}
      >
        <Button
          title="View Details"
          onPress={() => {
            navigation.navigate("ProductsDetails", {
              item,
            });
          }}
          color={Colors.primaryColor}
        />
        <Button
          title="To Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(item));
          }}
          color={Colors.primaryColor}
        />
      </ProductItem>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (!isLoading && state.availableProducts.length === 0) {
    return (
      <View style={styles.loading}>
        <Text>No Products available</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong</Text>
      </View>
    );
  }

  return (
    <View style={styles.containerView}>
      <FlatList
        data={state.availableProducts}
        keyExtractor={(key) => key.id}
        renderItem={renderItem}
        onRefresh={loadProducts}
        refreshing={isRefreshing}
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductsOverviewScreen;
