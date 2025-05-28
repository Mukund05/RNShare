import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect} from 'react';
import {modalStyles} from '../../styles/modalStyles';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {multiColor, screenHeight} from '../../utils/Constants';
import QRCode from 'react-native-qrcode-svg';
import CustomText from '../global/CustomText';
import Icon from '../global/Icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface QRGenerateModalProps {
  visible: boolean;
  onClose: () => void;
}

const QRGenerateModal: FC<QRGenerateModalProps> = ({visible, onClose}) => {
  const [loading, setLoading] = React.useState(false);
  const [qrValue, setQRValue] = React.useState('MKD');
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
          {loading || qrValue === null || qrValue === '' ? (
            <View style={modalStyles.skeleton}>
              <Animated.View
                style={[modalStyles.shimmerOverlay, , shimmerStyle]}>
                <LinearGradient
                  colors={['#F3F3F3', '#FFF', '#F3F3F3']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={modalStyles.shimmerGradient}
                />
              </Animated.View>
            </View>
          ) : (
            <QRCode
              value={qrValue}
              size={250}
              logoSize={60}
              logoBackgroundColor="#fff"
              logoMargin={2}
              logoBorderRadius={10}
              logo={require('../../assets/images/profile2.jpg')}
              linearGradient={multiColor}
              enableLinearGradient
            />
          )}
        </View>
        <View style={modalStyles.info}>
          <CustomText style={modalStyles.infoText1}>
            Ensure you're on the same Wi-Fi network.
          </CustomText>
          <CustomText style={modalStyles.infoText2}>
            Ask the sender to scan this QR code to connect and transfer files.
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

export default QRGenerateModal;

const styles = StyleSheet.create({});
