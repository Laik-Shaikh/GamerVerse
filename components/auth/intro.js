import React, { useState, useEffect } from 'react';
import { Text ,TouchableOpacity, View} from 'react-native'
import fire from '../firebase';
import 'firebase/auth';
import { getAuth} from "firebase/auth";


export default function Login({ navigation }) {
  const auth = getAuth();
console.log(auth.currentUser)

return (
    <View>

                <TouchableOpacity  onPress={() => 
                    {if (auth.currentUser) {
                        navigation.navigate("Home")
                      }
                      else {
                          navigation.navigate("Login")
                        }
                       }
                     } >
                <Text>Rukavat ke liye khed hai</Text>
                  </TouchableOpacity>
                  </View>)
}