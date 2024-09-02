import React, { useState } from "react";
import { Text, TouchableOpacity, FlatList, StyleSheet, View, Button } from "react-native";
import Roam from "roam-reactnative";
// // Task:
// Objective: Build a React Native application that tracks trip details (start/end locations and timestamps).
// Create a New React Native Project:
// Integrate the Roam Library: Refer to the Roam library's documentation (https://github.com/roam-ai/roam-reactnative)
// Create a Splash Screen
// Create the Home Screen with Start/End Trip Buttons and Location Tracking:
// Start Trip Button: Start Fetch Lat, Long & time and store in app.
// Stop Trip Button: Stop Fetch location and display Lat, Long & time in lis
const Home = () => {

    const [tripdata, setTripData] = useState([]);
    const [tracking, setTracking] = useState(false);


    const handleStart = () => {
        setTracking(true);
        // active tracking
        Roam.startTracking("ACTIVE");
        Roam.subscribe("LOCATION", "USER1");
        Roam.startListener("location", (location) => {
            // do something on location received
            console.log("Location", location);
            const newLocation = {
                latitude: location.latitude,
                longitude: location.longitude,
                timestamp: new Date().toLocaleString()
            };
            setTripData((prev) => [...prev, newLocation]);
            // Console Output:
            // [{"activity": "S", "location": {"accuracy": 22.686637856849305, "altitude": 288.10509490966797, "latitude": 10.356502722371895, "longitude": 78.00075886670541, "speed": -1}, "recordedAt": "2022-03-22T11:18:04.928Z", "timezone": "+0530", "userId": "6239b06506df1f5c1c375353"},{..}...]
        });
    }
    const handleEnd = () => {
        setTracking(false);
        Roam.stopTracking();
        Roam.unSubscribe("LOCATION", "USER1");
    }

    return (
        <View style={styles.container}>
            <Text>Trip Tracking</Text>

            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
                onPress={handleStart}>
                <Button title="Start"></Button>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}
                onPress={handleEnd}>
                <Button title="End"></Button>
            </TouchableOpacity>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    item: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
  });
export default Home;