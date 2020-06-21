import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';
import AppStyles from '../../config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.COLOR_WHITE,
  },
  cameraStyle: {
    height: metrics.screenHeight,
  },
});

export default styles;
