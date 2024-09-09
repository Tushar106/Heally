import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, Pressable,  } from 'react-native'
import React from 'react'
import Header from '../Components/Home/Header'

import Poster from '../Components/Home/Poster';
import { Services } from '../Components/Home/Services';

export default function HomeScreen({navigation}) {
 
  return (
    <View style={style.container}>
      <Header />
      <ScrollView>
       <Poster/>
        <Services navigation={navigation}/>
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