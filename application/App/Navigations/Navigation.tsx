
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Login from '../Screens/Login';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Components/Context/AuthContext';
import Home from '../Navigations/Home';
import Loading from '../Components/Loading';
export default function Navigation() {
    const Stack = createNativeStackNavigator();
    const navTheme = DefaultTheme;
    navTheme.colors.background = '#292929';
    const { isAuthenticated } = useContext(AuthContext)
    useEffect(() => {
    }, [isAuthenticated])
    if (isAuthenticated == undefined)
        return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Loading size={100} /></View>)
    return (
        <NavigationContainer theme={navTheme}>
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                {!isAuthenticated ? <Stack.Screen name='Login' component={Login} />
                    : <Stack.Screen name='HomeNavigation' component={Home} />}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#000000",
    },
});

