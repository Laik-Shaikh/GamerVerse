import React from 'react';
import { View, StyleSheet, Image, Dimensions,ImageBackground,Text,TouchableOpacity,Button,TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import fire from '../firebase';
import 'firebase/database'
import { getDatabase, onValue,ref,query, orderByChild, equalTo } from "firebase/database";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


export default function profilepage({ navigation }) {
    
    const db = getDatabase();
    const UserRef = query(ref(db,'users'),orderByChild('uid'),equalTo('AO6qTBhGengOJjmsyKZoNhtvRJ03'))
    console.log(UserRef)
    onValue(UserRef,(snapshot)=>{
        console.log(snapshot.val())
    })

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
                        <View style={styles.dpicture}></View>
                    </View>
                    
                    <View style={styles.aboutMeContainer}>
                        <Text style={styles.headTxt}>About Me</Text>
                        <Text style={styles.aboutMeTxt}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at condimentum velit. Etiam pretium justo ac tellus blandit, eget maximus metus maximus. Phasellus dictum dignissim nulla, sit amet porttitor lacus consequat sed. Sed a risus imperdiet, iaculis metus ac, condimentum ex. Cras vestibulum vestibulum orci, sit amet rhoncus risus placerat quis. Donec nulla velit, fringilla eget tellus sit amet, malesuada vulputate sapien. Nullam eget sem finibus neque interdum commodo vel non sapien. Ut a nulla in augue bibendum aliquam.</Text>
                    </View>
                    
                    <TouchableOpacity style={styles.Button} title='Login'>
                        <Text style={styles.ButtonText}>Edit</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.divider1}/>
                    
                    <View style={[styles.infoContainer,{top: 0.15*windowHeight,backgroundColor: "rgba(255, 255, 255, 0.25)"}]}>
                        <Text style={styles.infoHeadTxt}>Name</Text>
                        <Text style={[styles.infoHeadTxt,{left: 0.2*windowWidth}]}>John Doe</Text>
                    </View>
                    
                    <View style={[styles.infoContainer,{top: 0.27*windowHeight,}]}>
                        <Text style={styles.infoHeadTxt}>Location</Text>
                        <Text style={[styles.infoHeadTxt,{left: 0.2*windowWidth}]}>John Doe</Text>
                    </View>
                    
                    <View style={[styles.infoContainer,{top: 0.39*windowHeight,backgroundColor: "rgba(255, 255, 255, 0.25)"}]}>
                        <Text style={styles.infoHeadTxt}>Phone Number</Text>
                        <Text style={[styles.infoHeadTxt,{left: 0.2*windowWidth}]}>+91 9999999999</Text>
                    </View>
                    
                    <View style={[styles.infoContainer,{top: 0.51*windowHeight,}]}>
                        <Text style={styles.infoHeadTxt}>Email</Text>
                        <Text style={[styles.infoHeadTxt,{left: 0.2*windowWidth}]}>JohnDoe@gmail.com</Text>
                    </View>
                    
                    <View style={[styles.infoContainer,{top: 0.63*windowHeight,backgroundColor: "rgba(255, 255, 255, 0.25)"}]}>
                        <Text style={styles.infoHeadTxt}>Discord Id</Text>
                        <Text style={[styles.infoHeadTxt,{left: 0.2*windowWidth}]}>JohnnyDoe#2320</Text>
                    </View>
                    
                    <View style={[styles.infoContainer,{top: 0.75*windowHeight,height:0.248*windowHeight}]}>
                        <Text style={[styles.infoHeadTxt,{top: 0.1*windowHeight,}]}>My Games</Text>
                        <Image source={require('./profileAssets/GameImage.jpg')} style={styles.gameImage} />
                        <Text style={[styles.infoHeadTxt,{top: 0.18*windowHeight,left:0.192*windowWidth}]}>Spider-man</Text>
                    </View>
                    
                    <View style={styles.divider2}/>
                    </LinearGradient>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position:"relative",
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
    dpicture:{
        position: "absolute",
        top:0.1*windowHeight,
        width:0.15*windowHeight,
        height:0.15*windowHeight,
        borderRadius:0.075*windowHeight,
        backgroundColor: "rgba(120, 225, 100, 0.2)"
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
        top: 0.02*windowHeight,
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "22px",
        lineHeight: "26px",
        textAlign: "center",
        color: "#FFFFFF"
      },
    aboutMeContainer:{
        position: "absolute",
        width: 0.32*windowWidth,
        height: 0.547*windowHeight,
        top: 0.45*windowHeight,
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
      },
    aboutMeTxt:{
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
    infoContainer:{
        position: "absolute",
        width: 0.68*windowWidth,
        height: 0.12*windowHeight,
        left: 0.32*windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
      },
    infoHeadTxt:{
        position: "absolute",
        top: 0.045*windowHeight,
        left: 0.05*windowHeight,
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "22px",
        lineHeight: "26px",
        color: "#FFFFFF"
      },
    gameImage:{
        position:"absolute",
        left:0.05*windowWidth,
        top:0.02*windowHeight,
        resizeMode:'contain',
        height: 0.15*windowHeight,
        width: 0.35*windowWidth,
    },
    divider1:{
        position:"absolute",
        height:0.848*windowHeight,
        left:0.32*windowWidth,
        top:0.15*windowHeight,
        borderWidth: 0.00001*windowWidth,
        borderColor: "rgba(168, 182, 175, 0.5)",
        borderStyle: "solid"
    },
    divider2:{
        position:"absolute",
        height:0.848*windowHeight,
        left:0.5*windowWidth,
        top:0.15*windowHeight,
        borderWidth: 0.00001*windowWidth,
        borderColor: "rgba(168, 182, 175, 0.5)",
        borderStyle: "solid"
    },
    spike1:{
        position:"absolute",
        resizeMode:'contain',
        right:"0px",
        height: 0.2*windowHeight,
        width:0.15* windowWidth,
    },
    spike2:{
        position:"absolute",
        bottom:"0px",
        resizeMode:'contain',
        height: 0.2*windowHeight,
        width:0.15* windowWidth,
    }
});