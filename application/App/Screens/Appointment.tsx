import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
const CalendarItem = ({ day, date, time, title, location, attendees }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dayContainer}>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.details}>
        <Text>h</Text>
      </View>
      
    </View>
  );
};

const Appointment = () => {
  const calendarData = [
    {
      day: 'Wed',
      date: '28',
      time: '09:00 - 09:30',
      title: '30min call meeting Peer <> Leslie',
      location: 'Online',
      attendees: [
        // { avatar: require('./attendee1.png') },
        // { avatar: require('./attendee2.png') },
      ],
    },
    {
      day: 'Thu',
      date: '29',
      time: '11:15 - 11:45',
      title: '30min call meeting Olivia, Liam <> Alban',
      location: 'Online',
      attendees: [
        // { avatar: require('./attendee3.png') },
        // { avatar: require('./attendee4.png') },
        // { avatar: require('./attendee5.png') },
      ],
    },
    {
      day: 'Fri',
      date: '30',
      time: '15:20 - 16:20',
      title: 'Livn Product Demo',
      location: 'Wework Paris, ...',
      attendees: [
        // { avatar: require('./attendee6.png') },
        // { avatar: require('./attendee7.png') },
        // { avatar: require('./attendee8.png') },
        // { avatar: require('./attendee9.png') },
      ],
    },
    {
      day: 'Fri',
      date: '30',
      time: '15:20 - 16:20',
      title: 'Livn Product Demo',
      location: 'Wework Paris, ...',
      attendees: [
        // { avatar: require('./attendee6.png') },
        // { avatar: require('./attendee7.png') },
        // { avatar: require('./attendee8.png') },
        // { avatar: require('./attendee9.png') },
      ],
    },
    {
      day: 'Fri',
      date: '30',
      time: '15:20 - 16:20',
      title: 'Livn Product Demo',
      location: 'Wework Paris, ...',
      attendees: [
        // { avatar: require('./attendee6.png') },
        // { avatar: require('./attendee7.png') },
        // { avatar: require('./attendee8.png') },
        // { avatar: require('./attendee9.png') },
      ],
    },
    {
      day: 'Fri',
      date: '30',
      time: '15:20 - 16:20',
      title: 'Livn Product Demo',
      location: 'Wework Paris, ...',
      attendees: [
        // { avatar: require('./attendee6.png') },
        // { avatar: require('./attendee7.png') },
        // { avatar: require('./attendee8.png') },
        // { avatar: require('./attendee9.png') },
      ],
    },
  ];

  return (
    <ScrollView style={styles.calendar}>
      {calendarData.map((item, index) => (
        <CalendarItem key={index} {...item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  details:{
    flex:2,
    
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
    justifyContent:"center",
    alignItems:"center",
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

// import React from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';

// const Appointment = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.ticket}>
//         <View style={styles.header}>
//           <Image
//             // source={require('./germany-flag.png')} 
//             style={styles.flag}
//           />
//           <Text style={styles.location}>Aucklan - New Zealand</Text>
//         </View>
//         <View style={styles.details}>
//           <Text style={styles.time}>Time</Text>
//           <Text style={styles.timeValue}>10:00 - 10:30</Text>
//         </View>
//         <View style={styles.details}>
//           <Text style={styles.bookingId}>Booking ID</Text>
//           <Text style={styles.bookingIdValue}>WTSOO12</Text>
//         </View>
//         <View style={styles.details}>
//           <Text style={styles.price}>Price</Text>
//           <Text style={styles.priceValue}>300 MYR</Text>
//         </View>
//       </View>
//       <View style={styles.date}>
//         <Text style={styles.dateMonth}>AUG</Text>
//         <Text style={styles.dateDay}>04</Text>
//         <Text style={styles.dateYear}>2020</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//   },
//   ticket: {
//     backgroundColor: '#4285F4',
//     padding: 20,
//     borderRadius: 10,
//     flex: 1,
//     marginRight: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   flag: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//   },
//   location: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   details: {
//     marginBottom: 10,
//   },
//   time: {
//     fontSize: 14,
//     color: '#fff',
//     marginBottom: 5,
//   },
//   timeValue: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   bookingId: {
//     fontSize: 14,
//     color: '#fff',
//     marginBottom: 5,
//   },
//   bookingIdValue: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   price: {
//     fontSize: 14,
//     color: '#fff',
//     marginBottom: 5,
//   },
//   priceValue: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   date: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     width: 100,
//   },
//   dateMonth: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#4285F4',
//   },
//   dateDay: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#4285F4',
//   },
//   dateYear: {
//     fontSize: 14,
//     color: '#4285F4',
//   },
// });

// export default Appointment;
