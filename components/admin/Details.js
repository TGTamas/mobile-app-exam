import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { getSupply } from '../../services/service';

const SupplyDetails = ({ route, navigation }) => {
  const { supplyId } = route.params;
  const [supply, setSupply] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSupplyDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSupply(supplyId);
      setSupply(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplyDetails();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Retry" onPress={fetchSupplyDetails} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {supply ? (
        <>
          <Text style={styles.text}>ID: {supply.id}</Text>
          <Text style={styles.text}>Model: {supply.model}</Text>
          <Text style={styles.text}>Status: {supply.status}</Text>
          <Text style={styles.text}>Capacity: {supply.capacity}</Text>
          <Text style={styles.text}>Owner: {supply.owner}</Text>
          <Text style={styles.text}>Manufacturer: {supply.manufacturer}</Text>
          <Text style={styles.text}>Cargo: {supply.cargo}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      <Button title="Back to Vehicle List" onPress={() => navigation.navigate('SupplyList')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  text: {
    marginBottom: 10,
    color: 'black',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SupplyDetails;