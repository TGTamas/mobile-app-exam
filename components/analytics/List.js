import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { getManufacturers } from '../../services/service';

const ManufacturerList = ({ navigation }) => {
  const [supplies, setSupplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSupplies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getManufacturers();
      setSupplies(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplies();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item}</Text>
      <Button
        title="View Vehicles"
        onPress={() => navigation.navigate('ManufacturerDetails', { manufacturer: item })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        title="Back to Main Page"
        onPress={() => navigation.navigate('MainPage')}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <View style={styles.container}>
          <Text style={styles.error}>{error}</Text>
          <Button title="Retry" onPress={fetchSupplies} />
        </View>
      ) : (
        <FlatList
          data={supplies}
          renderItem={renderItem}
          keyExtractor={item => item}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  item: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  text: {
    marginBottom: 5,
    color: 'black',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ManufacturerList;