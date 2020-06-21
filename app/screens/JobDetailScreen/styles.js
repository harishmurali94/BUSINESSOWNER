import { StyleSheet } from "react-native";
import AppStyles from "../../config/styles";
import metrics from "../../config/metrics";

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: AppStyles.color.COLOR_WHITE,
  },
  container: {
    flex: 1,
  },
  openingText: {
    color: "#a0a0a0",
    fontSize: 13,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontFamily: constants.Fonts.MEDIUM,
  },
  jobHeadingText: {
    color: AppStyles.color.COLOR_BLUE_INDIGO,
    fontSize: 28,
    paddingVertical: 2,
    paddingHorizontal: 12,
    fontWeight: "bold",
    fontFamily: constants.Fonts.MEDIUM,
  },
  locationView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
  },
  locationText: {
    color: "#a0a0a0",
    fontSize: 14,
    paddingVertical: 12,
    paddingLeft: 12,
    width: metrics.screenWidth / 1.2,
    fontFamily: constants.Fonts.MEDIUM,
  },
  dateView: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 12,
    marginVertical: 10,
  },
  salaryText: {
    // paddingVertical: 18,
    paddingTop: 5,
    paddingHorizontal: 12,
    color: "rgb(255,113,113)",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: constants.Fonts.MEDIUM,
    textAlign:'right'
  },
  dateDetailView: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  dummyText: {
    color: AppStyles.color.COLOR_BLUE_INDIGO,
    paddingHorizontal: 6,
    fontSize: 12,
  },
  dateText: {
    fontSize: 12,
    color: AppStyles.color.COLOR_BLUE_INDIGO,
    fontFamily: constants.Fonts.MEDIUM,
  },
  appliedText: {
    fontSize: 12,
    color: AppStyles.color.COLOR_BLACK,
    fontFamily: constants.Fonts.MEDIUM,
  },
  appliedView: {
    backgroundColor: "#69e4a6",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  cardView: {
    height: 84,
    // borderColor: "#e3e3e3",
    // borderWidth: 1,
    backgroundColor: "rgb(240,243,244)",
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 18,
    marginVertical: 14,
  },
  cardText: {
    fontSize: 12,
    color: "#a0a0a0",
    fontFamily: constants.Fonts.MEDIUM,
  },
  cardValueText: {
    fontSize: 12,
    fontWeight: "bold",
    color: AppStyles.color.COLOR_BLUE_INDIGO,
    marginTop: 12,
    fontFamily: constants.Fonts.MEDIUM,
  },
  detailView: {
    marginHorizontal: 12,
  },
  line: {
    backgroundColor: "#e3e3e3",
    height: 58,
    width: 1,
  },
  descText: {
    marginVertical: 12,
    marginHorizontal: 22,
    lineHeight: 29,
    fontSize: 14,
    color: "#a0a0a0",
    fontFamily: constants.Fonts.MEDIUM,
  },
  showMoreText: {
    marginHorizontal: 22,
    fontSize: 15,
    color: AppStyles.color.COLOR_BLUE_INDIGO,
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontFamily: constants.Fonts.MEDIUM,
  },
  flatListView: {
    marginVertical: 48,
    marginHorizontal: 14,
  },
  itemView: {
    backgroundColor: "#f0f3f4",
    marginHorizontal: 8,
    paddingHorizontal: 12,
    paddingVertical: 24,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    width: metrics.screenWidth / 1.5,
  },
  circularView: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#44b1d9",
    justifyContent: "center",
    alignItems: "center",
  },
  nameView: {
    marginHorizontal: 12,
  },
  nameText: {
    color: "#0f0a40",
    fontSize: 20,
    paddingVertical: 4,
    width: metrics.screenWidth / 2.4,
    fontFamily: constants.Fonts.MEDIUM,
  },
  jobText: {
    color: "#a0a0a0",
    fontSize: 11,
    paddingVertical: 4,
    fontFamily: constants.Fonts.MEDIUM,
  },
  circleText: {
    fontSize: 24,
    color: AppStyles.color.COLOR_WHITE,
    fontFamily: constants.Fonts.MEDIUM,
  },
});

export default styles;
