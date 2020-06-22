import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import CustomText from '../CustomText';
import Styles from './style';


const CustomButton = props => {
  return (
    <View style={Styles.view_container}>
      <TouchableOpacity
        onPress={() => props.onPressed()}
        style={Styles.button_container}>
          <CustomText text={props.buttonText} style={{ fontWeight: 'bold', color: 'rgb(15,10,64)', fontSize: 20 }}/>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
