import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';

export function Services({navigation}) {
    const services = [{ type: 'Hospitals', icon: <FontAwesome5 name="hospital-alt" size={40} color="green" /> }, {
        type: "Doctors",
        icon: <Fontisto name="doctor" size={40} color="white" />
    }, {
        type: "Labs",
        icon: <FontAwesome5 name="file-medical" size={40} color="white" />
    },
    {
        type: "Medicines",
        icon: <FontAwesome5 name="hand-holding-medical" size={40} color="green" />
    }]
    return (
        <View style={{ marginTop: 10, flex: 1, flexDirection: "column", gap: 10 }}>
            <Text style={{ color: "white", fontSize: 25, fontWeight: "600" }}>Services</Text>
            <View style={{
                display: "flex", width: "100%", flexDirection: "row", flexWrap: 'wrap',
                alignContent: 'flex-start',alignItems:"stretch",justifyContent:"center"
            }}>
                {services.map((item, index) => {
                    return (
                        <View style={{ width: "50%" }} key={index}>
                            <TouchableOpacity key={index} style={{ padding: 10, margin: 5, flex:1, flexDirection: "row", backgroundColor: "#3c3c3c", borderWidth: 1, borderColor: "#9B9797", borderRadius: 5, gap: 5, justifyContent: "center", alignItems: "center" }} onPress={()=>{
                                navigation.navigate('Search',{screen:"SearchScreen",params:{searchElement:item.type}})
                            }}>
                                <Text style={{ fontSize: 22, color: "white", fontWeight: "500", width: "70%", textAlign: 'center' }}>{item.type}</Text>
                                {item.icon}
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}