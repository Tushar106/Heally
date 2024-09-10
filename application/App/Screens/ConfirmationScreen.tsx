import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'
import Loading from '../Components/Loading';
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../Components/Context/AuthContext';
import { db } from '../../firebaseConfig';

export default function ConfirmationScreen({ navigation, route }) {
    const { selectedDate, selectedTime, doctor } = route.params;
    const [loading, setLoading] = useState(false);
    const {user}=useContext(AuthContext);
        const handleConfirm = async() => {
        setLoading(true);
        try {
            // Add the appointment to the appointments collection
            const appointment= await addDoc(collection(db, "appointments"), {
                doctorName: doctor.name,
                patientName: user.displayName,
                date: selectedDate,
                time: selectedTime,
                status: 'confirmed',
                doctorId:doctor.userId,
                patientId:user.uid
            })
            // Update the user document with the appointment UID
            await updateDoc(doc(db, 'users', user.uid), {
                appointments: arrayUnion(await appointment.id),
            });

            // Update the doctor document with the appointment UID
            await updateDoc(doc(db, 'users', doctor.userId), {
                appointments: arrayUnion(await appointment.id),
            });
            setLoading(false);
            navigation.navigate('ThanksScreen');
        } catch (error) {
            console.error('Error adding appointment: ', error);
            setLoading(false);
        }
    }
    return (
        <View style={{ flex: 1, flexDirection: "column", padding: 10 }}>
            <View style={{ flex: 1, width: "100%", backgroundColor: "#f3f6f5", padding: 10, borderRadius: 5, gap: 10 }}>
                <View style={{ display: "flex", flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                    <Image source={{ uri: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg" }} width={60} height={60} borderRadius={100} />
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
                            <Text>15 Minutes</Text>
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