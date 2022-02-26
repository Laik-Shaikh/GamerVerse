import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import fire from '../firebase';
import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

import BG from './authAssets/BG.png'
import S1 from './authAssets/slide1.png'

export default function Login({ navigation }) {
  const [UName, setUName] = React.useState();
  const [PWord, setPWord] = React.useState();
  const unamekeeper = React.createRef();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

    return(
        <View style={styles.container}>
        <ImageBackground source={BG} resizeMode="cover" style={styles.bg}>
            <View style={styles.rectanglebg} />
            
            <Image source={require('./authAssets/logo.png')} style={styles.logo} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle= {{justifyContent:'space-around'}} style={{flexGrow: 0.1, "width": 1400/1440 * windowWidth, "height": 685/1024 * windowHeight, "left": 40/1440 * windowWidth, "top": 70/1024 * windowHeight}}>
                <View style={{"left": 0/1440 * windowWidth, "top": 0/1024 * windowHeight}}>
                  <View style={styles.whitebg}/>
                  <Image source={require('./authAssets/group1.png')} style={styles.img1} />
                  <Text style={styles.signinText}>Sign In</Text>
                  <TextInput style={styles.InputStyle1} placeholder='Email ID'  onChangeText={UName => setUName(UName)} ref={unamekeeper}></TextInput>
                  <TextInput style={styles.InputStyle2} placeholder='Password' onChangeText={PWord => setPWord(PWord)} secureTextEntry={true}></TextInput>
                  <TouchableOpacity style={styles.forgotPasswordText}>
                    <Text style={{ fontFamily: "Roboto", fontStyle: "normal", fontWeight: "normal", fontSize: 12, lineHeight: 14, color: "rgba(84, 224, 255, 1)" }}>Forgot Password?</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.Button} title='Login'
                  onPress={
                    async () => {
                      try {
                        console.log(fire.auth);
                        console.log(UName+" "+PWord);
                        await signInWithEmailAndPassword(auth,UName,PWord);
                        console.log("yes")
                        setPWord(" ");
                        setUName(" ");
                        navigation.navigate("Home") 
                      } catch (error) {
                        console.log(error);
                        // alert('Error');
                      }
                    }
                  }
                    >
                  <Text style={styles.ButtonText}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.Button2} onPress={() => {
                    signInWithPopup(auth, provider)
                    .then((result) => {
                      
                      const credential = GoogleAuthProvider.credentialFromResult(result);
                      const token = credential.accessToken;
                      
                      const user = result.user;
                      console.log(user)
                      console.log(token)
                      navigation.navigate("Home")
                      
                    })
                  }}><Text style={styles.ButtonText}>Sign Up with google</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.SignUpText} onPress={() => navigation.navigate("Register")}>
                    <Text style={{ fontFamily: "Roboto", fontStyle: "normal", fontWeight: "normal", fontSize: 12, lineHeight: 14, color: "#FFFFFF" }}>Don't have an account? <Text style={{ fontFamily: "Roboto", fontStyle: "normal", fontWeight: "normal", fontSize: 12, lineHeight: 14,borderBottomColor: "#54E0FF", borderBottomWidth: 0.7, color: "rgba(84, 224, 255, 1)" }}>Register</Text></Text>
                  </TouchableOpacity>
                </View>
                <View style={{"left": 0/1440 * windowWidth, "top": 560/1024 * windowHeight}}>
                  <View style={styles.whitebg}/>
                  <Image source={require('./authAssets/group2.png')} style={styles.img2} />
                  <Text style={styles.title1}>Find friends with similar game sense nearby</Text>
                  <Text style={styles.subtext1}>Search for tags related to games to find new friends. Add multiple tags to your profile so other players can find you!</Text>
                </View>
                <View style={{"left": 0/1440 * windowWidth, "top": 1120/1024 * windowHeight}}>
                  <View style={styles.whitebg}/>
                  <Image source={require('./authAssets/group3.png')} style={styles.img1} />
                  <Text style={styles.title2}>Create your own gamer profile and add all your favourite games</Text>
                  <Text style={styles.subtext2}>Add your own profile picture and gaming interests according to your needs to build an entire gaming profile!</Text>
                </View>
                <View style={{"left": 0/1440 * windowWidth, "top": 1680/1024 * windowHeight}}>
                  <View style={styles.whitebg}/>
                  <Image source={require('./authAssets/group4.png')} style={styles.img2} />
                  <Text style={styles.title1}>Tags that are inclusive of all gaming platforms</Text>
                  <Text style={styles.subtext1}>Need new friends for all different platforms? 
Find all sorts of players over all of platforms with just a few simple steps!</Text>
                </View>
                <View style={{"left": 0/1440 * windowWidth, "top": 2240/1024 * windowHeight}}>
                  <View style={styles.whitebg}/>
                  <Image source={require('./authAssets/group5.png')} style={styles.img1} />
                  <Image source={require('./authAssets/group6.png')} style={styles.img2} />
                  <Text style={styles.title3}>Update your own posts, gameplays and achievements</Text>
                  <Text style={styles.subtext3}>Share all of your achievements, badges, gameplays, etc with all of your friends on GamerVerse now!</Text>
                </View>
            </ScrollView>
        </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "100%",
        flex: 1,
        height: "100%"
    },
    
    bg: {
        position: "relative",
        width: "100%",
        height: "100%",
        justifyContent: 'center',
    },

    S1: {
        "position": "absolute",
        resizeMode:'contain',
        width: 1332 / 1440 * windowWidth,
        height: 500 / 1024 * windowHeight,
        left: 40 / 1440 * windowWidth,
        top: 250 / 1024 * windowHeight,
    },

    scroll:{
        "position": "absolute",
        width: 1332 / 1440 * windowWidth,
        height: 500 / 1024 * windowHeight,
        left: 40 / 1440 * windowWidth,
        top: 125 / 1024 * windowHeight,
    },

      logo:{
        "position": "absolute",
        top: 5/1024*windowHeight,
        left:420/1440*windowWidth,
        height: 109/1024*windowHeight,
        width: 600/1440*windowWidth,
    },

    rectanglebg:
  {
    position: "absolute",
    width: "100%",
    height: 126 / 1024 * windowHeight,
    left: 0 / 1024 * windowWidth,
    top: 0 / 1440 * windowHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  forgotPasswordText:
  {
    position: "absolute",
    left: 1083 / 1440 * windowWidth,
    top: 270 / 1024 * windowHeight,
    borderBottomColor: "#54E0FF",
    borderBottomWidth: 0.7,
  },

  SignUpText:
  {
    position: "absolute",
    left: 877 / 1440 * windowWidth,
    top: 385 / 1024 * windowHeight,
  },

  Button:
  {
    position: "absolute",
    width: 305 / 1440 * windowWidth,
    height: 55 / 1024 * windowHeight,
    left: 877 / 1440 * windowWidth,
    top: 322 / 1024 * windowHeight,
    backgroundColor: "#54E0FF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  Button2:
  {
    position: "absolute",
    width: 305 / 1440 * windowWidth,
    height: 55 / 1024 * windowHeight,
    left: 877 / 1440 * windowWidth,
    top: 450 / 1024 * windowHeight,
    backgroundColor: "#54E0FF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  img1:{
    "position": "absolute",
    marginTop: 0,
    marginHorizontal: 0,
    top: 0/1024*windowHeight,
    left: -55/1440*windowWidth,
    height: 486/1024*windowHeight,
    width: 615/1440*windowWidth,
    resizeMode:'contain',
},

img2:{
  "position": "absolute",
  marginTop: 0,
  marginHorizontal: 0,
  top: 0/1024*windowHeight,
  right: -55/1440*windowWidth,
  height: 486/1024*windowHeight,
  width: 615/1440*windowWidth,
  resizeMode:'contain',
},

    whitebg:
  {
    position: "absolute",
    width: 1305 / 1440 * windowWidth,
    height: 450 / 1024 * windowHeight,
    left: 28 / 1440 * windowWidth,
    top: 35 / 1024 * windowHeight,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    borderBottomRightRadius: 17,
    borderBottomLeftRadius: 17
  },

  whitebg1:
  {
    position: "absolute",
    width: 1305 / 1440 * windowWidth,
    height: 450 / 1024 * windowHeight,
    left: 28 / 1440 * windowWidth,
    top: 485 / 1024 * windowHeight,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    borderBottomRightRadius: 17,
    borderBottomLeftRadius: 17
  },

  ButtonText:
  {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 23.45,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#FFFFFF"
  },
  
  title1:
  {
    "position": "absolute",
    top: 100/1024*windowHeight,
    left: 108/1440*windowWidth,
    height: 106/1024*windowHeight,
    width: 680/1440*windowWidth,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 45,
    lineHeight: 53,
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    color: "#FFFFFF"
  },

  subtext1:
  {
    "position": "absolute",
    top: 250/1024*windowHeight,
    left: 108/1440*windowWidth,
    height: 56/1024*windowHeight,
    width: 680/1440*windowWidth,
    fontFamily: "Roboto-thin",
    fontStyle: "light",
    fontWeight: "light",
    fontSize: 24,
    lineHeight: 28,
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    color: "#FFFFFF"
  },

  title2:
  {
    "position": "absolute",
    top: 100/1024*windowHeight,
    right: 75/1440*windowWidth,
    height: 106/1024*windowHeight,
    width: 680/1440*windowWidth,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 45,
    lineHeight: 53,
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    color: "#FFFFFF"
  },

  subtext2:
  {
    "position": "absolute",
    top: 250/1024*windowHeight,
    right: 75/1440*windowWidth,
    height: 56/1024*windowHeight,
    width: 680/1440*windowWidth,
    fontFamily: "Roboto-thin",
    fontStyle: "light",
    fontWeight: "light",
    fontSize: 24,
    lineHeight: 28,
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    color: "#FFFFFF"
  },

  title3:
  {
    "position": "absolute",
    top: 100/1024*windowHeight,
    left: 343/1440*windowWidth,
    height: 106/1024*windowHeight,
    width: 640/1440*windowWidth,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 45,
    lineHeight: 53,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#FFFFFF"
  },

  subtext3:
  {
    "position": "absolute",
    top: 250/1024*windowHeight,
    left: 343/1440*windowWidth,
    height: 56/1024*windowHeight,
    width: 680/1440*windowWidth,
    fontFamily: "Roboto-thin",
    fontStyle: "light",
    fontWeight: "light",
    fontSize: 24,
    lineHeight: 28,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#FFFFFF"
  },

    InputStyle1:{
      "position": "absolute",
      top: 140/1024*windowHeight,
      left: 877/1440*windowWidth,
      height: 45/1024*windowHeight,
      width: 305/1440*windowWidth,
      color: 'white',
      fontSize: 17,
      paddingLeft: 10,
      paddingBottom: 7,
      paddingTop: 3,    
      borderBottomColor: "#FFFFFF",
      borderBottomWidth: 1,
      placeholderTextColor: "#FFFFFF",
      backgroundColor: "#e5e5e500"
  },

    InputStyle2:{
      "position": "absolute",
      top: 215/1024*windowHeight,
      left: 877/1440*windowWidth,
      height: 45/1024*windowHeight,
      width: 305/1440*windowWidth,
      color: 'white',
      fontSize: 17,
      paddingLeft: 10,
      paddingBottom: 7,
      paddingTop: 3,
      borderBottomColor: "#FFFFFF",
      borderBottomWidth: 1,
      placeholderTextColor: "#FFFFFF",
      backgroundColor: "#e5e5e500"
    },

    signinText: {
      position: "absolute",
      top: 65/1024*windowHeight,
      left: 877/1440*windowWidth,
      height: 32/1024*windowHeight,
      width: 305/1440*windowWidth,
      color: 'white',
      fontSize: 27,
      lineHeight: 32,
      textAlign: 'center',
    },

  });