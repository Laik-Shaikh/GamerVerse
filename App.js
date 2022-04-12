import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import homepage from './components/home/homepage';
import profilepage from './components/profile/profilepage';
import login from './components/auth/Login';
import GamerVerse from './components/auth/intro';
import register from './components/auth/Register';
import createprofilepage from './components/createprofile/createprofilepage';
import MyGamesPage from './components/myGames/MyGamesPage';
import GameHubPage from './components/gamehub/GameHubPage';
import gamepage from './components/game/gamepage';
//import searchpagelocation from './components/search/searchpagelocation';
import searchpagename from './components/search/searchpagename';
//import searchpagegame from './components/search/searchpagegame';
import searchprofilepage from './components/profile/searchProfilePage';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Register' component={register} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={login} options={{ headerShown: false }} />
        <Stack.Screen name='GamerVerse' component={GamerVerse} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={homepage} options={{ headerShown: false }} />
        <Stack.Screen name='Profile' component={profilepage} options={{ headerShown: false }} />
        <Stack.Screen name='CreateProfile' component={createprofilepage} options={{ headerShown: false }} />
        <Stack.Screen name='MyGames' component={MyGamesPage} options={{ headerShown: false }} />
        <Stack.Screen name='Game' component={gamepage} options={{ headerShown: false }} />
        <Stack.Screen name='GameHub' component={GameHubPage} options={{ headerShown: false }} />
        {/* <Stack.Screen name='SearchLocation' component={searchpagelocation} options={{ headerShown: false }} /> */}
        <Stack.Screen name='SearchName' component={searchpagename} options={{ headerShown: false }} />
        {/* <Stack.Screen name='SearchGame' component={searchpagegame} options={{ headerShown: false }} /> */}
        <Stack.Screen name='SearchProfile' component={searchprofilepage} options={{ headerShown: false }} />
      </Stack.Navigator>
      
    </NavigationContainer>
  )
}
