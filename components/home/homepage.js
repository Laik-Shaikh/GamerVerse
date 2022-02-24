import React from 'react';
import { View, StyleSheet, Image, Dimensions,ImageBackground,TouchableOpacity,Text,TextInput, ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import fire from '../firebase';
import 'firebase/database'
import { getDatabase, onValue,ref,query, orderByChild, equalTo } from "firebase/database";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export default function homepage({ navigation, route }) {

    const [textInputValue, setTextInputValue] = React.useState('');

    const [users, setUsers] = React.useState(null);
    const db = getDatabase();
    const GameRef = query(ref(db, 'users'))
    React.useEffect(() => {
        onValue(GameRef, (snapshot) => {
            const data = Object.values(snapshot.val());
            setUsers(data)
        })
    }, [])
    if (!users) {
        return (<Text>Rukavat ke liye khed hai</Text>)
    }
    
  var handleSearch = (e) => {
      if (e.nativeEvent.key == 'Enter') {
        navigation.navigate("SearchName", {textInputValue})
        console.log('search started')
    }
  }

    return (
            <View style={styles.container} >
                <LinearGradient
                    start={{ x: 0, y: 1}} end={{ x: 0, y: -1 }}
                    colors={['#013C00', '#000000']}
                    style={styles.background} >
                    <ImageBackground source={require('./homeAssets/designspikes1.png')} style={styles.spike1} />
                    <Image source={require('./homeAssets/gamerversetitle.png')} style={styles.title} onPress={() => navigation.navigate("Home")}/>
                    <ImageBackground source={require('./homeAssets/menubar.png')} style={styles.menu} />
                    <TouchableOpacity style={styles.homebtn}  onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.highlighttxt}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profilebtn}  onPress={() => navigation.navigate("Profile")}>
                    <Text style={styles.robototxt}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mygamesbtn}  onPress={() => navigation.navigate("MyGames")}>
                    <Text style={styles.robototxt}>My Games</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.gamehubbtn}  onPress={() => navigation.navigate("GameHub")}>
                    <Text style={styles.robototxt}>Game Hub</Text>
                    </TouchableOpacity>
                    <Image source={require('./homeAssets/searchIcon.png')} style={styles.searchIcon} />
                    <TextInput 
                    style={styles.InputStyle1} 
                    placeholder='Search for friends, games or location'
                    onChangeText={(text) => setTextInputValue(text)}
                    value={textInputValue}
                    onKeyPress={e => handleSearch(e)}
                    ></TextInput>
                    <View style={styles.notif}>
                        <Image style={{position:'absolute', 
                        resizeMode: 'contain',
                        top:0.005*windowHeight,
                        left:0.015*windowWidth,
                        width:0.03*windowWidth,
                        height:0.03*windowHeight
                    }} source={require('./homeAssets/Bell.png')}/>
                    <Text style ={{  position: 'absolute',
                    left: 0.045*windowWidth,
                    top:0.01*windowHeight,
                    color: 'white',
                    fontWeight: 'bold'}}>Notifications</Text>
                    <ScrollView style={styles.notifscroll}>
                        <View style={styles.notifbox}>
                            <Text style={{position: 'relative'}}>Friend Request by:</Text>
                            <View style={{position:'relative',flex:1, flexDirection:'row'}}>
                            <Image source={require('./homeAssets/dp.png')} style={{
                        resizeMode:'contain',
                        width:'50%', 
                        height:'50%'}} />
                            <Text>Aartem Singh</Text>
                            </View>
                            <View style={styles.notifdecisionbox}>
                        <TouchableOpacity><Text>Accept</Text></TouchableOpacity>
                        <TouchableOpacity><Text>Decline</Text></TouchableOpacity>
                        </View>
                        </View>
                    </ScrollView>
                    </View>
                    <Image source={require('./homeAssets/post2.png')} style={styles.posts} />
                    <Text style={styles.nametxt}>Danny Devadiga</Text>
                    <Text style={styles.posttxt}>Maddy Sheikh</Text>
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
        position:"relative",
        width: windowWidth,
        height: windowHeight,

    },

    background: {
        position:"relative",
        width: windowWidth,
        height: windowHeight,
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

    title:{
        position:"absolute",
        left:0.35*windowWidth,
        resizeMode:'contain',
        height: 0.1*windowHeight,
        width: 0.35*windowWidth,
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

    nametxt:{ 
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 18,
        "color": "#FFFFFF",
        position:'absolute',
        top:0.21*windowHeight,
        left:0.05*windowWidth
    },

    posttxt:{ 
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 18,
        "color": "#FFFFFF",
        position:'absolute',
        top:0.21*windowHeight,
        left:0.3*windowWidth
    },

    homebtn:{
        position:"absolute",
        top:0.107*windowHeight,
        left:0.05*windowWidth,
        height: 0.03*windowHeight,
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
        top:0.11*windowHeight,
        left:0.50*windowWidth,
        height: 0.03*windowHeight,
        width: 0.05*windowWidth
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

    searchIcon:{
        position:"absolute",
        resizeMode:'contain',
        top:0.11*windowHeight,
        left:0.7*windowWidth,
        height: 0.03*windowHeight,
        width: 0.03*windowWidth,
    },

    notif:{
        position:"absolute",
        top:0.2*windowHeight,
        left:0.8*windowWidth,
        height:(695/900) * windowHeight,
        width: (227/1600)*windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 10,
    },
    
    notifbox:{
        position:"absolute",
        flex:1, 
        flexDirection:"column",
        top:0.05*windowHeight,
        left:0.005*windowWidth,
        height:0.08 * windowHeight,
        width: 0.13*windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 10,
    },
    notifdecisionbox:{
        position:"absolute",
        flex:1, 
        flexDirection:"row",
        justifyContent:'space-between',
        top:0.05*windowHeight,
        left:0.005/4*windowWidth,
        height:0.02 * windowHeight,
        width: 0.12*windowWidth,
        borderRadius: 10,
    },
    
    
    notifscroll:{
        position:"absolute",
        height:(595/900) * windowHeight,
        width: (227/1600)*windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 10,
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