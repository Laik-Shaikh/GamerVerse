import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import fire from '../firebase';
import 'firebase/auth';
import { getAuth,createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,getAdditionalUserInfo, sendEmailVerification,signOut } from "firebase/auth";
import { getDatabase, onValue, ref, set } from "firebase/database";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height


//<ImageBackground source={S1} resizeMode="cover" style={styles.S1}/>
//

export default function Login({ navigation ,route}) {
  const [UName, setUName] = React.useState();
  const [PWord, setPWord] = React.useState();
  const [ConfirmPWord, setConfirmPWord] = React.useState();
  const unamekeeper = React.createRef();
  const auth = getAuth();
  const db = getDatabase()
  const provider = new GoogleAuthProvider();

  async function createFirebaseData(){
    const dbRef = ref(db,'users/'+auth.currentUser.uid)
        set(dbRef,{
            Email: auth.currentUser.email,
            PhoneNumber: "0000000000",
            Location: "Earth, hopefully",
            LocationLower: "earth, hopefully",
            Games:['XX'],
            RequestedProfiles:['XX'],
            ConfirmedProfiles:['XX'],
            DiscordId: "None",
            uid: auth.currentUser.uid,
            Name: auth.currentUser.email,
            DisplayPicture: "https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FgamerverseLogo.png?alt=media&token=3d00f4ad-dd05-42e1-bb74-ba166ab2e0aa",
            aboutMe:"Hey, I am "+auth.currentUser.email,
            PostCount: 0, 
            privacyStatus:1
          })
}

    return(
        <View style={styles.container}>
        <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FBG.png?alt=media&token=02003518-4b7f-40c9-ba6a-9bf4c095275e"} resizeMode="cover" style={styles.bg}>
            <View style={styles.rectanglebg} />
            
            <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Flogo.png?alt=media&token=7468c404-5678-43b2-92eb-310ffa58433c"} style={styles.logo} />
            <ScrollView contentContainerStyle= {{justifyContent:'space-around'}} style={{flexGrow: 0.1, "width": 1332/1440 * windowWidth, "height": 500/1024 * windowHeight, "left": 40/1440 * windowWidth, "top": 40/1024 * windowHeight}}>
                <View style={{"left": 0/1440 * windowWidth, "top": 0/1024 * windowHeight}}>
                  <View style={styles.whitebg}/>
                  <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fgroup3.png?alt=media&token=1d83027a-da05-4dbf-bd10-28027ae21454"} style={styles.img1} />
                  <Text style={styles.signinText}>Sign Up</Text>
                  <TextInput style={styles.InputStyle1} placeholder='Email ID' onChangeText={UName => setUName(UName)} ref={unamekeeper}></TextInput>
                  <TextInput style={styles.InputStyle2} placeholder='Password' secureTextEntry={true} onChangeText={PWord => setPWord(PWord)}></TextInput>
                  <TextInput style={styles.InputStyle3} placeholder='Confirm Password' onChangeText={ConfirmPWord => setConfirmPWord(ConfirmPWord)} secureTextEntry={true}></TextInput>
                  <TouchableOpacity style={styles.Button} title='Register' secureTextEntry={true}onPress={
                    async () => {
                      try {
                        console.log(fire.auth);
                        console.log(UName+" "+PWord+" "+ConfirmPWord);
                        if(PWord==ConfirmPWord){ 
                          await createUserWithEmailAndPassword(auth,UName,PWord).then(()=>{
                            sendEmailVerification(auth.currentUser).then(()=>{
                              auth.signOut()
                              navigation.navigate("Login")
                              alert("Email verification sent! Please login after verifying the email address to continue")
                            })
                          })
                          createFirebaseData();
                          
                        }
                        else
                        {
                          alert('Passwords do not match');
                        }
                        setPWord(" ");
                        setConfirmPWord(" ");
                        setUName(" ");
                         
                      } catch (error) {
                        console.log(error);
                        alert('Some error has occured');
                      }
                    }
                  }>
                  <Text style={styles.ButtonText}>Register</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.Google} onPress={() => {
                    signInWithPopup(auth, provider)
                    .then((result) => {
                      console.log(auth,provider)
                      const credential = GoogleAuthProvider.credentialFromResult(result);
                      const token = credential.accessToken;
                      const user = result.user;
                      const { isNewUser } = getAdditionalUserInfo(result)
                      console.log(user)
                      console.log(token)
                      if (isNewUser) {
                        createFirebaseData();
                        navigation.push("CreateProfile")
                      }
                      else {
                        alert('Authentication confirmed! Account already exists! Signing in to the account.')
                        navigation.push("Home")
                      }
    
                      
                    })
                  }}>
                  <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FG.png?alt=media&token=57d0bfbb-0d56-4efa-8c43-5d2e4506738f"} style={styles.G}></Image>
                  <Text style={styles.GoogleText}>Sign Up with google</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.SignUpText} onPress={() => navigation.push("Login")}>
                    <Text style={{ fontFamily: "Roboto", fontStyle: "normal", fontWeight: "normal", fontSize: 12, lineHeight: 14, color: "#FFFFFF" }}>Have an account already? <Text style={{ fontFamily: "Roboto", fontStyle: "normal", fontWeight: "normal", fontSize: 12, lineHeight: 14,borderBottomColor: "#54E0FF", borderBottomWidth: 0.7, color: "rgba(84, 224, 255, 1)" }}>Login</Text></Text>
                  </TouchableOpacity>
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
    width: 1440 / 1440 * windowWidth,
    height: 126 / 1024 * windowHeight,
    left: 0 / 1024 * windowWidth,
    top: 0 / 1440 * windowHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  SignUpText:
  {
    position: "absolute",
    left: 1022 / 1440 * windowWidth,
    top: 335 / 1024 * windowHeight,
  },

  Button:
  {
    position: "absolute",
    width: 305 / 1440 * windowWidth,
    height: 55 / 1024 * windowHeight,
    left: 877 / 1440 * windowWidth,
    top: 365 / 1024 * windowHeight,
    backgroundColor: "#54E0FF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
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
    left: -30/1440*windowWidth,
    height: 495/1024*windowHeight,
    width: 625/1440*windowWidth,
    resizeMode:'contain',
},

    whitebg:
  {
    position: "absolute",
    width: 1305 / 1440 * windowWidth,
    height: 460 / 1024 * windowHeight,
    left: 28 / 1440 * windowWidth,
    top: 35 / 1024 * windowHeight,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    borderBottomRightRadius: 17,
    borderBottomLeftRadius: 17
  },

  G: {
    "position": "absolute",
    resizeMode: 'contain',
    left: -0.022 * windowWidth,
    top:  -0.002 * windowHeight,
    height: 0.032 * windowHeight,
    width: 0.032 * windowWidth,
  },

  Google: {
    "position": "absolute",
    height: 0.03 * windowHeight,
    width: 0.115 * windowWidth,
    left: 960 / 1440 * windowWidth,
    top: 445 / 1024 * windowHeight,
    // backgroundColor: "#54E0FF",
    textAlign: 'center'
  },

  GoogleText:
  {
    right: 0.15 * windowWidth,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 23.45,
    color: "#FFFFFF",
    textAlign: 'center'
  },

    InputStyle1:{
      "position": "absolute",
      top: 130/1024*windowHeight,
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
      top: 205/1024*windowHeight,
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

    InputStyle3:{
        "position": "absolute",
        top: 280/1024*windowHeight,
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