import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth, db, storage, userRef } from '../../../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
                const docRef = doc(db, "users", user.uid);
                const docData = await getDoc(docRef);
                if (docData.exists()) {
                    setProfileImage(docData.data().profileImage)
                } else {
                    console.log("No such document!");
                }
            }
            else {
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        return unsub
    }, [])

    // Function to handle user login
    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return { success: true }
        } catch (error) {
            const msg = error.message
            if (error.message == "Firebase: Error (auth/invalid-email).")
                msg = "Invalid Email"
            if (error.message == "Firebase: Error (auth/invalid-credential).")
                msg = "Email & Password Incorrect"
            return { success: false, message: msg }
        }
    };

    // Function to handle user logout
    const logout = async () => {
        try {
            // Perform logout logic here
            await signOut(auth);
            setUser(null);
            return { success: true }
        } catch (error) {
            return { success: false, message: error.message }
        }
    };

    const register = async (email, password, name) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(response.user, {
                displayName: name
            });
            await setDoc(doc(db, "users", response?.user?.uid), {
                userId: response?.user?.uid,
                email: response?.user?.email,
                name: name
            })
            console.log(response)
            return { success: true, data: response?.user }
        } catch (error) {
            const msg = error.message
            if (error.message == "Firebase: Error (auth/email-already-in-use).")
                msg = "Email already in Use"
            if (error.message == "Firebase: Error (auth/invalid-email).")
                msg = "Invalid Email"
            return { success: false, message: msg }
        }
    }

    const uploadImage = async (file, setUpload) => {
        setUpload(false);
        const fetchResponse = await fetch(file.uri);
        const theBlob = await fetchResponse.blob();
        const storage = await getStorage();
        const storageRef = await ref(storage, `/image/${user.uid}`);
        // //uploads the file to firebase storage
        const uploadTask = uploadBytesResumable(storageRef, theBlob);
        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, (error) => {
                console.log(error)
                reject(error)
            }, async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    setProfileImage(downloadURL)
                    await setDoc(doc(db, "users", user.uid), {
                        profileImage: downloadURL
                    }, { merge: true })
                    setUpload(true);
                    resolve({
                        downloadURL,
                        metadata: uploadTask.snapshot.metadata
                    })
                });
            });
        })
    }

    // Value object to be provided by the context
    const authContextValue = {
        user,
        isAuthenticated,
        profileImage,
        login,
        logout,
        register,
        uploadImage,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};