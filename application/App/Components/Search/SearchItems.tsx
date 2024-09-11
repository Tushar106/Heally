import { View, Text, Image, TouchableOpacity, Pressable, StyleSheet, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import Loading from '../Loading';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SearchItems({ navigation, data, searchType, sort, filter }) {
  const [element, setElements] = useState([]);
  const handlePress = (data) => {
    // console.log(data)
    navigation.navigate('Doctor Profile', {
      data: data
    })
  }
  if (data == undefined) {
    return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Loading size={100} /></View>)
  }
  const openGoogleMaps = (address) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };
  function capitalizeFLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    let filteredData = data;

    // Apply filter
    // Add more filter conditions as needed

    // Apply sort
    if (filter == 'General') {
      filteredData = data
    }
    if (filter == 'Cardiology') {
      filteredData = data.filter(item => item.specialty == 'Cardiology');
    }
    if (filter == 'Psychiatry') {
      filteredData = data.filter(item => item.specialty == 'Psychiatry');
    }
    if (filter == 'Ophthalmology') {
      filteredData = data.filter(item => item.specialty == 'Ophthalmology');
    }
    setElements(filteredData);
  }, [sort, filter])


  return (
    <ScrollView>
      <View style={{ flex: 1, flexDirection: "column", padding: 10, gap: 10 }}>
        {element.map((item, index) => {
          return (
            <TouchableOpacity key={index} style={{ width: "100%", backgroundColor: "white", padding: 10, borderRadius: 5, gap: 10 }} onPress={() => { searchType === "doctor" ? handlePress(item) : openGoogleMaps(item.address) }}>
              <View style={{ display: "flex", flexDirection: 'row', justifyContent: "center", alignItems: "center", borderBottomColor: "black", borderBottomWidth: .5, padding: 5 }}>
                <Image source={{ uri: searchType == 'doctor' ? item.profileImage : item["image_url"] }} width={60} height={60} borderRadius={100} />
                <View style={{ flex: 1, margin: 5 }}>
                  <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: "green" }}>{capitalizeFLetter(searchType)}</Text>
                    {searchType != "doctor" && <StarRating rating={item.rating} />}
                  </View>
                  <Text style={{ fontSize: 18, fontWeight: "700" }}>{item.name}</Text>
                  {searchType == 'doctor' && <Text>{item.specialty}</Text>}
                </View>
              </View>
              <View style={{ paddingLeft: 5, display: "flex", gap: 7 }}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 7 }}>
                  <Entypo name="location-pin" size={20} color="green" /><Text style={{
                    flexShrink: 1,
                    maxWidth: '90%',
                  }}>{item.address}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 7 }}>
                  <FontAwesome name="money" size={20} color="green" /><Text>{item.fees}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        })
        }
        {element.length == 0 &&
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Text style={{
              color: "white"
            }
            }>No Doctor Found</Text>
          </View>
        }
      </View>
    </ScrollView>
  )
}

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <View style={styles.container}>
      {[...Array(fullStars)].map((_, index) => (
        <FontAwesome key={`full-${index}`} name="star" size={20} color="gold" />
      ))}
      {halfStar === 1 && <FontAwesome name="star-half" size={20} color="gold" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FontAwesome key={`empty-${index}`} name="star-o" size={20} color="gold" />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});