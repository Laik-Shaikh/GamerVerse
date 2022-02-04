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
            <Image source={require('./MyGamesAssets/SearchBar.png')}
                style = {styles.searchBar} /> 
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
                <Text style={styles.robototxt}>My Games</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gamehubbtn}  onPress={() => navigation.navigate("GameHub")}>
                <Text style={styles.highlighttxt}>Game Hub</Text>
            </TouchableOpacity>

            <Image source={require('./GameHubAssets/VerLine.png')} 
                style = {styles.verLine} />
            <Image source={require('./GameHubAssets/HoriDivider.png')} 
                style = {styles.horiLine} /> 
            <Image source={require('./GameHubAssets/HoriDivider2.png')} 
                style = {styles.horiLine2} />  

            <Image source={require('./MyGamesAssets/PCLogo.png')}
                style = {styles.pcLogo} />
            <Image source={require('./MyGamesAssets/MobileLogo.png')} 
                style = {styles.mobileLogo} />
            <Image source={require('./MyGamesAssets/ConsoleLogo.png')} 
                style = {styles.consoleLogo} /> 


            <ScrollView style = {styles.scrollContainer1} horizontal={true} 
                showsHorizontalScrollIndicator={false} >
                <TouchableOpacity>
                    <Image source={require('./GameHubAssets/ApexLogo.png')} 
                        style = {styles.apexLogo} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('./GameHubAssets/GTAVLogo.png')} 
                        style = {styles.gta5} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('./GameHubAssets/ValoLogo.png')} 
                        style = {styles.valoLogo} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('./GameHubAssets/CODWZLogo.png')} 
                        style = {styles.codwz} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('./GameHubAssets/DotaLogo.png')} 
                        style = {styles.dotaLogo} />
                </TouchableOpacity>
            </ScrollView>


            <ScrollView style = {styles.scrollContainer2} horizontal={true} 
                showsHorizontalScrollIndicator={false} >
                <TouchableOpacity>
                    <Image source={require('./GameHubAssets/cocLogo.png')} 
                        style = {styles.cocLogo} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('./GameHubAssets/CODMLogo.png')} 
                        style = {styles.codMob} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('./GameHubAssets/FreeFire.png')} 
                        style = {styles.freeFire} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('./GameHubAssets/CRLogo.png')} 
                        style = {styles.crLogo} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('./GameHubAssets/MobileLegend.png')} 
                        style = {styles.mobileLegend} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('./GameHubAssets/PokeLogo.png')} 
                        style = {styles.pokeLogo} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('./GameHubAssets/bgmiLogo.png')} 
                        style = {styles.bgmi} />
                </TouchableOpacity>
            </ScrollView>


            <ScrollView style = {styles.scrollContainer3} horizontal={true} 
                showsHorizontalScrollIndicator={false} >
                <TouchableOpacity>
                    <Image source={require('./GameHubAssets/GOWLogo.png')} 
                        style = {styles.gow} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('./GameHubAssets/MortalKombat.png')} 
                        style = {styles.mortalKombat} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('./GameHubAssets/SpidermanLogo.png')} 
                        style = {styles.spiderMan} />
                </TouchableOpacity>
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
        top:0.1*windowHeight,
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
        top:0.11*windowHeight,
        left:0.35*windowWidth,
        height: 0.03*windowHeight,
        width: 0.05*windowWidth
    },
    gamehubbtn:{
        position:"absolute",
        top:0.107*windowHeight,
        left:0.50*windowWidth,
        height: 0.03*windowHeight,
    },

    searchBar:{
        position:"absolute",
        resizeMode:'contain',
        top:0.10*windowHeight,
        left:0.7*windowWidth,
        height: 0.05*windowHeight,
        width: 0.25*windowWidth,
    },

    verLine:{
        position: 'absolute',
        resizeMode: 'contain',
        height: 0.83*windowHeight,
        width: 0.1*windowWidth,
        left: 0.13*windowWidth,
        top: 0.16*windowHeight,
    },

    horiLine:{
        position: 'absolute',
        resizeMode: 'contain',
        width: 1*windowWidth,
        height : 0.01*windowHeight,
        top : 0.42* windowHeight,
        left: '0px' 
    },

    horiLine2:{
        position: 'absolute',
        resizeMode: 'contain',
        width: 1*windowWidth,
        height : 0.01*windowHeight,
        top : 0.73* windowHeight,
        left: '0px'
    },

    pcLogo:{
        position: 'absolute',
        resizeMode: 'contain',
        width: 0.15*windowWidth,
        height: 0.2*windowHeight,
        left: 0.01*windowWidth,
        top: 0.18*windowHeight,
    },

    mobileLogo:{
        position: 'absolute',
        resizeMode: 'contain',
        width: 0.18*windowWidth,
        height: 0.23*windowHeight,
        left: 0.001*windowWidth,
        top: 0.46*windowHeight,
    },

    consoleLogo:{
        position: 'absolute',
        resizeMode: 'contain',
        width: 0.147*windowWidth,
        height: 0.184*windowHeight,
        left: 0.015*windowWidth,
        top: 0.78*windowHeight,
    },

    scrollContainer1:{
        position: 'absolute',
        flex: 1,
        width: 0.8*windowWidth,
        height: 0.28*windowHeight,
        left: 0.19*windowWidth,
        top: 0.13*windowHeight
    },

    scrollContainer2:{
        position: 'absolute',
        width: 0.8*windowWidth,
        height: 0.34*windowHeight,
        left: 0.19*windowWidth,
        top: 0.38*windowHeight
    },

    scrollContainer3:{
        position: 'absolute',
        width: 0.8*windowWidth,
        height: 0.36*windowHeight,
        left: 0.19*windowWidth,
        top: 0.63*windowHeight
    },

    apexLogo:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.13*windowWidth,
        height: 0.24*windowHeight,
        left: 0.0001*windowWidth,
        top: 0.05*windowHeight,
    },

    gta5:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.13*windowWidth,
        height: 0.24*windowHeight,
        left: 0.12*windowWidth,
        top: 0.05*windowHeight,
    },

    valoLogo:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.13*windowWidth,
        height: 0.24*windowHeight,
        left: 0.24*windowWidth,
        top: 0.05*windowHeight,
    },

    codwz:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.13*windowWidth,
        height: 0.24*windowHeight,
        left: 0.36*windowWidth,
        top: 0.05*windowHeight,
    },

    dotaLogo:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.13*windowWidth,
        height: 0.24*windowHeight,
        left: 0.48*windowWidth,
        top: 0.05*windowHeight,
    },

    cocLogo:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.13*windowWidth,
        height: 0.24*windowHeight,
        left: 0.001*windowWidth,
        top: 0.08*windowHeight,
    },

    codMob:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.13*windowWidth,
        height: 0.24*windowHeight,
        left: 0.12*windowWidth,
        top: 0.08*windowHeight,
    },

    freeFire:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.13*windowWidth,
        height: 0.24*windowHeight,
        left: 0.24*windowWidth,
        top: 0.08*windowHeight,
    },

    crLogo:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.13*windowWidth,
        height: 0.24*windowHeight,
        left: 0.36*windowWidth,
        top: 0.08*windowHeight,
    },

    mobileLegend:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.13*windowWidth,
        height: 0.24*windowHeight,
        left: 0.48*windowWidth,
        top: 0.08*windowHeight,
    },

    pokeLogo:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.13*windowWidth,
        height: 0.24*windowHeight,
        left: 0.60*windowWidth,
        top: 0.08*windowHeight,
    },

    bgmi:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.13*windowWidth,
        height: 0.24*windowHeight,
        left: 0.72*windowWidth,
        top: 0.08*windowHeight,
    },

    gow:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.13*windowWidth,
        height: 0.24*windowHeight,
        left: 0.001*windowWidth,
        top: 0.12*windowHeight,
    },

    mortalKombat:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.13*windowWidth,
        height: 0.24*windowHeight,
        left: 0.12*windowWidth,
        top: 0.12*windowHeight,
    },

    spiderMan:{
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.13*windowWidth,
        height: 0.24*windowHeight,
        left: 0.24*windowWidth,
        top: 0.12*windowHeight,
    },


});