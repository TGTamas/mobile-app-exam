import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { createSupply } from '../../services/service';

const CreateSupply = ({ navigation }) => {
  const [id, setId] = useState('');
  const [model, setModel] = useState('');
  const [status, setStatus] = useState('');
  const [capacity, setCapacity] = useState('');
  const [owner, setOwner] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [cargo, setCargo] = useState('');

  const submitSupply = async () => {
    if (!id || !model || !status || !capacity || !owner || !manufacturer || !cargo) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (isNaN(id)) {
      Alert.alert('Error', 'ID must be a number');
      return;
    }

    if (id <= 0) {
      Alert.alert('Error', 'ID must be greater than 0');
      return;
    }
  
    if (isNaN(capacity)) {
      Alert.alert('Error', 'Capacity must be a number');
      return;
    }

    if (isNaN(cargo)) {
      Alert.alert('Error', 'Cargo must be a number');
      return;
    }
    
    try {
      const project = { id, model, status, capacity, owner, manufacturer, cargo };
      const response = await createSupply(project);
      Alert.alert('Vehicle created successfully');
      navigation.navigate('SupplyList');
    } catch (error) {
      Alert.alert('Error creating Vehicle', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID:</Text>
      <TextInput style={styles.input} onChangeText={text => setId(text)} value={id} />
      <Text style={styles.label}>model:</Text>
      <TextInput style={styles.input} onChangeText={text => setModel(text)} value={model} />
      <Text style={styles.label}>status:</Text>
      <TextInput style={styles.input} onChangeText={text => setStatus(text)} value={status} />
      <Text style={styles.label}>capacity:</Text>
      <TextInput style={styles.input} onChangeText={text => setCapacity(text)} value={capacity} />
      <Text style={styles.label}>owner:</Text>
      <TextInput style={styles.input} onChangeText={text => setOwner(text)} value={owner} />
      <Text style={styles.label}>manufacturer:</Text>
      <TextInput style={styles.input} onChangeText={text => setManufacturer(text)} value={manufacturer} />
      <Text style={styles.label}>cargo:</Text>
      <TextInput style={styles.input} onChangeText={text => setCargo(text)} value={cargo} />
      <Button title="Submit" onPress={submitSupply} />
      <Button title="Cancel" onPress={() => navigation.navigate('SupplyList')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
    color: 'black',
  },
  label: {
    marginBottom: 5,
    color: 'black',
  },
});

export default CreateSupply;