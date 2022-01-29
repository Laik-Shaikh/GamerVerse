import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MyGamesPage from './components/MyGamesPage';
import GameHubPage from './components/GameHubPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View>
      {/* <NavigationContainer>
      
      <Stack.Navigator initialRouteName='MyGames'>
        <Stack.Screen name='MyGames' component={MyGamesPage} options={{ headerShown: false }} />
        <Stack.Screen name='GameHub' component={GameHubPage} options={{ headerShown: false }} />
      </Stack.Navigator>
      </NavigationContainer> */}
      <GameHubPage />
    </View>
  );
}



