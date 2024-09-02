import CheckBox from "@react-native-community/checkbox";
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";


const ListwithCheckBox = () => {

    const initialState = [
        { id: 1, name: 'play game', Checked: false },
        { id: 2, name: 'play Viedogame', Checked: false },
        { id: 3, name: 'Read Book ', Checked: false }
    ];
    const [item, setItem] = useState([
        { id: 1, name: 'play game', Checked: 'false' },
        { id: 2, name: 'play Viedogame', Checked: 'false' },
        { id: 3, name: 'Read Book ', Checked: 'false' }
    ]);
    const [selectedItem, setSelectedItem] = useState([]);

    const handalecheckBox = (item) => {

    }

    const redenerItem = ({item})=>(
        <View style={styles.item}>
            <CheckBox style={styles.checkbox}/>
            <Text>{item.name}</Text>
        </View>
    );

    return (
        <View style={StyleSheet.container}>
            <Text>Check List</Text>
            <View style={styles.checkboxContainer}>
                
                <FlatList
                    data={item}
                    keyExtractor={item.id}
                    renderItem={redenerItem} />
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: 'center',
    },
    item: {
        flexDirection: 'row'
    }
})
export default ListwithCheckBox;
