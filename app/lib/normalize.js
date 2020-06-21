import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const normalize = (value, isBasedOnWidth) => {
    const baseHeight = 800;
    const baseWidth = 480;
    if(isBasedOnWidth){
        return (value / baseWidth) * width;
    }
    return (value / baseHeight) * height;
};
export default normalize;