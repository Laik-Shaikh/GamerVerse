import React from 'react';
import {View, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity, Text, ScrollView, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export default function searchpage ({ navigation }){
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
            <TextInput style={styles.InputStyle1} placeholder='Search for friends, games or tags'></TextInput>
            <ImageBackground source={require('./searchAssets/HoriDivider.png')}
                style = {styles.horiLine} />
            <Image source={require('./searchAssets/VerLine.png')} 
                style = {styles.verLine} />
            <Image source={require('./searchAssets/VerLine2.png')} 
                style = {styles.verLine2} />

            <Image source={require('./searchAssets/PCLogo.png')}
                style = {styles.pcLogo} />
            <Image source={require('./searchAssets/MobileLogo.png')} 
                style = {styles.mobileLogo} />
            <Image source={require('./searchAssets/ConsoleLogo.png')} 
                style = {styles.consoleLogo} />


            <ScrollView style = {styles.scrollContainer1} showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={() => navigation.navigate("Game")}>
                <Image source={require('./searchAssets/ApexLogo.png')} 
                    style = {styles.apexLegend} />
                </TouchableOpacity>
                <View style={styles.apexContainer}>
                    <Text style={styles.tagText} >Tags: </Text>
                    <Text style={styles.tagText} >#BattleRoyale</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Game")}>
                <Image source={require('./searchAssets/GTAVLogo.png')} 
                    style = {styles.gta5} />
                </TouchableOpacity>
                <View style={styles.gta5Container}>
                    <Text style={styles.tagText} >Tags: </Text>
                    <Text style={styles.tagText} >#BattleRoyale</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Game")}>
                <Image source={require('./searchAssets/ValoLogo.png')} 
                    style = {styles.valorant} />
                </TouchableOpacity>
                <View style={styles.valorantContainer}>
                    <Text style={styles.tagText} >Tags: </Text>
                    <Text style={styles.tagText} >#BattleRoyale</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Game")}>
                <Image source={require('./searchAssets/CODWZLogo.png')} 
                    style = {styles.cod} />
                </TouchableOpacity>
                <View style={styles.codContainer}>
                    <Text style={styles.tagText} >Tags: </Text>
                    <Text style={styles.tagText} >#BattleRoyale</Text>
                </View>
            </ScrollView>


            <ScrollView style = {styles.scrollContainer2} showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={() => navigation.navigate("Game")}>
            <Image source={require('./searchAssets/cocLogo.png')} 
                    style = {styles.coc} />
            </TouchableOpacity>
            <View style={styles.cocContainer}>
                <Text style={styles.tagText} >Tags: </Text>
                <Text style={styles.tagText} >#BattleRoyale</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Game")}>
            <Image source={require('./searchAssets/CODMLogo.png')} 
                    style = {styles.codMob} />
            </TouchableOpacity>
            <View style={styles.codMobContainer}>
                <Text style={styles.tagText} >Tags: </Text>
                <Text style={styles.tagText} >#BattleRoyale</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Game")}>
            <Image source={require('./searchAssets/PokeLogo.png')} 
                    style = {styles.pogo} />
            </TouchableOpacity>
            <View style={styles.pogoContainer}>
                <Text style={styles.tagText} >Tags: </Text>
                <Text style={styles.tagText} >#BattleRoyale</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Game")}>
            <Image source={require('./searchAssets/FreeFire.png')} 
                    style = {styles.freeFire} />
            </TouchableOpacity>
            <View style={styles.freeFireContainer}>
                <Text style={styles.tagText} >Tags: </Text>
                <Text style={styles.tagText} >#BattleRoyale</Text>
            </View>
            </ScrollView>


            <ScrollView style = {styles.scrollContainer3} showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={() => navigation.navigate("Game")}>
            <Image source={require('./searchAssets/GOWLogo.png')} 
                    style = {styles.gow} />
            </TouchableOpacity>
            <View style={styles.gowContainer}>
                <Text style={styles.tagText} >Tags: </Text>
                <Text style={styles.tagText} >#BattleRoyale</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Game")}>
            <Image source={require('./searchAssets/MortalKombat.png')} 
                    style = {styles.mortalKombat} />
            </TouchableOpacity>
            <View style={styles.mkContainer}>
                <Text style={styles.tagText} >Tags: </Text>
                <Text style={styles.tagText} >#BattleRoyale</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Game")}>
            <Image source={require('./searchAssets/SpiderManLogo.png')} 
                    style = {styles.spiderMan} />
            </TouchableOpacity>
            <View style={styles.spiderContainer}>
                <Text style={styles.tagText} >Tags: </Text>
                <Text style={styles.tagText} >#BattleRoyale</Text>
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

    horiLine:{
        position: 'absolute',
        resizeMode: 'contain',
        width: windowWidth,
        height : 0.001 * windowHeight,
        top : 0.35 * windowHeight
        
    },

    verLine:{
        position: 'absolute',
        resizeMode: 'contain',
        width : 0.1 * windowWidth,
        height : 0.83 * windowHeight,
        left : 0.265*windowWidth,
        top : 0.16*windowHeight
    },

    verLine2:{
       position: 'absolute',
       resizeMode: 'contain',
       width : 0.1 * windowWidth,
       height : 0.83 * windowHeight,
       right: 0.265*windowWidth,
       top: 0.16*windowHeight
    },

    pcLogo:{
        position:'absolute',
        resizeMode:'contain',
        width : 0.15*windowWidth,
        height: 0.2*windowHeight,
        left: 0.08*windowWidth,
        top: 0.15*windowHeight
    },

    mobileLogo:{
        position: 'absolute',
        resizeMode: 'contain',
        height: 0.17*windowHeight,
        width: 0.2*windowWidth,
        left: 0.4*windowWidth,
        top: 0.17*windowHeight
    },

    consoleLogo:{
        position: 'absolute',
        resizeMode: 'contain',
        height: 0.15*windowHeight,
        width: 0.14*windowWidth,
        left: 0.76*windowWidth,
        top : 0.18*windowHeight,
    },

    scrollContainer1:{
        position: 'absolute',
        width: 0.3*windowWidth,
        height : 0.6*windowHeight,
        top : 0.37*windowHeight,
        left : 0.016*windowWidth
    },

    scrollContainer2:{
        position:'absolute',
        width: 0.3*windowWidth,
        height : 0.6*windowHeight,
        top : 0.37*windowHeight,
        left: 0.345*windowWidth
    },

    scrollContainer3:{
        position:'absolute',
        width: 0.3*windowWidth,
        height : 0.6*windowHeight,
        top : 0.37*windowHeight,
        left: 0.68*windowWidth
    },

    apexLegend:{
        position: 'absolute',
        resizeMode: 'contain',
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        top: 0.02*windowHeight,
        left: -0.12*windowWidth,
    },

    apexContainer:{
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        left: 0.15*windowWidth,
        top: 0.02*windowHeight
    },

   tagText:{
    "fontStyle": "normal",
    "fontWeight": "500",
    "fontSize": 26,
    "color": "#FFFFFF"
   },

    gta5:{
        position: 'absolute',
        resizeMode: 'contain',
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        left: -0.12*windowWidth,
        top: 0.06*windowHeight
    },

    gta5Container:{
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        left: 0.15*windowWidth,
        top: 0.06*windowHeight
    },

    valorant:{
        position: 'absolute',
        resizeMode: 'contain',
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        left: -0.12*windowWidth,
        top: 0.10*windowHeight
    },

    valorantContainer:{
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        left: 0.15*windowWidth,
        top: 0.10*windowHeight
    },

    cod:{
        position: 'absolute',
        resizeMode: 'contain',
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        left: -0.12*windowWidth,
        top: 0.14*windowHeight
    },

    codContainer:{
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        left: 0.15*windowWidth,
        top: 0.14*windowHeight,
    },

    coc:{
        position:'absolute',
        resizeMode: 'contain',
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        top: 0.02*windowHeight,
        left: -0.14*windowWidth
    },

    cocContainer:{
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        left: 0.15*windowWidth,
        top: 0.02*windowHeight
    },

    codMob:{
        position:'absolute',
        resizeMode: 'contain',
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        top: 0.06*windowHeight,
        left: -0.14*windowWidth
    },

    codMobContainer:{
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        left: 0.15*windowWidth,
        top: 0.06*windowHeight
    },

    pogo:{
        position:'absolute',
        resizeMode: 'contain',
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        top: 0.10*windowHeight,
        left: -0.14*windowWidth
    },

    pogoContainer:{
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        left: 0.15*windowWidth,
        top: 0.10*windowHeight
    },

    freeFire:{
        position:'absolute',
        resizeMode: 'contain',
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        top: 0.14*windowHeight,
        left: -0.14*windowWidth
    },

    freeFireContainer:{
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        left: 0.15*windowWidth,
        top: 0.14*windowHeight
    },

    gow:{
        position:'absolute',
        resizeMode: 'contain',
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        top: 0.02*windowHeight,
        left: -0.12*windowWidth,
    },

    gowContainer:{
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        left: 0.15*windowWidth,
        top: 0.02*windowHeight
    },

    mortalKombat:{
        position:'absolute',
        resizeMode: 'contain',
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        top: 0.06*windowHeight,
        left: -0.12*windowWidth,
    },

    mkContainer:{
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        left: 0.15*windowWidth,
        top: 0.06*windowHeight
    },

    spiderMan:{
        position:'absolute',
        resizeMode: 'contain',
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        top: 0.10*windowHeight,
        left: -0.12*windowWidth,
    },

    spiderContainer:{
        width: 0.4*windowWidth,
        height: 0.25*windowHeight,
        left: 0.15*windowWidth,
        top: 0.10*windowHeight
    },
    
    
});