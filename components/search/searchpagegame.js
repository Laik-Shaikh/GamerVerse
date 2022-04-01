import React from 'react';
import {View, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity, Text, ScrollView, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export default function searchpagegame({ navigation, route }){

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

            <TouchableOpacity style={{position: 'absolute', top: 0.2*windowHeight,}}>
            <View style={[styles.infoContainer,{top: 0*windowHeight,backgroundColor: "rgba(255, 255, 255, 0.25)"}]}>
                    <Text style={styles.gameNameTitle}>Game: Valorant</Text>
                    <Image source={require('./searchAssets/ValoLogo.png')} style={styles.gameLogo} />
                </View>
            </TouchableOpacity>

            <ImageBackground source={require('./searchAssets/HoriDivider.png')}
                style = {styles.horiLine} />

            <ScrollView style={styles.scrollContainer1}>
                <Text style={styles.robototxt2}>Most Famous Players</Text>
                <View style={styles.profileContainer}>
                    <TouchableOpacity>
                    <Image source={require('./searchAssets/Display Image.png')} style={styles.profileImage} />
                    <View style={styles.ProfileText}>
                        <Text style={styles.displayText}>SomeRandomPlayer</Text> 
                    </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>


            <ScrollView style={styles.scrollContainer2}>
                <Text style={styles.robototxt2}>Players playing your games</Text>
                <View style={styles.profileContainer}>
                    <TouchableOpacity>
                    <Image source={require('./searchAssets/Display Image.png')} style={styles.profileImage} />
                    <View style={styles.ProfileText}>
                        <Text style={styles.displayText}>SomeRandomPlayer</Text> 
                    </View>
                    </TouchableOpacity>
                </View>          
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
        width: windowWidth,
        height: windowHeight,
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

    robototxt:{ 
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 14,
        "color": "#FFFFFF"
    },

    gameNameTitle:{ 
        position: "absolute",
        left:0.17*windowWidth,
        top:0.02*windowHeight,
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 27,
        "color": "#FFFFFF"
    },

    robototxt2:{ 
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 24,
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
        top:0.3*windowHeight,
        width: 0.75 * windowWidth,
        height: 0.25 * windowHeight,
        left: 0.12 * windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        // transform: "matrix(1, 0, 0, 1, 0, 0)"
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

    gameLogo:{
        position: 'absolute',
        resizeMode: 'contain',
        width: 0.45 * windowWidth,
        height: 0.25 * windowHeight,
        top: 0 * windowHeight,
        left: -0.1537 *windowWidth
    },

    horiLine:{
        position: 'absolute',
        resizeMode: 'contain',
        width: windowWidth,
        height : 0.004 * windowHeight,
        top : 0.5 * windowHeight  
    },

    scrollContainer1:{
        position: 'absolute',
        width: 0.3*windowWidth,
        height: 0.46*windowHeight,
        left: 0.17*windowWidth,
        top: 0.55*windowHeight
    },

    scrollContainer2:{
        position: 'absolute',
        width: 0.3*windowWidth,
        height: 0.46*windowHeight,
        left: 0.60*windowWidth,
        top: 0.55*windowHeight
    },

    profileImage:{
        position: 'absolute',
        resizeMode: 'contain',
        width: 0.036*windowWidth,
        height: 0.05*windowHeight,
        marginTop: 0.03*windowHeight,
        // marginTop: 0.04*windowHeight
    },

    profileContainer:{
        position: 'relative',
        // paddingTop: 0.08*windowHeight,
        left: 0.007*windowWidth,
        marginTop: 0.01*windowHeight
   
    },

    ProfileText:{
        // width: 0.03*windowWidth,
        // height: 0.03*windowHeight,
        paddingLeft: 0.04*windowWidth,
        marginTop: 0.03*windowHeight,
        // marginTop: 0.04*windowHeight
    },

    displayText:{ 
        marginTop: 0.01*windowHeight,
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 18,
        "color": "#FFFFFF",
    },


});