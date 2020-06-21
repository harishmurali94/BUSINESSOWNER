import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:26,
    // justifyContent:"space-around"
  },
  login: {
    padding: 8,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
    color:'red'
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',

  },

  underlineStyleBase: {
    width: 60,
    height: 60,
    borderRadius:10,
    borderWidth: 1,
    backgroundColor:"rgb(240,243,244)",
    borderColor: "rgb(200,209,211)",color: 'rgb(38,38,38)',
    fontWeight: 'bold',
  },

  underlineStyleHighLighted: {
    borderColor: "rgb(200,209,211)",
  },
});

export default styles;
