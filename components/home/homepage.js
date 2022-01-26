import React from 'react';
import { View, StyleSheet, Image, Dimensions,ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height


export default function homepage({ navigation }) {
    return (
            <View style={styles.container} >
                <LinearGradient
                    start={{ x: 0, y: 1}} end={{ x: 0, y: -1 }}
                    colors={['#013C00', '#000000']}
                    style={styles.background} >
                    <ImageBackground source={require('./homeAssets/designspikes1.png')} style={styles.spike1} />
                    <Image source={require('./homeAssets/gamerversetitle.png')} style={styles.title} />
                    <ImageBackground source={require('./homeAssets/menubar.png')} style={styles.menu} />
                    <Image source={require('./homeAssets/search.png')} style={styles.searchbar} />
                    <ImageBackground source={require('./homeAssets/notificationbar.png')} style={styles.notif} />
                    <Image source={require('./homeAssets/post2.png')} style={styles.posts} />
                    <Image source={require('./homeAssets/dp.png')} style={styles.dpview} />
                    <Image source={require('./homeAssets/dp.png')} style={styles.dppostview} />
                    <ImageBackground source={require('./homeAssets/divider.png')} style={styles.divider} />
                    <ImageBackground source={require('./homeAssets/designspikes.png')} style={styles.spike2} />
                    </LinearGradient>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: windowWidth,
        height: windowHeight

    },
    background: {
        position: "relative",
        width: windowWidth,
        height: windowHeight,
    },
    title:{
        top:-0.2*windowHeight,
        left:0.3*windowWidth,
        resizeMode:'contain',
        height: 0.1*windowHeight,
        width: 0.35*windowWidth,
    },
    menu:{
        resizeMode:'contain',
        top:-0.2*windowHeight,
        height: 0.05*windowHeight,
        width: 1*windowWidth,
    },
    posts:{
        top:-0.7*windowHeight,
        left:0.25*windowWidth,
        resizeMode:'contain',
        height: 0.60*windowHeight,
        width: 0.50*windowWidth,
    },
    dpview:{
        top:-1.4*windowHeight,
        resizeMode:'contain',
        height: 0.06*windowHeight,
        width: 0.05*windowWidth,
    },
    dppostview:{
        top:-1.45*windowHeight,
        left:0.25*windowWidth,
        resizeMode:'contain',
        height: 0.06*windowHeight,
        width: 0.05*windowWidth,
    },
    divider:{
        top:-1.5*windowHeight,
        left:0.2*windowWidth,
        resizeMode:'contain',
        height: 0.6*windowHeight,
        width: "3px",
    },
    searchbar:{
        resizeMode:'contain',
        top:-0.25*windowHeight,
        left:0.7*windowWidth,
        height: 0.05*windowHeight,
        width: 0.25*windowWidth,
    },
    notif:{
        top:-0.2*windowHeight,
        left:0.8*windowWidth,
        resizeMode:'contain',
        height:0.60* windowHeight,
        width: 0.1*windowWidth,
    },
    spike1:{
        resizeMode:'contain',
        left:0.85*windowWidth,
        height: 0.2*windowHeight,
        width:0.15* windowWidth,
    },
    spike2:{
        top:-1.52*windowHeight,
        resizeMode:'contain',
        height: 0.2*windowHeight,
        width:0.15* windowWidth,
    }
});