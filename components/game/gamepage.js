import React from 'react';
import { View, StyleSheet, Image, Dimensions,ImageBackground,Text,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height


export default function profilepage({ navigation }) {
    return (
            <View style={styles.container} >
                <LinearGradient
                    start={{ x: 0, y: 1}} end={{ x: 0, y: -1 }}
                    colors={['#013C00', '#000000']}
                    style={styles.background} >
                    <ImageBackground source={require('./gameAssets/designspikes1.png')} style={styles.spike1} />
                    <Image source={require('./gameAssets/gamerversetitle.png')} style={styles.title} />
                    <ImageBackground source={require('./gameAssets/menubar.png')} style={styles.menu} />
                    <TouchableOpacity style={styles.homebtn}  onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.robototxt}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profilebtn}  onPress={() => navigation.navigate("Profile")}>
                    <Text style={styles.robototxt}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mygamesbtn}  onPress={() => navigation.navigate("MyGames")}>
                    <Text style={styles.robototxt}>My Games</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.gamehubbtn}  onPress={() => navigation.navigate("GameHub")}>
                    <Text style={styles.robototxt}>Game Hub</Text>
                    </TouchableOpacity>
                    <Image source={require('./gameAssets/search.png')} style={styles.searchbar} />
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingTxt}>Rating</Text>
                    </View>
                    <View style={styles.desclabContainer}>
                        <Text style={styles.ratingTxt}>Description</Text>
                    </View>
                    <ImageBackground source={require('./gameAssets/designspikes.png')} style={styles.spike2} />
                    <View style={styles.taglabContainer}>
                        <Text style={styles.ratingTxt}>Tag</Text>
                    </View>
                    <View style={styles.gameContainer}>
                        <Text style={styles.gameTitleTxt}>Game's Name</Text>
                        <TouchableOpacity >
                        <Image source={require('./gameAssets/followbtn.png')} style={styles.followBtn} />
                    </TouchableOpacity>
                    </View>
                    <View style={styles.descContainer}>
                        <Text style={styles.ratingTxt}>Wingardium Laviosa</Text>
                    </View>
                    <View style={styles.tagContainer}>
                        <Text style={styles.ratingTxt}>#yashisapro #laikisshakin #mawrahisbawrah #metraa</Text>
                    </View>
                    </LinearGradient>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position:"relative",
        width: windowWidth,
        height: windowHeight

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
    homebtn:{
        position:"absolute",
        top:0.11*windowHeight,
        left:0.05*windowWidth,
        height: 0.03*windowHeight,
        width: 0.025*windowWidth
    },
    profilebtn:{
        position:"absolute",
        top:0.11*windowHeight,
        left:0.20*windowWidth,
        height: 0.03*windowHeight,
        width: 0.025*windowWidth
    },
    mygamesbtn:{
        position:"absolute",
        top:0.11*windowHeight,
        left:0.35*windowWidth,
        height: 0.03*windowHeight,
        width: 0.04*windowWidth
    },
    gamehubbtn:{
        position:"absolute",
        top:0.11*windowHeight,
        left:0.50*windowWidth,
        height: 0.03*windowHeight,
        width: 0.04*windowWidth
    },
    searchbar:{
        position:"absolute",
        resizeMode:'contain',
        top:0.10*windowHeight,
        left:0.7*windowWidth,
        height: 0.05*windowHeight,
        width: 0.25*windowWidth,
    },
      followBtn:{
        position:"absolute",
        resizeMode:'contain',
        top:0.7*0.424*windowHeight,
        left:0.9*0.302*windowWidth,
        height: 0.1*windowHeight,
        width: 0.1*windowWidth,
    },
    ratingContainer:{
        position: "absolute",
        width: 0.302*windowWidth,
        height: 0.424*windowHeight,
        top: 0.15*windowHeight,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
      },
      desclabContainer:{
        position: "absolute",
        width: 0.302*windowWidth,
        height: 0.195*windowHeight,
        top: 0.574*windowHeight,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
      },
      taglabContainer:{
        position: "absolute",
        width: 0.302*windowWidth,
        height: 0.225*windowHeight,
        top: 0.769*windowHeight,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
      },
    ratingTxt:{
        position: "absolute",
        left: 0.11*windowWidth,
        top: 0.02*windowHeight,
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "22px",
        lineHeight: "26px",
        textAlign: "center",
        color: "#FFFFFF"
      },
      gameTitleTxt:{
        position: "absolute",
        left: 0.28*windowWidth,
        top: 0.02*windowHeight,
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "22px",
        lineHeight: "26px",
        textAlign: "center",
        color: "#FFFFFF"
      },
      gameContainer:{
        position: "absolute",
        width: 0.698*windowWidth,
        height: 0.424*windowHeight,
        top: 0.15*windowHeight,
        left:0.302*windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.20)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
      },
      descContainer:{
        position: "absolute",
        width: 0.698*windowWidth,
        height: 0.195*windowHeight,
        top: 0.574*windowHeight,
        left:0.302*windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
      },
      tagContainer:{
        position: "absolute",
        width: 0.698*windowWidth,
        height: 0.225*windowHeight,
        top: 0.769*windowHeight,
        left:0.302*windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.20)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
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