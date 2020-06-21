import { StyleSheet } from "react-native";
import AppStyles from "../../config/styles";
import metrics from "../../config/metrics";
import { Colors } from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: AppStyles.color.COLOR_WHITE,
  },
  container: {
    flex: 1,
  },
  openText: {
    fontSize: 13,
    color: "#a0a0a0",
    fontFamily: constants.Fonts.MEDIUM,
  },
  statusText: {
    color: "#262626",
    fontSize: 12,
    fontFamily: constants.Fonts.MEDIUM,
  },
  statusView: {
    padding: 8,
    backgroundColor: "#69e4a6",
    borderRadius: 24,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  topButtonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: metrics.screenWidth / 1.5,
  },
  listView: {
    backgroundColor: AppStyles.color.COLOR_WHITE,
    marginHorizontal: 8,
    marginVertical: 6,
    borderRadius: 6,
    padding: 10,
    elevation: 1,
    shadowOpacity: 0.1,
    flexDirection: "row",
    alignItems:'flex-start'
  },
  squareView: {
    backgroundColor: AppStyles.color.COLOR_YELLOW,
    borderRadius: 6,
    height: 100,
    width: 92,
    justifyContent: "center",
    alignItems: "center",
  },
  itemView: {
    marginHorizontal: 12,
    width: metrics.screenWidth / 1.5,
    alignItems:'flex-start',
  },
  titleText: {
    color: AppStyles.color.COLOR_BLUE_INDIGO,
    fontSize: 20,
    fontFamily: constants.Fonts.MEDIUM,
  },
  dateView: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: metrics.screenWidth / 3.8,
  },
  imageView: {
    marginVertical: 6,
    alignItems: "center",
    flexDirection: "row",
  },
  images:{
    height:50,
    width:50
  },
  locText: {
    color: "#a0a0a0",
    fontSize: 13,
    marginHorizontal: 12,
    fontFamily: constants.Fonts.MEDIUM,
  },
  dateText: {
    color: AppStyles.color.COLOR_BLUE_INDIGO,
    fontSize: 12,
    fontFamily: constants.Fonts.MEDIUM,
    width:metrics.screenWidth/2.3,
  },
  dateViewText:{
    color: AppStyles.color.COLOR_BLUE_INDIGO,
    fontSize: 12,
    fontFamily: constants.Fonts.MEDIUM,
    width:80
  },
  dummyline: {
    marginHorizontal: 6,
    fontFamily: constants.Fonts.MEDIUM,
  },
  costView: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: metrics.screenWidth / 1.5,
  },
  costText: {
    color: "#ff7171",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: constants.Fonts.MEDIUM,
    width:80,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  postJobButton: {
    marginVertical: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgb(255,196,0)",
    alignItems: "center",
    justifyContent: "center",
  },
  postJobButtonText: {
    fontWeight: "bold",
    fontSize: 15,
    paddingHorizontal: 20,
    height: 20,
  },
  headerView:{
    marginVertical: 16,
    marginHorizontal:12,
    alignItems:'flex-end'
  }
});

export default styles;
