import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, Pressable, Alert, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Home/Header'

import Poster from '../Components/Home/Poster';
import * as Location from 'expo-location';
import { Services } from '../Components/Home/Services';
import { AuthContext } from '../Components/Context/AuthContext';
import Loading from '../Components/Loading';

export default function HomeScreen({ navigation }) {
  const {location, setLocation} = useContext(AuthContext)
  // const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if(location==null){
    return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Loading size={100} /></View>)
  }

  console.log(location)
  return (
    <View style={style.container}>
      <Header />
      <ScrollView>
        <Poster />
        <Services navigation={navigation} />
      </ScrollView>
    </View>
  )
}
const style = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    gap: 20
  }
})