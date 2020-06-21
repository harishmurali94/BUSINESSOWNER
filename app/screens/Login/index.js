import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  Text,
  PermissionsAndroid,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as loginActions from "app/actions/loginActions";
import ModalLoader from "../../components/ModalLoader";
import styles from "./styles";
import Images from "../../config/images";
import messaging from "@react-native-firebase/messaging";
import { Input, Button, Label, LabelTypes } from "../../components";
import Constants from "../../config/constants";
import normalize from "../../lib/normalize";
import TermsCondition from "../../components/TermsCondition";

const Strings = {
  find_talent_a: "Find the right talent in different areas",
  find_talent_b: "of your business requirement",
  verify_number: "Register With Your Mobile",
  number: "Number",
  text_send_1: "We will send you an",
  text_send_2: "to your mobile number",
  get_otp: "Get OTP",
  no_number: "Enter your mobile number.",
  valid_number: "Enter a valid mobile number.",
};

export default function Login(props) {
 

  const loader = useSelector((state) => state.loadingReducer.isLoading);
  // const lan = useSelector(state => state.languageReducer.language);

  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [termsModal, setTermsModal] = useState(false);

  // setI18nConfig(lan);

  const callback = async () => {
    // dispatch(languageActions.changeLanguage('en'));
    const regex = /^\+65(6|8|9)\d{7}$/;
    const numberValid = regex.test(`+${65}${phone}`);

    if (phone === "") {
      setErrorMessage(Strings.no_number);
      setPhoneError(true);
    } else if (!numberValid) {
      setErrorMessage(Strings.valid_number);
      setPhoneError(true);
    } else {
      setPhoneError(false);
      const fcmToken = await messaging().getToken();
      let data = {
        countryCode: "+65",
        mobileNumber: phone,
        deviceRegId: fcmToken,
      };
      dispatch(loginActions.requestLogin(data, false));
      // props.navigation.navigate("OTP",{phonenumber:phone})
    }
  };

  const showTerms = () => {
    setTermsModal(true);
  };

  const closeTerms = () => {
    setTermsModal(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'}>
        <View style={styles.image_view}>
          <Image source={Images.login.login_banner} resizeMode="contain" />
          <Label
            type={LabelTypes.SMALL}
            style={{
              color: "rgb(38,38,38)",
              textAlign: "center",
              marginTop: 15,
            }}
            textStyle={{
              fontFamily: "Lato-Regular",
              fontWeight: "bold",
              color: "rgb(38,38,38)",
              width: "100%",
              textAlign: "center",
            }}
            text={Strings.find_talent_a}
          />
          <Label
            type={LabelTypes.SMALL}
            style={{
              color: "rgb(38,38,38)",
              textAlign: "center",
            }}
            textStyle={{
              fontFamily: "Lato-Regular",
              fontWeight: "bold",
              color: "rgb(38,38,38)",
              width: "100%",
              textAlign: "center",
            }}
            text={Strings.find_talent_b}
          />
        </View>
        <View style={{ paddingTop: normalize(40) }}>
          <Label
            style={styles.verify_text}
            textStyle={{
              fontFamily: "Lato",
              fontSize: normalize(25),
              fontWeight: "bold",
              fontStyle: "normal",
              lineHeight: normalize(30),
              letterSpacing: 0,
              textAlign: "left",
              color: "#0f0a40",
            }}
            text={Strings.verify_number}
          />
          <Label
            style={styles.verify_text}
            textStyle={{
              fontFamily: "Lato",
              fontSize: normalize(25),
              fontWeight: "bold",
              fontStyle: "normal",
              lineHeight: normalize(30),
              letterSpacing: 0,
              textAlign: "left",
              color: "#0f0a40",
            }}
            text={Strings.number}
          />
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={styles.text_send_1}>{Strings.text_send_1}</Text>
            <Label
              type={LabelTypes.SMALL}
              style={styles.otp_text}
              text={"OTP"}
              textStyle={{ marginHorizontal: 3, fontWeight: "bold" }}
            />
            <Text style={styles.text_send_1}>{Strings.text_send_2}</Text>
          </View>

          <View
            style={{
              borderColor: "rgb(240,243,244)",
              borderWidth: 1,
              flexDirection: "row",
              borderRadius: 5,
              marginTop: normalize(15),
            }}
          >
            <View
              style={{
                backgroundColor: "rgb(200,209,211)",
                flexDirection: "row",
                height: 50,
                borderRightWidth: 1,
                borderRightColor: "rgb(240,243,244)",
                flex: 2,
                borderRadius: 5,
                paddingHorizontal: 10,
              }}
            >
              <Image source={Images.login.flag} style={{ marginTop: 17 }} />

              <TextInput
                value={"+65"}
                editable={false}
                style={{
                  color: "rgb(38,38,38)",
                  fontWeight: "bold",
                  fontSize: 18,
                  marginLeft: 3,
                  borderRightWidth: 0,
                }}
              />
            </View>
            <TextInput
              onChangeText={(phone) => setPhone(phone)}
              maxLength={8}
              style={{
                flex: 7,
                height: 50,
                color: "rgb(38,38,38)",
                fontWeight: "bold",
                paddingLeft: 15,
                fontSize: 18,
              }}
              keyboardType="phone-pad"
            />
          </View>
          {phoneError && (
            <Text style={{ color: "red", marginTop: 10 }}>{errorMessage}</Text>
          )}

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Image source={Images.login.agree} />
            <Text
              style={{
                height: 20,
                fontFamily: "Lato",
                fontSize: 13,
                marginLeft: 5,
                lineHeight: 20,
                letterSpacing: 0,
                color: "rgb(160,160,160)",
              }}
            >
              I agree to the
            </Text>
            <TouchableOpacity onPress={showTerms}>
              <Text
                style={{
                  height: 20,
                  fontFamily: "Lato",
                  fontSize: 13,
                  fontWeight: "900",
                  fontStyle: "normal",
                  lineHeight: 20,
                  letterSpacing: 0,
                  textDecorationLine: "underline",
                  color: "#0f0a40",
                  marginLeft: 3,
                }}
              >
                Terms and Conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: 60,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 60,
          }}
        >
          <Button
            title={Strings.get_otp}
            onPress={(event) => {
              callback();
            }}
          />
        </View>
      </ScrollView>
      <TermsCondition visibility={termsModal} closeTerms={closeTerms} />
      <ModalLoader visible={loader} />
    </SafeAreaView>
  );
}
