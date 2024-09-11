import { View, Text, TouchableOpacity } from 'react-native'
import React, { Component, useCallback, useMemo, useRef } from 'react'
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { RadioButton } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

export default function Options({sort,setSort,filter,setFilter}) {
    const filterSheetModalRef = useRef<BottomSheetModal>(null);
    const sortSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ["35%"], []);
    const handleSortBy = useCallback(() => {
        sortSheetModalRef.current?.present();
    }, []);
    const handleFilterBy = useCallback(() => {
        filterSheetModalRef.current?.present();
    }, []);
    useFocusEffect(
        React.useCallback(() => {
          return () => sortSheetModalRef.current?.close()
        }, [])
      );
      useFocusEffect(
        React.useCallback(() => {
          return () => filterSheetModalRef.current?.close()
        }, [])
      );
    return (
        <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
                <View style={{ padding: 10, margin: 10, borderRadius: 5, borderColor: "white", backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
                    {/* <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 5 }} onPress={handleSortBy}>
                        <FontAwesome name="unsorted" size={24} color="black" />
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>Sort by</Text>
                    </TouchableOpacity>
                    <SortModal bottomSheetModalRef={sortSheetModalRef} snapPoints={snapPoints} sort={sort} setSort={setSort} /> */}
                    <TouchableOpacity style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }} onPress={handleFilterBy}>
                        <Feather name="filter" size={24} color="black" />
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>Filter</Text>
                    </TouchableOpacity>
                    <FilterModal bottomSheetModalRef={filterSheetModalRef} filter={filter} setFilter={setFilter} snapPoints={snapPoints} />
                </View>
            </View>
        </View>
    )
}
const FilterModal = (props) => {
    
    const value=props.filter;
    const setValue=props.setFilter;
    return (
        <BottomSheetModal
            ref={props.bottomSheetModalRef}
            index={0}
            snapPoints={props.snapPoints}
        >
            <BottomSheetView>
                <View style={{ display: "flex", width: "100%", height: "100%", padding: 10, justifyContent:"center" }}>
                    <View style={{ flex: 1, flexDirection: "column" ,gap:5 }}>
                        <Text style={{ fontWeight: "600", fontSize: 25, color: "black",paddingLeft:10 }}>Filter</Text>
                        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                        <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                <RadioButton value="General" />
                                <Text>General</Text>
                            </View>
                            <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                <RadioButton value="Cardiology" />
                                <Text>Cardiology</Text>
                            </View>
                            <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                <RadioButton value="Psychiatry" />
                                <Text>Psychiatry</Text>
                            </View>
                            <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                <RadioButton value="Ophthalmology" />
                                <Text>Ophthalmology</Text>
                            </View>
                        </RadioButton.Group>
                    </View>
                </View>
            </BottomSheetView>
        </BottomSheetModal>

    )
}
const SortModal = (props) => {
   const value=props.sort;
   const setValue=props.setSort;
    return (
        <BottomSheetModal
            ref={props.bottomSheetModalRef}
            index={0}
            snapPoints={props.snapPoints}
        >
            <BottomSheetView>
                <View style={{ display: "flex", width: "100%", height: "100%", padding: 10, justifyContent:"center" }}>
                    <View style={{ flex: 1, flexDirection: "column" ,gap:10 }}>
                        <Text style={{ fontWeight: "600", fontSize: 25, color: "black",paddingLeft:10 }}>Sort By</Text>
                        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                            <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                <RadioButton value="lowHigh" />
                                <Text>Price: low to high</Text>
                            </View>
                            <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                <RadioButton value="highLow" />
                                <Text>Price: high to low</Text>
                            </View>
                            <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                <RadioButton value="none" />
                                <Text>None</Text>
                            </View>
                        </RadioButton.Group>
                    </View>
                </View>
            </BottomSheetView>
        </BottomSheetModal>

    )
}