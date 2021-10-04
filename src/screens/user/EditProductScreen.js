import React, { useState, useEffect, useCallback, useReducer } from "react";
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
  Alert,
  KeyboardAvoidingViewBase,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch } from "react-redux";
import HeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";
import * as actions from "../../store/actions/products";

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      const { text, isValid, key } = action.payload;

      const updatedValues = { ...state.inputValues, [key]: text };
      const updatedValidities = { ...state.inputValidities, [key]: isValid };

      let isFormValid = true;
      for (let formKey in updatedValidities) {
        // console.log(
        //   "🚀 --- formReducer --- updatedValidities",
        //   updatedValidities
        // );
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

const EditProductScreen = (props) => {
  const { navigation } = props;
  const item = navigation.getParam("item");
  const dispatch = useDispatch();

  //Validations
  const initialState = {
    inputValues: {
      title: item ? item.title : "",
      description: item ? item.description : "",
      image: item ? item.imageUrl : "",
      price: "",
    },
    inputValidities: {
      title: item ? true : false,
      description: item ? true : false,
      image: item ? true : false,
      price: item ? true : false, //To avoid blocking submission
    },
    formIsValid: item ? true : false,
  };

  const [formState, formDispatch] = useReducer(formReducer, initialState);

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Form is not completed");
      return;
    }
    if (item) {
      dispatch(
        actions.updateProduct(
          item.id,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.image
        )
      );
    } else {
      dispatch(
        actions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.image,
          +formState.inputValues.price
        )
      );
    }
    navigation.goBack();
  }, [formState]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (key, inputValue, inputValidity) => {
      console.log(
        "🚀 --- EditProductScreen --- key, inputValue, inputValidity",
        key,
        inputValue,
        inputValidity
      );
      // let isValid = false;
      // if (text.trim().length === 0) {
      //   isValid = false;
      // } else {
      //   isValid = true;
      // }
      formDispatch({
        type: "UPDATE",
        payload: { text: inputValue, isValid: inputValidity, key },
      });
    },
    [formState]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
      behavior="height"
    >
      <ScrollView style={styles.containerView}>
        <Input
          id="title"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          label="Title"
          errorLabel="Not valid title"
          onInputChange={inputChangeHandler}
          initialValue={item ? item.title : ""}
          initialIsValud={item ? true : false}
          required
        />

        <Input
          id="description"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          label="Description"
          errorLabel="Not valid Description"
          multiline
          numberOfLines={3}
          onInputChange={inputChangeHandler}
          initialValue={item ? item.description : ""}
          initialIsValud={item ? true : false}
          required
        />

        <Input
          id="image"
          returnKeyType="next"
          label="Image"
          errorLabel="Not valid Image"
          onInputChange={inputChangeHandler}
          initialValue={item ? item.imageUrl : ""}
          initialIsValud={item ? true : false}
          required
        />

        {!item && (
          <Input
            id="price"
            keyboardType="decimal-pad"
            returnKeyType="done"
            label="Price"
            errorLabel="Not valid Price"
            onInputChange={inputChangeHandler}
            initialValue={""}
            initialIsValud={item ? true : false}
            required
            min={0.1}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (props) => {
  const { navigation } = props;
  const title = navigation.getParam("title");
  const item = navigation.getParam("item");
  const submit = navigation.getParam("submit");

  return {
    headerRight: (
      <HeaderButton
        iconName={item ? "ios-save" : "ios-checkmark"}
        onPress={submit}
      />
    ),
    headerTitle: title,
  };
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 20,
    marginVertical: 40,
  },
});

export default EditProductScreen;
