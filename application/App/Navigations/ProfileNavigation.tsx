import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchScreen from '../Screens/SearchScreen';
import DoctorProfile from '../Screens/DoctorProfile';
import Profile from '../Screens/Profile';
import Appointment from '../Screens/Appointment';

export default function ProfileNavigation() {
    const Stack=createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerTintColor:"white"}}>
        <Stack.Screen name='ProfileHome' component={Profile} options={{headerShown:false}}/>
        <Stack.Screen name='MyAppointments' component={Appointment} options={{headerTitleStyle:{color:"white"},headerStyle:{backgroundColor:"#292929"}}}/>
    </Stack.Navigator>
    
  )
}