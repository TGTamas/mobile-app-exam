import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { getSupplies } from '../../services/service';

const SupplyList = ({ navigation }) => {
  const [supplies, setSupplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSupplies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSupplies();
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
      <Text style={styles.text}>{item.id}</Text>
      <Text style={styles.text}>{item.model}</Text>
      <Text style={styles.text}>{item.owner}</Text>
      <Text style={styles.text}>{item.status}</Text>
      <Button
        title="View Details"
        onPress={() => navigation.navigate('SupplyDetails', { supplyId: item.id })}
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
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.error}>Loading data... The server might be down.</Text>
          <Button title="Retry" onPress={fetchSupplies} />
        </View>
      ) : error ? (
        <View style={styles.container}>
          <Text style={styles.error}>{error}</Text>
          <Button title="Retry" onPress={fetchSupplies} />
        </View>
      ) : (
        <FlatList
          data={supplies}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
      <Button
        title="Record Vehicle"
        onPress={() => navigation.navigate('CreateSupply')}
      />
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

export default SupplyList;