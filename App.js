import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SupplyList from './components/admin/List';
import MainPage from './screens/MainPage';
import SupplyDetails from './components/admin/Details';
import CreateSupply from './components/admin/Create';
import ManufacturerList from './components/analytics/List';
import TopList from './components/analytics/TopList';
import ReportPage from './screens/ReportPage';
import ManufacturerDetails from './components/analytics/Details';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="ReportPage" component={ReportPage} />
        <Stack.Screen name="SupplyList" component={SupplyList} />
        <Stack.Screen name="SupplyDetails" component={SupplyDetails} />
        <Stack.Screen name="CreateSupply" component={CreateSupply} />
        <Stack.Screen name="ManufacturerList" component={ManufacturerList} />
        <Stack.Screen name="ManufacturerDetails" component={ManufacturerDetails} />
        <Stack.Screen name="TopList" component={TopList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;