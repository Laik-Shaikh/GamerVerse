import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, Text, TextInput, Modal, Alert, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref as strRef, uploadBytes, getDownloadURL } from "firebase/storage";
import fire from '../firebase';
import 'firebase/database'
import { getDatabase, onValue, ref, query, orderByChild, equalTo, update, set, startAt, get, endAt, remove } from "firebase/database";
import 'firebase/auth';
import { getAuth } from "firebase/auth";


const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


export default function myPosts({ navigation }) {

    const auth = getAuth();
    const db = getDatabase();

    const [reset, setReset] = useState(0);
    const [postImage, setPostImage] = React.useState([]);
    const [location, setLocation] = React.useState(null);
    const [selectedValue, setSelectedValue] = React.useState()
    const [textInputValue, setTextInputValue] = React.useState('');
    const PostRef = query(ref(db, 'posts/'+auth.currentUser.uid));


    React.useEffect(() => {

        onValue(PostRef, (snapshot) => {
            if(snapshot.exists()){  const info5 = Object.values(snapshot.val());
                setPostImage(info5)}
                else{ 
                    setPostImage([])
                }
        }
        )
    }, [])

    var handleSearch = (e) => {
        if (e.nativeEvent.key == 'Enter' && textInputValue.length>0 && textInputValue!=" ") {
            navigation.push("SearchPage", { textInputValue })
            console.log('search started')
        }
    }

    const getLocations = async (loc) => {
        if (loc) {
            const UserRef = query(ref(db, 'locations'), orderByChild('LocationLower'), startAt(loc), endAt(loc + "\uf8ff"))
            onValue(UserRef, (snapshot) => {
                if (snapshot.val()) {
                    setLocation(Object.values(snapshot.val()))
                }
            })
        }
    }

    function renderSug() {
        if (!selectedValue) {
            console.log(location)
            return (<FlatList

                data={location}
                style={styles.LocSuggestions}
                keyExtractor={(item) => item.magicKey}
                renderItem={(suggestion) => {
                    return (
                        <TouchableOpacity style={styles.item} onPress={() => {
                            setSelectedValue(suggestion.item.Location)
                            navigation.push("SearchPage", { textInputValue: suggestion.item.Location })
                        }

                        }>
                            <Text style={styles.itemText}>{suggestion.item.Location}</Text>
                        </TouchableOpacity>)
                }}


            ></FlatList>)
        }
    }

    return(
        <View style={styles.container} >
            <LinearGradient
                start={{ x: 0, y: 1 }} end={{ x: 0, y: -1 }}
                colors={['#013C00', '#000000']}
                style={styles.background} >
                <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fdesignspikes1.png?alt=media&token=40fb8f39-0720-4688-917e-c02817598a01"} style={styles.spike1} />
                <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Flogo.png?alt=media&token=7468c404-5678-43b2-92eb-310ffa58433c"} style={styles.title} onPress={() => navigation.push("Home")} />
                
                <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FMenuBar.png?alt=media&token=d9c15cc1-98a6-41b8-a5f9-533a2f5d1f7b"} style={styles.menu} />
                <TouchableOpacity style={styles.homebtn} onPress={() => navigation.push("Home")}>
                    <Text style={styles.robototxt}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profilebtn} onPress={() => navigation.push("Profile")}>
                    <Text style={styles.highlighttxt}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mygamesbtn} onPress={() => navigation.push("MyGames")}>
                    <Text style={styles.robototxt}>My Games</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gamehubbtn} onPress={() => navigation.push("GameHub")}>
                    <Text style={styles.robototxt}>Game Hub</Text>
                </TouchableOpacity>
                <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FsearchIcon.png?alt=media&token=f31e94f7-0772-4713-8472-caf11d49a78d"} style={styles.searchIcon} />
                <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fdesignspikes.png?alt=media&token=a8871878-f2d0-4fa7-b74c-992a8fbe695e"} style={styles.spike2} />
                <TextInput 
                    style={styles.InputStyle1} 
                    placeholder='Search for friends, games or location'
                    onChangeText={(text) => {
                        setLocation(undefined)
                        getLocations(text.toLocaleLowerCase())
                        setTextInputValue(text)}}
                    value={textInputValue}
                    onKeyPress={e => handleSearch(e)}
                    onBlur={()=>{
                        if(!selectedValue){
                            setTimeout(()=>
                                setSelectedValue("x"),300)
                        }}}
                    onFocus={() => {
                        if(selectedValue)
                            setSelectedValue(undefined)
                        }}
                    ></TextInput>
                    {renderSug()}


                <ScrollView contentContainerStyle={{ justifyContent: 'space-evenly' }} style={styles.postContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {postImage.map((newItem, index) => {

                    if ((!(newItem.User))) {
                        get(query(ref(db, 'users'), orderByChild('uid'), equalTo(newItem.uid))).then((snapshot) => {
                            var postUserData = Object.values(snapshot.val())
                            newItem['User'] = postUserData[0].Name
                            newItem.DisplayProfile = postUserData[0].DisplayPicture
                            setReset(reset + 0.1)
                        }
                        )}
                        return(
                            <View key={index}>
                              <View style={styles.allPost}>
                              <Text style={styles.profileName}>{newItem.User}</Text>
                                                        <Image source={newItem.DisplayProfile} style={styles.profile} />

                                                        <Image source={newItem.Image} style={styles.post} />
                                                        <Text style={styles.displayDescription}>{newItem.Description}</Text>

                                                        <View style={styles.nameGameContainer}>
                                                            <Text style={styles.nameGame}>{newItem.GameName}</Text>
                                                        </View>

                                                        <TouchableOpacity style={styles.deletePost} 
                                                            onPress={() => {
                                                                remove(query(ref(db, 'posts/' + newItem.uid + '/Post' + newItem.PostNumber)) 
                                                                )
                                                                setReset(reset+0.1)
                                                            }}
                                                        >
                                                            <Text style={styles.nameGame}>Delete Post</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{
                                                                position: 'absolute',
                                                                width: 0.053 * windowWidth,
                                                                height: 0.053 * windowHeight,
                                                                top: 0.9 * windowHeight,
                                                                left: 0.006 * windowWidth,
                                                            }}
                                                            >
                                                                      <Image source={newItem.LikeImage} style={styles.likeImage} /> 
                                                        <Text style={styles.likestext}>{newItem.Likes.length - 1}</Text>
                                                            </TouchableOpacity>
                                                  

                               </View>
                            </View>
                        )
                    }
                    )}
                </ScrollView>


            </LinearGradient>

        </View>  
    )

}


const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: 'hidden',
    },

    background: {
        position: "relative",
        width: windowWidth,
        height: windowHeight,
    },

    loading: {
        minHeight: 100 / 1024 * windowHeight,
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
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
        top: 0.005 * windowHeight,
        left: 0.02 * windowWidth,
        width: 0.08 * windowWidth,
        // height: 0.005 * windowHeight,
        lineHeight: 23,
        // backgroundColor: 'rgba(255, 255, 255,0.5)',
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
    
    text1: {
        "fontStyle": "normal",
        "fontWeight": "bold",
        "fontSize": 18,
        "color": "#000000",
    },
    text2: {
        "fontStyle": "normal",
        "fontWeight": "bold",
        "fontSize": 18,
        "color": "white",
    },

    text2: {
        "fontStyle": "normal",
        "fontWeight": "bold",
        "fontSize": 18,
        "color": "white",
    },

    homebtn: {
        position: "absolute",
        top: 0.11 * windowHeight,
        left: 0.05 * windowWidth,
        height: 0.03 * windowHeight,
    },

    profilebtn: {
        position: "absolute",
        top: 0.107 * windowHeight,
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

    searchIcon: {
        position: "absolute",
        resizeMode: 'contain',
        top: 0.11 * windowHeight,
        left: 0.7 * windowWidth,
        height: 0.03 * windowHeight,
        width: 0.03 * windowWidth,
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
    },

    LocSuggestions: {
        position: 'absolute',
        top: 150 / 1024 * windowHeight,
        right: 85 / 1440 * windowWidth,
        flexGrow: 0,
        width: 305 / 1440 * windowWidth,
        backgroundColor: 'rgba(255, 255, 255,1)',
        zIndex: 1,
    },

    itemText: {
        fontSize: 15,
        paddingLeft: 10
    },

    item: {
        width: 305 / 1440 * windowWidth,
        paddingTop: 10
    },

    postContainer: {
        position: 'absolute',
        width: 0.8 * windowWidth,
        height: 0.785 * windowHeight,
        top: 0.18 * windowHeight,
        left: 0.05 * windowWidth,
        // backgroundColor: 'red',
        flexGrow: 0.1
    },

    allPost: {
        // position: 'absolute',
        width: 0.85 * windowWidth,
        height: 0.85 * windowHeight,
        top: -0.12 * windowHeight,
        left: 0.01 * windowWidth,
        marginTop: '120px',
        // backgroundColor: 'cyan',
        // flexGrow: 0.1,
        marginTop: '30px',
    },

    post: {
        position: 'absolute',
        resizeMode: 'contain',
        // width: 0.87 * windowWidth,
        // height: 0.52 * windowHeight,
        left: 0.01 * windowWidth,
        marginTop: 0.12 * windowHeight,
        // top: 0.1*windowHeight,
        width: '100%',
        height: '82%',
        flexGrow: 0.1

    },

    likeImage: {
        position: 'absolute',
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    },

    likestext: {
        position: 'absolute',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 26,
        top: 0.005 * windowHeight,
        left: 0.045 * windowWidth
    },

    whiteLikeImage:{
        position: 'absolute',
        // resizeMode: 'contain',
        width: 0.042*windowWidth,
        height: 0.044*windowHeight,
        left: -0.002*windowWidth,
        marginTop: 0.007 * windowHeight,
        // width: '80%',
        // height: '80%',
        // marginBottom: '2px'
    },

    profile: {
        position: 'absolute',
        // resizeMode: 'contain',
        width: 0.05 * windowHeight,
        height: 0.05 * windowHeight,
        borderRadius: 0.065 * windowHeight,
        top: 0.01 * windowHeight,
        left: 0.01 * windowWidth,
        
    },

    profileName: {
        position: 'absolute',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22,
        paddingLeft: 0.047 * windowWidth,
        top: 0.0157 * windowHeight,
        
    },

    nameGameContainer: {
        position: 'absolute',
        top: 0.055 * windowHeight,
        // paddingLeft: '20px',
        borderWidth:2,
        borderColor:"blue",
        left: 0.05 * windowWidth,
    },

    nameGame: {
        // position: 'absolute',
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
        

    },

    displayDescription: {
        position: 'absolute',
        color: 'white',
        fontWeight: 'normal',
        textAlign: 'center',
        fontSize: 16,
        paddingLeft: '20px',
        // marginTop: '15px',
        top: 0.1 * windowHeight,
        left: 0.01 * windowWidth,
        flexGrow: 0.1
    },

    deletePost:{
        position: 'absolute',
        top: 0.063 * windowHeight,
        borderWidth:2,
        backgroundColor: 'red',
        right: 0.05 * windowWidth,

    },

})