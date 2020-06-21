import React, { Component } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import metrics from "../../config/metrics";
import normalize from "../../lib/normalize";
import constants from "../../config/constants";

export default function CustomSelectComponent(props) {
  const imageURI = props.dynamicImage
    ? { uri: props.rightImage }
    : props.rightImage;
  return (
    <TouchableOpacity
      style={{ ...props.style }}
      onPress={() => props.onPress(props.textKey)}
    >
      <View
        style={{
          overflow: "hidden",
          // marginHorizontal: 5,
          height: 40,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: metrics.screenWidth / 3 - normalize(20) - 10,
          // minWidth: 75,
          borderWidth: 0.5,
          borderRadius: 5,
          borderColor: props.selected ? "rgb(105,228,166)" : "rgba(0,0,0,0.16)",
          // paddingHorizontal: 20,
          backgroundColor: props.backgroundColor,
          backgroundColor:
            props.selected && props.withBorder ? "rgb(105,228,166)" : "#FFFFFF",
        }}
      >
        {/* <View
            style={{
              backgroundColor: "#fff",
              borderColor:props.selected? "green":"grey",
              height:50,
              borderWidth:0.5,
              width:60

              
            }}
          > */}
        {props.selected && props.withBorder && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 15,
              height: 10,
              backgroundColor: "rgb(105,228,166)",
              borderBottomRightRadius: 5,
            }}
          />
        )}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            paddingHorizontal: 0,
            alignItems: "center",
          }}
        >
          {/* <Image source={imageURI} style={{marginRight:15,width:20,height:20}} resizeMode="contain"/> */}
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              fontFamily: constants.Fonts.MEDIUM,
              fontSize: 12,
              color:
                props.selected && props.withBorder
                  ? "#000000"
                  : props.selected
                  ? "#FFFFFF"
                  : "#000000",
            }}
          >
            {props.textKey}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
