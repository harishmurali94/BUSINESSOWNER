import React from "react";
import { View, TextInput, Image } from "react-native";
import Styles, { Colors } from "./style";

const Input = (props) => (
  <View style={[Styles.container, props.style]}>
    {/* {props.lefticon && <Image source={props.lefticon} style={Styles.icon} />} */}
    <TextInput
      style={Styles.input}
      maxLength={props.maxLength}
      keyboardType={props.keyboardType}
      onChangeText={props.onChangeText}
      editable={props.disabled ? false : true}
      value={props.value}
      placeholder={props.placeholder ? props.placeholder : ""}
      placeholderTextColor={Colors.placeholder}
      autoCapitalize="sentences"
    />
    {props.icon && <Image source={props.icon} style={Styles.icon} />}
  </View>
);

export default Input;
