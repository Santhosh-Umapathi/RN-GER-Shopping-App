import React, { useState, useEffect, useCallback } from "react";
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
} from "react-native";
import { useDispatch } from "react-redux";
import HeaderButton from "../../components/UI/HeaderButton";
import * as actions from "../../store/actions/products";

const EditProductScreen = (props) => {
  const { navigation } = props;
  const item = navigation.getParam("item");
  const dispatch = useDispatch();

  const [title, setTitle] = useState(item ? item.title : "");
  const [description, setDescription] = useState(item ? item.description : "");
  const [image, setImage] = useState(item ? item.imageUrl : "");
  const [price, setPrice] = useState("");

  const submitHandler = useCallback(() => {
    if (item) {
      dispatch(actions.updateProduct(item.id, title, description, image));
      navigation.goBack();
    } else {
      dispatch(actions.createProduct(title, description, image, +price));
      navigation.goBack();
    }
  }, [title, description, image, price]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView style={styles.containerView}>
      <View style={styles.form}>
        <Text style={styles.text}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      </View>
      <View>
        <Text style={styles.text}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View>
        <Text style={styles.text}>Image</Text>
        <TextInput style={styles.input} value={image} onChangeText={setImage} />
      </View>
      {!item && (
        <View>
          <Text style={styles.text}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
          />
        </View>
      )}
    </ScrollView>
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
  },
  text: {
    fontSize: 15,
    marginVertical: 8,
    fontFamily: "open-sans-bold",
  },
  input: { padding: 10, borderBottomColor: "#ccc", borderBottomWidth: 1 },
  form: { width: "100%" },
});

export default EditProductScreen;
