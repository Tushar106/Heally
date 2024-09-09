import { Text, View, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import Doctor from "../../../assets/images/Doctor.png"

export default class Poster extends Component {
    render() {
        return (
            <View style={{ width: "100%", backgroundColor: "#003329", display: "flex", flexDirection: "row", borderRadius: 5, padding: 1 }}>
                <View style={{ flex: 2, gap: 5, padding: 10 }}>
                    <Text style={{ fontSize: 23, color: "#00a653", fontWeight: "bold" }}>Enhance your healthcare experience.</Text>
                    <Text style={{ fontSize: 16, color: "white", fontWeight: "400" }}>Health and Wellness come first. Join us for easy appointment of doctors</Text>
                </View>
                <ImageBackground source={Doctor} style={{ flex: 1 }} resizeMode='cover'>
                </ImageBackground>
            </View>
        )
    }
}