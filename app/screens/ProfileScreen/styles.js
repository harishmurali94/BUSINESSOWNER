import { StyleSheet } from "react-native";
import AppStyles from "../../config/styles";
import metrics from "../../config/metrics";
import normalize from "../../lib/normalize";

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: AppStyles.color.COLOR_WHITE,
  },
  container: {
    flex: 1,
  },
  headerView: {
    marginHorizontal: 22,
    marginVertical: 16,
    flexDirection: "row",
  },
  userImage: {
    width: 86,
    height: 101,
    resizeMode: "contain",
    borderRadius: 12,
  },
  userDetail: {
    width: metrics.screenWidth / 1.6,
    marginHorizontal: 22,
    justifyContent: "space-around",
  },
  userText: {
    fontSize: 25,
    color: AppStyles.color.COLOR_BLUE_INDIGO,
    fontWeight: "bold",
  },
  subView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  subText: { fontSize: 10, color: "#c8d1d3" },
  valueText: { color: "#262626", fontSize: 22 },
  valueView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  languageView: {
    marginHorizontal: 22,
    marginVertical: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    color: "#c8d1d3",
    fontSize: 13,
    paddingLeft: 16,
  },
  langText: {
    color: "#0f0a40",
    fontSize: 13,
    fontWeight: "bold",
  },
  line: {
    backgroundColor: "#c7c1c1",
    height: 1,
    width: metrics.screenWidth,
    marginVertical: 16,
  },
  complimentText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f0a40",
  },
  complimentView: {
    marginVertical: 12,
    marginHorizontal: 12,
  },
  complimentListView: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 18,
  },
  itemView: {
    margin: 6,
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    width: metrics.screenWidth / 3.8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    fontSize: 10,
    textAlign: "center",
    color: "#262626",
    paddingTop: 8,
  },
  starStyles: {
    resizeMode: "contain",
  },
  profileView: {
    margin: 8,
    backgroundColor: "#f6f6f6",
    width: metrics.screenWidth - 50,
    padding: 16,
    borderRadius: 8,
  },
  descriptionText: {
    lineHeight: 15,
    fontSize: 10,
    color: "#262626",
  },
  dateView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },
  dateText: {
    paddingLeft: 14,
    fontSize: 13,
    color: "#a0a0a0",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 24,
    marginVertical: 20,
  },
  neverView: {
    marginVertical: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  neverText: {
    color: "#ff3131",
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "underline",
    textDecorationColor: "#ff3131",
  },
  hiredView: {
    // backgroundColor: "#69e4a6",
    width: metrics.screenWidth / 2.4,
    // alignItems:'center',
    // justifyContent:'center',
    // padding:12,
    // borderRadius: 24
    backgroundColor: "#69e4a6",
    height: normalize(67),
    // width: normalize(230),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  timeView: {
    backgroundColor: "#ffc400",
    width: metrics.screenWidth / 2.4,
    // alignItems: "center",
    // justifyContent: "center",
    // padding: 12,
    // borderRadius: 24,
    height: normalize(67),
    // width: normalize(230),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  buttonText: {
    color: "rgb(15,10,64)",
    fontSize: normalize(20),
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: constants.Fonts.BLACK,
  },
});

export default styles;
