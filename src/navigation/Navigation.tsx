import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../utils/NavigationUtil';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import SendScreen from '../screens/SendScreen';
import ConnectionScreen from '../screens/ConnectionScreen';
import ReceiveScreen from '../screens/ReceiveScreen';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false}}>
                <Stack.Screen name='Splash' component={SplashScreen} />
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='ConnectionScreen' component={ConnectionScreen} />
                <Stack.Screen name='Send' component={SendScreen} />
                <Stack.Screen name='Receive' component={ReceiveScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;