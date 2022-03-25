import React from 'react';
import { View, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, Text, TextInput, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import fire from '../firebase';
import 'firebase/database'
import { getDatabase, onValue, get, ref, query, orderByChild, equalTo, push, startAt, endAt, update, set } from "firebase/database";
import 'firebase/auth';
import { getAuth } from "firebase/auth";


const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

// const createExpoWebpackConfigAsync = require('@expo/webpack-config');
// module.exports = async function(env, argv) {
//   const config = await createExpoWebpackConfigAsync(env, argv);
//   config.resolve.alias['lottie-react-native'] = 'react-native-web-lottie';
//   return config;
// };

export default function homepage({ navigation, route }) {
    const auth = getAuth();
    var profileUid = auth.currentUser.uid;
    var friendNames = [];
    var friendImages = [];
    var friendUid = [];
    const [textInputValue, setTextInputValue] = React.useState('');
    const [users, setUsers] = React.useState()
    var [friends, setFriends] = React.useState(null);
    const db = getDatabase();
    const userRef = query(ref(db, 'users'),orderByChild('uid'),equalTo(profileUid))
    const ConfirmedProfilesRef = query(ref(db,'users/' + auth.currentUser.uid + '/ConfirmedProfiles'))
    const ProfileRef = query(ref(db,'users'))
   
    console.log(users)
    console.log(friends)


    
    var [IncomingRequests, setIncomingRequests] = React.useState(null);
    var [friendIncomingRequests, setFriendIncomingRequests] = React.useState(null);
    // const [users, setUsers] = React.useState(null);
    const [location, setLocation] = React.useState(null);
    const [selectedValue, setSelectedValue] = React.useState()
    var requestNames = [];
    var requestImages = [];
    var requestUID = [];
    var acceptedProfiles = [];
    var rejectedProfiles = [];
    const UserRef = query(ref(db, 'users/' + auth.currentUser.uid + '/RequestedProfiles'))
    const ThisProfileRef = query(ref(db, 'users/' + auth.currentUser.uid))
    React.useEffect(() => {
        onValue(UserRef, (snapshot) => {
            console.log(snapshot.val())
            const data = Object.values(snapshot.val());
            setIncomingRequests(data)
            // console.log(data)
        }
        )
        onValue(ProfileRef, (snapshot) => {
            const data1 = Object.values(snapshot.val());
            setUsers(data1)
            // console.log(data1)
        }
        )
        onValue(ConfirmedProfilesRef, (snapshot) => {
            const data2 = Object.values(snapshot.val());
            setFriends(data2)
            // console.log(data1)
        }
        )
    }, [])

    const getLocations = async (loc) => {
        if(loc){
        const UserRef = query(ref(db, 'locations'), orderByChild('LocationLower'), startAt(loc), endAt(loc + "\uf8ff"))
        onValue(UserRef, (snapshot) => {
            if (snapshot.val()) {
                setLocation(Object.values(snapshot.val()))
            }
        })}
    }

    function renderSug() {
        if (!selectedValue) {
            console.log(location)
            return (<FlatList

                data={location}
                style={styles.LocSuggestions}
                keyExtractor={(item) => item.magicKey}
                renderItem={(suggestion) => {
                    return(
                        <TouchableOpacity style={styles.item} onPress={() =>{
                            setSelectedValue(suggestion.item.Location)
                            navigation.navigate("SearchName", { textInputValue:suggestion.item.Location} )
                        }
                        
                        }>
                          <Text style={styles.itemText}>{suggestion.item.Location}</Text>
                        </TouchableOpacity>)
                }}


            ></FlatList>)
        }
    }

    function requestAccepted(requestUID) {
        var y = requestUID;
        if (!friends.includes(y)) {
            friends.push(y);
            requestDenied(y);
            update(ThisProfileRef, {
                RequestedProfiles: IncomingRequests,
            });
            var FriendProfileRef = query(ref(db, 'users/' + y + '/ConfirmedProfiles'))
            var FriendProfileUpdateRef = query(ref(db, 'users/' + y))
            get(FriendProfileRef).then((snapshot) => {
                const data3 = Object.values(snapshot.val());
                data3.push(auth.currentUser.uid)
                update(FriendProfileUpdateRef, {
                    ConfirmedProfiles: data3,
                });
            }
            )
            // update(FriendProfileRef, {
            //     RequestedProfiles: auth.currentUser.uid,
            //   });  
        }
    }

    function requestDenied(requestUID) {
        var toRemove = requestUID;
        var index = IncomingRequests.indexOf(toRemove);
        if (index > -1) {
            IncomingRequests.splice(index, 1);
        }
    }

    var handleSearch = (e) => {
        if (e.nativeEvent.key == 'Enter') {
            navigation.navigate("SearchName", { textInputValue })
        }
    }
    if (users && IncomingRequests) {
        for (var i = 1; i < users.length; i++) {
            var x = users[i].uid;
            if (IncomingRequests.includes(x)) {
                requestNames.push(users[i].Name);
                requestImages.push(users[i].DisplayPicture);
                requestUID.push(users[i].uid);

            }
        }
    }

    if (!users) {
        return (
            <LinearGradient
                    start={{ x: 0, y: 1}} end={{ x: 0, y: -1 }}
                    colors={['#013C00', '#000000']}
                    style={styles.background} >
                <ActivityIndicator size="large" color="#00ff00" style={{top: "40%"}} />
                {/* <View style={styles.loading}>
                </View> */}
            </LinearGradient>
            )
    }

    if(users){
        if(friends)
        {
            for(var i= 0; i<users.length;i++)
            {
                var x = users[i].uid;
                console.log(x);
                if (friends.includes(x))
                {
                friendNames.push(users[i].Name);
                friendImages.push(users[i].DisplayPicture);
                friendUid.push(users[i].uid);
                }
        }
        console.log(friendImages)
        console.log(friendNames)
    }
        }

        
  var handleSearch = (e) => {
      if (e.nativeEvent.key == 'Enter') {
        navigation.navigate("SearchName", {textInputValue})
        console.log('search started')
    }
  }

    if (users)
        return (
            <View style={styles.container} >
                <LinearGradient
                    start={{ x: 0, y: 1 }} end={{ x: 0, y: -1 }}
                    colors={['#013C00', '#000000']}
                    style={styles.background} >
                    <ImageBackground source={require('./homeAssets/designspikes1.png')} style={styles.spike1} />
                    <Image source={require('./homeAssets/gamerversetitle.png')} style={styles.title} onPress={() => navigation.navigate("Home")} />
                    <ImageBackground source={require('./homeAssets/menubar.png')} style={styles.menu} />
                    <TouchableOpacity style={styles.homebtn} onPress={() => navigation.navigate("Home")}>
                        <Text style={styles.highlighttxt}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profilebtn} onPress={() => navigation.navigate("Profile")}>
                        <Text style={styles.robototxt}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mygamesbtn} onPress={() => navigation.navigate("MyGames")}>
                        <Text style={styles.robototxt}>My Games</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.gamehubbtn} onPress={() => navigation.navigate("GameHub")}>
                        <Text style={styles.robototxt}>Game Hub</Text>
                    </TouchableOpacity>
                    <Image source={require('./homeAssets/searchIcon.png')} style={styles.searchIcon} />
                    <TextInput
                        style={styles.InputStyle1}
                        placeholder='Search for friends, games or location'
                        onChangeText={(text) => {
                            setLocation()
                            getLocations(text.toLowerCase())
                            setTextInputValue(text)
                        }}
                        value={textInputValue}
                        onKeyPress={e => handleSearch(e)}
                        onFocus={() => {
                            if (selectedValue)
                                setSelectedValue(undefined)
                        }}
                    ></TextInput>
                    {renderSug()}
                    <View style={styles.notif}>
                        <Image style={{
                            position: 'absolute',
                            resizeMode: 'contain',
                            top: 0.005 * windowHeight,
                            left: 0.015 * windowWidth,
                            width: 0.03 * windowWidth,
                            height: 0.03 * windowHeight
                        }} source={require('./homeAssets/Bell.png')} />
                        <Text style={{
                            position: 'absolute',
                            left: 0.045 * windowWidth,
                            top: 0.01 * windowHeight,
                            color: 'white',
                            fontWeight: 'bold'
                        }}>Notifications</Text>
                        <ScrollView contentContainerStyle={{ justifyContent: 'space-around' }}
                            style={styles.notifscroll}>
                            {requestNames.map((profile, index) => {
                                {
                                    console.log("WORKS")
                                    console.log(profile)
                                    console.log(requestImages[index])
                                }
                                return (
                                    <View key={index} style={styles.notifbox}>
                                        <Text style={{ position: 'relative' }}>Friend Request by:</Text>
                                        <View style={{ position: 'relative', flex: 1, flexDirection: 'row' }}>
                                            <Image source={requestImages[index]} style={{
                                                resizeMode: 'contain',
                                                width: '100%',
                                                height: '100%'
                                            }} />
                                            <Text>{profile}</Text>
                                        </View>
                                        <View style={styles.notifdecisionbox}>
                                            <TouchableOpacity onPress={() => {
                                                if (requestAccepted(requestUID[index]));
                                                update(ThisProfileRef, {
                                                    ConfirmedProfiles: friends,
                                                });
                                            }} ><Text>Accept</Text></TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (IncomingRequests.includes(requestUID[index])) requestDenied(requestUID[index]);
                                                    update(ThisProfileRef, {
                                                        RequestedProfiles: IncomingRequests,
                                                    });
                                                }}><Text>Decline</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                            }
                        </ScrollView>
                    </View>
                    <Image source={require('./homeAssets/post2.png')} style={styles.posts} />
                    
                    <Text style={styles.posttxt}>Maddy Sheikh</Text>
                    <Image source={require('./homeAssets/dp.png')} style={styles.dppostview} />
                    <ImageBackground source={require('./homeAssets/divider.png')} style={styles.divider} />
                    <ImageBackground source={require('./homeAssets/designspikes.png')} style={styles.spike2} />
                    <ScrollView contentContainerStyle= {{justifyContent:'space-around'}} 
                    style={styles.friendscroll} 
                    showsVerticalScrollIndicator={false}>
                    {friendNames.map((profile,index)=>
                        {
                           { console.log("WORKS")} 
                        return(
                        <View  key={index} style={styles.friendbox}>
                            <TouchableOpacity onPress={() => navigation.navigate("SearchProfile", friendUid[index])}>
                                <Image source={friendImages[index]} style={styles.dpview}/>
                                <Text style={styles.nametxt}>{profile}</Text>
                            </TouchableOpacity> 
                        </View>
                        )
                    })
                    }
                    </ScrollView>
                    </LinearGradient>
            </View>
        );

}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: windowWidth,
        height: windowHeight,

    },

    background: {
        position: "relative",
        width: windowWidth,
        height: windowHeight,
    },

    loading:{
        minHeight: 100/1024*windowHeight,
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
    },

    InputStyle1:{
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

    LocSuggestions:{
        position:'absolute',
        top: 160 / 1024 * windowHeight,
        right: 85 / 1440 * windowWidth,
        flexGrow: 0,
        width: 305 / 1440 * windowWidth,
        backgroundColor: 'rgba(255, 255, 255,1)',
        zIndex:1,
      },
      itemText: {
        fontSize: 15,
        paddingLeft: 10
      },
      item: {
        width: 305 / 1440 * windowWidth,
        paddingTop:10
      },

    title: {
        position: "absolute",
        left: 0.35 * windowWidth,
        resizeMode: 'contain',
        height: 0.1 * windowHeight,
        width: 0.35 * windowWidth,
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

    nametxt: {
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 18,
        "color": "#FFFFFF",
        position:'absolute',
        top:0.01*windowHeight,
        left:0.02*windowWidth
    },

    posttxt: {
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 18,
        "color": "#FFFFFF",
        position: 'absolute',
        top: 0.21 * windowHeight,
        left: 0.3 * windowWidth
    },

    friendscroll:{
        flexGrow: 0.1,
        width: 275 / 1440 * windowWidth,
        left: 5 / 1440 * windowWidth,
        height: 592 / 1024 * windowHeight,
        top: 195 / 1024 * windowHeight,
        borderRadius: 10,
        // backgroundColor: "rgba(255, 255, 255, 0.7)",
    },

    friendbox:{
        flex:1, 
        flexDirection:"column",
        marginVertical:30,
        alignItems: "center",
        left:0.05*windowWidth,
        height:0.08 * windowHeight,
        width: 0.015*windowWidth,
        backgroundColor: "rgba(255, 255, 255, 1)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
    },

    homebtn:{
        position:"absolute",
        top:0.107*windowHeight,
        left:0.05*windowWidth,
        height: 0.03*windowHeight,
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
        top: 0.11 * windowHeight,
        left: 0.50 * windowWidth,
        height: 0.03 * windowHeight,
        width: 0.05 * windowWidth
    },

    menu: {
        position: "absolute",
        resizeMode: 'contain',
        top: 0.10 * windowHeight,
        height: 0.05 * windowHeight,
        width: 1 * windowWidth,
    },

    posts: {
        position: "absolute",
        top: 0.3 * windowHeight,
        left: 0.25 * windowWidth,
        resizeMode: 'contain',
        height: 0.60 * windowHeight,
        width: 0.50 * windowWidth,
    },

    dpview:{
        position: "absolute",
        top: 0 * windowHeight,
        left:-0.02*windowWidth,
        width: 0.05 * windowHeight,
        height: 0.05 * windowHeight,
        borderRadius: 0.065 * windowHeight,
    },

    dppostview: {
        position: "absolute",
        top: 0.2 * windowHeight,
        left: 0.25 * windowWidth,
        resizeMode: 'contain',
        height: 0.06 * windowHeight,
        width: 0.05 * windowWidth,
    },

    divider: {
        position: "absolute",
        top: 0.2 * windowHeight,
        left: 0.2 * windowWidth,
        resizeMode: 'contain',
        height: 0.6 * windowHeight,
        width: "3px",
    },

    searchIcon: {
        position: "absolute",
        resizeMode: 'contain',
        top: 0.11 * windowHeight,
        left: 0.7 * windowWidth,
        height: 0.03 * windowHeight,
        width: 0.03 * windowWidth,
    },

    notif: {
        position: "absolute",
        flex: 1,
        top: 0.2 * windowHeight,
        left: 0.8 * windowWidth,
        height: (695 / 900) * windowHeight,
        width: (227 / 1600) * windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 10,
    },

    notifbox: {
        flex: 1,
        flexDirection: "column",
        marginVertical: 60,
        alignItems: "center",
        // top:0.005*windowHeight,
        // left:0.005*windowWidth,
        height: 0.08 * windowHeight,
        width: 0.13 * windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 10,
    },
    notifdecisionbox: {
        position: "absolute",
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        top: 0.05 * windowHeight,
        left: 0.005 / 4 * windowWidth,
        height: 0.02 * windowHeight,
        width: 0.12 * windowWidth,
        borderRadius: 10,
    },


    notifscroll: {
        flexGrow: 0.1,
        height: '100%',
        width: '100%',
        borderRadius: 10,
    },

    spike1: {
        position: "absolute",
        resizeMode: 'contain',
        right: "0px",
        height: 0.2 * windowHeight,
        width: 0.15 * windowWidth,
    },

    spike2: {
        position: "absolute",
        bottom: "0px",
        resizeMode: 'contain',
        height: 0.2 * windowHeight,
        width: 0.15 * windowWidth,
    }
});