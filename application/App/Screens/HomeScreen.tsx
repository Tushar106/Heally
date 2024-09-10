import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, Pressable, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Home/Header'

import Poster from '../Components/Home/Poster';
import * as Location from 'expo-location';
import { Services } from '../Components/Home/Services';

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

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