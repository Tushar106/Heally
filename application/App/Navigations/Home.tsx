import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screens/HomeScreen'
import Profile from '../Screens/Profile'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import SearchScreenNavigation from './SearchScreenNavigation'
import ProfileNavigation from './ProfileNavigation';

export default function Home() {
  const Tab = createBottomTabNavigator()
  return (
    <GestureHandlerRootView style={style.container}>
      <BottomSheetModalProvider>
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: "#01C77D", tabBarStyle: { backgroundColor: "black", borderTopWidth: 0 }, tabBarLabelPosition: "beside-icon", tabBarLabelStyle: { fontSize: 15 }, tabBarHideOnKeyboard: true }}>
          <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ size, color }) => <FontAwesome name="home" size={size} color={color} /> }} />
          <Tab.Screen name="Search" component={SearchScreenNavigation} initialParams={{ searchElement: "doctor" }} listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('Search');
            },
          })}
            options={{
              unmountOnBlur: true,
              tabBarIcon: ({ size, color }) => <FontAwesome name="search" size={size} color={color} />
            }
            } />
          <Tab.Screen name="Profile" component={ProfileNavigation} options={{ unmountOnBlur: true, tabBarIcon: ({ size, color }) => <FontAwesome name="user-circle" size={size} color={color} /> }} />
        </Tab.Navigator>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  }
})