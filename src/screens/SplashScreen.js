import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { useDispatch } from "react-redux";
import Card from "../components/UI/Card";
import * as authActions from "../store/actions/auth";

const SplashScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const tryLogin = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("userData"));

    //No user data saved before
    if (!userData) {
      setTimeout(() => {
        navigation.navigate("Auth");
        return;
      }, 2000);
    }

    //Token expiry check
    const { token, userId, expiryDate } = userData;

    const expirationDate = new Date(expiryDate);

    if (expirationDate <= new Date() || !token || !userId) {
      setTimeout(() => {
        navigation.navigate("Auth");
        return;
      }, 2000);
    }

    //Remaining time for auto logout
    const expTime = expirationDate.getTime() - new Date().getTime();

    setTimeout(() => {
      navigation.navigate("Shop");
      dispatch(authActions.authenticate(userId, token, expTime));
    }, 2000);
  };

  useEffect(() => {
    tryLogin();
  }, []);

  return (
    <View style={styles.containerView}>
      {/* <Card style={styles.card}> */}
      <Image
        source={{
          uri: "https://i.pinimg.com/originals/19/7e/8f/197e8fae2c1dc45c3611080e71cc3408.gif",
        }}
        resizeMode="contain"
        style={styles.image}
      />
      {/* </Card> */}
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  //   card: {
  //     width: "80%",
  //     height: "40%",
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
});

export default SplashScreen;
