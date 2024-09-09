import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Entypo from '@expo/vector-icons/Entypo';


export default function SearchItems({ navigation }) {
  const handlePress = () => {
    navigation.navigate('Doctor Profile')
  }
  return (
    <View style={{ flex: 1, flexDirection: "column", padding: 10 }}>
      <TouchableOpacity style={{ width: "100%", backgroundColor: "white", padding: 10, borderRadius: 5, gap: 10 }} onPress={handlePress}>
        <View style={{ display: "flex", flexDirection: 'row', justifyContent: "center", alignItems: "center", borderBottomColor: "black", borderBottomWidth: .5, padding: 5 }}>
          <Image source={{ uri: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg" }} width={60} height={60} borderRadius={100} />
          <View style={{ flex: 1, margin: 5 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: "green" }}>Doctor</Text>
              <Text>⭐⭐⭐</Text>
            </View>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>Mohammad Ansari</Text>
            <Text style={{ color: "grey" }}>Park Hospital</Text>
          </View>
        </View>
        <View style={{ paddingLeft: 5, display: "flex", gap: 7 }}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
            <FontAwesome name="stethoscope" size={20} color="green" /><Text>Pharma and Gynecology</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Entypo name="location-pin" size={20} color="green" /><Text>Park Hospital, Murthal</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 7 }}>
            <FontAwesome name="money" size={20} color="green" /><Text>200$</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}