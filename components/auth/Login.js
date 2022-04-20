import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import fire from '../firebase';
import 'firebase/auth';
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;



export default function Login({ navigation }) {
  const [UName, setUName] = React.useState();
  const [PWord, setPWord] = React.useState();
  const [loginError, setLoginError] = React.useState();
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
            PostCount: 0
          })
}

    return(
        <View style={styles.container}>
        <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FBG.png?alt=media&token=02003518-4b7f-40c9-ba6a-9bf4c095275e"} resizeMode="cover" style={styles.bg}>
            <View style={styles.rectanglebg} />

            <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Flogo.png?alt=media&token=7468c404-5678-43b2-92eb-310ffa58433c"} style={styles.logo} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle= {{justifyContent:'space-around'}} style={{flexGrow: 0.1, "width": 1400/1440 * windowWidth, "height": 685/1024 * windowHeight, "left": 40/1440 * windowWidth, "top": 70/1024 * windowHeight}}>
                <View style={{"left": 0/1440 * windowWidth, "top": 0/1024 * windowHeight}}>
                  <View style={styles.whitebg}/>
                  <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fgroup1.png?alt=media&token=828d7189-be2d-4d8c-8502-b830fcb8df83"} style={styles.img1} />
                  <Text style={styles.signinText}>Sign In</Text>
                  <TextInput style={styles.InputStyle1} placeholder='Email ID'  onChangeText={UName => setUName(UName)} ref={unamekeeper}></TextInput>
                  <TextInput style={styles.InputStyle2} placeholder='Password' onChangeText={PWord => setPWord(PWord)} secureTextEntry={true}></TextInput>
                  {/* <TouchableOpacity style={styles.forgotPasswordText}>
                    <Text style={{ fontFamily: "Roboto", fontStyle: "normal", fontWeight: "normal", fontSize: 12, lineHeight: 14, color: "rgba(84, 224, 255, 1)" }}>Forgot Password?</Text>
                  </TouchableOpacity> */}
                  <Text style={styles.forgotPasswordText}>{loginError ? loginError : ""}</Text>
                  <TouchableOpacity style={styles.Button} title='Login'
                 onPress={
                  async () => {
                    try {
                      
                      console.log(UName + " " + PWord);
                      await signInWithEmailAndPassword(auth, UName, PWord).then(()=>{
                        console.log(auth.currentUser);
                        if(auth.currentUser.emailVerified){
                          console.log("yes")
                          setPWord(" ");
                          setUName(" ");
                          navigation.push("Home")
                        }else{
                          alert("Please verify your email to continue!")
                        }
                      })

                    } catch (error) {
                      console.log(error.code);
                      if (error.code == "auth/user-not-found") {
                        setLoginError("Email does not exist! Please create an account to login!")
                      }
                      if (error.code == "auth/wrong-password") {
                        setLoginError("Invalid password!")
                      }
                    }

                  }
                }
              
            >
              <Text style={styles.ButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Google} onPress={() => {
              signInWithPopup(auth, provider)
                .then((result) => {

                  const credential = GoogleAuthProvider.credentialFromResult(result);
                  const token = credential.accessToken;

                  const user = result.user;
                  console.log(user)
                  console.log(token)
                  const { isNewUser } = getAdditionalUserInfo(result)
                  console.log(isNewUser)
                  if (isNewUser) {
                    createFirebaseData();
                    navigation.push("CreateProfile")
                  }
                  else {
                    navigation.push("Home")
                  }

                }).catch((error) => { console.log(error) })
            }}>
            <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FG.png?alt=media&token=57d0bfbb-0d56-4efa-8c43-5d2e4506738f"} style={styles.G}></Image>
            <Text style={styles.GoogleText}>Sign In with Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.SignInText} onPress={() => navigation.push("Register")}>
              <Text style={{ fontFamily: "Roboto", fontStyle: "normal", fontWeight: "normal", fontSize: 12, lineHeight: 14, color: "#FFFFFF" }}>Don't have an account? <Text style={{ fontFamily: "Roboto", fontStyle: "normal", fontWeight: "normal", fontSize: 12, lineHeight: 14, borderBottomColor: "#54E0FF", borderBottomWidth: 0.7, color: "rgba(84, 224, 255, 1)" }}>Register</Text></Text>
            </TouchableOpacity>
          </View>
          <View style={{ "left": 0 / 1440 * windowWidth, "top": 560 / 1024 * windowHeight }}>
            <View style={styles.whitebg} />
            <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fgroup2.png?alt=media&token=ba480b96-bcc4-42a3-8a3f-7f1c9002506d"} style={styles.img2} />
            <Text style={styles.title1}>Find friends with similar game sense nearby</Text>
            <Text style={styles.subtext1}>Search for tags related to games to find new friends. Add multiple tags to your profile so other players can find you!</Text>
          </View>
          <View style={{ "left": 0 / 1440 * windowWidth, "top": 1120 / 1024 * windowHeight }}>
            <View style={styles.whitebg} />
            <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fgroup3.png?alt=media&token=1d83027a-da05-4dbf-bd10-28027ae21454"} style={[styles.img1, {left: -23/1440* windowWidth}]} />
            <Text style={styles.title2}>Create your own gamer profile and add all your favourite games</Text>
            <Text style={styles.subtext2}>Add your own profile picture and gaming interests according to your needs to build an entire gaming profile!</Text>
          </View>
          <View style={{ "left": 0 / 1440 * windowWidth, "top": 1680 / 1024 * windowHeight }}>
            <View style={styles.whitebg} />
            <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fgroup4.png?alt=media&token=7d6a8266-153a-4568-9604-2e986c582450"} style={styles.img2} />
            <Text style={styles.title1}>Tags that are inclusive of all gaming platforms</Text>
            <Text style={styles.subtext1}>Need new friends for all different platforms?
              Find all sorts of players over all of platforms with just a few simple steps!</Text>
          </View>
          <View style={{ "left": 0 / 1440 * windowWidth, "top": 2240 / 1024 * windowHeight }}>
            <View style={styles.whitebg} />
            <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fgroup5.png?alt=media&token=f1b4235e-f7a3-47fb-8bbb-c2aca5caee3d"} style={[styles.img1, {left: -90/1440 * windowWidth}]} />
            <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fgroup6.png?alt=media&token=5c306777-8295-43b2-9cf9-72a592023380"} style={styles.img2} />
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
    resizeMode: 'contain',
    width: 1332 / 1440 * windowWidth,
    height: 500 / 1024 * windowHeight,
    left: 40 / 1440 * windowWidth,
    top: 250 / 1024 * windowHeight,
  },

  scroll: {
    "position": "absolute",
    width: 1332 / 1440 * windowWidth,
    height: 500 / 1024 * windowHeight,
    left: 40 / 1440 * windowWidth,
    top: 125 / 1024 * windowHeight,
  },

  logo: {
    "position": "absolute",
    top: 5 / 1024 * windowHeight,
    left: 420 / 1440 * windowWidth,
    height: 109 / 1024 * windowHeight,
    width: 600 / 1440 * windowWidth,
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
    left: 877 / 1440 * windowWidth,
    top: 270 / 1024 * windowHeight,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,
    lineHeight: 14,
    color: "rgba(255, 84, 84, 1)"
  },

  SignInText:
  {
    position: "absolute",
    left: 1022 / 1440 * windowWidth,
    top: 270 / 1024 * windowHeight,
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
    top: 405 / 1024 * windowHeight,
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

  img1: {
    "position": "absolute",
    marginTop: 0,
    marginHorizontal: 0,
    top: 0 / 1024 * windowHeight,
    left: -55 / 1440 * windowWidth,
    height: 486 / 1024 * windowHeight,
    width: 615 / 1440 * windowWidth,
    resizeMode: 'contain',
  },

  img2: {
    "position": "absolute",
    marginTop: 0,
    marginHorizontal: 0,
    top: 0 / 1024 * windowHeight,
    right: -55 / 1440 * windowWidth,
    height: 486 / 1024 * windowHeight,
    width: 615 / 1440 * windowWidth,
    resizeMode: 'contain',
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
    top: 100 / 1024 * windowHeight,
    left: 108 / 1440 * windowWidth,
    height: 106 / 1024 * windowHeight,
    width: 680 / 1440 * windowWidth,
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
    top: 250 / 1024 * windowHeight,
    left: 108 / 1440 * windowWidth,
    height: 56 / 1024 * windowHeight,
    width: 680 / 1440 * windowWidth,
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
    top: 100 / 1024 * windowHeight,
    right: 75 / 1440 * windowWidth,
    height: 106 / 1024 * windowHeight,
    width: 680 / 1440 * windowWidth,
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
    top: 250 / 1024 * windowHeight,
    right: 75 / 1440 * windowWidth,
    height: 56 / 1024 * windowHeight,
    width: 680 / 1440 * windowWidth,
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
    top: 100 / 1024 * windowHeight,
    left: 343 / 1440 * windowWidth,
    height: 106 / 1024 * windowHeight,
    width: 640 / 1440 * windowWidth,
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
    top: 250 / 1024 * windowHeight,
    left: 343 / 1440 * windowWidth,
    height: 56 / 1024 * windowHeight,
    width: 680 / 1440 * windowWidth,
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

  InputStyle1: {
    "position": "absolute",
    top: 140 / 1024 * windowHeight,
    left: 877 / 1440 * windowWidth,
    height: 45 / 1024 * windowHeight,
    width: 305 / 1440 * windowWidth,
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

  InputStyle2: {
    "position": "absolute",
    top: 215 / 1024 * windowHeight,
    left: 877 / 1440 * windowWidth,
    height: 45 / 1024 * windowHeight,
    width: 305 / 1440 * windowWidth,
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
    top: 65 / 1024 * windowHeight,
    left: 877 / 1440 * windowWidth,
    height: 32 / 1024 * windowHeight,
    width: 305 / 1440 * windowWidth,
    color: 'white',
    fontSize: 27,
    lineHeight: 32,
    textAlign: 'center',
  },

});