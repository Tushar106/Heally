import { View, Text, Image, TouchableOpacity, Pressable, StyleSheet, Linking } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import Loading from '../Loading';


export default function SearchItems({ navigation, data, searchType }) {
  const handlePress = () => {
    navigation.navigate('Doctor Profile')
  }
  if (data == undefined) {
    return <Loading size={100} />
  }
  const openGoogleMaps = (address) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };
  return (
    <ScrollView>
      <View style={{ flex: 1, flexDirection: "column", padding: 10, gap: 10 }}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity style={{ width: "100%", backgroundColor: "white", padding: 10, borderRadius: 5, gap: 10 }} onPress={()=>{searchType==="doctor"?handlePress():openGoogleMaps(item.address)}}>
              <View style={{ display: "flex", flexDirection: 'row', justifyContent: "center", alignItems: "center", borderBottomColor: "black", borderBottomWidth: .5, padding: 5 }}>
                <Image source={{ uri: item["image_url"] }} width={60} height={60} borderRadius={100} />
                <View style={{ flex: 1, margin: 5 }}>
                  <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: "green" }}>{searchType}</Text>
                    <StarRating rating={item.rating} />
                  </View>
                  <Text style={{ fontSize: 18, fontWeight: "700" }}>{item.name}</Text>
                </View>
              </View>
              <View style={{ paddingLeft: 5, display: "flex", gap: 7 }}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 7 }}>
                  <Entypo name="location-pin" size={20} color="green" /><Text style={{
                    flexShrink: 1,
                    maxWidth: '90%',
                  }}>{item.address}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        })
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