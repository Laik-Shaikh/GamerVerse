import React from 'react';
import {View, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity, Text, ScrollView, TextInput} from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

import fire from '../firebase';
import 'firebase/database'
import { getDatabase, onValue,ref,query, orderByChild, equalTo } from "firebase/database";

export default function searchpagename ({ navigation, route }){
    const [searchAgain, setSearchAgain] = React.useState('');
    var printed= false;
    const [state, setState] = useState({
        search: '',
      })
      var {textInputValue} = route.params
      console.log(textInputValue)
      var [userInfo,setUserInfo] = React.useState()
      var [searchedGame,setSearchedGame] = React.useState()
      var [locInfo,setLocInfo] = React.useState()
      const db = getDatabase();
      
      var searchRef = query(ref(db,'users'),orderByChild('Name'))
      var searchGameRef = query(ref(db,'games'),orderByChild('Name'))
      var searchLocRef = query(ref(db,'users'),orderByChild('Location'),equalTo(textInputValue))
      console.log('searchRef')
      console.log(searchRef)
      var handleSearch = (e) => {
        if (e.nativeEvent.key == 'Enter') {
          textInputValue =(searchAgain);
          if(textInputValue.length>0 && textInputValue!=" "){
            navigation.push("SearchName", {textInputValue})
          }
         
      }
    }
      React.useEffect(() => {
      onValue(searchRef,(snapshot)=>{
        try{
        const data = Object.values(snapshot.val());
        setUserInfo(data)
        } catch(e) { console.log(e); }
      })
      onValue(searchGameRef,(snapshot)=>{
        try{
        const data1 = Object.values(snapshot.val());
        setSearchedGame(data1)
        } catch(e) { console.log(e); }
      })
      onValue(searchLocRef,(snapshot)=>{
        try{
        const data2 = Object.values(snapshot.val());
        setLocInfo(data2)
        } catch(e) { console.log(e) }

      })
  },[])

  console.log(userInfo)
  console.log(searchedGame)

  function renderLoc(){
      if(locInfo){
      return(
      locInfo.map((profile, index) => {
        if(profile.Location.toLowerCase().includes(textInputValue.toLowerCase())){
            printed=true;
        return (
            <View>
        {/* <Text style={[styles.playersearchText,{top: -250/1024*windowHeight,}]}>Players</Text> */}
            <View key={index} style={{"left": 0/1440 * windowWidth, "top": -250/1024 * windowHeight, flex: 1, marginVertical:35, paddingBottom: 10, left: 0.05 * windowWidth,}}>
                <TouchableOpacity onPress={() => navigation.push("SearchProfile", profile.uid)}>
                    <Image source={profile.DisplayPicture} style = {styles.profileimg}/>
                    <Text style={styles.profilename}>{profile.Name}</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
        }
    }))}
  }
  
  function renderUser(){
    if(userInfo){
    return(
    userInfo.map((profile, index) => {
        if(profile.Name.toLowerCase().includes(textInputValue.toLowerCase())){
            printed=true;
        return (
            <View key={index} style={{"left": 0/1440 * windowWidth, "top": -250/1024 * windowHeight, flex: 1, marginVertical:35, paddingBottom: 10, left: 0.05 * windowWidth,}}>
                <TouchableOpacity onPress={() => navigation.push("SearchProfile", profile.uid)}>
                    <Image source={profile.DisplayPicture} style = {styles.profileimg}/>
                    <Text style={styles.profilename}>{profile.Name}</Text>
                </TouchableOpacity>
            </View>
        )
        }
    }))}
}

function renderGame(){
    if(searchedGame){
    return(
    searchedGame.map((game, index) => {
        if(game.Name.toLowerCase().includes(textInputValue.toLowerCase())){
            printed=true;
        return (
            <View key={index} style={{"left": 0/1440 * windowWidth, "top": -50/1024 * windowHeight, flex: 1, marginVertical:35, paddingBottom: 170}}>
                <View style={styles.infoContainer}>
                {console.log(game.Code)}
                <TouchableOpacity onPress={() => navigation.push("Game",{ GameCode: game.Code })}>
                    <Image source={game.Image} style = {styles.gameLogo}/>
                    <Text style={styles.gameNameTitle}>{game.Name}</Text>
                    <Text style={styles.gameDescription}>{game.Description}</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
        }
    }))}
}
    function renderEmpty(){
        if(printed == false){
             return(
                 <View>
                     <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Ffrown.png?alt=media&token=ad3f609b-ac13-4bef-a646-422b87ed6526"} style = {styles.frown}></Image>
                    <Text style={styles.notfoundText}>Result not found</Text>
                 </View>           
        )
    }
}
return(
    <View style={styles.container} showsHorizontalScrollIndicator={false}>
        <LinearGradient
            start = {{x:0, y:1}}
            end = {{x:0, y:-1}}
            colors={['#013C00', '#000000']}
            style = {styles.background}
        />
        
        <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fds1.png?alt=media&token=9753aac0-931b-4c66-9f2a-00d65dc99bd6"} 
                style={styles.spikes1} />
            <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fds2.png?alt=media&token=1f1f37dd-b12d-43eb-be6e-0e739dc18b41"} 
                style={styles.spikes2} />
            <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Flogo.png?alt=media&token=7468c404-5678-43b2-92eb-310ffa58433c"} 
                style = {styles.GamerVerseTitle} />   
            <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FMenuBar.png?alt=media&token=d9c15cc1-98a6-41b8-a5f9-533a2f5d1f7b"}
                style = {styles.menuBar} />

        {/*Search Result*/}
        <Text style={styles.playersearchText} >Search Result:</Text>

        <ScrollView style = {styles.scrollContainer1} showsVerticalScrollIndicator={false} contentContainerStyle= {{justifyContent:'space-around'}}>
        {renderGame()}
        {renderUser()}
        {renderLoc()}
        {renderEmpty()}
        </ScrollView>
        
        {/* NavBar Buttons     */}
        <TouchableOpacity style={styles.homebtn}  onPress={() => navigation.push("Home")}>
            <Text style={styles.highlighttxt}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profilebtn}  onPress={() => navigation.push("Profile")}>
            <Text style={styles.robototxt}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mygamesbtn}  onPress={() => navigation.push("MyGames")}>
            <Text style={styles.robototxt}>My Games</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gamehubbtn}  onPress={() => navigation.push("GameHub")}>
            <Text style={styles.robototxt}>Game Hub</Text>
        </TouchableOpacity>
        <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FsearchIcon.png?alt=media&token=f31e94f7-0772-4713-8472-caf11d49a78d"} style={styles.searchIcon} />
        <TextInput 
                    style={styles.InputStyle1} 
                    placeholder='Search for friends, games or location'
                    onChangeText={(text) => setSearchAgain(text)}
                    value={searchAgain}
                    defaultValue={textInputValue}
                    onKeyPress={e => handleSearch(e)}
                    ></TextInput>
    </View>
)
}
   

const styles = StyleSheet.create({
    container : {
        position: 'relative',
        width: "100%",
        height: "100%",
        overflow: 'hidden',
    },

    background: {
        position: 'relative',
        width: windowWidth,
        height: windowHeight,
        justifyContent: 'center',
    },

    spikes1:{
        resizeMode:'contain',
        position:'absolute',
        right: '0px',
        height: 0.2*windowHeight,
        width:0.15* windowWidth,
    },

    spikes2:{
        position:'absolute',
        bottom: '0px', 
        resizeMode:'contain',
        height: 0.2*windowHeight,
        width:0.15* windowWidth,
    },

    GamerVerseTitle:{
        position:"absolute",
        left:0.35*windowWidth,
        resizeMode:'contain',
        height: 0.1*windowHeight,
        width: 0.35*windowWidth,
    },

    menuBar:{
        position:"absolute",
        resizeMode:'contain',
        top:0.10*windowHeight,
        height: 0.05*windowHeight,
        width: windowWidth,
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

    whitebg:
    {
      position: "absolute",
      width: 445 / 1440 * windowWidth,
      height: 215 / 1024 * windowHeight,
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.28)',
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

    infoContainer: {
        position: "absolute",
        // top:0.3*windowHeight,
        width: 0.9 * windowWidth,
        height: 0.25 * windowHeight,
        left: 0.05 * windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        // transform: "matrix(1, 0, 0, 1, 0, 0)"
    },
   
    gameLogo:{
        position: 'absolute',
        resizeMode: 'contain',
        width: 0.45 * windowWidth,
        height: 0.25 * windowHeight,
        top: 0 * windowHeight,
        left: -0.16 *windowWidth
    },
   
    homebtn:{
        position:"absolute",
        top:0.11*windowHeight,
        left:0.05*windowWidth,
        height: 0.03*windowHeight,
    },
    profilebtn:{
        position:"absolute",
        top:0.11*windowHeight,
        left:0.20*windowWidth,
        height: 0.03*windowHeight,
        width: 0.03*windowWidth
    },
    mygamesbtn:{
        position:"absolute",
        top:0.11*windowHeight,
        left:0.35*windowWidth,
        height: 0.03*windowHeight,
    },
    gamehubbtn:{
        position:"absolute",
        top:0.11*windowHeight,
        left:0.50*windowWidth,
        height: 0.03*windowHeight,
        width: 0.05*windowWidth
    },

    searchBar:{
        position:"absolute",
        resizeMode:'contain',
        top:0.10*windowHeight,
        left:0.7*windowWidth,
        height: 0.05*windowHeight,
        width: 0.25*windowWidth,
    },

    scrollContainer1:{
        position: 'absolute',
        flexGrow: 0.1,
        width: 0.9*windowWidth,
        height : 0.7*windowHeight,
        top : 0.25*windowHeight,
        left : 0.016*windowWidth,
        // backgroundColor: "rgba(255, 255, 255, 0.7)",
    },

    scrollContainer:{
        position: 'absolute',
        flexGrow: 0.75,
        width: windowWidth,
        height : 0.7*windowHeight,
        top : 0.25*windowHeight,
        left : 0.015*windowWidth
    },
    
    frown:{
        position:'absolute',
        resizeMode: 'contain',
        width: 50 / 1440 * windowWidth,
        height: 50 / 1024 * windowHeight,
        top: 0.014 *windowHeight,
        left: 560 / 1440 *windowWidth
    },
    
   notfoundText:{
    position:'absolute',
    "fontStyle": "normal",
    "fontWeight": "100",
    "fontSize": 25,
    top: 0.015*windowHeight,
    left: 620 / 1440 *windowWidth,
    "color": "#FFFFFF"
   },

    profileimg:{
        position:'absolute',
        width: 0.06 * windowHeight,
        height: 0.06 * windowHeight,
        top: 0.25*windowHeight,
        left: 0.02*windowWidth,
        borderRadius: 0.075 * windowHeight,
    },

    profilename:{
        position:'absolute',
        "fontStyle": "normal",
        "fontWeight": "400",
        "fontSize": 25,
        top: 0.255*windowHeight,
        left: 0.07*windowWidth,
        "color": "#FFFFFF"
       },

       gameDescription:{ 
        position: "absolute",
        width: 0.65*windowWidth,
        left:0.15*windowWidth,
        top:0.077*windowHeight,
        textAlign: 'justify',
        "fontStyle": "normal",
        "fontWeight": "200",
        "fontSize": 20,
        "color": "#FFFFFF"
    },

       gameNameTitle:{ 
           position: "absolute",
           left:0.15*windowWidth,
           top:0.028*windowHeight,
           "fontStyle": "normal",
           "fontWeight": "500",
           "fontSize": 27,
           "color": "#FFFFFF"
       },

    playersearchText:{
        position:'absolute',
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 35,
        top: 170/1024*windowHeight,
        left: 600/1440*windowWidth,
        "color": "#FFFFFF"
       },

       mostfamousText:{
        position:'absolute',
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 25,
        top: 230/1024*windowHeight,
        left: 104/1440*windowWidth,
        "color": "#FFFFFF"
       },

       gamesplayedText:{
        position:'absolute',
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 25,
        top: 230/1024*windowHeight,
        left: 625/1440*windowWidth,
        "color": "#FFFFFF"
       },

       samegameText:{
        position:'absolute',
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 25,
        top: 230/1024*windowHeight,
        left: 1060/1440*windowWidth,
        "color": "#FFFFFF"
       },

   tagText:{
    "fontStyle": "normal",
    "fontWeight": "500",
    "fontSize": 35,
    top: 0*windowHeight,
    "color": "#FFFFFF"
   },

   subtagText:{
    "fontStyle": "normal",
    "fontWeight": "100",
    "fontSize": 22,
    top: 0*windowHeight,
    "color": "#FFFFFF"
   },
});