import { Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");

const isProduction = false; //Change here  for converting 'PRODUCTION' or 'STAGING'

export default (constants = {
  APP_NAME: "",

  Fonts: {
    BLACK: Platform.OS === "ios" ? "Lato-Black" : "Lato_Black",
    BOLD: Platform.OS === "ios" ? "Lato-Bold" : "Lato_Bold",
    MEDIUM: Platform.OS === "ios" ? "Lato-Medium" : "Lato_Medium",
    REGULAR: Platform.OS === "ios" ? "Lato-Regular" : "Lato_Regular",
  },

  // PRIVACY_POLICY_URL: '',
  // TERMS_AND_CONDITIONS_URL: '',

  // APP_THEME_COLOR: '#DBB85A',
  // APP_THEME_COLOR2: 'rgb(203,39,100)',
  // APP_GRAY_COLOR: 'rgb(177,177,177)',
  // APP_GRAY_COLOR2: 'rgb(241,243,246)',
  // APP_GRAY_COLOR3: 'rgb(120,120,120)',
  // APP_WHITE_COLOR: '#FFFFFF',
  // APP_TEXT_PINK_COLOR: 'rgb(203,39,100)',
  APP_BLACK_COLOR: "rgb(38,38,38)",
  // APP_THEME_DARK_GRAY: 'rgb(26, 26, 24)',
  // APP_THEME_DARK_YELLOW: 'rgb(207, 155, 61)',
  // APP_SEPARATOR_COLOR: '#E7E6E6',
  // APP_GREY_TEXT_COLOR: 'rgb(104,108,126)',
  // APP_BOX_BACKGROUND_GREY: 'rgb(244,246,248)',
  // APP_RED_COLOR: 'rgb(227,100,108)',
  // APP_TRANSPARENT_COLOR: 'transparent',
  // APP_OUT_OF_STOCK_TEXT: '#b51818',

  // SCREEN_WIDTH: width,
  // SCREEN_HEIGHT: height,

  // ACTIVE_OPACITY: 0.7,

  // PRODUCTS_PAGE_COUNT: 20,

  IS_ANDROID: Platform.OS === 'ios' ? false : true,

  // IOS_VERSION: parseInt(Platform.Version, 10),

  // MAX_PRODUCT_COUNT: 5,
  // MAX_CART_SIZE: 20,
});
