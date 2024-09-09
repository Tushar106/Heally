import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchScreen from '../Screens/SearchScreen';
import DoctorProfile from '../Screens/DoctorProfile';
import ConfirmationScreen from '../Screens/ConfirmationScreen';
import ThanksScreen from '../Screens/ThanksScreen';

export default function SearchScreenNavigation() {
    const Stack=createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerTintColor:"white"}}>
        <Stack.Screen name='SearchScreen' component={SearchScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Doctor Profile' component={DoctorProfile} options={{headerTitleStyle:{color:"white"},headerStyle:{backgroundColor:"#292929"}}}/>
        <Stack.Screen name='Confirmation' component={ConfirmationScreen} options={{headerTitleStyle:{color:"white"},headerStyle:{backgroundColor:"#292929"}}}/>
        <Stack.Screen name='ThanksScreen' component={ThanksScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
    
  )
}