import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import Asset from './Asset';

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Asset"
        component={Asset}
        options={{headerTitle: 'Asset'}}
      />
    </Stack.Navigator>
  );
}
