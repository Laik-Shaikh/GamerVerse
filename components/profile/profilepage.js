import React from 'react';
import { View, StyleSheet, Image, Dimensions,ImageBackground,Text,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height


export default function profilepage({ navigation }) {
    return (
            <View style={styles.container} >
                <LinearGradient
                    start={{ x: 0, y: 1}} end={{ x: 0, y: -1 }}
                    colors={['#013C00', '#000000']}
                    style={styles.background} >
                    <ImageBackground source={require('./profileAssets/designspikes1.png')} style={styles.spike1} />
                    <Image source={require('./profileAssets/gamerversetitle.png')} style={styles.title} />
                    <ImageBackground source={require('./profileAssets/menubar.png')} style={styles.menu} />
                    
                    <TouchableOpacity style={styles.homebtn}  onPress={() => navigation.navigate("Home")}>
                    <   Text style={styles.robototxt}>Home</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.profilebtn}  onPress={() => navigation.navigate("Profile")}>
                        <Text style={styles.robototxt}>Profile</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.mygamesbtn}  onPress={() => navigation.navigate("")}>
                        <Text style={styles.robototxt}>My Games</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.gamehubbtn}  onPress={() => navigation.navigate("")}>
                        <Text style={styles.robototxt}>Game Hub</Text>
                    </TouchableOpacity>
                    
                    <Image source={require('./profileAssets/search.png')} style={styles.searchbar} />
                    <ImageBackground source={require('./profileAssets/designspikes.png')} style={styles.spike2} />
                    
                    <View style={styles.photoContainer}>
                        <Text style={styles.headTxt}>My Photo</Text>
                        <View style={styles.dpicture}></View>
                    </View>
                    
                    <View style={styles.aboutMeContainer}>
                        <Text style={styles.headTxt}>About Me</Text>
                        <Text style={styles.aboutMeTxt}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at condimentum velit. Etiam pretium justo ac tellus blandit, eget maximus metus maximus. Phasellus dictum dignissim nulla, sit amet porttitor lacus consequat sed. Sed a risus imperdiet, iaculis metus ac, condimentum ex. Cras vestibulum vestibulum orci, sit amet rhoncus risus placerat quis. Donec nulla velit, fringilla eget tellus sit amet, malesuada vulputate sapien. Nullam eget sem finibus neque interdum commodo vel non sapien. Ut a nulla in augue bibendum aliquam.</Text>
                    </View>
                    
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
        width: "100%",
        height: "100%",
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
    homebtn:{
        position:"absolute",
        top:0.11*windowHeight,
        left:0.05*windowWidth,
    },
    profilebtn:{
        position:"absolute",
        top:0.11*windowHeight,
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
        height: 0.39*windowHeight,
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
        height: 0.46*windowHeight,
        top: 0.54*windowHeight,
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
      },
    aboutMeTxt:{
        position: "absolute",
        top: 0.09*windowHeight,
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 20,
        lineHeight: 23,
        textAlign: "center",
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