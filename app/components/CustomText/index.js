import React from 'react';
import { Text } from 'react-native';


const CustomText = props => {
   
  return <Text style={props.style}>{props.text}</Text>;
};

export default CustomText;
