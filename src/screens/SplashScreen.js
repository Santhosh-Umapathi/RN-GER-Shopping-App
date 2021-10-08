import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useDispatch } from "react-redux";
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
      <Image
        source={{
          uri: "https://cdn.dribbble.com/users/2046015/screenshots/5973727/06-loader_telega.gif",
        }}
        style={{
          width: "60%",
          height: "30%",
          marginLeft: -40,
          marginBottom: 10,
        }}
        resizeMode="cover"
      />
      <Text style={styles.text}>Shopping</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: Colors.splash,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.accentColor,
  },
});

export default SplashScreen;
