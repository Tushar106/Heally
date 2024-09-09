import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import LottieView from 'lottie-react-native'

export default function ThanksScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20, gap: 10 }}>
            <View style={{ height: 100, aspectRatio: 1 }}>
                <LottieView style={{ flex: 1 }} source={require("../../assets/images/Tick.json")} autoPlay loop />
            </View>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>Thanks for Booking!</Text>
            <Text style={{ color: "grey" }}>Hope you get well soon.</Text>
            <TouchableOpacity style={{ width: "100%", padding: 10, borderRadius: 5, backgroundColor: "green", alignItems: "center", justifyContent: "center", flexDirection: "row",gap:5 }} onPress={() => { navigation.navigate("Home") }} >
                <AntDesign name="arrowleft" size={24} color="white" />
                <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>Go To Home</Text>
            </TouchableOpacity>
        </View>
    )
}