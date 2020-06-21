import { StyleSheet } from "react-native";
// import { normalize,normalizeFont } from '../../utils';
import normalize from "../../lib/normalize";
import constants from "../../config/constants";

export const Colors = {
  background: "rgb(240,243,244)",
  border: "rgb(200,209,211)",
  placeholder: "rgb(160,160,160)",
};

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.background,
    alignItems: "center",
    borderColor: Colors.border,
    borderWidth: 1,
    padding: normalize(9),
    height: normalize(61),
    borderRadius: 5,
  },
  input: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 15,
    flex: 1,
    height: normalize(61),
    fontFamily: constants.Fonts.MEDIUM,
  },
  icon: {
    width: normalize(25),
    height: normalize(25),
    resizeMode: "contain",
  },
});
