import { StyleSheet } from "react-native";
// import { normalize, normalizeFont } from '../../utils';
import normalize from "../../lib/normalize";
import constants from "../../config/constants";
const Colors = {
  background: "rgba(255,255,255,1)",
  link: "rgb(217,125,84)",
};
export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    paddingHorizontal: normalize(25),
    marginTop: normalize(18),
  },
  headerLabel: {
    marginBottom: normalize(9),
  },
  subHeader: {
    marginBottom: normalize(32),
  },
  textInputLabel: {
    marginBottom: normalize(16),
    marginTop: 20,
  },
  inputGap: {
    marginBottom: normalize(15),
  },
  buttonStyle: {
    marginTop: normalize(60),
    alignSelf: "center",
    marginBottom: normalize(30),
  },
  step3Text: {
    alignSelf: "center",
  },
  step3Banner: {
    alignSelf: "center",
    marginTop: normalize(36),
    marginBottom: normalize(15),
    width: normalize(195),
    height: normalize(275),
  },
  touchableView: {
    backgroundColor: "#f0f3f4",
    justifyContent: "center",
    fontSize: normalize(15),
    flex: 1,
    height: normalize(61),
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#c8d1d3",
    borderRadius: 5,
  },
  link: {
    color: Colors.link,
    fontSize: normalize(20),
    textDecorationLine: "underline",
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 20,
    fontFamily: constants.Fonts.BLACK,
  },
});
