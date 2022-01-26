import React from 'react';
import { View, StyleSheet, Image, Dimensions,ImageBackground,TouchableOpacity,Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height


export default function profilepage({ navigation }) {
    function toProfile() {
        navigation.navigate("profile")
    }
    return (
            <View style={styles.container} >
                <LinearGradient
                    start={{ x: 0, y: 1}} end={{ x: 0, y: -1 }}
                    colors={['#013C00', '#000000']}
                    style={styles.background} >
                    <ImageBackground source={require('./profileAssets/designspikes1.png')} style={styles.spike1} />
                    <Image source={require('./profileAssets/gamerversetitle.png')} style={styles.title} />
                    <Button onPress={toProfile} title="Profile" color="#841584" accessibilityLabel="Go to profile page"/>
                    <ImageBackground source={require('./profileAssets/menubar.png')} style={styles.menu} />
                    <Image source={require('./profileAssets/search.png')} style={styles.searchbar} />
                    <ImageBackground source={require('./profileAssets/notificationbar.png')} style={styles.notif} />
                    <Image source={require('./profileAssets/post2.png')} style={styles.posts} />
                    <Image source={require('./profileAssets/dp.png')} style={styles.dpview} />
                    <Image source={require('./profileAssets/dp.png')} style={styles.dppostview} />
                    <ImageBackground source={require('./profileAssets/divider.png')} style={styles.divider} />
                    <ImageBackground source={require('./profileAssets/designspikes.png')} style={styles.spike2} />
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
    profilebtn:{
        position:"absolute",
        top:0.1*windowHeight,
        left:0.1*windowWidth,
        height: 0.1*windowHeight,
        width: 0.1*windowWidth,
    },
    menu:{
        position:"absolute",
        resizeMode:'contain',
        top:0.10*windowHeight,
        height: 0.05*windowHeight,
        width: 1*windowWidth,
    },
    posts:{
        position:"absolute",
        top:0.3*windowHeight,
        left:0.25*windowWidth,
        resizeMode:'contain',
        height: 0.60*windowHeight,
        width: 0.50*windowWidth,
    },
    dpview:{
        position:"absolute",
        top:0.2*windowHeight,
        resizeMode:'contain',
        height: 0.06*windowHeight,
        width: 0.05*windowWidth,
    },
    dppostview:{
        position:"absolute",
        top:0.2*windowHeight,
        left:0.25*windowWidth,
        resizeMode:'contain',
        height: 0.06*windowHeight,
        width: 0.05*windowWidth,
    },
    divider:{
        position:"absolute",
        top:0.2*windowHeight,
        left:0.2*windowWidth,
        resizeMode:'contain',
        height: 0.6*windowHeight,
        width: "3px",
    },
    searchbar:{
        position:"absolute",
        resizeMode:'contain',
        top:0.10*windowHeight,
        left:0.7*windowWidth,
        height: 0.05*windowHeight,
        width: 0.25*windowWidth,
    },
    notif:{
        position:"absolute",
        top:0.2*windowHeight,
        left:0.8*windowWidth,
        height:(695/900) * windowHeight,
        width: (227/1600)*windowWidth,
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