// firebaseConfig.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app"
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import { getFirestore,collection } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA2sqlulOTaFM680mr_WTeUh4AfisWkssA",
    authDomain: "hospitalappointments-a788c.firebaseapp.com",
    projectId: "hospitalappointments-a788c",
    storageBucket: "hospitalappointments-a788c.appspot.com",
    messagingSenderId: "657111019562",
    appId: "1:657111019562:web:4a21db0a459545a8dc9353"
};

const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})
// export const db = getFireStore(app);


export const db= getFirestore(app)
export const userRef = collection(db, "users");
export const roomRef = collection(db, "rooms");