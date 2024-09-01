import React, { useState } from 'react';

import {
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



function App() {

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const dropdownItems = [
    { id: '1', label: 'Option 1', value: 'option1' },
    { id: '2', label: 'Option 2', value: 'option2' },
    { id: '3', label: 'Option 3', value: 'option3' },
    // Add more options as needed
  ];

  const selectItem = (item) => {
    setSelectedValue(item);
    setDropdownVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => selectItem(item)}
    >
      <Text style={styles.dropdownItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.label}>Select an Option:</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setDropdownVisible(!dropdownVisible)}>
          <Text style={styles.dropdownButtonText}>
            {selectedValue ? selectedValue.label : 'Select an option...'}
          </Text>
        </TouchableOpacity>

        {dropdownVisible && <View style={styles.dropdownContainer}>
          <FlatList
            data={dropdownItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>}

        {selectedValue && (
          <Text style={styles.selectedValue}>
            You selected: {selectedValue.label}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  dropdownButton: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: 'black',
  },
  dropdownContainer: {
    position: 'relative',
    left: '2%',
    right: '10%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    maxHeight: '50%',
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: 'black',
  },
  selectedValue: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default App;


