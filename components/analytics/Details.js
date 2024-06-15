import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { getManufacturerDetails } from '../../services/service';

const ManufacturerDetails = ({ route, navigation }) => {
  const { manufacturer } = route.params;
  const decodedManufacturer = decodeURIComponent(manufacturer);
  const [vehicles, setVehicles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSupplyDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getManufacturerDetails(decodedManufacturer);
      setVehicles(data);
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
        title="Back to Manufacturers"
        onPress={() => navigation.navigate('ManufacturerList')}
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
          data={vehicles}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
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
  text: {
    marginBottom: 10,
    color: 'black',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ManufacturerDetails;