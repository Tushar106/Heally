import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function DoctorProfile({ navigation }) {
    const [selectedDate, setSelectedDate] = useState(0);
    const [selectedTime, setSelectedTime] = useState(-1);

    const dates = ['Today', 'Tomorrow', new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toDateString(), new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toDateString()];
    const startTime = 10; // Start time in 24-hour format
    const endTime = 18; // End time in 24-hour format
    const timeSlot = Array(endTime - startTime + 1).fill(null).map((_, index) => {
        const hour = startTime + index;
        return `${hour % 12 || 12}:${'00'} ${hour < 12 ? 'AM' : 'PM'}`;
    });
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute

        return () => clearInterval(timer); // Clean up on component unmount
    }, []);
    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'none'
            }
        });
        return () => {
            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    diplay: "flex",
                    backgroundColor: "black", borderTopWidth: 0
                }
            });
        }
    }, [])
    const handleBooking = () => {
        if (selectedTime == -1) {
            return alert("Please select a Time");
        }
        var selectedDateObj = new Date(dates[selectedDate]);
        if (selectedDate == 0) {
            selectedDateObj = new Date();
        }
        if (selectedDate == 1) {
            selectedDateObj = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
        }
        const selectedTimeObj = new Date();
        selectedTimeObj.setHours(parseInt(timeSlot[selectedTime].split(':')[0]), 0, 0, 0);
        if (selectedDateObj >= new Date() || (selectedDateObj.toDateString() === new Date().toDateString() && selectedTimeObj > new Date())) {
            const formattedDate = selectedDateObj.toLocaleString('default', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' });
            navigation.navigate('Confirmation', {
                selectedDate:formattedDate,
                selectedTime: timeSlot[selectedTime]
            });
        } else {
            alert('Selected date and time is in the past. Please select a future date and time.');
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, flexDirection: "column", padding: 10 }}>
            <ScrollView >
                <View style={{ width: "100%", backgroundColor: "#f3f6f5", padding: 10, borderRadius: 5, gap: 10 }}>
                    <View style={{ display: "flex", flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                        <Image source={{ uri: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg" }} width={60} height={60} borderRadius={100} />
                        <View style={{ flex: 1, margin: 5 }}>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ color: "green" }}>Doctor</Text>
                            </View>
                            <Text style={{ fontSize: 18, fontWeight: "700" }}>Mohammad Ansari</Text>
                            <Text>Park Hospitals</Text>
                            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                                <Text style={{ backgroundColor: "#ebf5f4", color: "#8ecbaf", padding: 1, borderRadius: 5 }}>#Comfortable waiting area</Text>
                                <Text style={{ backgroundColor: "#ebf5f4", color: "#8ecbaf", padding: 1, borderRadius: 5 }}>#Clean</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 7 }}>
                        <Entypo name="location-pin" size={24} color="green" /><Text>Park Hospital, Murthal</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 7 }}>
                        <View style={{ flex: 1, flexDirection: "row", borderRightColor: "black", borderRightWidth: 1, justifyContent: "center", alignItems: 'center', gap: 10 }}>
                            <FontAwesome name="money" size={30} color="green" />
                            <View style={{ display: "flex", flexDirection: "column" }}>
                                <Text style={{ fontSize: 12, color: "grey", fontWeight: "400" }}>Fees</Text>
                                <Text>200$</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: 'center', gap: 10 }}>
                            <Ionicons name="timer-outline" size={30} color="green" />
                            <View style={{ display: "flex", flexDirection: "column" }}>
                                <Text style={{ fontSize: 12, color: "grey", fontWeight: "400" }}>Duration</Text>
                                <Text>15 Minutes</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 5 }}>
                        <Text style={{ fontWeight: "600", fontSize: 18 }}>Select your Appointment</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                                {dates.map((date, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={{ padding: 10, backgroundColor: selectedDate == index ? "#30a16a" : "#cec9c9", borderRadius: 100 }}
                                        onPress={() => setSelectedDate(index)}
                                    >
                                        <Text style={{ color: selectedDate == index ? "white" : "black", fontWeight: "600" }}>{date}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                        <View style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", flexWrap: 'wrap' }}>
                            {timeSlot.map((time, index) => {
                                const isPast = selectedDate === 0 && new Date().getHours() >= startTime + index;
                                return (
                                    <View style={{ width: "33.33%", padding: 5 }} key={index}>
                                        <TouchableOpacity
                                            key={index}
                                            style={[styles.box, isPast ? styles.past : selectedTime === index && styles.selected]}
                                            onPress={() => !isPast && setSelectedTime(index)}
                                            disabled={isPast}
                                        >
                                            <Text style={{ color: selectedTime == index ? "#30a16a" : "black", fontWeight: "600" }}>{time}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: "700" }}>About</Text>
                        <Text style={{ fontSize: 15 }}>Dr. Mohammad Ansari is a well known doctor in the field of Gynecology and Pharma. He has been working in the field for more than 10 years. He has a good reputation among his patients.</Text>
                    </View>
                    <TouchableOpacity style={{ width: "100%", padding: 10, borderRadius: 5, backgroundColor: "green", alignItems: "center", flex: 1, justifyContent: "center" }} onPress={handleBooking}>
                        <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>Book</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    box: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#cec9c9',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 5,
    },
    selected: {
        borderColor: 'green',
    },
    past: {
        borderColor: 'red',
    },
});