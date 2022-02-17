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

    const [state, setState] = useState({
        search: '',
      })
      const {textInputValue} = route.params
      const [userInfo,setUserInfo] = React.useState()
    //   var gameTags=[];
    //   var tagArray=[];
      const db = getDatabase();
      const searchRef = query(ref(db,'users'),orderByChild('Name'),equalTo(textInputValue))
      console.log(searchRef)
      React.useEffect(() => {
      onValue(searchRef,(snapshot)=>{
        try{
        const data = Object.values(snapshot.val());
        setUserInfo(data)
        } catch(e) { console.log(e); }
      })
  },[])
  
  console.log(userInfo)

  if(!userInfo)
    {
    return(
        <View style={styles.container}>
            <LinearGradient
                start = {{x:0, y:1}}
                end = {{x:0, y:-1}}
                colors={['#013C00', '#000000']}
                style = {styles.background}
            />
            
            <ImageBackground source={require('./searchAssets/designspikes1.png')} 
                style={styles.spikes1} />
            <ImageBackground source={require('./searchAssets/designspikes2.png')} 
                style={styles.spikes2} />
            <Image source={require('./searchAssets/GamerVerseTitle.png')} 
                style = {styles.GamerVerseTitle} />   
            <ImageBackground source={require('./searchAssets/MenuBar.png')}
                style = {styles.menuBar} />

            {/* NavBar Buttons     */}
            <TouchableOpacity style={styles.homebtn}  onPress={() => navigation.navigate("Home")}>
                <Text style={styles.robototxt}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profilebtn}  onPress={() => navigation.navigate("Profile")}>
                <Text style={styles.robototxt}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mygamesbtn}  onPress={() => navigation.navigate("MyGames")}>
                <Text style={styles.highlighttxt}>My Games</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gamehubbtn}  onPress={() => navigation.navigate("GameHub")}>
                <Text style={styles.robototxt}>Game Hub</Text>
            </TouchableOpacity>
            <Image source={require('./searchAssets/searchIcon.png')} style={styles.searchIcon} />
            <TextInput style={styles.InputStyle1} placeholder='Search for friends, games or location'></TextInput>

            {/*Search Result*/}
            <Text style={styles.playersearchText} >Player Search Result:</Text>

            <ScrollView style = {styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <Image source={require('./searchAssets/frown.png')} style = {styles.frown}></Image>
                <Text style={styles.notfoundText}>Result not found</Text>
            </ScrollView>

        </View>
    )
}


{/* 
<View style={{"left": 0/1440 * windowWidth, "top": 0/1024 * windowHeight}}>
<TouchableOpacity onPress={() => navigation.navigate("")}>
    <Image source={require('./searchAssets/profile1.png')} style = {styles.profile} />
    <Text style={styles.profilename} >ValorantX01</Text>
</TouchableOpacity>
</View> 
            <View style={{"left": 0/1440 * windowWidth, "top": 0/1024 * windowHeight}}>
            <View style={styles.whitebg}/>
            <TouchableOpacity onPress={() => navigation.navigate("Game")}>
            <Image source={require('./searchAssets/ValoLogo.png')} style = {styles.valo} />
            </TouchableOpacity>
            <View style={styles.valoContainer}>
                <Text style={styles.tagText} >Tags: </Text>
                <Text style={styles.subtagText} >#BattleRoyale</Text>
                <Text style={styles.subtagText} >#BattleRoyale1test</Text>
            </View>
            </View>
*/}

return(
    <View style={styles.container}>
        <LinearGradient
            start = {{x:0, y:1}}
            end = {{x:0, y:-1}}
            colors={['#013C00', '#000000']}
            style = {styles.background}
        />
        
        <ImageBackground source={require('./searchAssets/designspikes1.png')} 
            style={styles.spikes1} />
        <ImageBackground source={require('./searchAssets/designspikes2.png')} 
            style={styles.spikes2} />
        <Image source={require('./searchAssets/GamerVerseTitle.png')} 
            style = {styles.GamerVerseTitle} />   
        <ImageBackground source={require('./searchAssets/MenuBar.png')}
            style = {styles.menuBar} />

        {/* NavBar Buttons     */}
        <TouchableOpacity style={styles.homebtn}  onPress={() => navigation.navigate("Home")}>
            <Text style={styles.robototxt}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profilebtn}  onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.robototxt}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mygamesbtn}  onPress={() => navigation.navigate("MyGames")}>
            <Text style={styles.highlighttxt}>My Games</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gamehubbtn}  onPress={() => navigation.navigate("GameHub")}>
            <Text style={styles.robototxt}>Game Hub</Text>
        </TouchableOpacity>
        <Image source={require('./searchAssets/searchIcon.png')} style={styles.searchIcon} />
        <TextInput style={styles.InputStyle1} placeholder='Search for friends, games or location'></TextInput>

        {/*Search Result*/}
        <Text style={styles.playersearchText} >Player Search Result:</Text>

        <ScrollView style = {styles.scrollContainer1} showsVerticalScrollIndicator={false} contentContainerStyle= {{justifyContent:'space-around'}}>
        
        {userInfo.map((item, index) => {
            if(item.Name.toLowerCase().includes(textInputValue.toLowerCase()) || textInputValue == ""){
            return (
                <View key={index} style={{"left": 0/1440 * windowWidth, "top": 0/1024 * windowHeight, flex: 1, marginVertical:35}}>   
                    <TouchableOpacity onPress={() => navigation.navigate("")}>
                    <Image source={item.DisplayPicture} style = {styles.profile}/>
                    <Text style={styles.profilename}>{item.Name}</Text>
                    </TouchableOpacity>
                </View>
            )
            }
        })}
        </ScrollView>

    </View>
)
}

const styles = StyleSheet.create({
    container : {
        position: 'relative',
        width : windowWidth,
        height : windowHeight,
    },

    background: {
        position: 'relative',
        width: "100%",
        height: "100%",
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
   
    homebtn:{
        position:"absolute",
        top:0.11*windowHeight,
        left:0.05*windowWidth,
        height: 0.03*windowHeight,
        width: 0.03*windowWidth
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
        top:0.107*windowHeight,
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
        width: 0.3*windowWidth,
        height : 0.7*windowHeight,
        top : 0.1*windowHeight,
        left : 0.016*windowWidth
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

    profile:{
        position:'absolute',
        resizeMode: 'contain',
        width: 55 / 1440 * windowWidth,
        height: 55 / 1024 * windowHeight,
        top: 0.25*windowHeight,
        left: 0.02*windowWidth,
        borderTopRightRadius: 0.03 * windowWidth,
        borderBottomLeftRadius: 0.03 * windowWidth,
        borderBottomRightRadius: 0.03 * windowWidth,
        borderTopLeftRadius: 0.03 * windowWidth,
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

    playersearchText:{
        position:'absolute',
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 35,
        top: 170/1024*windowHeight,
        left: 540/1440*windowWidth,
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
   
    valo:{
        position:'absolute',
        resizeMode: 'contain',
        width: 0.35*windowWidth,
        height: 0.21*windowHeight,
        top: 0*windowHeight,
        left: -0.12*windowWidth
    },

    valoContainer:{
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        left: 0.13*windowWidth,
        top: 0.01*windowHeight
    },
});