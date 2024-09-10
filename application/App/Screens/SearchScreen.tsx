import { ScrollView, StyleSheet, View } from 'react-native'
import SearchBar from '../Components/Search/SearchBar';
import Options from '../Components/Search/Options';
import SearchItems from '../Components/Search/SearchItems';
import { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
export default function SearchScreen({ navigation, route }) {
    const searchType = route.params.searchElement
    const [search, setSearch] = useState(route.params.searchElement)
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        if (searchType !== "") {
            setLoading(true)
            fetchData(searchType)
        }
    }, [search])
    const fetchData = (type) => {
        console.log(searchType)
        fetch("https://heallyserver-ba802f7f8155.herokuapp.com/nearby_places", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                address: "Varanasi",
                type: type
            }),
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                setData(responseData);
                setLoading(false)
            })
    }
    return (
        <ScrollView style={style.container}>
            <SearchBar search={search} setSearch={setSearch} />
            {!loading && data ?
                <>
                    <SearchItems navigation={navigation} data={data[searchType]} searchType={searchType} />
                </> :
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Loading size={100} /></View>}
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        gap: 20,
        minHeight: 100,
        minWidth: 100
    }
})