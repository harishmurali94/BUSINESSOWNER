import { StyleSheet } from "react-native";
import normalize from "../../lib/normalize";
import constants from "../../config/constants";

const Colors = {
  background: "rgb(255,196,0)",
  text: "rgb(15,10,64)",
};
export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: normalize(67),
    width: normalize(232),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  text: {
    color: Colors.text,
    fontSize: normalize(20),
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: constants.Fonts.BLACK,
  },
});
