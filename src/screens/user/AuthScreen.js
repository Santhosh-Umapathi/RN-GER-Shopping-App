import React, { useState, useEffect, useReducer, useCallback } from "react";
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
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as authActions from "../../store/actions/auth";

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      const { text, isValid, key } = action.payload;

      const updatedValues = { ...state.inputValues, [key]: text };
      const updatedValidities = { ...state.inputValidities, [key]: isValid };

      let isFormValid = true;
      for (let formKey in updatedValidities) {
        isFormValid = isFormValid && updatedValidities[formKey];
      }

      return {
        ...state,
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: isFormValid,
      };

    default:
      break;
  }
};

const AuthScreen = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  //Validations
  const initialState = {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  };

  const [formState, formDispatch] = useReducer(formReducer, initialState);

  const authHandler = async () => {
    setIsError(null);

    setIsLoading(true);

    try {
      if (isSignUp) {
        await dispatch(
          authActions.signUp(
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
      } else {
        await dispatch(
          authActions.login(
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
      }
    } catch (error) {
      setIsError(error.message);
    }

    setIsLoading(false);
  };

  const inputChangeHandler = useCallback(
    (key, inputValue, inputValidity) => {
      formDispatch({
        type: "UPDATE",
        payload: { text: inputValue, isValid: inputValidity, key },
      });
    },
    [formState]
  );

  useEffect(() => {
    isError && Alert.alert(isError);
  }, [isError]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={["#ffedff", "#ffe3ff", "#ffe33f", "#333"]}
        style={styles.gradient}
      >
        {/* {isError &&
          Alert.alert(isError, null, null, {
            onDismiss: () => {
              setIsError(null);
            },
          })} */}

        <Card style={styles.card}>
          <ScrollView style={styles.container}>
            <Input
              id="email"
              label="Email"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorLabel="Enter valid email"
              onInputChange={inputChangeHandler}
              initialValue=""
            />

            <Input
              id="password"
              label="Password"
              //   keyboardType="password"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorLabel="Enter valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />

            <View style={styles.button}>
              <Button
                title={isSignUp ? "SignUp" : "Login"}
                onPress={authHandler}
                color={Colors.primaryColor}
              />
            </View>
            <View style={styles.button}>
              <Button
                title={isSignUp ? "Go to Login" : "Go to Signup"}
                onPress={() => {
                  setIsSignUp(!isSignUp);
                }}
                color={Colors.accentColor}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = (props) => {
  const { navigation } = props;
  //   const item = navigation.getParam("item");

  return {
    headerTitle: "Authenticate",
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  card: {
    padding: 20,
    maxHeight: 400,
    width: "80%",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthScreen;
