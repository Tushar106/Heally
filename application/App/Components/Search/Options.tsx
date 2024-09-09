import { View, Text, TouchableOpacity } from 'react-native'
import React, { Component, useCallback, useMemo, useRef } from 'react'
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { RadioButton } from 'react-native-paper';

export default function Options() {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ["40%"], []);
    const handleSortBy = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    return (
        <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
                <View style={{ padding: 10, margin: 10, borderRadius: 5, borderColor: "white", backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 5 }} onPress={handleSortBy}>
                        <FontAwesome name="unsorted" size={24} color="black" />
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>Sort by</Text>
                    </TouchableOpacity>
                    <Modal bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} />
                    <TouchableOpacity style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Feather name="filter" size={24} color="black" />
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>Filter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const Modal = (props) => {
    const [value, setValue] = React.useState('first');
    return (
        <BottomSheetModal
            ref={props.bottomSheetModalRef}
            index={0}
            snapPoints={props.snapPoints}
        >
            <BottomSheetView>
                <View style={{ display: "flex", width: "100%", height: "100%", padding: 10, justifyContent:"center" }}>
                    <View style={{ flex: 1, flexDirection: "column" ,gap:10 }}>
                        <Text style={{ fontWeight: "600", fontSize: 25, color: "black" }}>Sort By</Text>
                        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                            <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                <RadioButton value="first"/>
                                <Text>Most Recommended</Text>
                            </View>
                            <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                <RadioButton value="second" />
                                <Text>Price: low to high</Text>
                            </View>
                            <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                <RadioButton value="third" />
                                <Text>Price: high to low</Text>
                            </View>
                            <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                <RadioButton value="fourth" />
                                <Text>New</Text>
                            </View>
                        </RadioButton.Group>
                    </View>
                </View>
            </BottomSheetView>
        </BottomSheetModal>

    )
}