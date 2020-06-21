import React from "react-native";
import { Text } from "react-native";

const ErrorText = (props) => {
  return <View> <Text style={{ color: "red" }}>{props.message}</Text> </View>;
};

export default ErrorText;
