import { StyleSheet } from "react-native";
import metrics from "../../config/metrics";
import constants from "../../config/constants";
import normalize from "../../lib/normalize";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    // justifyContent:"space-around"
  },
  login: {
    padding: 8,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
    color: "red",
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 3,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    // backgroundColor: '#fff',
    color: "#424242",
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  image_view: {
    // height: metrics.screenHeight / 3,
    alignItems: "center",
    justifyContent: "center",
  },

  underlineStyleBase: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "rgb(240,243,244)",
    borderColor: "rgb(200,209,211)",
  },
  verify_text: {
    fontFamily: "Lato",
    fontSize: normalize(25),
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: normalize(30),
    letterSpacing: 0,
    textAlign: "left",
    color: "#0f0a40",
  },
  text_send_1: {
    fontSize: 12,
    color: "rgb(160,160,160)",
  },
  otp_text: { marginHorizontal: 3, fontWeight: "bold" },
  text_send_2: { fontSize: 12, color: "rgb(160,160,160)" },

  underlineStyleHighLighted: {
    borderColor: "rgb(200,209,211)",
  },
  otp_textbox_countrycode: {
    height: 22,
    padding: 0,
    flex: 4,
    borderWidth: 1,
    // borderRightWidth: 1,
    borderRightWidth: 0,
    height: 60,
    borderBottomColor: "black",
    borderRightColor: "black",
    marginTop: 20,
  },
  textbox_phone_number: {
    height: 22,
    padding: 0,
    flex: 10,
    height: 60,
    borderWidth: 1,
    borderBottomColor: "black",
    marginTop: 20,
    paddingLeft: 5,
  },
  button_view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
