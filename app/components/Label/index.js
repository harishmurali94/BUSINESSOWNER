import React from "react";
import { View, Text } from "react-native";
import Images from "../../assets";
import { Input } from "../../components";
import Styles from "./style";

export const LabelTypes = {
  LARGE: "large",
  MEDIUM: "medium",
  SMALL: "small",
};

const Label = ({ type, text, style, textStyle }) => (
  <View style={[Styles.container, style]}>
    <Text
      style={[Styles.text, Styles[type ? type : LabelTypes.MEDIUM], textStyle]}
    >
      {text ? text : "Button"}
    </Text>
  </View>
);

export default Label;
