import { PixelRatio, Platform } from 'react-native';
let pixelRatio = PixelRatio.get();


export const normalize = (size) => {
    switch (true) {
        case (pixelRatio < 1.4):
            return size * 0.8;
            break;
        case (pixelRatio < 2.4):
            return size * 1.15;
            break;
        case (pixelRatio < 3.4):
            return size * 1.35;
            break;
        default:
            return size * 1.5;
    }
}

export const normalizeFont = (value) => {
    return Platform.OS === 'ios' ? value : PixelRatio.roundToNearestPixel(value)
}
