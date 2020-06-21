import React, { Component } from 'react';

import { StyleSheet, View, TextInput, Image } from 'react-native';

export default function CustomTextInput(props) {
  return (
    <View>
      <View style={styles.SectionStyle}>
        {props.isLeftImage && (
          <Image source={props.leftImage} style={styles.ImageStyle} />
        )}

        <TextInput
          style={{ flex: 1 }}
          placeholder={props.placeholder}
          editable={props.editable}
          underlineColorAndroid="transparent"
          onChangeText={data => props.onChangeText(data,props.keyText)}
          value={props.value}
          keyboardType={props.keyboardType}
        />
        {props.isRightImage && (
          <Image source={props.rightImage} style={styles.ImageStyle} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     margin: 10,
  //   },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(240,243,244)',
    borderWidth: 0.5,
    borderColor: 'rgb(200,209,211)',
    height: 60,
    borderRadius: 5,
    padding:5,
    marginTop:5
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 21,
    width: 34,
    resizeMode: 'contain',
    alignItems: 'center',
  },
});
