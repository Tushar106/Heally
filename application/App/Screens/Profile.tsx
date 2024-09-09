import React, { useContext, useState } from 'react';
import * as ImagePicker from "expo-image-picker";
import { Button, Alert, ActivityIndicator } from 'react-native'

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../Components/Context/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';
// import { FontAwesome } from '@expo/vector-icons/FontAwesome';
// import { FontAwesome } from '@expo/vector-icons';
// import FontAwesome from "@expo/vector-icons/FontAwesome"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Profile = ({ navigation, route }) => {
  const { user, logout, uploadImage, profileImage } = useContext(AuthContext)
  const [isPremium, setIsPremium] = useState(false);
  const handleLogout = async () => {
    await logout();
  }

  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(true);
  const pickImage = async () => {
    console.log("here")
    const { status } = await ImagePicker.
      requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {

      // If permission is denied, show an alert 
      return Alert.alert(
        "Permission Denied",
        `Sorry, we need camera  
             roll permission to upload images.`
      );
    } else {
      const result =
        await ImagePicker.launchImageLibraryAsync();
      console.log(result.assets[0].uri)
      if (result) {
        if (!result.cancelled) {
          setFile(result.assets[0]);
          await handleUpload();
        }
      }

    }
  };
  const handleUpload = async () => {
    try {
      const up = await uploadImage(file, setUpload)
    } catch (error) {
      alert("Error while Uploading")
    }
  }
  const onClick = () => {
    navigation.navigate("MyAppointments");
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profile}>
        <TouchableOpacity style={styles.profileImage} onPress={pickImage}>
          {file ? <Image source={{ uri: file.uri }} style={styles.userImage} /> : <Image source={{ uri: profileImage ? profileImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s" }} style={styles.userImage} />}
          {upload == false && <ActivityIndicator size={"large"} />}
        </TouchableOpacity>
        <Text style={styles.profileName}>{user.displayName}</Text>
        <Text style={styles.profileName}>{user.email}</Text>

      </View>
      <View style={styles.settings}>
        <TouchableOpacity style={styles.settingItem} onPress={onClick}>
          <View style={styles.settingIcon}>
            <FontAwesome name="calendar-check-o" size={24} color="black" />
          </View>
          <Text style={styles.settingText}>My Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
          <View style={styles.settingIcon}>
            <MaterialIcons name="logout" size={24} color="black" />
          </View>
          <Text style={styles.settingText}>LOG OUT</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "white"
  },
  profile: {
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: 'center',
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  profileName: {
    color: "white",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  settings: {
    padding: 15
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    width: 20,
    height: 20,
  },
  settingText: {
    fontSize: 16,
    flex: 1,
  },
  rightArrow: {
    width: 15,
    height: 15,
  },
  logoutButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#007BFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;