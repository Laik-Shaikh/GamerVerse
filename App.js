import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyGamesPage from './components/MyGames/MyGamesPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      
    <Stack.Navigator initialRouteName='MyGames'>
      <Stack.Screen name='MyGames' component={MyGamesPage} options={{ headerShown: false }} />
      {/* <Stack.Screen name='Profile' component={profilepage} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
    </NavigationContainer>
  );
}



