import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'
import Loading from '../Components/Loading';
import { addDoc, arrayUnion, collection, doc, runTransaction, setDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../Components/Context/AuthContext';
import { db } from '../../firebaseConfig';
import * as Calendar from 'expo-calendar';

export default function ConfirmationScreen({ navigation, route }) {
    const { selectedDate, selectedTime, doctor } = route.params;
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    // console.log(selectedDate,selectedTime)

    const addEventToCalendar = async (
        title: string,
        appDate: Date,
        location: string
    ) => {
        try {
            const { status } = await Calendar.requestCalendarPermissionsAsync()
            if (status === 'granted') {
                console.log('Permissions granted. Fetching available calendars...')
                console.log(appDate)
                const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
                const defaultCalendar =
                    calendars.find((calendar) => calendar.isPrimary) || calendars[0]
                if (defaultCalendar) {
                    const eventConfig = {
                        title,
                        startDate: appDate, // Use appDate as the start date
                        endDate: new Date(appDate.getTime() + 60 * 60 * 1000), // Set end date to 1 hour after start date
                        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                        allDay: false,
                        location,
                    }
                    const eventId = await Calendar.createEventAsync(defaultCalendar.id, eventConfig)
                    setLoading(false);

                    Alert.alert('Success', 'Event added to your calendar')
                } else {
                    console.warn('No available calendars found.')
                }
            } else {
                console.warn('Calendar permission not granted.')
            }
        } catch (error) {
            console.warn(error)
        }
    }



    const handleConfirm = async () => {
        setLoading(true);
        try {
            const appointmentRef = doc(collection(db, "appointments"));
            const userRef = doc(db, "users", user.uid);
            const doctRef = doc(db, "users", doctor.userId);

            await runTransaction(db, async (transaction) => {
                transaction.set(appointmentRef, {
                    doctorName: doctor.name,
                    patientName: user.displayName,
                    date: selectedDate,
                    time: selectedTime,
                    status: 'confirmed',
                    doctorId: doctor.userId,
                    patientId: user.uid,
                    address: doctor.address
                });
                transaction.update(userRef, {
                    appointments: arrayUnion(appointmentRef.id),
                });
                transaction.update(doctRef, {
                    appointments: arrayUnion(appointmentRef.id),
                });
            });

            const [weekday, month, day, year] = selectedDate.split(' ');
            const monthMap = {
                Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
                Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
            };
            const monthIndex = monthMap[month];
            const parsedDate = new Date(year, monthIndex, day);

            const [time, period] = selectedTime.split(' ');
            let [hours, minutes] = time.split(':').map(Number);

            // Convert to 24-hour format if necessary
            if (period === 'PM' && hours < 12) {
                hours += 12;
            } else if (period === 'AM' && hours === 12) {
                hours = 0;
            }

            parsedDate.setHours(hours, minutes, 0, 0);


            // console.log(selectedDate)

            await addEventToCalendar(
                `Appointment with ${doctor.name}`,
                parsedDate,
                doctor.address
            )


            navigation.navigate('ThanksScreen');
        } catch (error) {
            alert(`Error adding appointment: ${error.message}`);
            setLoading(false);
        }
    }
    return (
        <View style={{ flex: 1, flexDirection: "column", padding: 10 }}>
            <View style={{ flex: 1, width: "100%", backgroundColor: "#f3f6f5", padding: 10, borderRadius: 5, gap: 10 }}>
                <View style={{ display: "flex", flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                    <Image source={{ uri: doctor.profileImage ? doctor.profileImage : "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yfGVufDB8fDB8fHww" }} width={60} height={60} borderRadius={100} />
                    <View style={{ flex: 1, margin: 5 }}>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ color: "green" }}>Doctor</Text>
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: "700" }}>{doctor.name}</Text>
                        <Text>{doctor.specialty}</Text>
                        <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                            <Text style={{ backgroundColor: "#ebf5f4", color: "#8ecbaf", padding: 1, borderRadius: 5 }}>#Comfortable waiting area</Text>
                            <Text style={{ backgroundColor: "#ebf5f4", color: "#8ecbaf", padding: 1, borderRadius: 5 }}>#Clean</Text>
                        </View>
                    </View>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 7 }}>
                    <Entypo name="location-pin" size={30} color="green" /><Text style={{ fontSize: 18 }}>{doctor.address}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 7 }}>
                    <AntDesign name="calendar" size={30} color="green" />
                    <View style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Text>{selectedDate}</Text>
                        <Text>{selectedTime}</Text>
                    </View>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 7 }}>
                    <View style={{ flex: 1, flexDirection: "row", borderRightColor: "black", borderRightWidth: 1, justifyContent: "center", alignItems: 'center', gap: 10 }}>
                        <FontAwesome name="money" size={30} color="green" />
                        <View style={{ display: "flex", flexDirection: "column" }}>
                            <Text style={{ fontSize: 12, color: "grey", fontWeight: "400" }}>Fees</Text>
                            <Text>{doctor.fees}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: 'center', gap: 10 }}>
                        <Ionicons name="timer-outline" size={30} color="green" />
                        <View style={{ display: "flex", flexDirection: "column" }}>
                            <Text style={{ fontSize: 12, color: "grey", fontWeight: "400" }}>Duration</Text>
                            <Text>30 Minutes</Text>
                        </View>
                    </View>
                </View>
                {!loading ? <TouchableOpacity style={{ width: "100%", padding: 10, borderRadius: 5, backgroundColor: "green", alignItems: "center", justifyContent: "center" }} onPress={handleConfirm} >
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>Confirm</Text>
                </TouchableOpacity> :
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Loading size={100} />
                    </View>}
            </View>
        </View>
    )
}