import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { testConnection } from '../services/service';

const ReportPage = ({ navigation }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await testConnection();
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
      }
    };

    checkConnection();
  }, []);

  return (
    <View>
      <Button
        title="Manufacturers"
        onPress={() => navigation.navigate('ManufacturerList')}
        disabled={!isConnected}
      />
      <Button
        title="Top10 Vehicles"
        onPress={() => navigation.navigate('TopList')}
        disabled={!isConnected}
      />
      {!isConnected && <Text style={{ color: 'red', backgroundColor: 'white' }}>Connection required</Text>}
    </View>
  );
};

export default ReportPage;