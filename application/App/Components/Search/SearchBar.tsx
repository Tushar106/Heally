import { View, TextInput } from 'react-native'
import React from 'react'

import EvilIcons from '@expo/vector-icons/EvilIcons';
export default function SearchBar() {
    return (
        <View style={{ flex: 1, alignItems: "center", flexDirection: "row", backgroundColor: 'white', padding: 10, margin: 10, borderRadius: 5, marginBottom: 0 }}>
            <EvilIcons name="search" size={24} color="black" />
            <TextInput placeholder='Search for Doctors, Hospitals' style={{ width: "100%" }} />
        </View>
    )
}