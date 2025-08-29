import { Image, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { resetAndNavigate } from '../utils/NavigationUtil'
import { commonStyles } from '../styles/commonStyles'

const SplashScreen = () => {

  const navigateToHome = () => {
    resetAndNavigate('Home');
  }

  useEffect(() => {
    const timeoutId=setTimeout(() => {
      navigateToHome();
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [])

  return (
    <View style={commonStyles.container}>
      <Image
        style={commonStyles.img}
        source={require('../assets/images/logo_text.png')}
      />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: 'black'
  }
})