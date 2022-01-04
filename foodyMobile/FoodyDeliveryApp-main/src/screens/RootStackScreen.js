import React from 'react';
import {View, StyleSheet} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Login  from './Login';
import Register from './Register'

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
    {/* <RootStack.Screen name="SplashScreen" component={SplashScreen}/> */}
    <RootStack.Screen name="Login" component={Login}/>
    <RootStack.Screen name="Register" component={Register}/>
</RootStack.Navigator>
);


export default RootStackScreen;
