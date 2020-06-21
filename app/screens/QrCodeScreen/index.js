import React, { useEffect, useState } from "react";
import { View,Text,SafeAreaView,Image } from 'react-native';
import styles from './styles';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';
import images from '../../config/images';
import metrics from '../../config/metrics';
import { useDispatch } from "react-redux";
import * as qrCodeActions from '../../actions/qrScanAction';

export default function QrCodeScreen(props) {
  const [focusedScreen, setFocusedScreen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const {navigation} = props;
    navigation.addListener('willFocus', () =>
    setFocusedScreen(true),
    );
    navigation.addListener('willBlur', () =>
    setFocusedScreen(false),
    );
  }, []);

  const leftPress = () => {
    props.navigation.goBack();
  };

  const onSuccess=(e) =>{
   let data= {jobandjsId:e.data}
   dispatch(qrCodeActions.qrScanRequest(data))
      // if (e.data) {
      //   this.props.requestUser(e.data, this.state.deviceId, this.props);
      //   this.props.googleLogin(false);
      // }
  
  }

  return (
    <SafeAreaView style={styles.container}>
            <NavigationHeader isBack={true} leftPress={leftPress} />
<View style={{flex:1}}>
  {!focusedScreen && 
     <QRCodeScanner
                ref={node => {
                  this.scanner = node;
                }}
                cameraStyle={styles.cameraStyle}
                topViewStyle={{height: 0, flex: 0}}
                bottomViewStyle={{height: 0, flex: 0}}
                onRead={(e)=>onSuccess(e)}
                flashMode={RNCamera.Constants.FlashMode.off}
                reactivate={true}
                reactivateTimeout={2000}
              />}
              <View style={{justifyContent:'center',alignItems:'center',height:metrics.screenHeight}}>
              <Image source={images.scanner.scan}/>
              <Text style={{marginVertical: 8, color:'white',fontSize:14}}>Place Code Inside Box</Text>
              </View>
              </View>
    </SafeAreaView>
  );
}
