import React from 'react';
import { View, StyleSheet, Image, Dimensions,ImageBackground,Text,TouchableOpacity,TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import fire from '../firebase';
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import 'firebase/database'
import { getDatabase, onValue,ref,query, orderByChild, equalTo, push ,update ,set} from "firebase/database";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


export default function gamepage({ navigation, route }) {
    const auth = getAuth();
    const {GameCode} = route.params
    console.log(GameCode)
    const [gameInfo,setGameInfo] = React.useState()
    const [userInfo,setUserInfo] = React.useState()
    var gameTags=[];
    var tagArray=[];
    var games = [ "YY" ];
    // var gameArray=[];
    const db = getDatabase();
    const GameRef = query(ref(db,'games'),orderByChild('Code'),equalTo(GameCode))
    const UserRef = query(ref(db,'users/'+ auth.currentUser.uid))
    const GetUserRef = query(ref(db,'users'),orderByChild('uid'),equalTo( auth.currentUser.uid))
    console.log(GameRef)
    React.useEffect(() => {
    onValue(GameRef,(snapshot)=>{
        const data = Object.values(snapshot.val());
        setGameInfo(data[0])
    })
    onValue(GetUserRef,(snapshot)=>{
        const data1 = Object.values(snapshot.val());
        setUserInfo(data1[0])
    })
},[])
console.log(gameInfo)
console.log(userInfo)
// code for displaying tags
if(gameInfo){
gameTags = gameInfo.Tags;
console.log(gameTags);
tagArray = Object.entries(gameTags);
console.log(tagArray)
}
if(userInfo){
    games = userInfo.Games;
    console.log(games);
    // gameArray = Object.entries(games);
    // console.log(tagArray)
    }
    function gameFollowCheck(GameCode){
        for(var i = 0; i < games.length; i++)
        {
            if (GameCode==games[i]) return false;
        }
        return true
    }
if(!gameInfo)
{
    return (
        <View style={styles.container} >
            <LinearGradient
                start={{ x: 0, y: 1}} end={{ x: 0, y: -1 }}
                colors={['#013C00', '#000000']}
                style={styles.background} >
                <ImageBackground source={require('./gameAssets/designspikes1.png')} style={styles.spike1} />
                <Image source={require('./gameAssets/gamerversetitle.png')} style={styles.title} />
                <ImageBackground source={require('./gameAssets/menubar.png')} style={styles.menu} />
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
                <Image source={require('./gameAssets/searchIcon.png')} style={styles.searchIcon} />
                <TextInput style={styles.InputStyle1} placeholder='Search for friends, games or tags'></TextInput>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingTxt}>Rating</Text>
                </View>
                <View style={styles.desclabContainer}>
                    <Text style={styles.ratingTxt}>Description</Text>
                </View>
                <ImageBackground source={require('./gameAssets/designspikes.png')} style={styles.spike2} />
                <View style={styles.taglabContainer}>
                    <Text style={styles.ratingTxt}>Tag</Text>
                </View>
                <View style={styles.gameContainer}>
                    <Text style={styles.gameTitleTxt}>Game's Name</Text>
                <TouchableOpacity style={styles.Button} title='Follow'>
                    <Text style={styles.ButtonText}>Follow</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.descriptionTxt}>Wingardium Laviosa Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at condimentum velit. Etiam pretium justo ac tellus blandit, eget maximus metus maximus. Phasellus dictum dignissim nulla, sit amet porttitor lacus consequat sed. Sed a risus imperdiet, iaculis metus ac, condimentum ex. Cras vestibulum vestibulum orci, sit amet rhoncus risus placerat quis. Donec nulla velit, fringilla eget tellus sit amet, malesuada vulputate sapien. Nullam eget sem finibus neque interdum commodo vel non sapien. Ut a nulla in augue bibendum aliquam.</Text>
                </View>
                <View style={styles.tagContainer}>
                    <Text style={styles.descriptionTxt}>#yashisapro #laikisshakin #mawrahisbawrah #metraa</Text>
                </View>
                </LinearGradient>
        </View>
);
    }
    if (gameInfo){
    return (
        <View style={styles.container} >
            <LinearGradient
                start={{ x: 0, y: 1}} end={{ x: 0, y: -1 }}
                colors={['#013C00', '#000000']}
                style={styles.background} >
                <ImageBackground source={require('./gameAssets/designspikes1.png')} style={styles.spike1} />
                <Image source={require('./gameAssets/gamerversetitle.png')} style={styles.title} />
                <ImageBackground source={require('./gameAssets/menubar.png')} style={styles.menu} />
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
                <Image source={require('./gameAssets/searchIcon.png')} style={styles.searchIcon} />
                <TextInput style={styles.InputStyle1} placeholder='Search for friends, games or tags'></TextInput>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingTxt}>Rating{gameInfo.Rating}</Text>
                </View>
                <View style={styles.desclabContainer}>
                    <Text style={styles.ratingTxt}>Description</Text>
                </View>
                <ImageBackground source={require('./gameAssets/designspikes.png')} style={styles.spike2} />
                <View style={styles.taglabContainer}>
                    <Text style={styles.ratingTxt}>Tag</Text>
                </View>
                <View style={styles.gameContainer}>
                    <Text style={styles.gameTitleTxt}>{gameInfo.Name}</Text>
                    <Image source={gameInfo.Image} style={styles.dpicture}></Image>
                <TouchableOpacity style={styles.Button} title='Follow' 
                onPress={() => 
                {
                    if (gameFollowCheck(GameCode)) games.push(GameCode);
                    console.log(games);
                    update(UserRef, {
                        Games: games,
                      });
                    
                }}>
                    <Text style={styles.ButtonText}>Follow</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.descriptionTxt}>{gameInfo.Description}</Text>
                </View>
                <View style={styles.tagContainer}>
                    {tagArray.map(([key, value]) => {
                        console.log(key);
                        return (
                            <View
                            key={key}
                             style={{
                  flex: 1,
                  flexDirection:"row",
                  width: (414 / 414) * windowWidth,
                  Height: (896 / 896) * windowHeight,
                  top: (0 / 896) * windowHeight,
                  marginVertical: 2,
                  justifyContent: 'space-between',
                }}>
                                <TouchableOpacity
                  style={styles.tagButton}
                //   onPress={() =>}
                ><Text style={{ color: "white" }}>
                {key}
              </Text></TouchableOpacity>
                                </View>
                        )
                    })
                    }
                    {/* <Text>{tagArray}</Text>         */}
                </View>
                </LinearGradient>
        </View>
);
}
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
        left:0.35*windowWidth,
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

    Button:
  {
    position: "absolute",
    width: 136 / 1440 * windowWidth,
    height: 53 / 1024 * windowHeight,
    left: 400 / 1440 * windowWidth,
    top: 330 / 1024 * windowHeight,
    backgroundColor: "#39750A",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    borderBottomLeftRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  ButtonText:
  {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#FFFFFF"
  },

    homebtn:{
        position:"absolute",
        top:0.11*windowHeight,
        left:0.05*windowWidth,
        height: 0.03*windowHeight,
    },
    profilebtn:{
        position:"absolute",
        top:0.11*windowHeight,
        left:0.20*windowWidth,
        height: 0.03*windowHeight,
    },
    mygamesbtn:{
        position:"absolute",
        top:0.11*windowHeight,
        left:0.35*windowWidth,
        height: 0.03*windowHeight,
    },
    gamehubbtn:{
        position:"absolute",
        top:0.107*windowHeight,
        left:0.50*windowWidth,
        height: 0.03*windowHeight,
    },
    searchbar:{
        position:"absolute",
        resizeMode:'contain',
        top:0.10*windowHeight,
        left:0.7*windowWidth,
        height: 0.05*windowHeight,
        width: 0.25*windowWidth,
    },
      followBtn:{
        position:"absolute",
        resizeMode:'contain',
        top:0.7*0.424*windowHeight,
        left:0.9*0.302*windowWidth,
        height: 0.1*windowHeight,
        width: 0.1*windowWidth,
    },
    ratingContainer:{
        position: "absolute",
        width: 0.302*windowWidth,
        height: 0.424*windowHeight,
        top: 0.15*windowHeight,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
      },
      desclabContainer:{
        position: "absolute",
        width: 0.302*windowWidth,
        height: 0.195*windowHeight,
        top: 0.574*windowHeight,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
      },
      taglabContainer:{
        position: "absolute",
        width: 0.302*windowWidth,
        height: 0.225*windowHeight,
        top: 0.769*windowHeight,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
      },

    ratingTxt:{
        position: "absolute",
        top: 70/1024 *windowHeight,
        width: '100%',
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "22px",
        lineHeight: "26px",
        textAlign: "center",
        color: "#FFFFFF"
      },

      descriptionTxt:{
        position: "absolute",
        top: 20/1024 *windowHeight,
        left: 15/1440 *windowWidth,
        width: 900/1440 *windowWidth,
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "20px",
        lineHeight: "23px",
        textAlign: "justify",
        color: "#FFFFFF"
      },

      gameTitleTxt:{
        position: "absolute",
        left: 0.28*windowWidth,
        top: 0.02*windowHeight,
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "22px",
        lineHeight: "26px",
        textAlign: "center",
        color: "#FFFFFF"
      },
      gameContainer:{
        position: "absolute",
        width: 0.698*windowWidth,
        height: 0.424*windowHeight,
        top: 0.15*windowHeight,
        left:0.302*windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.20)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
      },
      descContainer:{
        position: "absolute",
        width: 0.698*windowWidth,
        height: 0.195*windowHeight,
        top: 0.574*windowHeight,
        left:0.302*windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
      },
      tagContainer:{
        position: "absolute",
        width: 0.698*windowWidth,
        height: 0.225*windowHeight,
        top: 0.769*windowHeight,
        left:0.302*windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.20)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
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
    },
    dpicture:{
        position: "absolute",
        top:0.08*windowHeight,
        left:0.27*windowWidth,
        width:0.20*windowHeight,
        height:0.20*windowHeight,
        backgroundColor: "rgba(120, 225, 100, 0.2)"
    },
    tagButton: {
        position: "absolute",
        width: 0.08 * windowWidth,
        height: 0.02 * windowHeight,
        backgroundColor: "rgba(0,0, 0, 0.5)",
        color: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
      },
});