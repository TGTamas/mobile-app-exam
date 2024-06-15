import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { getInProgressProjects, enrollInProject } from '../../services/service';
import { useNavigation } from '@react-navigation/native';

const InProgressProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const fetchInProgressProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getInProgressProjects();
      setProjects(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (id) => {
    try {
      await enrollInProject(id);
      alert('Enrolled successfully!');
      fetchInProgressProjects();
    } catch (error) {
      alert('Failed to enroll: ' + error.message);
    }
  };

  useEffect(() => {
    fetchInProgressProjects();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.id}</Text>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>{item.team}</Text>
      <Text style={styles.text}>{item.type}</Text>
      <Button title="Enroll" onPress={() => handleEnroll(item.id)} />
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Retry" onPress={fetchInProgressProjects} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="Back to Main Page"
        onPress={() => navigation.navigate('MainPage')}
      />
      <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
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
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default InProgressProjects;