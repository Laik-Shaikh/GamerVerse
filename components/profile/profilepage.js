import React from 'react';
import { View, StyleSheet, Image, Dimensions,ImageBackground,Text,TouchableOpacity,Button,TextInput,ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';

import fire from '../firebase';
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import 'firebase/database'
import { getDatabase, onValue,ref,query, orderByChild, equalTo ,update,get} from "firebase/database";
import { getStorage, ref as strRef, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';


const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


export default function profilepage ({ navigation , route}){
      const auth = getAuth();
      var nowEditable = route.params
      var profileUid = 'aoPtWnacOEccgqqvesjmC17Gibu2';
      const [image, setImage] = useState(null);
      var [newName,setNewName] = React.useState()
      var [newPhone,setNewPhone] = React.useState()
      var [newAbout,setNewAbout] = React.useState()
      var [newDisc,setNewDisc] = React.useState()
      var [myGames,setMyGames] = React.useState()
      var [url1,setUrl1]=React.useState()
      var [gameData,setGameData] = React.useState()
      let gameFlag

      const storage = getStorage();
      const metadata = {
        contentType: 'image/jpg',
      };
      const storageRef = strRef(storage, 'Profile/' + profileUid + '.jpg');
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
      var [userInfo,setUserInfo] = React.useState()
      const db = getDatabase();
      const profileRef = query(ref(db,'users'),orderByChild('uid'),equalTo(profileUid))
      const picUpdateRef = query(ref(db,'users/' + profileUid ))
      console.log(profileRef)
      React.useEffect(() => {
      onValue(profileRef,(snapshot)=>{
        const data = Object.values(snapshot.val());
        console.log(data)
        setUserInfo(data)
      })

      get(query(ref(db,'users/' + profileUid + '/Games'))).then((snapshot)=>{
          setMyGames(Object.values(snapshot.val()))
        })

        get(query(ref(db,'games/'))).then((snapshot) =>{
            console.log(Object.values(snapshot.val()))
            setGameData(Object.values(snapshot.val()))
        })             
        
  },[]) 



 
 
  async function sendFirebaseData(){
    const response = await fetch(image);
    const blob = await response.blob();
    if (!newPhone){
        newPhone=userInfo[0].PhoneNumber
    }
    if (!newName){
        newName=userInfo[0].Name
    }
    if (!newAbout){
        newAbout=userInfo[0].aboutMe
    }
    if (!newDisc){
        newDisc=userInfo[0].DiscordId
    }
    if (blob.type == 'text/html')
    {
        update(picUpdateRef,{
            // Email: auth.currentUser.email,
             PhoneNumber:newPhone,
            // Location: Loc,
            // Games:['XX'],
            // RequestedProfiles:['XX'],
            // ConfirmedProfiles:['XX'],
             DiscordId: newDisc,
            // uid: auth.currentUser.uid,
            Name:newName,
            aboutMe:newAbout,
            DisplayPicture: userInfo[0].DisplayPicture
          })
    }
    else
    {
    uploadBytes(storageRef, blob, metadata).then((snapshot) => {
      getDownloadURL(storageRef).then((url)=>{
        update(picUpdateRef,{
            // Email: auth.currentUser.email,
             PhoneNumber:newPhone,
            // Location: Loc,
            // Games:['XX'],
            // RequestedProfiles:['XX'],
            // ConfirmedProfiles:['XX'],
             DiscordId: newDisc,
            // uid: auth.currentUser.uid,
            Name:newName,
            aboutMe:newAbout,
            DisplayPicture: url
          })
          })
      })
    }
}
  if (!userInfo || !myGames || !gameData) {
    return (<Text>Rukavat ke liye khed hai</Text>)
}
  if (nowEditable){
    return (
        <View style={styles.container} >
            <LinearGradient
                start={{ x: 0, y: 1}} end={{ x: 0, y: -1 }}
                colors={['#013C00', '#000000']}
                style={styles.background} >
                <ImageBackground source={require('./profileAssets/designspikes1.png')} style={styles.spike1} />
                <Image source={require('./profileAssets/gamerversetitle.png')} style={styles.title} onPress={() => navigation.navigate("Home")}/>
                <ImageBackground source={require('./profileAssets/menubar.png')} style={styles.menu} />
                
                <TouchableOpacity style={styles.homebtn}  onPress={() => navigation.navigate("Home")}>
                <   Text style={styles.robototxt}>Home</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.profilebtn}  onPress={() => navigation.navigate("Profile",false)}>
                    <Text style={styles.highlighttxt}>Profile</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.mygamesbtn}  onPress={() => navigation.navigate("")}>
                    <Text style={styles.robototxt}>My Games</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.gamehubbtn}  onPress={() => navigation.navigate("")}>
                    <Text style={styles.robototxt}>Game Hub</Text>
                </TouchableOpacity>
                
                <Image source={require('./profileAssets/searchIcon.png')} style={styles.searchIcon} />
                <TextInput style={styles.InputStyle1} placeholder='Search for friends, games or tags'></TextInput>
                <ImageBackground source={require('./profileAssets/designspikes.png')} style={styles.spike2} />
                
                
                <View style={styles.photoContainer}>
                    <Text style={styles.headTxt}>My Photo</Text>
                    <TouchableOpacity onPress={pickImage} >
          <Image source={userInfo[0].DisplayPicture} style={styles.dpicture} />
          {image && <Image source={{ uri:image }} style={styles.dpicture} />}
          </TouchableOpacity>
                </View>
                
                <View style={styles.aboutMeContainer}>
                    <Text style={styles.headTxt}>About Me</Text>
                    <TextInput style={styles.aboutMeTxt} placeholder='Enter something that describes you' 
                    onChangeText={(text) => setNewAbout(text)}></TextInput>
                </View>
                
                <TouchableOpacity style={styles.Button} title='Done'  onPress={() =>{
                   console.log("Done btn pressed")
                   sendFirebaseData()
                   nowEditable=false;
                   navigation.push("Profile",nowEditable)
                }
                }>
                    <Text style={styles.ButtonText}>Done</Text>
                </TouchableOpacity>
                
                <View style={styles.divider1}/>
                <View style={[styles.infoContainer,{top: 0.15*windowHeight,backgroundColor: "rgba(255, 255, 255, 0.25)"}]}>
                    <Text style={styles.infoHeadTxt}>Name</Text>
                    <TextInput style={[styles.infoHeadTxt,{left: 0.2*windowWidth}]} 
                    placeholder='Enter new name' 
                    onChangeText={(text) => setNewName(text)}></TextInput>
                </View>
                
                <View style={[styles.infoContainer,{top: 0.27*windowHeight,}]}>
                    <Text style={styles.infoHeadTxt}>Location</Text>
                    <Text style={[styles.infoHeadTxt,{left: 0.2*windowWidth}]}>{userInfo[0].Location}</Text>
                </View>
                
                <View style={[styles.infoContainer,{top: 0.39*windowHeight,backgroundColor: "rgba(255, 255, 255, 0.25)"}]}>
                    <Text style={styles.infoHeadTxt}>Phone Number</Text>
                    <TextInput style={[styles.infoHeadTxt,{left: 0.2*windowWidth}]}
                    placeholder='Enter new phone number' 
                    onChangeText={(text) => setNewPhone(text)}
                    ></TextInput>
                </View>
                
                <View style={[styles.infoContainer,{top: 0.51*windowHeight,}]}>
                    <Text style={styles.infoHeadTxt}>Email</Text>
                    <Text style={[styles.infoHeadTxt,{left: 0.2*windowWidth}]}>{userInfo[0].Email}</Text>
                </View>
                
                <View style={[styles.infoContainer,{top: 0.63*windowHeight,backgroundColor: "rgba(255, 255, 255, 0.25)"}]}>
                    <Text style={styles.infoHeadTxt}>Discord Id</Text>
                    <TextInput style={[styles.infoHeadTxt,{left: 0.2*windowWidth}]}
                    placeholder='Enter new discord ID' 
                    onChangeText={(text) => setNewDisc(text)}></TextInput>
                </View>
                
                <View style={[styles.infoContainer,{top: 0.75*windowHeight,height:0.248*windowHeight}]}>
                    {}
                    <Text style={[styles.infoHeadTxt,{top: 0.1*windowHeight,}]}>My Games</Text>
                    <Image source={require('./profileAssets/GameImage.jpg')} style={styles.gameImage} />
                    <Text style={[styles.infoHeadTxt,{top: 0.18*windowHeight,left:0.192*windowWidth}]}>Spider-man</Text>
                </View>
                
                <View style={styles.divider2}/>
                
                </LinearGradient>
        </View>
);
  }
  if (userInfo && !nowEditable && gameData){
    return (
            <View style={styles.container} >
                <LinearGradient
                    start={{ x: 0, y: 1}} end={{ x: 0, y: -1 }}
                    colors={['#013C00', '#000000']}
                    style={styles.background} >
                    <ImageBackground source={require('./profileAssets/designspikes1.png')} style={styles.spike1} />
                    <Image source={require('./profileAssets/gamerversetitle.png')} style={styles.title} onPress={() => navigation.navigate("Home")}/>
                    <ImageBackground source={require('./profileAssets/menubar.png')} style={styles.menu} />
                    
                    <TouchableOpacity style={styles.homebtn}  onPress={() => navigation.navigate("Home")}>
                    <   Text style={styles.robototxt}>Home</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.profilebtn}  onPress={() => navigation.navigate("Profile")}>
                        <Text style={styles.highlighttxt}>Profile</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.mygamesbtn}  onPress={() => navigation.navigate("")}>
                        <Text style={styles.robototxt}>My Games</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.gamehubbtn}  onPress={() => navigation.navigate("")}>
                        <Text style={styles.robototxt}>Game Hub</Text>
                    </TouchableOpacity>
                    
                    <Image source={require('./profileAssets/searchIcon.png')} style={styles.searchIcon} />
                    <TextInput style={styles.InputStyle1} placeholder='Search for friends, games or tags'></TextInput>
                    <ImageBackground source={require('./profileAssets/designspikes.png')} style={styles.spike2} />
                    
                    
                    <View style={styles.photoContainer}>
                        <Text style={styles.headTxt}>My Photo</Text>
                        <Image source={userInfo[0].DisplayPicture} style = {styles.dpicture}/>
                    </View>
                    
                    <View style={styles.aboutMeContainer}>
                        <Text style={styles.headTxt}>About Me</Text>
                        <Text style={styles.aboutMeTxt}>{userInfo[0].aboutMe}</Text>
                    </View>
                    
                    <TouchableOpacity style={styles.Button} title='Edit'  onPress={() =>{
                       console.log("Edit btn pressed")
                       nowEditable=true;
                       navigation.push("Profile",nowEditable)
                    }
                    }>
                        <Text style={styles.ButtonText}>Edit</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.divider1}/>
                    {console.log(userInfo[0].Name)}
                    <View style={[styles.infoContainer,{top: 0.15*windowHeight,backgroundColor: "rgba(255, 255, 255, 0.25)"}]}>
                        <Text style={styles.infoHeadTxt}>Name</Text>
                        <Text style={[styles.infoHeadTxt,{left: 0.2*windowWidth}]}>{userInfo[0].Name}</Text>
                    </View>
                    
                    <View style={[styles.infoContainer,{top: 0.27*windowHeight,}]}>
                        <Text style={styles.infoHeadTxt}>Location</Text>
                        <Text style={[styles.infoHeadTxt,{left: 0.2*windowWidth}]}>{userInfo[0].Location}</Text>
                    </View>
                    
                    <View style={[styles.infoContainer,{top: 0.39*windowHeight,backgroundColor: "rgba(255, 255, 255, 0.25)"}]}>
                        <Text style={styles.infoHeadTxt}>Phone Number</Text>
                        <Text style={[styles.infoHeadTxt,{left: 0.2*windowWidth}]}>+91 {userInfo[0].PhoneNumber}</Text>
                    </View>
                    
                    <View style={[styles.infoContainer,{top: 0.51*windowHeight,}]}>
                        <Text style={styles.infoHeadTxt}>Email</Text>
                        <Text style={[styles.infoHeadTxt,{left: 0.2*windowWidth}]}>{userInfo[0].Email}</Text>
                    </View>
                    
                    <View style={[styles.infoContainer,{top: 0.63*windowHeight,backgroundColor: "rgba(255, 255, 255, 0.25)"}]}>
                        <Text style={styles.infoHeadTxt}>Discord Id</Text>
                        <Text style={[styles.infoHeadTxt,{left: 0.2*windowWidth}]}>{userInfo[0].DiscordId}</Text>
                    </View>
                    
                    <View style={[styles.infoContainer,{top: 0.75*windowHeight,height:0.248*windowHeight}]}>
                        <Text style={[styles.infoHeadTxt,{top: 0.1*windowHeight,}]}>My Games</Text>
                        <ScrollView contentContainerStyle= {{justifyContent:'space-around'}} 
                    style={styles.scrollContainer2} horizontal={true} 
                    showsHorizontalScrollIndicator={false}>
                        {
                            
                            gameData.map((game,index)=>{  
                                if ( myGames.includes(gameData[index].Code)){
                                    return(
                                        <View key={index}>
                                            <TouchableOpacity key={index} style={styles.gameImage} onPress={()=> navigation.navigate("Game", { GameCode: game.Code })}>
                                            <Image source={game.Image} style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
                                            <Text style={[styles.infoHeadTxt,{top: 0.19*windowHeight,left:0.03*windowWidth,fontSize: "16px",lineHeight: "16px"}]}>{game.Name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        )
                                    } 
                                })

                            }
                           
                        </ScrollView>
                    </View>
                    
                    <View style={styles.divider2}/>
                    
                    </LinearGradient>
            </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "100%",
        height: "100%"

    },
    background: {
        position:"relative",
        width: windowWidth,
        height: windowHeight,
    },
    title:{
        position:"absolute",
        left:0.3*windowWidth,
        resizeMode:'contain',
        height: 0.1*windowHeight,
        width: 0.35*windowWidth,
    },
    menu:{
        position:"absolute",
        resizeMode:'contain',
        top:0.10*windowHeight,
        height: 0.05*windowHeight,
        width: 1*windowWidth,
    },

    robototxt:{ 
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 14,
        "color": "#FFFFFF"
    },

    highlighttxt:{ 
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 15,
        borderBottomColor: "#FFFFFF",
        borderBottomWidth: 1,
        "color": "#FFFFFF"
    },

    homebtn:{
        position:"absolute",
        top:0.11*windowHeight,
        left:0.05*windowWidth,
    },
    profilebtn:{
        position:"absolute",
        top:0.107*windowHeight,
        left:0.20*windowWidth,
    },
    mygamesbtn:{
        position:"absolute",
        top:0.11*windowHeight,
        left:0.35*windowWidth,
    },
    gamehubbtn:{
        position:"absolute",
        top:0.11*windowHeight,
        left:0.50*windowWidth,
    },
    searchbar:{
        position:"absolute",
        resizeMode:'contain',
        top:0.10*windowHeight,
        left:0.7*windowWidth,
        height: 0.05*windowHeight,
        width: 0.25*windowWidth,
    },
    photoContainer:{
        position: "absolute",
        width: 0.32*windowWidth,
        height: 0.3*windowHeight,
        top: 0.15*windowHeight,
        alignItems:"center",
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
    },
    dpicture: {
        position: "absolute",
        top: 0.1 * windowHeight,
        width: 0.15 * windowHeight,
        height: 0.15 * windowHeight,
        borderRadius: 0.075 * windowHeight,
    },

    searchIcon:{
        position:"absolute",
        resizeMode:'contain',
        top:0.11*windowHeight,
        left:0.7*windowWidth,
        height: 0.03*windowHeight,
        width: 0.03*windowWidth,
    },

    InputStyle1:{
        "position": "absolute",
        top: 107/1024*windowHeight,
        right: 85/1440*windowWidth,
        height: 42/1024*windowHeight,
        width: 305/1440*windowWidth,
        color: 'white',
        fontSize: 17,
        paddingLeft: 10,
        paddingBottom: 2,
        paddingTop: 3,    
        borderBottomColor: "#FFFFFF",
        borderBottomWidth: 1,
        placeholderTextColor: "#FFFFFF",
        backgroundColor: "#e5e5e500"
    },

    Button:
  {
    position: "absolute",
    width: 136 / 1440 * windowWidth,
    height: 53 / 1024 * windowHeight,
    left: 165 / 1440 * windowWidth,
    top: 915 / 1024 * windowHeight,
    backgroundColor: "#39750A",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    borderBottomLeftRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  ButtonText:
  {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#FFFFFF"
  },

    headTxt:{
        position: "absolute",
        top: 0.02 * windowHeight,
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "22px",
        lineHeight: "26px",
        textAlign: "center",
        color: "#FFFFFF"
    },
    aboutMeContainer: {
        position: "absolute",
        width: 0.32*windowWidth,
        height: 0.547*windowHeight,
        top: 0.45*windowHeight,
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
      },
    spike1:{
        position:"absolute",
        resizeMode:'contain',
        right:"0px",
        height: 0.2*windowHeight,
        width:0.15* windowWidth,
    },
    aboutMeTxt: {
        position: "absolute",
        top: 0.09*windowHeight,
        paddingLeft: 15,
        paddingRight: 15,
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 20,
        lineHeight: 23,
        textAlign: "justify",
        color: "rgba(255, 255, 255, 0.75)"
    },
    infoContainer: {
        position: "absolute",
        width: 0.68 * windowWidth,
        height: 0.12 * windowHeight,
        left: 0.32 * windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
    },
    infoHeadTxt: {
        position: "absolute",
        top: 0.045 * windowHeight,
        left: 0.05 * windowHeight,
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "22px",
        lineHeight: "26px",
        color: "#FFFFFF"
    },
    gameImage: {
        padding: 1,
        height: 0.18 * windowHeight,
        width: 0.17 * windowWidth,
    },
    scrollContainer2: {
        position: 'absolute',
        width: 0.48 * windowWidth,
        height: 0.22 * windowHeight,
        left: 0.18 * windowWidth,
        top: 0.02 * windowHeight,
        flexGrow: 0.1,
    },
    divider1: {
        position: "absolute",
        height: 0.848 * windowHeight,
        left: 0.32 * windowWidth,
        top: 0.15 * windowHeight,
        borderWidth: 0.00001 * windowWidth,
        borderColor: "rgba(168, 182, 175, 0.5)",
        borderStyle: "solid"
    },
    divider2: {
        position: "absolute",
        height: 0.848 * windowHeight,
        left: 0.5 * windowWidth,
        top: 0.15 * windowHeight,
        borderWidth: 0.00001 * windowWidth,
        borderColor: "rgba(168, 182, 175, 0.5)",
        borderStyle: "solid"
    },
    spike1: {
        position: "absolute",
        resizeMode: 'contain',
        right: "0px",
        height: 0.2 * windowHeight,
        width: 0.15 * windowWidth,
    },
    spike2: {
        position: "absolute",
        bottom: "0px",
        resizeMode: 'contain',
        height: 0.2 * windowHeight,
        width: 0.15 * windowWidth,
    }
});