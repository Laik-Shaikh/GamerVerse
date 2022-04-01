import React, { useState, useEffect } from 'react';
import { Text ,TouchableOpacity, View, Image,Dimensions,StyleSheet} from 'react-native'
import fire from '../firebase';
import 'firebase/auth';
import { getAuth} from "firebase/auth";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


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
                <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FIntroPage%2Ftapme.gif?alt=media&token=3adfbf78-f9e9-4dc5-baae-2b48dd8ca824"} style={styles.img2} />
                  </TouchableOpacity>
                  </View>)
}

const styles = StyleSheet.create({
    img2:{
    "position": "absolute",
    marginTop: 0,
    marginHorizontal: 0,
    top: 200/1024*windowHeight,
    right:400/1440*windowWidth,
    height: 486/1024*windowHeight,
    width: 615/1440*windowWidth,
    resizeMode:'contain',
  },
});