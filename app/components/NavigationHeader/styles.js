import {StyleSheet} from 'react-native';
import AppStyles from '../../config/styles';

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row',
    // backgroundColor: '#32CC32',
  },
  subContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 14,
  },
  images: {
    marginRight: 12,
  },
  imageView: {
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 17,
    color: AppStyles.color.COLOR_WHITE,
    fontFamily: 'Helvetica-Bold',
    fontStyle: 'italic',
  },
  textTitle: {
    fontSize: 17,
    color: AppStyles.color.COLOR_WHITE,
    fontFamily: 'Helvetica-Bold',
  },
  ueText: {
    flexDirection: 'row',
  },
});

export default styles;
