import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { screenHeight } from '../../utils/Constants'
import { navigate } from '../../utils/NavigationUtil'

const SendReceiveButton:FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate('Send')} style={styles.button}>
        <Image source={require('../../assets/icons/send.jpg')} style={styles.img} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('Receive')} style={styles.button}>
        <Image source={require('../../assets/icons/receive.jpg')} style={styles.img} />
      </TouchableOpacity>
    </View>
  )
}

export default SendReceiveButton

const styles = StyleSheet.create({
  container :{
    marginTop: screenHeight * 0.07,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  img:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  button : {
    width: 140,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
  }
})