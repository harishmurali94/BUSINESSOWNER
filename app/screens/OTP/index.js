import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style";
import * as otpActions from "app/actions/otpActions";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import NavigationHeader from "../../components/NavigationHeader/NavigationHeader";
import Images from "../../config/images";
import { SafeAreaView } from "react-native-safe-area-context";
import Geolocation from "@react-native-community/geolocation";
import { Input, Button, Label, LabelTypes } from "../../components";
import Constants from "../../config/constants";

// function verify(navigation) {
//   navigation.navigate('Boarding');
// }

const Strings = {
  verify_your_otp: "Verify Your OTP",
  enter_otp: "Enter the OTP sent to",
  recieve_otp: "Didn't Receive OTP?",
  resend_text: "RESEND OTP",
  verify_otp: "Verify OTP",
};

export default function OtpScreen(props) {
  // const lan = useSelector(state => state.languageReducer.language);
  const phone = useSelector((state) => state.loginReducer.mobileNumber);
  const fcmToken = useSelector((state) => state.loginReducer.deviceRegId);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  // setI18nConfig(lan);

  function callback() {
    let data = {
      countryCode: "+65",
      mobileNumber: phone,
      deviceRegId: fcmToken,
      otp: otp,
      lattitude: position.latitude,
      longitude: position.longitude,
    };
    dispatch(otpActions.requestOtp(data));

    // props.navigation.navigate('Boarding');
  }

  function resendOtp() {
    let data = {
      countryCode: "+65",
      mobileNumber: phone,
      deviceRegId: fcmToken,
    };
    dispatch(loginActions.requestLogin(data, true));
  }

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setError("");
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (e) => setError(e.message)
    );
  }, []);

  leftPress = () => {
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationHeader isBack={true} leftPress={this.leftPress} />
      <ScrollView style={styles.container}>
        <View
          style={{
            height: Dimensions.get("screen").height / 3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image resizeMode={"contain"} source={Images.otp.otp_banner} />
        </View>
        <View style={{ marginVertical: 15 }}>
          <Label
            style={{
              fontFamily: "Lato-Regular",
              fontWeight: "bold",
              fontSize: 25,
              color: "rgb(15,10,64)",
            }}
            text={Strings.verify_your_otp}
            textStyle={{ fontSize: 28, fontFamily: Constants.Fonts.BLACK }}
          />
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 12,
                color: "rgb(160,160,160)",
                marginTop: 5,
                fontFamily: Constants.Fonts.MEDIUM,
                fontSize: 12,
              }}
            >
              {Strings.enter_otp}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "rgb(15,10,64)",
                marginTop: 4,
                marginLeft: 3,
                fontFamily: Constants.Fonts.MEDIUM,
                fontSize: 12,
              }}
            >{`+65 ${phone}`}</Text>
          </View>

          <OTPInputView
            style={{
              width: "100%",
              height: 100,
              color: "rgb(38,38,38)",
              fontWeight: "bold",
            }}
            pinCount={4}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(code) => {
              setOtp(code);
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 12,
                color: "rgb(160,160,160)",
                marginTop: 2,
                fontFamily: Constants.Fonts.MEDIUM,
                fontSize: 12,
              }}
            >
              {Strings.recieve_otp}
            </Text>
            <TouchableOpacity onPress={resendOtp}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "rgb(217,125,84)",
                  marginLeft: 4,
                  fontFamily: Constants.Fonts.MEDIUM,
                  fontSize: 12,
                }}
              >
                {Strings.resend_text}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            height: 200,
          }}
        >
          <Button
            title={Strings.verify_otp}
            onPress={(event) => {
              callback();
              Keyboard.dismiss();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
