import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity, Text, ScrollView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import fire from '../firebase';
import 'firebase/database'
import { getDatabase, onValue, ref, query, orderByChild, equalTo } from "firebase/database";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export default function GameHubPage({ navigation, route }) {

    const [games, setGames] = React.useState(null);
    const db = getDatabase();
    const GameRef = query(ref(db, 'games'))
    React.useEffect(() => {
        onValue(GameRef, (snapshot) => {
            const data = Object.values(snapshot.val());
            setGames(data)
        })
    }, [])
    if (!games) {
        return (<Text>Rukavat ke liye khed hai</Text>)
    }
    return (
        <View style={styles.container}>
            <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: -1 }}
                colors={['#013C00', '#000000']}
                style={styles.background}>

                <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fds1.png?alt=media&token=9753aac0-931b-4c66-9f2a-00d65dc99bd6"}
                    style={styles.spikes1} />
                <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fds2.png?alt=media&token=1f1f37dd-b12d-43eb-be6e-0e739dc18b41"}
                    style={styles.spikes2} />
                <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Flogo.png?alt=media&token=7468c404-5678-43b2-92eb-310ffa58433c"}
                    style={styles.GamerVerseTitle} />
                <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FsearchIcon.png?alt=media&token=f31e94f7-0772-4713-8472-caf11d49a78d"} style={styles.searchIcon} />
                <TextInput style={styles.InputStyle1} placeholder='Search for friends, games or tags'></TextInput>
                <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FMenuBar.png?alt=media&token=d9c15cc1-98a6-41b8-a5f9-533a2f5d1f7b"}
                    style={styles.menuBar} />

                {/* NavBar Buttons     */}

                <TouchableOpacity style={styles.homebtn} onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.robototxt}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profilebtn} onPress={() => navigation.navigate("Profile")}>
                    <Text style={styles.robototxt}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mygamesbtn} onPress={() => navigation.navigate("MyGames")}>
                    <Text style={styles.robototxt}>My Games</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gamehubbtn} onPress={() => navigation.navigate("GameHub")}>
                    <Text style={styles.highlighttxt}>Game Hub</Text>
                </TouchableOpacity>
                <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FVerLine.png?alt=media&token=ae718803-7ee5-4337-af84-5cc9ee2e1b11"}
                    style={styles.verLine} />
                <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FHoriDivider.png?alt=media&token=3fb49ba5-7989-4ae2-8065-eb6718e159f9"}
                    style={styles.horiLine} />
                <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FHoriDivider2.png?alt=media&token=4a3a51b8-4088-443f-9d3f-028d236cbb59"}
                    style={styles.horiLine2} />

                <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FPCLogo.png?alt=media&token=f6e35b8c-142f-41b2-b1c7-a1befb3ec808"}
                    style={styles.pcLogo} />
                <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FMobileLogo.png?alt=media&token=cc0648c0-fe80-4118-ba31-a32f8370b591"}
                    style={styles.mobileLogo} />
                <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FConsoleLogo.png?alt=media&token=333f6250-4d2d-46b2-84d0-1201c451dca0"}
                    style={styles.consoleLogo} />
                
                
                <ScrollView contentContainerStyle= {{justifyContent:'space-around'}} 
                    style={styles.scrollContainer1} horizontal={true} 
                    showsHorizontalScrollIndicator={false}>
                    {games.map((item, index) => {  
                        let computer;
                        computer = item.Code.charAt(0); 
                        if(computer === "P"){
                            return (
                                <View key={index} >   
                                     {console.log(item.Code)}
                                    <TouchableOpacity style={styles.apexLogo} onPress={() => navigation.push("Game", { GameCode: item.Code })}>
                                    <Image source={item.Image}
                                        style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
                                    </TouchableOpacity>
                               
                                </View>
    
    
                            )
                        }
                    })}
                </ScrollView>


                


            
                <ScrollView contentContainerStyle= {{justifyContent:'space-around'}} 
                    style={styles.scrollContainer2} horizontal={true} 
                    showsHorizontalScrollIndicator={true}>
                    {games.map((item, index) => {
                        let mobile;
                        mobile = item.Code.charAt(0);
                        console.log(mobile.Code)
                        
                        if(mobile === "M"){
                            return(<View key = {index} style={{ paddingLeft: 5, paddingRight: 5, }}>
                                {console.log(item.Code)}
                                <TouchableOpacity style={styles.apexLogo} onPress={() => navigation.push("Game", { GameCode: item.Code })}>
                                    <Image source={item.Image}
                                    style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
                                </TouchableOpacity>
                            </View>
                            )
                        }

                    }
                    )}
   
                </ScrollView>


                <ScrollView style={styles.scrollContainer3} horizontal={true}
                    showsHorizontalScrollIndicator={false} >
                    {games.map((item, index) => {
                        let console = item.Code.charAt(0);
                        if(console === "C")
                        {
                            return(
                                <View>
                                    <TouchableOpacity style={styles.apexLogo} onPress={() => navigation.push("Game", { GameCode: item.Code })}>
                                        <Image source={item.Image}
                                        style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        } )}
                    
                </ScrollView>
            </LinearGradient>
        </View>
    )

}


const styles = StyleSheet.create({

    container: {
        position: 'relative',
        width: "100%",
        height: "100%"
    },

    background: {
        position: 'relative',
        width: windowWidth,
        height: windowHeight,
    },

    spikes1: {
        position: "absolute",
        resizeMode: 'contain',
        right: "0px",
        height: 0.2 * windowHeight,
        width: 0.15 * windowWidth,
    },

    spikes2: {
        position: "absolute",
        bottom: "0px",
        resizeMode: 'contain',
        height: 0.2 * windowHeight,
        width: 0.15 * windowWidth,
    },

    GamerVerseTitle: {
        position: "absolute",
        left: 0.35 * windowWidth,
        resizeMode: 'contain',
        height: 0.1 * windowHeight,
        width: 0.35 * windowWidth,
    },

    searchIcon: {
        position: "absolute",
        resizeMode: 'contain',
        top: 0.11 * windowHeight,
        left: 0.7 * windowWidth,
        height: 0.03 * windowHeight,
        width: 0.03 * windowWidth,
    },

    InputStyle1: {
        "position": "absolute",
        top: 107 / 1024 * windowHeight,
        right: 85 / 1440 * windowWidth,
        height: 42 / 1024 * windowHeight,
        width: 305 / 1440 * windowWidth,
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

    menuBar: {
        position: "absolute",
        resizeMode: 'contain',
        top: 0.1 * windowHeight,
        height: 0.05 * windowHeight,
        width: 1 * windowWidth,
    },

    robototxt: {
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 14,
        "color": "#FFFFFF"
    },

    highlighttxt: {
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 15,
        borderBottomColor: "#FFFFFF",
        borderBottomWidth: 1,
        "color": "#FFFFFF"
    },

    homebtn: {
        position: "absolute",
        top: 0.11 * windowHeight,
        left: 0.05 * windowWidth,
        height: 0.03 * windowHeight,
        width: 0.03 * windowWidth
    },
    profilebtn: {
        position: "absolute",
        top: 0.11 * windowHeight,
        left: 0.20 * windowWidth,
        height: 0.03 * windowHeight,
        width: 0.03 * windowWidth
    },
    mygamesbtn: {
        position: "absolute",
        top: 0.11 * windowHeight,
        left: 0.35 * windowWidth,
        height: 0.03 * windowHeight,
        width: 0.05 * windowWidth
    },
    gamehubbtn: {
        position: "absolute",
        top: 0.107 * windowHeight,
        left: 0.50 * windowWidth,
        height: 0.03 * windowHeight,
    },
    searchBar: {
        position: "absolute",
        resizeMode: 'contain',
        top: 0.10 * windowHeight,
        left: 0.7 * windowWidth,
        height: 0.05 * windowHeight,
        width: 0.25 * windowWidth,
    },

    verLine: {
        position: 'absolute',
        resizeMode: 'contain',
        height: 0.83 * windowHeight,
        width: 0.1 * windowWidth,
        left: 0.13 * windowWidth,
        top: 0.16 * windowHeight,
    },

    horiLine: {
        position: 'absolute',
        resizeMode: 'contain',
        width: 1 * windowWidth,
        height: 0.01 * windowHeight,
        top: 0.42 * windowHeight,
        left: '0px'
    },

    horiLine2: {
        position: 'absolute',
        resizeMode: 'contain',
        width: 1 * windowWidth,
        height: 0.01 * windowHeight,
        top: 0.71 * windowHeight,
        left: '0px'
    },

    pcLogo: {
        position: 'absolute',
        resizeMode: 'contain',
        width: 0.15 * windowWidth,
        height: 0.2 * windowHeight,
        left: 0.01 * windowWidth,
        top: 0.18 * windowHeight,
    },

    mobileLogo: {
        position: 'absolute',
        resizeMode: 'contain',
        width: 0.18 * windowWidth,
        height: 0.23 * windowHeight,
        left: 0.001 * windowWidth,
        top: 0.46 * windowHeight,
    },

    consoleLogo: {
        position: 'absolute',
        resizeMode: 'contain',
        width: 0.147 * windowWidth,
        height: 0.184 * windowHeight,
        left: 0.015 * windowWidth,
        top: 0.78 * windowHeight,
    },

    scrollContainer1: {
        position: 'absolute',
        width: 0.8 * windowWidth,
        height: 0.28 * windowHeight,
        left: 0.19 * windowWidth,
        top: 0.17 * windowHeight,
        flexGrow: 0.1,
        
    },

    scrollContainer2: {
        // paddingLeft: 15,
        // paddingRight: 15,
        position: 'absolute',
        width: 0.78 * windowWidth,
        height: 0.25 * windowHeight,
        left: 0.19 * windowWidth,
        top: 0.44 * windowHeight,
        flexGrow: 0.1,
        // backgroundColor: "rgba(255, 255, 255, 0.7)",
    },

    scrollContainer3: {
        position: 'absolute',
        width: 0.8 * windowWidth,
        height: 0.28 * windowHeight,
        left: 0.19 * windowWidth,
        top: 0.73 * windowHeight,
        flexGrow: 0.1
    },

    apexLogo: {
        width: 0.13 * windowWidth,
        height: 0.24 * windowHeight,
    },


    cocLogo: {
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.13 * windowWidth,
        height: 0.27 * windowHeight,
    },

    gow: {
        position: 'absolute',
        resizeMode: 'contain',
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.13 * windowWidth,
        height: 0.24 * windowHeight,
        left: 0.001 * windowWidth,
        top: 0.12 * windowHeight,
    },


});