import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";

const SimpleFlatList =()=>{
    const [data, setData]= useState([]);
    const [Loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading (false);
            }
        }
        fetchData();
    },[]);

    const renderItem =({item}) =>(
        <View>
            <Text>{item.title}</Text>
            <Text>{item.body}</Text>
        </View>

    );

    return(
        <View style={styles.container}>
            <FlatList
            data={data}
            keyExtractor={(item)=> item.id.toString()}
            renderItem={renderItem}
            />

        </View>
    )

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },
})
export default SimpleFlatList;