import React from 'react';
import {View, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity, Text, ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export default function MyGamesPage ({ navigation }){
    return(
        <View style={styles.container}>
            <LinearGradient
                start = {{x:0, y:0}}
                end = {{x:0, y:-1}}
                colors={['#013C00', '#000000']}
                style = {styles.background}
            />
            
            <Image source={require('./MyGamesAssets/designspikes1.png')} 
                style={styles.spikes1} />
            <Image source={require('./MyGamesAssets/designspikes2.png')} 
                style={styles.spikes2} />
            <Image source={require('./MyGamesAssets/GamerVerseTitle.png')} 
                style = {styles.GamerVerseTitle} />   
            <ImageBackground source={require('./MyGamesAssets/MenuBar.png')}
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

            <Image source={require('./MyGamesAssets/SearchBar.png')}
                style = {styles.searchBar} />
            <ImageBackground source={require('./MyGamesAssets/HoriDivider.png')}
                style = {styles.horiLine} />
            <Image source={require('./MyGamesAssets/VerLine.png')} 
                style = {styles.verLine} />
            <Image source={require('./MyGamesAssets/VerLine2.png')} 
                style = {styles.verLine2} />

            <Image source={require('./MyGamesAssets/PCLogo.png')}
                style = {styles.pcLogo} />
            <Image source={require('./MyGamesAssets/MobileLogo.png')} 
                style = {styles.mobileLogo} />
            <Image source={require('./MyGamesAssets/ConsoleLogo.png')} 
                style = {styles.consoleLogo} />


            <ScrollView horizontal={true} style = {styles.scrollContainer1} showsVerticalScrollIndicator={false}>
                <Image source={require('./MyGamesAssets/ApexLegend.png')} 
                    style = {styles.apexLegend} />
                <Image source={require('./MyGamesAssets/GTAV.png')} 
                    style = {styles.gta5} />
                <Image source={require('./MyGamesAssets/Valorant.png')} 
                    style = {styles.valorant} />
                <Image source={require('./MyGamesAssets/CODWZ.png')} 
                    style = {styles.cod} />
            </ScrollView>


            <ScrollView horizontal={true} style = {styles.scrollContainer2} showsVerticalScrollIndicator={false}>
            <Image source={require('./MyGamesAssets/COC.png')} 
                    style = {styles.coc} />
            <Image source={require('./MyGamesAssets/CODM.png')} 
                    style = {styles.codMob} />
            <Image source={require('./MyGamesAssets/PokemonGO.png')} 
                    style = {styles.pogo} />
            <Image source={require('./MyGamesAssets/FreeFire.png')} 
                    style = {styles.freeFire} />
            </ScrollView>


            <ScrollView horizontal={true} style = {styles.scrollContainer3} showsVerticalScrollIndicator={false}>
            <Image source={require('./MyGamesAssets/GodOfWar.png')} 
                    style = {styles.gow} />
            <Image source={require('./MyGamesAssets/MortalKombatLogo.png')} 
                    style = {styles.mortalKombat} />
            <Image source={require('./MyGamesAssets/SpiderManLogo.png')} 
                    style = {styles.spiderMan} />
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
        width: 1*windowWidth,
        height : 0.001*windowHeight,
        top : 0.35* windowHeight
        
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
        width: 0.58*windowWidth,
        height : 0.6*windowHeight,
        top : 0.37*windowHeight,
        left : 0.016*windowWidth
    },

    scrollContainer2:{
        position:'absolute',
        width: 0.58*windowWidth,
        height : 0.6*windowHeight,
        top : 0.37*windowHeight,
        left: 0.345*windowWidth
    },

    scrollContainer3:{
        position:'absolute',
        width: 0.32*windowWidth,
        height : 0.6*windowHeight,
        top : 0.37*windowHeight,
        left: 0.68*windowWidth
    },

    apexLegend:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.3*windowWidth,
        height: 0.21*windowHeight,
        left: '0px',
        top: 0.02*windowHeight
    },

    gta5:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.3*windowWidth,
        height: 0.21*windowHeight,
        left: '0px',
        top: 0.24*windowHeight
    },

    valorant:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.3*windowWidth,
        height: 0.21*windowHeight,
        left: '0px',
        top: 0.46*windowHeight
    },

    cod:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.3*windowWidth,
        height: 0.21*windowHeight,
        left: '0px',
        top: 0.68*windowHeight
    },

    coc:{
        position:'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.3*windowWidth,
        height: 0.21*windowHeight,
        left: '1px',
        top: 0.02 *windowHeight
    },

    codMob:{
        position:'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.3*windowWidth,
        height: 0.21*windowHeight,
        left: '1px',
        top: 0.24 *windowHeight
    },

    pogo:{
        position:'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.3*windowWidth,
        height: 0.21*windowHeight,
        left: '1px',
        top: 0.46 *windowHeight
    },

    freeFire:{
        position:'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.3*windowWidth,
        height: 0.21*windowHeight,
        left: '1px',
        top: 0.68 *windowHeight
    },

    gow:{
        position:'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.3*windowWidth,
        height: 0.21*windowHeight,
        left: '1px',
        top: 0.02*windowHeight
    },

    mortalKombat:{
        position:'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.3*windowWidth,
        height: 0.21*windowHeight,
        left: '1px',
        top: 0.24*windowHeight
    },

    spiderMan:{
        position:'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.3*windowWidth,
        height: 0.21*windowHeight,
        left: '1px',
        top: 0.46*windowHeight
    }
    
});
