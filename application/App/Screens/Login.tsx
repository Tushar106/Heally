import { Button, Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import LoginDoctor from "../../assets/images/LoginDoctors.png"
import LoginPng from "../../assets/images/LoginPng.png"
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Loading from "../Components/Loading";
import { AuthContext } from "../Components/Context/AuthContext";



const Login = () => {
    const [loading, setLoading] = useState(false);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const bottomSheetRegisterRef = useRef<BottomSheetModal>(null);
    const { register, login} = useContext(AuthContext);
    // console.log(EXPO_PUBLIC_API_KEY)

    const snapPoints = useMemo(() => ["80%"], []);

    // callbacks
    const handleLoginModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleRegisterModalPress = useCallback(() => {
        bottomSheetRegisterRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        setEmail("")
        setPassword("")
    }, []);

    const handleLogin = async () => {
        try {
            if (email.length == 0) {
                alert("Enter Email");
                return
            }
            if (password.length <= 0) {
                alert("Password length must be atleast 8");
                return
            }
            bottomSheetModalRef.current.close();
            setLoading(true)
            let response = await login(email, password)
            setLoading(false);
            if (response.success == false) {
                return alert(response.message)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleRegister = async () => {
        try {
            if (email.length == 0) {
                alert("Enter Email");
                return
            }
            if (password.length <= 0) {
                alert("Password length must be atleast 8");
                return
            }
            if (name.length <= 0) {
                alert("Password length must be atleast 8");
                return
            }
            bottomSheetRegisterRef.current.close();
            setLoading(true)
            let response = await register(email, password, name)
            if (response.success == false) {
                return alert(response.message)
            }
            await setLoading(false);
        } catch (error) {
            setLoading(true)
            console.log(error);
        }
    }
    

    return (
        <GestureHandlerRootView style={style.container}>
            <View style={style.container}>
                <BottomSheetModalProvider>
                    <ImageBackground source={LoginDoctor} resizeMode="cover" style={style.imageWrapper}>
                        <View style={{ paddingLeft: 12 }} >
                            <Text style={style.text}>Protect yourself {"\n"}and your loved {"\n"}ones!</Text>
                        </View>
                    </ImageBackground>
                    <View style={style.ButtonWrapper}>
                        <Text style={{ fontSize: 16, color: "white", fontWeight: "500" }}>Heally Taking care of your health! Book your doctor and protect your loved once</Text>
                        {!loading ? <TouchableOpacity style={style.button1} onPress={handleLoginModalPress}>
                            <Text style={style.buttonText1}>Login with Email <Ionicons name="mail" size={18} color="white" /> </Text>
                        </TouchableOpacity> : <Loading size={100} />}
                        <BottomSheetModal
                            ref={bottomSheetModalRef}
                            index={0}
                            snapPoints={snapPoints}
                            onChange={handleSheetChanges}
                        >
                            <BottomSheetView style={style.insideModalContainer}>
                                <View style={{ flex: 1, alignItems: "center", flexDirection: "column", gap: 10 }}>
                                    <Image source={LoginPng} style={{ width: "80%", height: "40%", objectFit: "cover" }} />
                                    <ScrollView>
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 10 }}>
                                            <Text style={{ fontWeight: "bold", color: "white", fontSize: 32 }}>Sign In</Text>
                                            <View style={{ backgroundColor: "white", width: "85%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, borderRadius: 5 }}>
                                                <Ionicons name="mail" size={32} color="green" />
                                                <TextInput
                                                    placeholder="Email"
                                                    style={{
                                                        height: 40,
                                                        width: "80%",
                                                        paddingLeft: 20
                                                    }}
                                                    placeholderTextColor={"black"}
                                                    autoCapitalize="none"
                                                    value={email}
                                                    onChangeText={(text) => setEmail(text)}
                                                />
                                            </View>
                                            <View style={{ backgroundColor: "white", width: "85%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, borderRadius: 5 }}>
                                                <MaterialIcons name="password" size={32} color="black" />
                                                <TextInput
                                                    placeholder="Password"
                                                    style={{
                                                        height: 40,
                                                        width: "80%",
                                                        paddingLeft: 20
                                                    }}
                                                    secureTextEntry={true}
                                                    placeholderTextColor={"black"}
                                                    autoCapitalize="none"
                                                    value={password}
                                                    onChangeText={(text) => setPassword(text)}
                                                />
                                            </View>
                                            {!loading ? <TouchableOpacity onPress={handleLogin} style={[style.button2, { backgroundColor: "#3286f6" }]}>
                                                <Text style={{ fontSize: 20, color: "white", fontWeight: "600" }}>Sign In</Text>
                                            </TouchableOpacity> :
                                                <Loading size={100} />
                                            }
                                        </View>
                                    </ScrollView>
                                </View>
                            </BottomSheetView>
                        </BottomSheetModal>
                        <TouchableOpacity onPress={handleRegisterModalPress}>
                            <Text style={{ fontSize: 15, fontWeight: "400", color: "white" }}>Dont have a Account? <Text style={{ textDecorationLine: "underline", color: "green", fontWeight: "700" }}>Sign Up</Text></Text>
                        </TouchableOpacity>
                        <BottomSheetModal
                            ref={bottomSheetRegisterRef}
                            index={0}
                            snapPoints={snapPoints}
                            onChange={handleSheetChanges}
                        >
                            <BottomSheetView style={style.insideModalContainer}>
                                <ScrollView>
                                    <View style={{ flex: 1, alignItems: "center", flexDirection: "column", gap: 10 }}>
                                        <Text style={{ fontWeight: "bold", color: "white", fontSize: 32 }}>Register Here</Text>
                                        <View style={{ backgroundColor: "white", width: "85%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, borderRadius: 5 }}>
                                            <MaterialIcons name="drive-file-rename-outline" size={32} color="green" />
                                            <TextInput
                                                placeholder="Name"
                                                style={{
                                                    height: 40,
                                                    width: "80%",
                                                    paddingLeft: 20
                                                }}
                                                placeholderTextColor={"black"}
                                                autoCapitalize="none"
                                                value={name}
                                                onChangeText={(text) => setName(text)}
                                            />
                                        </View>
                                        <View style={{ backgroundColor: "white", width: "85%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, borderRadius: 5 }}>
                                            <Ionicons name="mail" size={32} color="green" />
                                            <TextInput
                                                placeholder="Email"
                                                style={{
                                                    height: 40,
                                                    width: "80%",
                                                    paddingLeft: 20
                                                }}
                                                placeholderTextColor={"black"}
                                                autoCapitalize="none"
                                                value={email}
                                                onChangeText={(text) => setEmail(text)}
                                            />
                                        </View>
                                        <View style={{ backgroundColor: "white", width: "85%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, borderRadius: 5 }}>
                                            <MaterialIcons name="password" size={32} color="black" />
                                            <TextInput
                                                placeholder="Password"
                                                style={{
                                                    height: 40,
                                                    width: "80%",
                                                    paddingLeft: 20
                                                }}
                                                secureTextEntry={true}
                                                placeholderTextColor={"black"}
                                                autoCapitalize="none"
                                                value={password}
                                                onChangeText={(text) => setPassword(text)}
                                            />
                                        </View>
                                        {!loading ? <TouchableOpacity style={[style.button2, { backgroundColor: "#3286f6" }]} onPress={handleRegister}>
                                            <Text style={{ fontSize: 20, color: "white", fontWeight: "600" }}>Register</Text>
                                        </TouchableOpacity> : <Loading size={100} />}
                                    </View>
                                </ScrollView>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </View>
                </BottomSheetModalProvider>
            </View>
        </GestureHandlerRootView>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    imageWrapper: {
        flex: 2,
        backgroundColor: "#black"
    },
    text: {
        fontSize: 24,
        color: "#fff",
        fontStyle: "italic",
        fontWeight: "bold",
    },
    ButtonWrapper: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        gap: 10
    },
    button1: {
        width: "85%",
        backgroundColor: "#25814E",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        textAlign: "center",
        padding: 8,
        borderRadius: 10
    },
    button2: {
        width: "85%",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        textAlign: "center",
        padding: 8,
        borderRadius: 10
    },
    buttonText1: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 18,
        fontStyle: "italic",
        fontWeight: "600",
        color: "white"
    },
    buttonText2: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 18,
        fontStyle: "italic",
        fontWeight: "600",
        color: "black"
    },
    insideModalContainer: {
        flex: 1,
        padding:10,
        backgroundColor: "black",
        justifyContent: "center",
        alignContent: "center"
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    imageContainer: {
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
    },
    errorText: {
        color: "red",
        marginTop: 16,
    },
})
export default Login