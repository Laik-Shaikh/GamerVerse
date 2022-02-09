import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import homepage from './components/home/homepage';
import profilepage from './components/profile/profilepage';
import login from './components/auth/Login';
import register from './components/auth/Register';
import createprofilepage from './components/createprofile/createprofilepage';
import MyGamesPage from './components/myGamesPage/MyGamesPage';
import gamepage from './components/game/gamepage';
import GameHubPage from './components/gameHub/GameHubPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='GameHub'>
        <Stack.Screen name='Register' component={register} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={login} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={homepage} options={{ headerShown: false }} />
        <Stack.Screen name='Profile' component={profilepage} options={{ headerShown: false }} />
        <Stack.Screen name='CreateProfile' component={createprofilepage} options={{ headerShown: false }} />
        <Stack.Screen name='MyGames' component={MyGamesPage} options={{ headerShown: false }} />
        <Stack.Screen name='Game' component={gamepage} options={{ headerShown: false }} />
        <Stack.Screen name='GameHub' component={GameHubPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
