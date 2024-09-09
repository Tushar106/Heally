import { ScrollView, StyleSheet } from 'react-native'
import SearchBar from '../Components/Search/SearchBar';
import Options from '../Components/Search/Options';
import SearchItems from '../Components/Search/SearchItems';
export default function SearchScreen({navigation,route}) {

    return (
        <ScrollView style={style.container}>
            <SearchBar/>
            <Options />
            <SearchItems navigation={navigation} />
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        gap: 20
    }
})