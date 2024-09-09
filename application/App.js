
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Login from './App/Screens/Login';
import './firebaseConfig'
import { AuthContextProvider } from './App/Components/Context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';;
import Navigation from './App/Navigations/Navigation';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.container}>
      <StatusBar barStyle='white-content' />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    color:"white"
  },
});
