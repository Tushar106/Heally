import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AuthContext } from '../Components/Context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Loading from '../Components/Loading';
const AppointmentItem = ({ data }) => {
  const parseDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [day, dayNumber, month, year] = formattedDate.split(' ');
    return { day, date: `${dayNumber} ${month}` };
  };

  const { day, date } = parseDate(data.date);
  // const check=checkPast(data.date,data.time)
  return (
    <View style={styles.container}>
      <View style={styles.dayContainer}>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.timeContainer}>
          <AntDesign name="clockcircleo" size={16} color="#333" style={styles.icon} />
          <Text style={styles.time}>{data.time}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{data.doctorName}</Text>
        </View>
        <View style={styles.locationContainer}>
          <AntDesign name="enviromento" size={16} color="#333" style={styles.icon} />
          <Text style={styles.location}>{data.address}</Text>
        </View>
      </View>
    </View>
  );
};

const Appointment = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchUserAppointments();
  }, [])

  const fetchUserAppointments = async () => {
    setAppointments([])
    setLoading(true)
    try {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      const userData = await docSnap.data();
      const apps = await userData.appointments;
      await apps.map(async (appointment) => {
        const appRef = doc(db, 'appointments', appointment)
        const appSnap = await getDoc(appRef);
        const appointmentData = await appSnap.data();
        setAppointments((prev) => [...prev, appointmentData])
      })
      setLoading(false);
    } catch (error) {
      alert(error)
    }
  }
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading size={100} />
      </View>
    )
  }
  // console.log(appointments)
  return (
    <ScrollView style={styles.calendar}>
      {appointments ? appointments.map((item, index) => {
        return (
          <AppointmentItem key={index} data={item} />
        )
      }
      ) : <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 7 }}>
        <Text style={{
          color: "white"
        }
        }>No Doctor Found</Text>
      </View>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  details: {
    flex: 1,
    justifyContent: "center",
    // alignItems:"center"
  },
  calendar: {
    flex: 1,
    padding: 16,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  dayContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    marginBottom: 8,
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6f00',
  },
  date: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff6f00',
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    flex: 2
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  titleContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  attendees: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  attendeeAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: '#333',
  },
  icon: {
    width: 16,
    height: 16,
  },
});

export default Appointment;