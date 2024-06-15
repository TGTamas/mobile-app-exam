import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getAllProjects } from '../../services/service';

const Analytics = ({ navigation }) => {
  const [topProjects, setTopProjects] = useState([]);

  useEffect(() => {
    const fetchAndSortProjects = async () => {
      const projects = await getAllProjects();
      const sortedProjects = projects.sort((a, b) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return b.teamMembers.length - a.teamMembers.length;
      });
      setTopProjects(sortedProjects.slice(0, 5));
    };

    fetchAndSortProjects();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>Status: {item.status}</Text>
      <Text style={styles.text}>Team Members: {item.teamMembers.length}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        title="Back to Main Page"
        onPress={() => navigation.navigate('MainPage')}
      />
      {topProjects.length > 0 ? (
        <FlatList
          data={topProjects}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text style={styles.text}>No projects available</Text>
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
  },
});

export default Analytics;