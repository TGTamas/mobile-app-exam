import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { testConnection } from '../services/service';

const MainPage = ({ navigation }) => {
  const [isConnected, setIsConnected] = useState(true);

  const checkConnection = async () => {
    try {
      await testConnection();
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <View>
      <Button
        title="Check Connection"
        onPress={checkConnection}
      />
      <Button
        title="Registration Section"
        onPress={() => navigation.navigate('SupplyList')}
      />
      <Button
        title="Report Section"
        onPress={() => navigation.navigate('ReportPage')}
        disabled={!isConnected}
      />
      {!isConnected && <Text style={{ color: 'red', backgroundColor: 'white' }}>Connection required to access Report Section</Text>}
    </View>
  );
};

export default MainPage;