import React from 'react';
import {View, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity, Text, ScrollView,ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import fire from '../firebase';
import 'firebase/database'
import { getDatabase, onValue, ref, query, orderByChild, equalTo } from "firebase/database";
import 'firebase/auth';
import { getAuth } from "firebase/auth";


const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export default function MyGamesPage ({ navigation, route }){
    const auth = getAuth();
    // const ImageCode = "P0"
    const [games, setGames] = React.useState(null);
    // const [userGameInfo, setuserGameInfo] = React.useState();
    const [displayGame, setDisplayGame] = React.useState([])
    const db = getDatabase();
    const GameRef = query(ref(db,'games'))
    // const gameImage = query(ref(db, 'games'),equalTo('P0'))
    const UserRef = query(ref(db,'users/' + auth.currentUser.uid + '/Games'))
    console.log(UserRef);
    console.log(GameRef);
    // console.log(ImageCode);
    
    React.useEffect(() => {
        onValue(GameRef, (snapshot) => {
            const data = Object.values(snapshot.val());
            setGames(data)
            console.log(data)
        })

        onValue(UserRef, (snapshot) => {
            const data1 = Object.values(snapshot.val());
            setDisplayGame(data1)
            console.log(data1)
            }
        )
        
        // onValue(gameImage, (snapshot) => {
        //     const data2 = Object.values(snapshot.val)
        //     setDisplayGame(data2)
        //     console.log(data2)
        // }
        // )

    },[])

    console.log(games)
    console.log(displayGame);
    // console.log(displayGame[1].charAt(0))

    if (!games) {
        return (
            <View style={styles.container}>
                <LinearGradient
                    start={{ x: 0, y: 1 }} end={{ x: 0, y: -1 }}
                    colors={['#013C00', '#000000']}
                    style={[styles.background,{width: '100%', height: '100%'}]} >
                    <ActivityIndicator size="large" color="#00ff00" style={{ top: "40%" }} />
                    {/* <View style={styles.loading}>
                    </View> */}
                </LinearGradient>
            </View>
            )
    }
    return(
        <View style={styles.container}>
            <LinearGradient
                start = {{x:0, y:0}}
                end = {{x:0, y:-1}}
                colors={['#013C00', '#000000']}
                style = {styles.background}
            />
            
            <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fds1.png?alt=media&token=9753aac0-931b-4c66-9f2a-00d65dc99bd6"} 
                style={styles.spikes1} />
            <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fds2.png?alt=media&token=1f1f37dd-b12d-43eb-be6e-0e739dc18b41"} 
                style={styles.spikes2} />
            <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Flogo.png?alt=media&token=7468c404-5678-43b2-92eb-310ffa58433c"} 
                style = {styles.GamerVerseTitle} />   
            <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FMenuBar.png?alt=media&token=d9c15cc1-98a6-41b8-a5f9-533a2f5d1f7b"}
                style = {styles.menuBar} />

            {/* NavBar Buttons     */}
            <TouchableOpacity style={styles.homebtn}  onPress={() => navigation.push("Home")}>
                <Text style={styles.robototxt}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profilebtn}  onPress={() => navigation.push("Profile")}>
                <Text style={styles.robototxt}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mygamesbtn}  onPress={() => navigation.push("MyGames")}>
                <Text style={styles.highlighttxt}>My Games</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gamehubbtn}  onPress={() => navigation.push("GameHub")}>
                <Text style={styles.robototxt}>Game Hub</Text>
            </TouchableOpacity>

            <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FSearchBar.png?alt=media&token=ffa91873-57dc-4a89-abde-d6e64e8118ee"}
                style = {styles.searchBar} />
            <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FHoriDivider.png?alt=media&token=3fb49ba5-7989-4ae2-8065-eb6718e159f9"}
                style = {styles.horiLine} />
            <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FVerLine.png?alt=media&token=ae718803-7ee5-4337-af84-5cc9ee2e1b11"} 
                style = {styles.verLine} />
            <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FVerLine2.png?alt=media&token=d5ca5ad8-e522-470a-ac90-592d22abdca4"} 
                style = {styles.verLine2} />

            <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FPCLogo.png?alt=media&token=f6e35b8c-142f-41b2-b1c7-a1befb3ec808"}
                style = {styles.pcLogo} />
            <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FMobileLogo.png?alt=media&token=cc0648c0-fe80-4118-ba31-a32f8370b591"} 
                style = {styles.mobileLogo} />
            <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FConsoleLogo.png?alt=media&token=333f6250-4d2d-46b2-84d0-1201c451dca0"} 
                style = {styles.consoleLogo} />


            <ScrollView contentContainerStyle= {{justifyContent:'space-around'}} style = {styles.scrollContainer1} showsVerticalScrollIndicator={false}>
            {games.map((item, index) =>{
                     if(displayGame.includes(item.Code)){   
                        console.log(item.Code)
                        var computer = item.Code

                        if(computer.charAt(0) === "P"){
                            return (
                                <View key={index} >   
                                    {/* {console.log(computer)} */}
                                    <TouchableOpacity style={styles.imgContainer} onPress={() => navigation.push("Game", { GameCode: item.Code })}>
                                    <Image source={item.Image}
                                        style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
                                    </TouchableOpacity>
                                    <Text style={styles.nametxt}>{item.Name}</Text>
                                </View>
                            )
                        }
                            
                    }}
                    )}    
                
            </ScrollView>

            <ScrollView contentContainerStyle= {{justifyContent:'space-around'}} style = {styles.scrollContainer2} showsVerticalScrollIndicator={false}>
            {games.map((item, index) =>{
                     if(displayGame.includes(item.Code)){   
                        console.log(item.Code)
                        var mobile= item.Code

                        if(mobile.charAt(0) === "M"){
                            return (
                                <View key={index} >   
                                    {/* {console.log(computer)} */}
                                    <TouchableOpacity style={styles.imgContainer} onPress={() => navigation.push("Game", { GameCode: item.Code })}>
                                    <Image source={item.Image}
                                        style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
                                    </TouchableOpacity>
                                    <Text style={styles.nametxt}>{item.Name}</Text>
                                </View>
                            )
                        }
                            
                    }}
                    )}    
                
            </ScrollView>

            <ScrollView contentContainerStyle= {{justifyContent:'space-around'}} style = {[styles.scrollContainer3]} showsVerticalScrollIndicator={false}>
            {games.map((item, index) =>{
                     if(displayGame.includes(item.Code)){   
                        console.log(item.Code)
                        var consoleGame= item.Code

                        if(consoleGame.charAt(0) === "C"){
                            return (
                                <View key={index} >   
                                    {/* {console.log(computer)} */}
                                    <TouchableOpacity style={[styles.imgContainer]} onPress={() => navigation.push("Game", { GameCode: item.Code})}>
                                    <Image source={item.Image} style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
                                    </TouchableOpacity>
                                    <Text style={styles.nametxt}>{item.Name}</Text>
                                </View>
                            )
                        }
                            
                    }}
                    )}    
                
            </ScrollView>

        </View>
    )
}


const styles = StyleSheet.create({
    container : {
        position: 'relative',
        width: "100%",
        height: "100%",
        overflow: 'hidden',
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
        bottom: "0px", 
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

    nametxt: {
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 18,
        "color": "#FFFFFF",
        position:'absolute',
        top:0.02*windowHeight,
        left:0.15*windowWidth,
        width:0.15*windowWidth
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
        height : 0.8 * windowHeight,
        left : 0.28*windowWidth,
        top : 0.17*windowHeight
    },

    verLine2:{
       position: 'absolute',
       resizeMode: 'contain',
       width : 0.1 * windowWidth,
       height : 0.8 * windowHeight,
       right: 0.265*windowWidth,
       top: 0.17*windowHeight
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
        left : 0.016*windowWidth,
        flexGrow: 0.1
    },

    scrollContainer2:{
        position:'absolute',
        width: 0.58*windowWidth,
        height : 0.6*windowHeight,
        top : 0.37*windowHeight,
        left: 0.347*windowWidth,
        flexGrow: 0.1
    },

    scrollContainer3:{
        position:'absolute',
        width: 0.58*windowWidth,
        height : 0.6*windowHeight,
        top : 0.37*windowHeight,
        left: 0.69*windowWidth,
        flexGrow: 0.1
    },

    imgContainer:{
        paddingLeft: 10,
        paddingRight: 10,
        width: 0.13 * windowWidth,
        height: 0.24 * windowHeight,
    },

    // apexContainer:{
    //     width: 0.4*windowWidth,
    //     height: 0.25*windowHeight,
    //     left: 0.15*windowWidth,
    //     top: 0.02*windowHeight
    // },

   tagText:{
    "fontStyle": "normal",
    "fontWeight": "500",
    "fontSize": 26,
    "color": "#FFFFFF"
   },

});