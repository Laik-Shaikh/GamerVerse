import React, { useState, useEffect } from 'react';
import { Text ,TouchableOpacity, View, ImageBackground,Dimensions,StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import fire from '../firebase';
import 'firebase/auth';
import { getAuth} from "firebase/auth";
import 'firebase/database'
import {getDatabase,get,ref} from "firebase/database"

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


export default function Intro({ navigation }) {
  const auth = getAuth();
  const db = getDatabase();
console.log(auth.currentUser)

return (
    <View style={styles.container}>
          <LinearGradient
                    start={{ x: 0, y: 1 }} end={{ x: 0, y: -1 }}
                    colors={['#013C00', '#000000']}
                    style={styles.background} >
                        <TouchableOpacity  onPress={() => 
                    {if (auth.currentUser) {
                      if(auth.currentUser.emailVerified){
                        get(ref(db,'users/'+auth.currentUser.uid+'/PhoneNumber')).then((snapshot)=>{
                          if(snapshot.val()=='0000000000'){
                            navigation.push("CreateProfile")
                          }else{
                            navigation.push("Home")
                          }
                        })
                      }
                       else{
                         navigation.push("Home")
                       }
                      }
                      else {
                          navigation.push("Login")
                        }
                       }
                     } >
                <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FIntroPage%2Fgiphygreenportal.gif?alt=media&token=f1895b3c-e277-4b66-be91-10e38e941917"} style={styles.img2} >
                  <Text style={styles.textStyle}> Click to Enter</Text>
                  <Text style={styles.titleStyle}>GamerVerse</Text>
                  </ImageBackground>
                  </TouchableOpacity>
                    </LinearGradient>
                  </View>)
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%"

},
background: {
  position:"relative",
  width: "100%",
  height: "100%",
},
textStyle: {
  marginTop: '180px',
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 50,
  marginBottom: '15px'
},
titleStyle: {
  marginTop: '10px',
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 100,
  marginBottom: '15px'
},
    img2:{
    flex:1,
    "position": "absolute",
    marginTop: 0,
    marginHorizontal: 0,
    top: 100/1024*windowHeight,
    right:430/1440*windowWidth,
    height: 686/1024*windowHeight,
    width: 615/1440*windowWidth,
  
  },
});