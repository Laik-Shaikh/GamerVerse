import React from 'react';
import { View, StyleSheet, Image, Dimensions, ImageBackground, Text, TouchableOpacity, FlatList, TextInput, ScrollView ,ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';

import fire from '../firebase';
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import 'firebase/database'
import { getDatabase, onValue, ref, query, orderByChild, equalTo, update, get, push,startAt,endAt } from "firebase/database";
import { getStorage, ref as strRef, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


export default function profilepage({ navigation, route }) {
    const auth = getAuth();
    var nowEditable = route.params
    var profileUid = auth.currentUser.uid;
    const [image, setImage] = useState(null);
    var [newName, setNewName] = React.useState()
    var [newPhone, setNewPhone] = React.useState()
    var [newAbout, setNewAbout] = React.useState()
    var [newDisc, setNewDisc] = React.useState()
    var [myGames, setMyGames] = React.useState()
    var [location,setLocation] = React.useState()
    var [selectedValue, setSelectedValue] = React.useState()
    const [textInputValue, setTextInputValue] = React.useState('');
    const [searchLocation, setSearchLocation] = React.useState(null);
    const [searchSelectedValue, setSearchSelectedValue] = React.useState()
    var [lowerLoc,setLoweLoc] = React.useState()
    var [gameData, setGameData] = React.useState()
    let gameFlag

    const storage = getStorage();
    const metadata = {
        contentType: 'image/jpg',
    };
    const storageRef = strRef(storage, 'Profile/' + profileUid + '.jpg');
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
    var [userInfo, setUserInfo] = React.useState()
    const db = getDatabase();
    const profileRef = query(ref(db, 'users'), orderByChild('uid'), equalTo(profileUid))
    const picUpdateRef = query(ref(db, 'users/' + profileUid))
    console.log(profileRef)
    React.useEffect(() => {
        onValue(profileRef, (snapshot) => {
            const data = Object.values(snapshot.val());
            console.log(data)
            setUserInfo(data)
        })

        get(query(ref(db, 'users/' + profileUid + '/Games'))).then((snapshot) => {
            setMyGames(Object.values(snapshot.val()))
        })

        get(query(ref(db, 'games/'))).then((snapshot) => {
            console.log(Object.values(snapshot.val()))
            setGameData(Object.values(snapshot.val()))
        })

    }, [])

    const getLocationsFromApi = async (loc) => {
        let response = await fetch(
          'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text='+loc+'&f=json'
        );
        let json = await response.json();
        setLocation(json.suggestions);
      }
    function renderSug() {
        if (!selectedValue) {
            return (

                <FlatList

                    style={styles.LocSuggestions}
                    data={location}
                    keyExtractor={(item) => item.magicKey}
                    renderItem={(suggestion) => {
                        return (
                            <TouchableOpacity style={styles.item} onPress={() => 
                            {setLoweLoc(suggestion.item.text.toLowerCase())
                            setSelectedValue(suggestion.item.text)}}>
                                <Text style={styles.itemText}>{suggestion.item.text}</Text>
                            </TouchableOpacity>)
                    }}


                ></FlatList>

            )
        }
    }

    var handleSearch = (e) => {
        if (e.nativeEvent.key == 'Enter') {
            navigation.push("SearchName", { textInputValue })
            console.log('search started')
        }
    }

    const getLocations = async (loc) => {
        if (loc) {
            const UserRef = query(ref(db, 'locations'), orderByChild('LocationLower'), startAt(loc), endAt(loc + "\uf8ff"))
            onValue(UserRef, (snapshot) => {
                if (snapshot.val()) {
                    setSearchLocation(Object.values(snapshot.val()))
                }
            })
        }
    }

    function renderSearchSug() {
        if (!searchSelectedValue) {
            console.log(searchLocation)
            return (<FlatList

                data={searchLocation}
                style={styles.LocSearchSuggestions}
                keyExtractor={(item) => item.magicKey}
                renderItem={(suggestion) => {
                    return (
                        <TouchableOpacity style={styles.searchItem} onPress={() => {
                            setSelectedValue(suggestion.item.Location)
                            navigation.push("SearchName", { textInputValue: suggestion.item.Location })
                        }

                        }>
                            <Text style={styles.searchItemText}>{suggestion.item.Location}</Text>
                        </TouchableOpacity>)
                }}


            ></FlatList>)
        }
    }


    async function sendFirebaseData() {
        const response = await fetch(image);
        const blob = await response.blob();
        if (!newPhone) {
            newPhone = userInfo[0].PhoneNumber
        }
        if (!newName) {
            newName = userInfo[0].Name
        }
        if (!newAbout) {
            newAbout = userInfo[0].aboutMe
        }
        if (!newDisc) {
            newDisc = userInfo[0].DiscordId
        }
        if (!selectedValue){
            selectedValue = userInfo[0].Location
            lowerLoc = userInfo[0].LocationLower
        }
        if (blob.type == 'text/html') {
            update(picUpdateRef, {
                // Email: auth.currentUser.email,
                PhoneNumber: newPhone,
                Location: selectedValue,
                LocationLower: lowerLoc,
                // Games:['XX'],
                // RequestedProfiles:['XX'],
                // ConfirmedProfiles:['XX'],
                DiscordId: newDisc,
                // uid: auth.currentUser.uid,
                Name: newName,
                aboutMe: newAbout,
                DisplayPicture: userInfo[0].DisplayPicture
            })

            let LocUploadRef = query(ref(db,'locations/'),orderByChild('LocationLower'),equalTo(selectedValue.toLowerCase()))
            get(LocUploadRef).then((snapshot) => {
              console.log("Snapshot exists?: " + snapshot.exists())
              console.log(snapshot.val())
              if(!snapshot.exists()){
                push(ref(db,'locations/'),{
                  Location: selectedValue,
                  LocationLower: selectedValue.toLowerCase(),
                })
              }
                
              
            })
        }
        else {
            uploadBytes(storageRef, blob, metadata).then((snapshot) => {
                getDownloadURL(storageRef).then((url) => {
                    update(picUpdateRef, {
                        // Email: auth.currentUser.email,
                        PhoneNumber: newPhone,
                        Location: selectedValue,
                        LocationLower: lowerLoc,
                        // Games:['XX'],
                        // RequestedProfiles:['XX'],
                        // ConfirmedProfiles:['XX'],
                        DiscordId: newDisc,
                        // uid: auth.currentUser.uid,
                        Name: newName,
                        aboutMe: newAbout,
                        DisplayPicture: url
                    })

                    let LocUploadRef = query(ref(db,'locations/'),orderByChild('LocationLower'),equalTo(selectedValue.toLowerCase()))
                    get(LocUploadRef).then((snapshot) => {
                      console.log("Snapshot exists?: " + snapshot.exists())
                      console.log(snapshot.val())
                      if(!snapshot.exists()){
                        push(ref(db,'locations/'),{
                          Location: selectedValue,
                          LocationLower: selectedValue.toLowerCase(),
                        })
                      }
                        
                      
                    })
                })
            })
        }
    }
    if (!userInfo || !myGames || !gameData) {
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
            );
    }
    if (nowEditable) {
        return (
            <View style={styles.container} >
                <LinearGradient
                    start={{ x: 0, y: 1 }} end={{ x: 0, y: -1 }}
                    colors={['#013C00', '#000000']}
                    style={styles.background} >
                    <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fdesignspikes1.png?alt=media&token=40fb8f39-0720-4688-917e-c02817598a01"} style={styles.spike1} />
                    <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Flogo.png?alt=media&token=7468c404-5678-43b2-92eb-310ffa58433c"} style={styles.title} onPress={() => navigation.push("Home")} />
                    <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FMenuBar.png?alt=media&token=d9c15cc1-98a6-41b8-a5f9-533a2f5d1f7b"} style={styles.menu} />

                    <TouchableOpacity style={styles.homebtn} onPress={() => navigation.push("Home")}>
                        <   Text style={styles.robototxt}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.profilebtn} onPress={() => navigation.push("Profile", false)}>
                        <Text style={styles.highlighttxt}>Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mygamesbtn} onPress={() => navigation.push("")}>
                        <Text style={styles.robototxt}>My Games</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.gamehubbtn} onPress={() => navigation.push("")}>
                        <Text style={styles.robototxt}>Game Hub</Text>
                    </TouchableOpacity>

                    <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fdesignspikes.png?alt=media&token=a8871878-f2d0-4fa7-b74c-992a8fbe695e"} style={styles.spike2} />


                    <View style={styles.photoContainer}>
                        <Text style={styles.headTxt}>My Photo</Text>
                        <TouchableOpacity onPress={pickImage} >
                            <Image source={userInfo[0].DisplayPicture} style={[styles.dpicture, {left: -0.044 * windowWidth}]} />
                            {image && <Image source={{ uri: image }} style={[styles.dpicture, {left: -0.044 * windowWidth}]} />}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.aboutMeContainer}>
                        <Text style={styles.headTxt}>About Me</Text>
                        <TextInput style={[styles.aboutMeTxt, {width: 0.173 * windowWidth}]} maxLength={586} placeholder='Enter your description here'
                            onChangeText={(text) => setNewAbout(text)}></TextInput>
                    </View>

                    <TouchableOpacity style={styles.Button} title='Done' onPress={() => {
                        console.log("Done btn pressed")
                        sendFirebaseData()
                        nowEditable = false;
                        navigation.push("Profile", nowEditable)
                    }
                    }>
                        <Text style={styles.ButtonText}>Done</Text>
                    </TouchableOpacity>

                    <View style={styles.divider1} />
                    <View style={[styles.infoContainer, { top: 0.15 * windowHeight, backgroundColor: "rgba(255, 255, 255, 0.15)" }]}>
                        <Text style={styles.infoHeadTxt}>Name</Text>
                        <TextInput style={[styles.infoHeadTxt, { left: 0.2 * windowWidth }]} maxLength={20}
                            placeholder='Enter new name'
                            onChangeText={(text) => setNewName(text)}></TextInput>
                    </View>

                    <View style={[styles.infoContainer, { top: 0.27 * windowHeight, zIndex: 100}]}>
                        <Text style={styles.infoHeadTxt}>Location</Text>
                        <TextInput

                            style={[styles.infoHeadTxt, { left: 0.2 * windowWidth }]}
                            value={selectedValue}
                            onChangeText={(text) => getLocationsFromApi(text)}
                            placeholder="Enter your new location"
                            onFocus={() => {
                                if (selectedValue){
                                    setSelectedValue(undefined)
                                    setLoweLoc(undefined)}
                            }}>
                        </TextInput>
                        {renderSug()}
                    </View>

                    <View style={[styles.infoContainer, { top: 0.39 * windowHeight, backgroundColor: "rgba(255, 255, 255, 0.15)" }]}>
                        <Text style={styles.infoHeadTxt}>Phone Number</Text>
                        <TextInput style={[styles.infoHeadTxt, { left: 0.2 * windowWidth }]}
                            placeholder='Enter new phone number'
                            onChangeText={(text) => setNewPhone(text)}
                        ></TextInput>
                    </View>

                    <View style={[styles.infoContainer, { top: 0.51 * windowHeight, }]}>
                        <Text style={styles.infoHeadTxt}>Email</Text>
                        <Text style={[styles.infoHeadTxt, { left: 0.2 * windowWidth }]}>{userInfo[0].Email}</Text>
                    </View>

                    <View style={[styles.infoContainer, { top: 0.63 * windowHeight, backgroundColor: "rgba(255, 255, 255, 0.15)" }]}>
                        <Text style={styles.infoHeadTxt}>Discord Id</Text>
                        <TextInput style={[styles.infoHeadTxt, { left: 0.2 * windowWidth }]}
                            placeholder='Enter new discord ID'
                            onChangeText={(text) => setNewDisc(text)}></TextInput>
                    </View>

                    <View style={[styles.infoContainer, { top: 0.75 * windowHeight, height: 0.248 * windowHeight }]}>
                        <Text style={[styles.infoHeadTxt, { top: 0.1 * windowHeight, }]}>My Games</Text>
                        <ScrollView contentContainerStyle={{ justifyContent: 'space-around' }}
                            style={styles.scrollContainer2} horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            {

                                gameData.map((game, index) => {
                                    if (myGames.includes(gameData[index].Code)) {
                                        return (
                                            <View key={index}>
                                                <TouchableOpacity key={index} style={styles.gameImage} onPress={() => navigation.push("Game", { GameCode: game.Code })}>
                                                    <Image source={game.Image} style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
                                                    <Text style={[styles.infoHeadTxt, { top: 0.19 * windowHeight, left: 0.03 * windowWidth, fontSize: "16px", lineHeight: "13px" }]}>{game.Name}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }
                                })

                            }

                        </ScrollView>
                    </View>

                    <View style={styles.divider2} />

                </LinearGradient>
            </View>
        );
    }


if (userInfo && !nowEditable && gameData && (userInfo[0].privacyStatus==1)) {
    return (
        <View style={styles.container} >
            <LinearGradient
                start={{ x: 0, y: 1 }} end={{ x: 0, y: -1 }}
                colors={['#013C00', '#000000']}
                style={styles.background} >
                <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fdesignspikes1.png?alt=media&token=40fb8f39-0720-4688-917e-c02817598a01"} style={styles.spike1} />
                <TouchableOpacity style={styles.privacy2} onPress={() => 
                {
                    update(picUpdateRef,{
                        privacyStatus:0
                    })
                    navigation.push("Profile")
                }
                }>
                <Text style={styles.uploadText}>Privacy Protection ON</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.mypost} onPress={() => navigation.push("MyPost")}>
                    <Text style={styles.postText}>My Posts</Text>
                </TouchableOpacity>

                <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Flogo.png?alt=media&token=7468c404-5678-43b2-92eb-310ffa58433c"} style={styles.title} onPress={() => navigation.push("Home")} />
                <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FMenuBar.png?alt=media&token=d9c15cc1-98a6-41b8-a5f9-533a2f5d1f7b"} style={styles.menu} />

                <TouchableOpacity style={styles.homebtn} onPress={() => navigation.push("Home")}>
                    <   Text style={styles.robototxt}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.profilebtn} onPress={() => navigation.push("Profile")}>
                    <Text style={styles.highlighttxt}>Profile</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.mygamesbtn}  onPress={() => navigation.push("MyGames")}>
                    <Text style={styles.robototxt}>My Games</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.gamehubbtn}  onPress={() => navigation.push("GameHub")}>
                    <Text style={styles.robototxt}>Game Hub</Text>
                </TouchableOpacity>

                <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FsearchIcon.png?alt=media&token=f31e94f7-0772-4713-8472-caf11d49a78d"} style={styles.searchIcon} />
                <TextInput 
                style={styles.InputStyle1} 
                placeholder='Search for friends, games or location'
                onChangeText={(text) => {
                    setSearchLocation(undefined)
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
                    if(searchSelectedValue)
                        setSearchSelectedValue(undefined)
                    }}
                ></TextInput>
                {renderSearchSug()}
                <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fdesignspikes.png?alt=media&token=a8871878-f2d0-4fa7-b74c-992a8fbe695e"} style={styles.spike2} />


                <View style={styles.photoContainer}>
                    <Text style={styles.headTxt}>My Photo</Text>
                    <Image source={userInfo[0].DisplayPicture} style={styles.dpicture} />
                </View>

                <View style={styles.aboutMeContainer}>
                    <Text style={styles.headTxt}>About Me</Text>
                    <Text style={styles.aboutMeTxt}>{userInfo[0].aboutMe}</Text>
                </View>

                <TouchableOpacity style={styles.Button} title='Edit' onPress={() => {
                    console.log("Edit btn pressed")
                    nowEditable = true;
                    navigation.push("Profile", nowEditable)
                }
                }>
                    <Text style={styles.ButtonText}>Edit</Text>
                </TouchableOpacity>

                <View style={styles.divider1} />
                {console.log(userInfo[0].Name)}
                <View style={[styles.infoContainer, { top: 0.15 * windowHeight, backgroundColor: "rgba(255, 255, 255, 0.15)" }]}>
                    <Text style={styles.infoHeadTxt}>Name</Text>
                    <Text style={[styles.infoHeadTxt, { left: 0.2 * windowWidth }]}>{userInfo[0].Name}</Text>
                </View>

                <View style={[styles.infoContainer, { top: 0.27 * windowHeight, }]}>
                    <Text style={styles.infoHeadTxt}>Location</Text>
                    <Text style={[styles.infoHeadTxt, { left: 0.2 * windowWidth }]}>{userInfo[0].Location}</Text>
                </View>

                <View style={[styles.infoContainer, { top: 0.39 * windowHeight, backgroundColor: "rgba(255, 255, 255, 0.15)" }]}>
                    <Text style={styles.infoHeadTxt}>Phone Number</Text>
                    <Text style={[styles.infoHeadTxt, { left: 0.2 * windowWidth }]}>+91 {userInfo[0].PhoneNumber}</Text>
                </View>

                <View style={[styles.infoContainer, { top: 0.51 * windowHeight, }]}>
                    <Text style={styles.infoHeadTxt}>Email</Text>
                    <Text style={[styles.infoHeadTxt, { left: 0.2 * windowWidth }]}>{userInfo[0].Email}</Text>
                </View>

                <View style={[styles.infoContainer, { top: 0.63 * windowHeight, backgroundColor: "rgba(255, 255, 255, 0.15)" }]}>
                    <Text style={styles.infoHeadTxt}>Discord Id</Text>
                    <Text style={[styles.infoHeadTxt, { left: 0.2 * windowWidth }]}>{userInfo[0].DiscordId}</Text>
                </View>

                <View style={[styles.infoContainer, { top: 0.75 * windowHeight, height: 0.248 * windowHeight }]}>
                    <Text style={[styles.infoHeadTxt, { top: 0.1 * windowHeight, }]}>My Games</Text>
                    <ScrollView contentContainerStyle={{ justifyContent: 'space-around' }}
                        style={styles.scrollContainer2} horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        {

                            gameData.map((game, index) => {
                                if (myGames.includes(gameData[index].Code)) {
                                    return (
                                        <View key={index}>
                                            <TouchableOpacity key={index} style={styles.gameImage} onPress={() => navigation.push("Game", { GameCode: game.Code })}>
                                                <Image source={game.Image} style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
                                                <Text style={[styles.infoHeadTxt, { top: 0.19 * windowHeight, left: 0.03 * windowWidth, fontSize: "16px", lineHeight: "13px" }]}>{game.Name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            })

                        }

                    </ScrollView>
                </View>

                <View style={styles.divider2} />

            </LinearGradient>
        </View>
    );
}


if(userInfo && !nowEditable && gameData && 
(userInfo[0].privacyStatus==0)){
    return (
        <View style={styles.container} >
            <LinearGradient
                start={{ x: 0, y: 1 }} end={{ x: 0, y: -1 }}
                colors={['#013C00', '#000000']}
                style={styles.background} >
                <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fdesignspikes1.png?alt=media&token=40fb8f39-0720-4688-917e-c02817598a01"} style={styles.spike1} />
                <TouchableOpacity style={styles.privacy1} onPress={() => 
                {
                    update(picUpdateRef,{
                        privacyStatus:1
                    })
                    navigation.push("Profile")
                }
                }>
                <Text style={styles.uploadText}>Privacy Protection OFF</Text>
                </TouchableOpacity>
                <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Flogo.png?alt=media&token=7468c404-5678-43b2-92eb-310ffa58433c"} style={styles.title} onPress={() => navigation.push("Home")} />
                <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FMenuBar.png?alt=media&token=d9c15cc1-98a6-41b8-a5f9-533a2f5d1f7b"} style={styles.menu} />

                <TouchableOpacity style={styles.homebtn} onPress={() => navigation.push("Home")}>
                    <   Text style={styles.robototxt}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.profilebtn} onPress={() => navigation.push("Profile")}>
                    <Text style={styles.highlighttxt}>Profile</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.mygamesbtn}  onPress={() => navigation.push("MyGames")}>
                    <Text style={styles.robototxt}>My Games</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.gamehubbtn}  onPress={() => navigation.push("GameHub")}>
                    <Text style={styles.robototxt}>Game Hub</Text>
                </TouchableOpacity>

                <Image source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2FsearchIcon.png?alt=media&token=f31e94f7-0772-4713-8472-caf11d49a78d"} style={styles.searchIcon} />
                <TextInput 
                style={styles.InputStyle1} 
                placeholder='Search for friends, games or location'
                onChangeText={(text) => {
                    setSearchLocation(undefined)
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
                    if(searchSelectedValue)
                        setSearchSelectedValue(undefined)
                    }}
                ></TextInput>
                {renderSearchSug()}
                <ImageBackground source={"https://firebasestorage.googleapis.com/v0/b/rcoegamerverse.appspot.com/o/Assets%2FLoginPage%2Fdesignspikes.png?alt=media&token=a8871878-f2d0-4fa7-b74c-992a8fbe695e"} style={styles.spike2} />


                <View style={styles.photoContainer}>
                    <Text style={styles.headTxt}>My Photo</Text>
                    <Image source={userInfo[0].DisplayPicture} style={styles.dpicture} />
                </View>

                <View style={styles.aboutMeContainer}>
                    <Text style={styles.headTxt}>About Me</Text>
                    <Text style={styles.aboutMeTxt}>{userInfo[0].aboutMe}</Text>
                </View>

                <TouchableOpacity style={styles.Button} title='Edit' onPress={() => {
                    console.log("Edit btn pressed")
                    nowEditable = true;
                    navigation.push("Profile", nowEditable)
                }
                }>
                    <Text style={styles.ButtonText}>Edit</Text>
                </TouchableOpacity>

                <View style={styles.divider1} />
                {console.log(userInfo[0].Name)}
                <View style={[styles.infoContainer, { top: 0.15 * windowHeight, backgroundColor: "rgba(255, 255, 255, 0.15)" }]}>
                    <Text style={styles.infoHeadTxt}>Name</Text>
                    <Text style={[styles.infoHeadTxt, { left: 0.2 * windowWidth }]}>{userInfo[0].Name}</Text>
                </View>

                <View style={[styles.infoContainer, { top: 0.27 * windowHeight, }]}>
                    <Text style={styles.infoHeadTxt}>Location</Text>
                    <Text style={[styles.infoHeadTxt, { left: 0.2 * windowWidth }]}>{userInfo[0].Location}</Text>
                </View>

                <View style={[styles.infoContainer, { top: 0.39 * windowHeight, backgroundColor: "rgba(255, 255, 255, 0.15)" }]}>
                    <Text style={styles.infoHeadTxt}>Phone Number</Text>
                    <Text style={[styles.infoHeadTxt, { left: 0.2 * windowWidth }]}>+91 {userInfo[0].PhoneNumber}</Text>
                </View>

                <View style={[styles.infoContainer, { top: 0.51 * windowHeight, }]}>
                    <Text style={styles.infoHeadTxt}>Email</Text>
                    <Text style={[styles.infoHeadTxt, { left: 0.2 * windowWidth }]}>{userInfo[0].Email}</Text>
                </View>

                <View style={[styles.infoContainer, { top: 0.63 * windowHeight, backgroundColor: "rgba(255, 255, 255, 0.15)" }]}>
                    <Text style={styles.infoHeadTxt}>Discord Id</Text>
                    <Text style={[styles.infoHeadTxt, { left: 0.2 * windowWidth }]}>{userInfo[0].DiscordId}</Text>
                </View>

                <View style={[styles.infoContainer, { top: 0.75 * windowHeight, height: 0.248 * windowHeight }]}>
                    <Text style={[styles.infoHeadTxt, { top: 0.1 * windowHeight, }]}>My Games</Text>
                    <ScrollView contentContainerStyle={{ justifyContent: 'space-around' }}
                        style={styles.scrollContainer2} horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        {

                            gameData.map((game, index) => {
                                if (myGames.includes(gameData[index].Code)) {
                                    return (
                                        <View key={index}>
                                            <TouchableOpacity key={index} style={styles.gameImage} onPress={() => navigation.push("Game", { GameCode: game.Code })}>
                                                <Image source={game.Image} style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
                                                <Text style={[styles.infoHeadTxt, { top: 0.19 * windowHeight, left: 0.03 * windowWidth, fontSize: "16px", lineHeight: "13px" }]}>{game.Name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            })

                        }

                    </ScrollView>
                </View>

                <View style={styles.divider2} />

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
    uploadText: {
        "fontStyle": 'normal',
        "fontSize": 15,
        "fontWeight": 'bold',
        "color": '#ffffff',
        paddingTop: "2px"
    },
    background: {
        position: "relative",
        width: windowWidth,
        height: windowHeight,
    },
    title: {
        position: "absolute",
        left: 0.35 * windowWidth,
        resizeMode: 'contain',
        height: 0.1 * windowHeight,
        width: 0.35 * windowWidth,
    },
    menu: {
        position: "absolute",
        resizeMode: 'contain',
        top: 0.10 * windowHeight,
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
    },
    profilebtn: {
        position: "absolute",
        top: 0.107 * windowHeight,
        left: 0.20 * windowWidth,
    },
    mygamesbtn: {
        position: "absolute",
        top: 0.11 * windowHeight,
        left: 0.35 * windowWidth,
    },
    gamehubbtn: {
        position: "absolute",
        top: 0.11 * windowHeight,
        left: 0.50 * windowWidth,
    },
    searchbar: {
        position: "absolute",
        resizeMode: 'contain',
        top: 0.10 * windowHeight,
        left: 0.7 * windowWidth,
        height: 0.05 * windowHeight,
        width: 0.25 * windowWidth,
    },
    photoContainer: {
        position: "absolute",
        width: 0.32 * windowWidth,
        height: 0.3 * windowHeight,
        top: 0.15 * windowHeight,
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        transform: "matrix(1, 0, 0, 1, 0, 0)"
    },
    dpicture: {
        position: "absolute",
        top: 0.1 * windowHeight,
        width: 0.15 * windowHeight,
        height: 0.15 * windowHeight,
        borderRadius: 0.075 * windowHeight,
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

    LocSearchSuggestions: {
        position: 'absolute',
        top: 150 / 1024 * windowHeight,
        right: 85 / 1440 * windowWidth,
        flexGrow: 0,
        width: 305 / 1440 * windowWidth,
        backgroundColor: 'rgba(255, 255, 255,1)',
        zIndex: 1,
    },

    searchItemText: {
        fontSize: 15,
        paddingLeft: 10
    },

    searchItem: {
        width: 305 / 1440 * windowWidth,
        paddingTop: 10
    },

    Button:
    {
        position: "absolute",
        width: 136 / 1440 * windowWidth,
        height: 53 / 1024 * windowHeight,
        left: 165 / 1440 * windowWidth,
        top: 915 / 1024 * windowHeight,
        backgroundColor: "#39750A",
        borderRadius: 2,
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

    headTxt: {
        position: "absolute",
        top: 0.02 * windowHeight,
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "22px",
        lineHeight: "26px",
        textAlign: "center",
        color: "#FFFFFF"
    },

    aboutMeContainer: {
        position: "absolute",
        width: 0.32 * windowWidth,
        height: 0.547 * windowHeight,
        top: 0.45 * windowHeight,
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    privacy1: {
        position: 'absolute',
        width: 0.13 * windowWidth,
        alignItems: 'center',
        textAlign: 'center',
        height: 0.03 * windowHeight,
        top: 0.05 * windowHeight,
        left: 0.85 * windowWidth,
        
        backgroundColor: 'red',
        textAlign: 'center',
        borderRadius: '2px'
    },
    privacy2: {
        position: 'absolute',
        width: 0.13 * windowWidth,
        height: 0.03 * windowHeight,
        top: 0.05 * windowHeight,
        left: 0.85 * windowWidth,
        backgroundColor: 'green',
        textAlign: 'center',
        borderRadius: '2px'
    },
    spike1: {
        position: "absolute",
        resizeMode: 'contain',
        right: "0px",
        height: 0.2 * windowHeight,
        width: 0.15 * windowWidth,
    },

    aboutMeTxt: {
        position: "absolute",
        top: 0.09 * windowHeight,
        paddingLeft: 15,
        paddingRight: 15,
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 20,
        lineHeight: 23,
        textAlign: "justify",
        color: "rgba(255, 255, 255, 0.75)"
    },

    infoContainer: {
        position: "absolute",
        width: 0.68 * windowWidth,
        height: 0.12 * windowHeight,
        left: 0.32 * windowWidth,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        transform: "matrix(1, 0, 0, 1, 0, 0)",
    },

    infoHeadTxt: {
        position: "absolute",
        top: 0.045 * windowHeight,
        left: 0.05 * windowHeight,
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "22px",
        lineHeight: "26px",
        color: "#FFFFFF",
    },

    LocSuggestions: {
        position: 'absolute',
        top: 0.078 * windowHeight,
        left: 0.354 * windowHeight,
        flexGrow: 0,
        width: 0.178 * windowWidth,
        backgroundColor: 'rgba(255, 255, 255,1)',
    },

    itemText: {
        position: 'absolute',
        fontSize: 15,
        paddingLeft: 10,
    },

    item: {
        width: 0.2 * windowWidth,
        paddingTop: 10,        
        height: 0.05*windowHeight,
        flexGrow: 0
    },
    gameImage: {
        padding: 1,
        height: 0.18 * windowHeight,
        width: 0.17 * windowWidth,
    },

    scrollContainer2: {
        position: 'absolute',
        width: 0.48 * windowWidth,
        height: 0.22 * windowHeight,
        left: 0.18 * windowWidth,
        top: 0.02 * windowHeight,
        flexGrow: 0.1,
    },

    divider1: {
        position: "absolute",
        height: 0.848 * windowHeight,
        left: 0.32 * windowWidth,
        top: 0.15 * windowHeight,
        borderWidth: 0.00001 * windowWidth,
        borderColor: "rgba(168, 182, 175, 0.5)",
        borderStyle: "solid"
    },

    divider2: {
        position: "absolute",
        height: 0.848 * windowHeight,
        left: 0.5 * windowWidth,
        top: 0.15 * windowHeight,
        borderWidth: 0.00001 * windowWidth,
        borderColor: "rgba(168, 182, 175, 0.5)",
        borderStyle: "solid"
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

    mypost: {
        position: 'absolute',
        width: 0.09 * windowWidth,
        height: 0.03 * windowHeight,
        top: 0.05* windowHeight,
        left: 0.05 * windowWidth,
        backgroundColor: 'green',
        textAlign: 'center',
        borderRadius: '2px'
    },

    postText: {
        "fontStyle": 'normal',
        "fontSize": 15,
        "fontWeight": 'bold',
        "color": '#ffffff',
        paddingTop: "2px"
    },
});