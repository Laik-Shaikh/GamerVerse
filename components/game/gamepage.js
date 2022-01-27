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
                    <ImageBackground source={require('./gameAssets/designspikes1.png')} style={styles.spike1} />
                    <Image source={require('./gameAssets/gamerversetitle.png')} style={styles.title} />
                    <ImageBackground source={require('./gameAssets/menubar.png')} style={styles.menu} />
                    <Image source={require('./gameAssets/search.png')} style={styles.searchbar} />
                    <View style={styles.photoContainer}>
                        <Text style={styles.photoTxt}>My Photo</Text>
                    </View>
                    <ImageBackground source={require('./gameAssets/designspikes.png')} style={styles.spike2} />
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
        height: 0.29*windowHeight,
        top: 0.16*windowHeight,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
      },
    photoTxt:{
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