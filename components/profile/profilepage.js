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
                    <Image source={require('./profileAssets/search.png')} style={styles.searchbar} />
                    <ImageBackground source={require('./profileAssets/designspikes.png')} style={styles.spike2} />
                    <View style={styles.photoContainer}>
                        <Text style={styles.headTxt}>My Photo</Text>
                    </View>
                    <View style={styles.aboutMeContainer}>
                        <Text style={styles.headTxt}>About Me</Text>
                    </View>
                    <View style={styles.divider1}/>
                    <View style={[styles.infoContainer,{top: 0.15*windowHeight,backgroundColor: "rgba(255, 255, 255, 0.25)"}]}>

                    </View>
                    <View style={[styles.infoContainer,{top: 0.27*windowHeight,}]}>

                    </View>
                    <View style={[styles.infoContainer,{top: 0.39*windowHeight,backgroundColor: "rgba(255, 255, 255, 0.25)"}]}>

                    </View>
                    <View style={[styles.infoContainer,{top: 0.51*windowHeight,}]}>

                    </View>
                    <View style={[styles.infoContainer,{top: 0.63*windowHeight,backgroundColor: "rgba(255, 255, 255, 0.25)"}]}>

                    </View>
                    <View style={[styles.infoContainer,{top: 0.75*windowHeight,height:0.248*windowHeight}]}>

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
      infoContainer:{
        position: "absolute",
        width: 0.68*windowWidth,
        height: 0.12*windowHeight,
        left: 0.32*windowWidth,
        alignItems:"center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
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