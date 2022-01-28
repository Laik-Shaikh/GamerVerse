import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import login from './components/auth/Login';
import register from './components/auth/Register';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName='Register'>
        <Stack.Screen name='Register' component={register} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={login} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}