import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import homepage from './components/home/homepage';
import profilepage from './components/profile/profilepage';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={homepage} options={{ headerShown: false }} />
        <Stack.Screen name='Profile' component={profilepage} options={{ headerShown: false }} />
      </Stack.Navigator>
      
    </NavigationContainer>
  )
}
