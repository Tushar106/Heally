import { ScrollView, StyleSheet, View } from 'react-native'
import SearchBar from '../Components/Search/SearchBar';
import Options from '../Components/Search/Options';
import SearchItems from '../Components/Search/SearchItems';
import { useContext, useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import { AuthContext } from '../Components/Context/AuthContext';
export default function SearchScreen({ navigation, route }) {
    const searchType = route.params.searchElement
    const [search, setSearch] = useState(route.params.searchElement)
    const [loading, setLoading] = useState(false);
    const {location}=useContext(AuthContext);
    const [data, setData] = useState([]);
    const [sort,setSort]=useState("none");
    const [filter,setFilter]=useState("General");
    useEffect(() => {
        console.log(location)
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
                lat:location.coords.latitude,
                lng:location.coords.longitude,
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
            {searchType=='doctor'&&<Options sort={sort} setSort={setSort} filter={filter} setFilter={setFilter}/>}
            {!loading && data ?
                <>
                    <SearchItems navigation={navigation} data={data[searchType]} searchType={searchType} sort={sort} filter={filter}  />
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