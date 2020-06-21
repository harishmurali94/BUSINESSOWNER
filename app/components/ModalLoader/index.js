import React, { Component } from "react";
import { View, ActivityIndicator, Modal, Dimensions } from "react-native";
import { Circle } from 'react-native-animated-spinkit'

const screenHeight = Dimensions.get("window").height;

export default function ModalLoader(props){
  return(
<Modal
    animationType="fade"
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }}
    transparent={true}
    visible={props.visible}
  >
    <View
      style={{
        height: screenHeight,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
      }}
    >
      <View style={{width:90,height:90,backgroundColor:"#fff", alignItems: "center",
        justifyContent: "center",borderRadius:10}}>
        <Circle size={50} color={"green"}/>
      </View>
      
    </View>
  </Modal>
  )
}

// const ModalLoader = ({visible}) => (
//   return(
//   )
// );
// export default ModalLoader;