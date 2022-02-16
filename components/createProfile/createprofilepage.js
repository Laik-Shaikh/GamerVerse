import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'

import fire from '../firebase';
import uuid from 'uuid';
import { getStorage, ref as strRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {getAuth} from "firebase/auth";
import {getDatabase,ref,set} from "firebase/database"

import * as ImagePicker from 'expo-image-picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

import BG from './createProfileAssets/BG.png'

export default function CreateProfile({navigation}) {

  const [image, setImage] = useState(null);

  const storage = getStorage();
  const metadata = {
    contentType: 'image/jpg',
  };

  const auth = getAuth()
  const db = getDatabase()
  
  const storageRef = strRef(storage, 'Profile/' + auth.currentUser.uid + '.jpg');
  const dbRef = ref(db,'users/' + auth.currentUser.uid)
  console.log(auth.currentUser)

  const pickImage = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      
    }
  };
  const [UName, setName] = React.useState();
  const [PNum, setPNum] = React.useState(0);
  const [Loc, setLoc] = React.useState();
  const [Disc, setDisc] = React.useState();
  function discCheck(Disc){
    let numbers = '0123456789';
    let j=0;
    let k=0;
    let hash = '#'
    for (var i=0; i < Disc.length; i++) {
      console.log(Disc[i]);
        if(Disc[i]=='#') {
            k++;
            for (var l=1;l<5;l++){
            if(numbers.indexOf(Disc[i+l]) > -1) {
              j++;
              }
            }
        }
      }
        if(k>=1 && j == 4)
        {
          console.log("disc tag approoved");
          return true
        }
        else 
        {
          alert("Please enter valid discord ID");
          return false
        }
}
  function mobileCheck(PNum){
    let numbers = '0123456789';
    for (var i=0; i < PNum.length; i++) {
        if(numbers.indexOf(PNum[i]) > -1 && PNum.length==10) {
            console.log("Phone number approoved")
        }
        else {
            alert("Please enter valid phone number");
            return false
        }
    }
    
    return true
}
async function sendFirebaseData(){
            console.log(image);
            const response = await fetch(image);
            const blob = await response.blob();
            uploadBytes(storageRef, blob, metadata).then((snapshot) => {
              getDownloadURL(storageRef).then((url)=>{
                set(dbRef,{
                    Email: auth.currentUser.email,
                    PhoneNumber: PNum,
                    Location: Loc,
                    DiscordId: Disc,
                    uid: auth.currentUser.uid,
                    Name: UName,
                    DisplayPicture: url
                  })
                  })
              })
}

  return (
    <View style={styles.container}>
      <ImageBackground source={BG} resizeMode="cover" style={styles.bg}>

        <View style={styles.rectanglebg} />
        <Image source={require('./createProfileAssets/logo.png')} style={styles.logo} />

        <View style={styles.whitebg} >
          <Text style={styles.signinText}>Create Your Profile</Text>
          <TouchableOpacity onPress={pickImage} >
          <Image source={require('./createProfileAssets/CamIcon.png')} style={styles.CamIcon} />
          {image && <Image source={{ uri:image }} style={styles.ProfileImage} />}
          </TouchableOpacity>
          <TextInput style={styles.InputStyle1} placeholder='Name' onChangeText={UName => setName(UName)}></TextInput>
          <TextInput style={styles.InputStyle2} placeholder='Phone Number' onChangeText={PNum => setPNum(PNum)}></TextInput>
          <TextInput style={styles.InputStyle3} placeholder='Location'  onChangeText={Loc => setLoc(Loc)}></TextInput>
          <TextInput style={styles.InputStyle4} placeholder='Discord ID' onChangeText={Disc => setDisc(Disc)}></TextInput>

          <TouchableOpacity style={styles.Button} title='Continue' 
            onPress={
              async () => {
                try {
                  console.log(UName+" "+PNum+" "+Loc+" "+Disc);
                  mobileCheck(PNum);
                  discCheck(Disc);
                  if(mobileCheck(PNum) && discCheck(Disc)){
                    sendFirebaseData();
                    navigation.navigate('GameHub')
                  }
                } catch (error) {
                  console.log(error);
                  alert('Error');
                }
              }
            }>
              <Text>Continue</Text>
          </TouchableOpacity>

        </View>

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

  whitebg:
  {
    position: "absolute",
    width: 405 / 1440 * windowWidth,
    height: 670 / 1024 * windowHeight,
    left: 517 / 1440 * windowWidth,
    top: 160 / 1024 * windowHeight,
    justifyContent: 'center',
    alignItems:"center",
    alignContent:"center",
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    borderBottomRightRadius: 17,
    borderBottomLeftRadius: 17
  },

  signinText: {
    position: "absolute",
    top: 0.001*windowHeight,
    height: 32/1024*windowHeight,
    width: 305/1440*windowWidth,
    color: 'white',
    fontSize: 27,
    lineHeight: 32,
    textAlign: 'center',
  },

  CamIcon: {
    position: "absolute",
    resizeMode:"contain",
    width: 0.12*windowWidth,
    height: 0.12*windowHeight,
    top: -0.28*windowHeight,
    left: -0.06*windowWidth
  },

  ProfileImage: {
    position: "absolute",
    // resizeMode:"contain",
    width: 0.07*windowWidth,
    height: 0.13*windowHeight,
    top: -0.28*windowHeight,
    left: -0.035*windowWidth,
    overflow:'hidden',
    borderRadius: '45%'
  },

  InputStyle1: {
    "position": "absolute",
    top: 250 / 1024 * windowHeight,
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
    top: 325 / 1024 * windowHeight,
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

  InputStyle3: {
    "position": "absolute",
    top: 400 / 1024 * windowHeight,
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

  InputStyle4: {
    "position": "absolute",
    top: 475 / 1024 * windowHeight,
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

  Button:
  {
    position: "absolute",
    width: 305 / 1440 * windowWidth,
    height: 55 / 1024 * windowHeight,
    top: 0.55 * windowHeight,
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
});