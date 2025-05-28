import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'

interface QRScannerModalProps {
    visible: boolean;
    onClose: () => void;
  }

const QRScannerModal:FC<QRScannerModalProps> = ({visible, onClose}) => {
  return (
    <View>
      <Text>QRScannerModal</Text>
    </View>
  )
}

export default QRScannerModal

const styles = StyleSheet.create({})