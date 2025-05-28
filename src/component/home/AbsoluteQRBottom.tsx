import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {bottomTabStyles} from '../../styles/bottomTabStyle';
import {navigate} from '../../utils/NavigationUtil';
import Icon from '../global/Icon';
import QRScannerModal from '../modals/QRScannerModal';

const AbsoluteQRBottom = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <>
      <View style={bottomTabStyles.container}>
        <TouchableOpacity onPress={() => navigate('ReceivedFileScreen')}>
          <Icon
            name="apps-sharp"
            iconFamily="Ionicons"
            size={24}
            color="#333"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={bottomTabStyles.qrCode}
          onPress={() => setIsVisible(true)}>
          <Icon
            name="qrcode-scan"
            iconFamily="MaterialCommunityIcons"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            name="beer-sharp"
            iconFamily="Ionicons"
            size={24}
            color="#333"
          />
        </TouchableOpacity>
      </View>

      {isVisible && (
        <QRScannerModal
          visible={isVisible}
          onClose={() => setIsVisible(false)}
        />
      )}
    </>
  );
};

export default AbsoluteQRBottom;

const styles = StyleSheet.create({});
