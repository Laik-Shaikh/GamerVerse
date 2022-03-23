import React from 'react';
import { View, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, Text, TextInput, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import fire from '../firebase';
import 'firebase/database'
import { getDatabase, onValue, get, ref, query, orderByChild, equalTo, push, startAt, endAt, update, set } from "firebase/database";
import 'firebase/auth';
import { getAuth } from "firebase/auth";


const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export default function homepage({ navigation, route }) {
    const auth = getAuth();
    const [textInputValue, setTextInputValue] = React.useState('');
    var [IncomingRequests, setIncomingRequests] = React.useState(null);
    var [friendIncomingRequests, setFriendIncomingRequests] = React.useState(null);
    var [friends, setFriends] = React.useState(null);
    const [users, setUsers] = React.useState(null);
    const [location, setLocation] = React.useState(null);
    const [selectedValue, setSelectedValue] = React.useState()
    var requestNames = [];
    var requestImages = [];
    var requestUID = [];
    var friendNames = [];
    var friendImages = [];
    var friendUid = [];
    var acceptedProfiles =[];
    var rejectedProfiles =[];
    const db = getDatabase();
    const UserRef = query(ref(db, 'users/' + auth.currentUser.uid + '/RequestedProfiles'))
    const ConfirmedProfilesRef = query(ref(db, 'users/' + auth.currentUser.uid + '/ConfirmedProfiles'))
    const ThisProfileRef = query(ref(db, 'users/' + auth.currentUser.uid))
    const ProfileRef = query(ref(db, 'users'))
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
        return (<Text>Rukavat ke liye khed hai</Text>)
    }

    if(users)
    {
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
                    <TouchableOpacity style={styles.profilebtn}  onPress={() => navigation.navigate("Profile",false)}>
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
                        <Image style={{position:'absolute', 
                        resizeMode: 'contain',
                        top:0.01*windowHeight,
                        left:0.015*windowWidth,
                        width:0.03*windowWidth,
                        height:0.03*windowHeight,
                        transform: [{ rotate: '20deg' }]
                    }} source={require('./homeAssets/Bell.png')}/>
                    <Text style ={{  position: 'absolute',
                    left: 0.045*windowWidth,
                    top:0.015 *windowHeight,
                    color: 'white',
                    fontWeight: 'bold'}}>Notifications</Text>
                    <ScrollView contentContainerStyle= {{justifyContent:'space-around'}} 
                    style={styles.notifscroll}>
                    {requestNames.map((profile,index)=>
                        {
                           { console.log("WORKS")
                        console.log(profile)
                        console.log(requestImages[index])} 
                        return(
                        <View  key={index} style={styles.notifbox}>
                            {/* <Text style={{
                                position: 'relative',
                                "color": "#FFFFFF",
                                }}>
                                Friend Request by:</Text> */}
                            <View style={{position:'relative',flex:1, flexDirection:'row'}}>
                            <Image source={requestImages[index]} style={{
                        position: "absolute",
                        top: 0 * windowHeight,
                        left: 0*windowWidth,
                        width: 0.05 * windowHeight,
                        height: 0.05 * windowHeight,
                        borderRadius: 0.065 * windowHeight,}} />
                            <Text style={{
                                position: 'absolute',
                                left:0.045*windowWidth,
                                width: 0.07*windowWidth,
                                "color": "#FFFFFF",
                                }}>{profile} sent a friend request!</Text>                            
                            </View> 
                            <View style={styles.notifdecisionbox}>
                        <TouchableOpacity  onPress={() => 
                {
                    if (requestAccepted(requestUID[index]));
                    update(ThisProfileRef, {
                        ConfirmedProfiles: friends,
                      }); 
                }} ><Text style={[styles.decisionbutton,{backgroundColor: "rgba(3, 184, 21, 1)"}]}>Accept</Text></TouchableOpacity>
                        <TouchableOpacity 
                         onPress={() => 
                            {
                                if (IncomingRequests.includes(requestUID[index])) requestDenied(requestUID[index]);
                                update(ThisProfileRef, {
                                    RequestedProfiles: IncomingRequests,
                                  }); 
                            }}><Text style={[styles.decisionbutton,{backgroundColor: "rgba(255, 255, 255, 0.25)"},{left: -0.03*windowWidth}]}>Decline</Text></TouchableOpacity>
                        </View>
                        </View>
                        )
                    })
                    }
                    </ScrollView>
                    </View>
                    <Image source={require('./homeAssets/post2.png')} style={styles.posts} />
                    <ScrollView contentContainerStyle= {{justifyContent:'space-around'}} 
                    style={styles.friendscroll}>
                    {friendNames.map((profile,index)=>
                        {
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
                    <Text style={styles.posttxt}>Maddy Sheikh</Text>
                    <Image source={require('./homeAssets/dp.png')} style={styles.dppostview} />
                    <ImageBackground source={require('./homeAssets/divider.png')} style={styles.divider} />
                    <ImageBackground source={require('./homeAssets/designspikes.png')} style={styles.spike2} />
                </LinearGradient>
            </View>
    );
                }              
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
    friendscroll:{
        flexGrow: 0.1,
        width: 250 / 1440 * windowWidth,
        height: 592 / 1024 * windowHeight,
        borderRadius: 10,
    },
    friendbox:{
        flex:1, 
        flexDirection:"column",
        marginVertical:30,
        alignItems: "center",
        left:0.05*windowWidth,
        height:0.08 * windowHeight,
        width: 0.013*windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
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
        position: 'absolute',
        top: 0.21 * windowHeight,
        left: 0.05 * windowWidth
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

    decisionbutton: {
        position: "absolute",
        width: 55 / 1440 * windowWidth,
        height: 25 / 1024 * windowHeight,
        // left: 165 / 1440 * windowWidth,
        color: '#FFFFFF',
        textAlign: 'center',
        top: 15 / 1024 * windowHeight,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
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

    dpview: {
        position: "absolute",
        top: 0.2 * windowHeight,
        resizeMode: 'contain',
        height: 0.06 * windowHeight,
        width: 0.05 * windowWidth,
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

    notif:{
        position:"absolute",
        flex:1,
        top:0.2*windowHeight,
        left:0.8*windowWidth,
        height:(695/900) * windowHeight,
        width: (227/1600)*windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        borderRadius: 10,
    },
    
    notifbox:{
        flex:1, 
        // flexDirection:"column",
        marginVertical:50,
        // alignItems: "center",
        top:0.02*windowHeight,
        left:0.005*windowWidth,
        height:0.7 * windowHeight,
        width: 0.13*windowWidth,
        // backgroundColor: "rgba(255, 255, 255, 0.5)",
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