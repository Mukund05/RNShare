import {ScrollView, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {commonStyles} from '../styles/commonStyles';
import HomeHeader from '../component/home/HomeHeader';
import Option from '../component/home/Option';
import Misc from '../component/home/Misc';
import SendReceiveButton from '../component/home/SendReceiveButton';
import AbsoluteQRBottom from '../component/home/AbsoluteQRBottom';

const HomeScreen: FC = () => {
  return (
    <View style={commonStyles.baseContainer}>
      <HomeHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100, padding: 15}}>
          <SendReceiveButton />
          <Option isHome />
          <Misc />
        </ScrollView>
        <AbsoluteQRBottom />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
