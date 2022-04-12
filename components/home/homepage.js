import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, Text, TextInput, Modal, Alert, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref as strRef, uploadBytes, getDownloadURL } from "firebase/storage";
import fire from '../firebase';
import 'firebase/database'
import { getDatabase, onValue, ref, query, orderByChild, equalTo, update, set, startAt, get, endAt } from "firebase/database";
import 'firebase/auth';
import { getAuth } from "firebase/auth";


// import fire from '../firebase';
// import 'firebase/database'
// import { getDatabase, onValue,get,ref,query, orderByChild, equalTo, push ,update ,set} from "firebase/database";
// import 'firebase/auth';
// import { getAuth } from "firebase/auth";


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
    const db = getDatabase();

    const storage = getStorage();
    const metadata = {
        contentType: 'image/jpg',
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [reset, setReset] = useState(0);
    const [games, setGames] = React.useState(null);
    const [selectGameName, setSelectGameName] = useState(null);
    const [gamesCode, setGamesCode] = React.useState([]);
    const [description, setDescription] = useState(null)
    const [userName, setUserName] = useState(null);
    const [userUid, setUserUid] = useState(null);
    const [postNumber, setPostNumber] = React.useState([]);
    const [postImage, setPostImage] = React.useState([]);
    const [selectGameCode, setSelectGameCode] = useState(null);
    const [profileImage, setProfileImage] = React.useState([]);
    var [latestPosts, setLatestPosts] = useState([]);

    var profileUid = auth.currentUser.uid;
    const [textInputValue, setTextInputValue] = React.useState('');
    var [friends, setFriends] = React.useState(null);

    console.log(users)
    console.log(friends)



    var [IncomingRequests, setIncomingRequests] = React.useState(null);
    var [friendIncomingRequests, setFriendIncomingRequests] = React.useState(null);
    var [friends, setFriends] = React.useState(null);
    const [users, setUsers] = React.useState(null);
    var requestNames = [];
    var requestImages = [];
    var requestUID = [];
    var friendNames = [];
    var friendImages = [];
    var friendUid = [];
    var acceptedProfiles = [];
    var rejectedProfiles = [];
    var likes = ["XX"]


    const GameRef = query(ref(db, 'games'))
    const UserRef1 = query(ref(db, 'users/' + auth.currentUser.uid + '/Games'))
    const UserName = query(ref(db, 'users/' + auth.currentUser.uid + '/Name'))
    const UidRef = query(ref(db, 'users/' + auth.currentUser.uid + '/uid'))
    const PostCounter = query(ref(db, 'users/' + auth.currentUser.uid + '/PostCount'));
    const PostCounter1 = query(ref(db, 'users/' + auth.currentUser.uid));
    const PostCounter3 = query(ref(db, 'users/' + auth.currentUser.uid + '/PostCount'));
    const PostRef = query(ref(db, 'posts'));
    const ProfileRef1 = query(ref(db, 'users/' + auth.currentUser.uid + '/DisplayPicture'));

    const UserRef = query(ref(db, 'users/' + auth.currentUser.uid + '/RequestedProfiles'))
    const ConfirmedProfilesRef = query(ref(db, 'users/' + auth.currentUser.uid + '/ConfirmedProfiles'))
    const ThisProfileRef = query(ref(db, 'users/' + auth.currentUser.uid))
    const ProfileRef = query(ref(db, 'users'))
    // const [users, setUsers] = React.useState(null);
    const [location, setLocation] = React.useState(null);
    const [selectedValue, setSelectedValue] = React.useState()
    React.useEffect(() => {
        onValue(UserRef, (snapshot) => {
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

        onValue(GameRef, (snapshot) => {
            const info = Object.values(snapshot.val());
            setGames(info)
            console.log(info)
        })

        onValue(UserRef1, (snapshot) => {
            console.log(snapshot.val())
            if (snapshot.val()) {
                const data1 = Object.values(snapshot.val());
                setGamesCode(data1)
            }
        }
        )

        onValue(UserName, (snapshot) => {
            const info2 = snapshot.val();
            setUserName(info2)
            console.log(info2)
        }
        )

        onValue(UidRef, (snapshot) => {
            const id = snapshot.val();
            setUserUid(id)
        }
        )

        onValue(PostCounter3, (snapshot) => {
            const info4 = snapshot.val();
            setPostNumber(info4)
            console.log(info4)
        }
        )

        onValue(PostRef, (snapshot) => {
            const info5 = Object.values(snapshot.val());
            // setPostImage(Object.values(data5[0]))
            // console.log(Object.values(data5[0]))
            setPostImage(info5)
        }
        )

        onValue(ProfileRef1, (snapshot) => {
            const info6 = snapshot.val();
            setProfileImage(info6)
            console.log(info6)
        }
        )
    }, [])
    console.log(IncomingRequests)
    console.log(users)
    console.log(friends)

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
                console.log(data3)
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
        console.log(toRemove)
        var index = IncomingRequests.indexOf(toRemove);
        if (index > -1) {
            IncomingRequests.splice(index, 1);
        }
    }

    var handleSearch = (e) => {
        if (e.nativeEvent.key == 'Enter' && textInputValue.length>0) {
            navigation.navigate("SearchName", { textInputValue })
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
                            navigation.navigate("SearchName", { textInputValue: suggestion.item.Location })
                        }

                        }>
                            <Text style={styles.itemText}>{suggestion.item.Location}</Text>
                        </TouchableOpacity>)
                }}


            ></FlatList>)
        }
    }

    if (users && IncomingRequests) {
        for (var i = 1; i < users.length; i++) {
            var x = users[i].uid;
            console.log(x);
            if (IncomingRequests.includes(x)) {
                requestNames.push(users[i].Name);
                requestImages.push(users[i].DisplayPicture);
                requestUID.push(users[i].uid);

            }
        }
        console.log(requestNames)
        console.log(requestImages)
        console.log(requestUID)
    }



    if (!users) {
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

    if (users) {
        if (friends) {
            for (var i = 0; i < users.length; i++) {
                var x = users[i].uid;
                console.log(x);
                if (friends.includes(x)) {
                    friendNames.push(users[i].Name);
                    friendImages.push(users[i].DisplayPicture);
                    friendUid.push(users[i].uid);
                }
            }
            console.log(friendImages)
            console.log(friendNames)
        }


        // const auth = getAuth();
        // const db = getDatabase();



        // var userid = ''
        // const dbRef = ref(db,'posts/Post1')

        console.log(UserName)
        console.log(PostCounter3)
        console.log(GameRef)
        console.log(UserRef1)
        console.log(PostRef)





        const likePhoto = 'https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Post%2FLike.png?alt=media&token=bfce5738-8e63-4bb3-8841-212c7fef39d6'


        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(result);

            if (!result.cancelled) {
                setImage(result.uri);
            }
        };

        async function uploadPost() {
            const response = await fetch(image);
            const blob = await response.blob();

            get(PostCounter).then((snapshot) => {
                var upl3 = snapshot.val();
                upl3 = upl3 + 1;
                console.log(upl3)
                var storageRef = strRef(storage, 'Post/' + auth.currentUser.uid + '_' + upl3 + '.jpg');
                const dbRef = ref(db, 'posts/' + auth.currentUser.uid + '/Post' + postNumber)
                uploadBytes(storageRef, blob, metadata).then((snapshot) => {
                    getDownloadURL(storageRef).then((url) => {
                        set(dbRef, {
                            Description: description,
                            GameName: selectGameName,
                            GameCode: selectGameCode,
                            Image: url,
                            LikeImage: likePhoto,
                            Likes: ['XX'],
                            // User: userName,
                            PostNumber: postNumber,
                            uid: auth.currentUser.uid
                        })
                    })

                    console.log('Uploaded a blob or file!');
                });
                console.log(upl3)
                update(PostCounter1, {
                    PostCount: upl3,
                });
            }
            )


        }




        const signOutUser = async () => {
            try {
                await auth.signOut();
                navigation.navigate("Login");

            } catch (e) {
                Alert.alert("Could not Logout");
                console.log(e)
            }
        }
        if (!games || !latestPosts) {
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
    return (
        <View style={styles.container} >
            <LinearGradient
                start={{ x: 0, y: 1 }} end={{ x: 0, y: -1 }}
                colors={['#013C00', '#000000']}
                style={styles.background} >
                <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fdesignspikes1.png?alt=media&token=40fb8f39-0720-4688-917e-c02817598a01"} style={styles.spike1} />
                <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Flogo.png?alt=media&token=7468c404-5678-43b2-92eb-310ffa58433c"} style={styles.title} onPress={() => navigation.navigate("Home")} />
                <TouchableOpacity style={styles.logout} onPress={() => signOutUser()}>
                    <Text style={styles.uploadText}>Log Out</Text>
                </TouchableOpacity>
                <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FMenuBar.png?alt=media&token=d9c15cc1-98a6-41b8-a5f9-533a2f5d1f7b"} style={styles.menu} />
                <TouchableOpacity style={styles.homebtn} onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.highlighttxt}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profilebtn} onPress={() => navigation.push("Profile")}>
                    <Text style={styles.robototxt}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mygamesbtn} onPress={() => navigation.push("MyGames")}>
                    <Text style={styles.robototxt}>My Games</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gamehubbtn} onPress={() => navigation.push("GameHub")}>
                    <Text style={styles.robototxt}>Game Hub</Text>
                    </TouchableOpacity>
                    <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FsearchIcon.png?alt=media&token=f31e94f7-0772-4713-8472-caf11d49a78d"} style={styles.searchIcon} />
                    <TextInput 
                    style={styles.InputStyle1} 
                    placeholder='Search for friends, games or location'
                    onChangeText={(text) => setTextInputValue(text)}
                    value={textInputValue}
                    onKeyPress={e => handleSearch(e)}
                    ></TextInput>
                    {renderSug()}
                    <View style={styles.notif}>
                        <Image style={{
                            position: 'absolute',
                            resizeMode: 'contain',
                            top: 0.011 * windowHeight,
                            left: 0.015 * windowWidth,
                            width: 0.03 * windowWidth,
                            height: 0.03 * windowHeight,
                            transform: [{ rotate: '20deg' }]
                        }} source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FBell.png?alt=media&token=58552420-503b-45e6-a134-9b3b4f5a35b3"} />
                        <Text style={{
                            position: 'absolute',
                            left: 0.045 * windowWidth,
                            top: 0.016 * windowHeight,
                            color: 'white',
                            fontWeight: 'bold'
                        }}>Friend Requests</Text>
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
                                        {/* <Text style={{
                                position: 'relative',
                                "color": "#FFFFFF",
                                }}>
                                Friend Request by:</Text> */}
                                        <View style={{ position: 'relative', flex: 1, flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={() => navigation.push("SearchProfile", requestUID[index])}>
                                            <Image source={requestImages[index]} style={{
                                                position: "absolute",
                                                top: 0 * windowHeight,
                                                left: 0 * windowWidth,
                                                width: 0.05 * windowHeight,
                                                height: 0.05 * windowHeight,
                                                borderRadius: 0.065 * windowHeight,
                                            }} />
                                            <Text style={{
                                                position: 'absolute',
                                                left: 0.045 * windowWidth,
                                                width: 0.07 * windowWidth,
                                                "color": "#FFFFFF",
                                            }}>{profile} sent a friend request!</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.notifdecisionbox}>
                                            <TouchableOpacity onPress={() => {
                                                if (requestAccepted(requestUID[index]));
                                                update(ThisProfileRef, {
                                                    ConfirmedProfiles: friends,
                                                });
                                            }} ><Text style={[styles.decisionbutton, { backgroundColor: "rgba(3, 184, 21, 1)" }]}>Accept</Text></TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (IncomingRequests.includes(requestUID[index])) requestDenied(requestUID[index]);
                                                    update(ThisProfileRef, {
                                                        RequestedProfiles: IncomingRequests,
                                                    });
                                                }}><Text style={[styles.decisionbutton, { backgroundColor: "rgba(255, 255, 255, 0.25)" }, { left: -0.03 * windowWidth }]}>Decline</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                            }
                        </ScrollView>
                    </View>
                    {/* <Image source={require('./homeAssets/post2.png')} style={styles.posts} /> */}
                    <ScrollView contentContainerStyle= {{justifyContent:'space-around'}} 
                    style={styles.friendscroll}>
                    {friendNames.map((profile,index)=>
                        {
                        return(
                        <View  key={index} style={styles.friendbox}>
                            <TouchableOpacity onPress={() => navigation.push("SearchProfile", friendUid[index])}>
                                <Image source={friendImages[index]} style={styles.dpview}/>
                                <Text style={styles.nametxt}>{profile}</Text>
                            </TouchableOpacity> 
                        </View>
                        )
                    })
                    }
                    </ScrollView>
                    {/* <Text style={styles.posttxt}>Maddy Sheikh</Text>
                    <Image source={require('./homeAssets/dp.png')} style={styles.dppostview} /> */}
                    {/* <Image source={require('./homeAssets/post2.png')} style={styles.posts} /> */}
                    {/* <Text style={styles.nametxt}>Danny Devadiga</Text> */}
                    {/* <Text style={styles.posttxt}>Maddy Sheikh</Text>
                    <Image source={require('./homeAssets/dp.png')} style={styles.dpview} />
                    <Image source={require('./homeAssets/dp.png')} style={styles.dppostview} /> */}
                <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fdivider.png?alt=media&token=458aa29f-e202-4bab-8393-3a7fb6994608"} style={styles.divider} />
                <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fdesignspikes.png?alt=media&token=a8871878-f2d0-4fa7-b74c-992a8fbe695e"} style={styles.spike2} />

                    {/* {games.map((item, index) => {
                        if(gamesCode.includes(item.Code))
                        {
                            setGameNames(item.Name)
                        }
                    })} */}



                    <ScrollView contentContainerStyle={{ justifyContent: 'space-around' }} style={styles.postContainer} showsVerticalScrollIndicator={false}>
                        {postImage.map((item, index) => {
                            // console.log(postImage);
                            // console.log(item)


                            return (
                                <View key={index}>
                                    {
                                        Object.values(item).map((newItem, newIndex) => {

                                            if (gamesCode.includes(newItem.GameCode)) {
                                                if ((!(newItem.User))) {
                                                    get(query(ref(db, 'users'), orderByChild('uid'), equalTo(newItem.uid))).then((snapshot) => {
                                                        var postUserData = Object.values(snapshot.val())
                                                        newItem['User'] = postUserData[0].Name
                                                        newItem.DisplayProfile = postUserData[0].DisplayPicture
                                                        setReset(reset + 0.1)
                                                    }
                                                    )
                                                }
                                                var LikeRef = query(ref(db, 'posts/' + newItem.uid + '/Post' + newItem.PostNumber + '/Likes'))
                                                var likeData;
                                                onValue(LikeRef, (snapshot) => {
                                                    console.log(LikeRef)
                                                    likeData = Object.values(snapshot.val());

                                                    console.log(likeData)

                                                }
                                                );


                                                function checkLikes(userid) {
                                                    // console.log(likes.length)
                                                    for (var i = 0; i < likeData.length; i++) {
                                                        if (userid == likes[i]) return false;
                                                    }
                                                    return true;
                                                }

                                                return (
                                                    <View style={styles.allPost}>
                                                    <TouchableOpacity onPress={() => navigation.push("SearchProfile", newItem.uid)}>
                                                        <Text style={styles.profileName}>{newItem.User}</Text>
                                                        <Image source={newItem.DisplayProfile} style={styles.profile} />
                                                    </TouchableOpacity>
                                                        <Image source={newItem.Image} style={styles.post} />
                                                        <Text style={styles.displayDescription}>{newItem.Description}</Text>
                                                        {/* <Image source={require('./homeAssets/Like.png')} style={styles.likeImage} /> */}
                                                        <TouchableOpacity
                                                            style={{
                                                                position: 'absolute',
                                                                width: 0.053 * windowWidth,
                                                                height: 0.053 * windowHeight,
                                                                top: 0.52 * windowHeight,
                                                                left: 0.006 * windowWidth
                                                            }}
                                                            onPress={() => {
                                                                // console.log(likes)
                                                                if (!newItem.Likes.includes(auth.currentUser.uid)) {
                                                                    if (checkLikes(auth.currentUser.uid)) likeData.push(auth.currentUser.uid);

                                                                    update(query(ref(db, 'posts/' + newItem.uid + '/Post' + newItem.PostNumber)), {
                                                                        Likes: likeData
                                                                    })
                                                                }
                                                                else {
                                                                    var ind = likeData.indexOf(auth.currentUser.uid)
                                                                    likeData.splice(ind, 1)
                                                                    update(query(ref(db, 'posts/' + newItem.uid + '/Post' + newItem.PostNumber)), {
                                                                        Likes: likeData
                                                                    })
                                                                }
                                                            }}
                                                        >
                                                            <Image source={newItem.LikeImage} style={styles.likeImage} />
                                                        </TouchableOpacity>
                                                        {console.log(newItem.DisplayProfile)}
                                                        <Text style={styles.likestext}>{newItem.Likes.length - 1}</Text>
                                                    </View>
                                                )
                                            }
                                        })
                                    }
                                    

                                </View>
                            )

                        })}
                    </ScrollView>


                    <TouchableOpacity style={styles.upload} onPress={() => setModalVisible(true)}>
                        <Text style={styles.uploadText}>Upload a Post</Text>
                    </TouchableOpacity>


                    <Modal
                        animationType='slide'
                        visible={modalVisible}
                        transparent={true}
                        onRequestClose={() => {
                            Alert.alert("Post Uploaded Successfully.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                {/* <View> */}
                                <TextInput placeholder='Caption for your post'
                                    style={styles.textInput} onChangeText={description => setDescription(description)}
                                />
                                {/* </View> */}
                                {/* <Image source={require('./homeAssets/divider.png')} style={styles.divider1} /> */}
                                <TouchableOpacity style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        setModalVisible(!modalVisible)
                                    }}
                                >
                                    <Text style={styles.text1}>Cancel</Text>
                                </TouchableOpacity>

                                {/* Upload to FireBase       */}

                                <TouchableOpacity style={[styles.button, styles.uploadButton]}
                                    onPress={
                                        async () => {
                                            try {
                                                uploadPost();
                                                alert("Uploaded Successfully");
                                                setModalVisible(!modalVisible);

                                            } catch (error) {
                                                console.log('error');
                                                alert('Error')
                                            }
                                        }
                                    }
                                >
                                    <Text style={styles.text1}>Upload</Text>
                                </TouchableOpacity>

                                {/* Choose Image */}

                                <TouchableOpacity style={[styles.button, styles.chooseButton]}
                                    onPress={pickImage}
                                >
                                    <Text style={styles.text1}>Choose Image</Text>
                                    {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
                                </TouchableOpacity>

                                <View style={styles.name}>
                                    <Text style={styles.text2}>Select Game : </Text>
                                </View>

                                <ScrollView style={styles.gameScrollContainer} vertical={true}>
                                    {games.map((item, index) => {
                                        if (gamesCode.includes(item.Code)) {

                                            return (
                                                <View key={index}>
                                                    <TouchableOpacity style={styles.gameName}
                                                        onPress={() => {
                                                            setSelectGameName(item.Name)
                                                            setSelectGameCode(item.Code)
                                                            //    console.log(item.Name)
                                                        }} >
                                                        <Text style={styles.gameText}>{item.Name}</Text>
                                                        {/* {setGameNames(item.Name)} */}
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        }
                                    }

                                    )}
                                </ScrollView>

                            </View>
                        </View>
                    </Modal>
                </LinearGradient>
            </View>
        );

    }
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

    friendscroll: {
        flexGrow: 0.1,
        width: 275 / 1440 * windowWidth,
        left: 5 / 1440 * windowWidth,
        height: 650 / 1024 * windowHeight,
        top: 200 / 1024 * windowHeight,
        borderRadius: 10,
        // backgroundColor: "rgba(255, 255, 255, 0.7)",
    },

    friendbox: {
        flex: 1,
        flexDirection: "column",
        marginVertical: 30,
        alignItems: "center",
        left: 0.05 * windowWidth,
        height: 0.08 * windowHeight,
        width: 0.015 * windowWidth,
        // backgroundColor: "rgba(255, 255, 255, 1)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
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
        left: 0.3 * windowWidth,
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
        top: 0.01 * windowHeight,
        left: 0.02 * windowWidth
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

    homebtn: {
        position: "absolute",
        top: 0.107 * windowHeight,
        left: 0.05 * windowWidth,
        height: 0.03 * windowHeight,
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

    LocSuggestions: {
        position: 'absolute',
        top: 160 / 1024 * windowHeight,
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
        top: 0 * windowHeight,
        left: -0.02 * windowWidth,
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
        left: 0.185 * windowWidth,
        resizeMode: 'contain',
        height: 0.7 * windowHeight,
        width: "3px",
    },

    // divider1:{
    //     position:"absolute",
    //     top:0.2*windowHeight,
    //     left:0.02*windowWidth,
    //     resizeMode:'contain',
    //     height: 0.3*windowHeight,
    //     width: 0.01*windowWidth,
    // },

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
        left: 0.81 * windowWidth,
        height: (695 / 900) * windowHeight,
        width: (227 / 1600) * windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        borderRadius: 10,
    },

    notifbox: {
        flex: 1,
        // flexDirection:"column",
        marginVertical: 50,
        // alignItems: "center",
        top: 0.02 * windowHeight,
        left: 0.005 * windowWidth,
        height: 0.7 * windowHeight,
        width: 0.13 * windowWidth,
        // backgroundColor: "rgba(255, 255, 255, 0.5)",
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
    },

    upload: {
        position: 'absolute',
        width: 0.09 * windowWidth,
        height: 0.03 * windowHeight,
        top: 0.17 * windowHeight,
        left: 0.7 * windowWidth,
        backgroundColor: 'green',
        textAlign: 'center'
    },
    logout: {
        position: 'absolute',
        width: 0.09 * windowWidth,
        height: 0.03 * windowHeight,
        top: 0.05 * windowHeight,
        left: 0.9 * windowWidth,
        backgroundColor: 'green',
        textAlign: 'center'
    },
    uploadText: {
        "fontStyle": 'normal',
        "fontSize": 16,
        "fontWeight": 'bold',
        "color": '#ffffff'
    },

    gameText: {
        "fontStyle": 'normal',
        "fontSize": 16,
        "fontWeight": '700',
        "color": '#000000',
        // paddingLeft: '10px',
        margin: '5px',
        textAlign: 'center'

    },

    gameName: {
        // position: 'absolute',
        // borderTopRightRadius:  60,
        // borderBottomRightRadius:  60,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#006400',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingTop: '5px',
        paddingBottom: '5px'
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },

    modalView: {
        margin: 20,
        // backgroundColor: "rgba(255, 255, 255, 0.3)",
        backgroundColor: "black",
        borderRadius: 20,
        padding: 35,
        width: 0.6 * windowWidth,
        height: 0.6 * windowHeight,
        // width: '50%',
        // height: '70%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },

    logout: {
        position: 'absolute',
        width: 0.09 * windowWidth,
        height: 0.03 * windowHeight,
        top: 0.05 * windowHeight,
        left: 0.9 * windowWidth,
        backgroundColor: 'green',
        textAlign: 'center'
    },

    uploadButton: {
        backgroundColor: 'white',
        height: 0.05 * windowHeight,
        width: 0.15 * windowWidth,
        left: -0.18 * windowWidth,
        top: 0.43 * windowHeight,
        textAlign: 'center'

    },

    chooseButton: {
        backgroundColor: 'white',
        height: 0.05 * windowHeight,
        width: 0.15 * windowWidth,
        // left: 0.05*windowWidth,
        top: 0.38 * windowHeight,
        alignContent: 'center',
        alignItems: 'center'
    },

    buttonClose: {
        backgroundColor: 'red',
        // height: '80px',
        // width: '100px',
        height: 0.05 * windowHeight,
        width: 0.15 * windowWidth,
        left: 0.18 * windowWidth,
        top: 0.48 * windowHeight,
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },

    textStyle: {
        marginTop: '10px',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: '15px'
    },

    selectedImage: {
        position: 'absolute',
        resizeMode: 'contain',
        width: 0.38 * windowWidth,
        height: 0.38 * windowHeight,
        bottom: 0.07 * windowHeight,
        left: -0.02 * windowWidth,
    },

    textInput: {
        position: 'absolute',
        width: 0.54 * windowWidth,
        height: 0.08 * windowHeight,
        paddingLeft: '15px',
        top: '20px',
        backgroundColor: 'white'
    },

    name: {
        position: 'absolute',
        // width: 0.15*windowWidth,
        // height: 0.*windowHeight,
        left: 0.02 * windowWidth,
        top: 0.14 * windowHeight
    },

    gameScrollContainer: {
        position: 'absolute',
        width: 0.15 * windowWidth,
        height: 0.3 * windowHeight,
        left: 0.02 * windowWidth,
        top: 0.19 * windowHeight,
        // flexGrow: 0.1,
        // justifyContent: 'space-between',
        // backgroundColor: 'white'
    },

    postContainer: {
        position: 'absolute',
        width: 0.58 * windowWidth,
        height: 0.73 * windowHeight,
        top: 0.23 * windowHeight,
        left: 0.216 * windowWidth,
        // backgroundColor: 'red',
        flexGrow: 0.1
    },

    allPost: {
        // position: 'absolute',
        width: 0.55 * windowWidth,
        height: 0.62 * windowHeight,
        marginTop: '10px',
        //backgroundColor: 'cyan',
        left: 0.01 * windowWidth,
        flexGrow: 0.1
        // width: '100%',
        // height: '100%',
    },

    post: {
        // position: 'absolute',
        resizeMode: 'contain',
        width: 0.52 * windowWidth,
        height: 0.52 * windowHeight,
        left: 0.01 * windowWidth,
        marginTop: 0.09 * windowHeight,
        // width: '100%',
        // height: '100%',
        // flex: 1

    },

    likeImage: {
        position: 'absolute',
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
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
        left: 0.047 * windowWidth,
        top: 0.0157 * windowHeight
    },

    displayDescription: {
        position: 'absolute',
        color: 'white',
        fontWeight: 'normal',
        textAlign: 'center',
        fontSize: 16,
        paddingLeft: '20px',
        // marginTop: '15px',
        top: 0.065 * windowHeight,
        left: 0.01 * windowWidth,
        flexGrow: 0.1
    },

    likestext: {
        position: 'absolute',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 26,
        top: 0.525 * windowHeight,
        left: 0.05 * windowWidth
    },



});