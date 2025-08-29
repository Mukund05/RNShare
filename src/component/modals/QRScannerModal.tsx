import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useMemo} from 'react';
import {modalStyles} from '../../styles/modalStyles';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {screenHeight} from '../../utils/Constants';
import CustomText from '../global/CustomText';
import Icon from '../global/Icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, CodeScanner, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

interface QRScannerModalProps {
  visible: boolean;
  onClose: () => void;
}

const QRScannerModal: FC<QRScannerModalProps> = ({visible, onClose}) => {
  const [loading, setLoading] = React.useState(false);
  const [codeFound, setCodeFound] = React.useState(false);
  const [hasPermission, setHasPermission] = React.useState(false);
  const device = useCameraDevice('back');
  const shimmerTranslateX = useSharedValue(0);
  const inset = useSafeAreaInsets();

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: shimmerTranslateX.value,
      },
    ],
  }));

  useEffect(() => {
    shimmerTranslateX.value = withRepeat(
      withRepeat(
        withTiming(300, {duration: 1500, easing: Easing.linear}),
        -1,
        false,
      ),
    );
  }, [visible]);

  useEffect(()=>{
    const checkPermission = async () => {
      const result = await Camera.requestCameraPermission();
      setHasPermission(result === 'granted');
    };

    checkPermission();

    if(visible){
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 400);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleScan = (scannedCode: any) => {
    const [connectionData,deviceName] = scannedCode.replace('tcp://','').split('|');
    const [host,port] = connectionData.split(':');
    //connect to server  
  }

  const codeScanner = useMemo<CodeScanner>(()=>(
    {
      codeTypes: ['qr', 'codabar'],
      onCodeScanned: codes =>{
        if(codeFound!) {
          return;
        }
        console.log(`Scanned: ${codes.length} codes!`)
        if(codes?.length > 0 ){
          const scannedCode = codes[0].value;
          console.log('Scanned code:', scannedCode);
          setCodeFound(true);
          handleScan(scannedCode);
        }
      }
    }
  ),[codeFound])

  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="formSheet"
      onRequestClose={onClose}
      statusBarTranslucent
      supportedOrientations={['portrait']}
      backdropColor={'#000000'}
      navigationBarTranslucent
      style={{maxHeight: screenHeight * 0.4,marginTop: inset.top,paddingTop: inset.top}}
      onDismiss={onClose}>
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.qrContainer}>
          {loading ? (
            <View style={modalStyles.skeleton}>
              <Animated.View
                style={[modalStyles.shimmerOverlay, shimmerStyle]}>
                <LinearGradient
                  colors={['#F3F3F3', '#FFF', '#F3F3F3']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={modalStyles.shimmerGradient}
                />
              </Animated.View>
            </View>
          ) : (
            <>
            {
              (!device || !hasPermission) ? (
                <View style={modalStyles.skeleton}>
                  <Image
                    source={require('../../assets/images/no_camera.png')}
                    style={modalStyles.noCameraImage}
                  />
                </View>
              ) : (
                <View style={modalStyles.skeleton}>
                  <Camera
                    style={modalStyles.camera}
                    device={device}
                    isActive={visible}
                    codeScanner={codeScanner}
                  />
                </View>
              )
            }
            </>
          )}
        </View>
        <View style={modalStyles.info}>
          <CustomText style={modalStyles.infoText1}>
            Ensure you're on the same Wi-Fi network.
          </CustomText>
          <CustomText style={modalStyles.infoText2}>
            Ask the receiver to show a QR code to connect and transfer files.
          </CustomText>
        </View>
        <ActivityIndicator
          size={'small'}
          color={'#000'}
          style={{alignSelf: 'center'}}
        />
        <TouchableOpacity
          style={modalStyles.closeButton}
          onPress={() => onClose()}>
          <Icon name="close" iconFamily="Ionicons" size={24} color={'#000'} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default QRScannerModal;

const styles = StyleSheet.create({});
