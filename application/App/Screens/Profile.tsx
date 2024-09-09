import { View, Text, Button, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Components/Context/AuthContext'
import * as ImagePicker from "expo-image-picker";
export default function Profile() {
  const { logout, uploadImage, profileImage } = useContext(AuthContext)
  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(true);
  useEffect(() => {
  }, [])
  const handleLogout = async () => {
    await logout();
  }
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

      if (!result.cancelled) {
        setFile(result.assets[0]);
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
  return (
    <View style={{ flex: 1, flexDirection: "column", padding: 10 }}>
      <TouchableOpacity style={{ display: "flex", flexDirection: "row", width: "85%", borderWidth: 1, borderColor: "white", alignItems: "center", gap: 10, padding: 5 }} onPress={pickImage}>
        {file ? <Image source={{ uri: file.uri }} style={{ width: 50, height: 50, borderRadius: 50 }} /> : <Image source={{ uri: profileImage }} style={{ width: 50, height: 50, borderRadius: 50 }} />}
        <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>Upload Profile Picture</Text>
      </TouchableOpacity>
      {upload == false && <ActivityIndicator size={"large"} />}
      <Button title='upload' onPress={handleUpload} />
      <Button title='Logout' onPress={handleLogout} />
    </View>
  )
}

