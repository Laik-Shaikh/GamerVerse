import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions,ImageBackground,TouchableOpacity,Text,TextInput, Modal, Alert, ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
// import fire from '../firebase';
// import uuid from 'uuid';
import { getStorage, ref as strRef, uploadBytes, getDownloadURL} from "firebase/storage";
import fire from '../firebase';
import 'firebase/database'
import { getDatabase, onValue, ref, query, orderByChild, equalTo, update, set, push, get } from "firebase/database";
import 'firebase/auth';
import { getAuth } from "firebase/auth";



const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


export default function homepage({ navigation }) {
    const auth = getAuth();
    const db = getDatabase();

    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [games, setGames] = React.useState(null);
    const [gamesName, setGamesName] = React.useState([]);
    const [description, setDescription] = useState(null)

    const storage = getStorage();
    const metadata = {
      contentType: 'image/jpg',
    };

    const GameRef = query(ref(db,'games'))
    const UserRef = query(ref(db,'users/UT9NF61y2ieqcv2VUT2es7C6WZJ3' + '/Games'))
    const PostCounter = query(ref(db, 'users/UT9NF61y2ieqcv2VUT2es7C6WZJ3/PostCount'));
    const PostCounter1 = query(ref(db, 'users/UT9NF61y2ieqcv2VUT2es7C6WZJ3'));
    
    var userid = 'UT9NF61y2ieqcv2VUT2es7C6WZJ3'
    const dbRef = ref(db,'posts/Post1')
    console.log(userid.Name)
    
    console.log(GameRef)
    console.log(UserRef)

    React.useEffect(() => {
        onValue(GameRef, (snapshot) => {
            const data = Object.values(snapshot.val());
            setGames(data)
            console.log(data)
        })

        onValue(UserRef, (snapshot) => {
            const data1 = Object.values(snapshot.val());
            setGamesName(data1)
            console.log(data1)
            }
        )

        // onValue(PostCounter, (snapshot) => {
        //     const data2 = snapshot.val();
        //     update(PostCounter, data2 + 1);
        //     }
            
       // )
    },[])

    console.log(gamesName);

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

    async function uploadPost(){
        const response = await fetch(image);
        const blob = await response.blob();
       
          get(PostCounter).then((snapshot) =>  {
            var data3 = snapshot.val();
            data3 = data3 + 1;
            console.log(data3)
            var storageRef = strRef(storage, 'Post/'+ userid + '_' + data3 + '.jpg');
            uploadBytes(storageRef, blob, metadata).then((snapshot) => {
                // getDownloadURL(storageRef).then((url)=>{
                //     set(dbRef,{
                //         Description : description,
                //         GameName: 'Clash of Clan',
                //         Image: url,
                //         Likes: 0,
                //         User: userid.Name
                //       })
                //       })
                // //   })
                console.log('Uploaded a blob or file!');
          });
            console.log(data3)
            update(PostCounter1, {
                PostCount: data3,
              }); 
            }
        )
        

    }

    if(!games){
        return (<Text>Rukavat ke liye khed hai</Text>)
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
                    <TextInput style={styles.InputStyle1} placeholder='Search for friends, games or tags'></TextInput>
                    <ImageBackground source={require('./homeAssets/notificationbar.png')} style={styles.notif} />
                    <Image source={require('./homeAssets/post2.png')} style={styles.posts} />
                    <Text style={styles.nametxt}>Danny Devadiga</Text>
                    <Text style={styles.posttxt}>Maddy Sheikh</Text>
                    <Image source={require('./homeAssets/dp.png')} style={styles.dpview} />
                    <Image source={require('./homeAssets/dp.png')} style={styles.dppostview} />
                    <ImageBackground source={require('./homeAssets/divider.png')} style={styles.divider} />
                    <ImageBackground source={require('./homeAssets/designspikes.png')} style={styles.spike2} />

                    <TouchableOpacity style={styles.upload} onPress={()=>setModalVisible(true)}>
                        <Text style={styles.uploadText}>Upload a Post</Text>
                    </TouchableOpacity>

                    <Modal
                        animationType='slide'
                        visible={modalVisible}  
                        transparent={true}
                        onRequestClose={()=>{
                            Alert.alert("Post Uploaded Successfully.");
                            setModalVisible(!modalVisible);
                        }}                  
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {/* <View> */}
                                <TextInput placeholder='Enter the Discription' 
                                    style={styles.textInput} onChangeText={description => setDescription(description)}
                                />
                                {console.log(description)}
                            {/* </View> */}
                            {/* <Image source={require('./homeAssets/divider.png')} style={styles.divider1} /> */}
                            <TouchableOpacity style={styles.button, styles.buttonClose}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                }}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>

                          {/* Upload to FireBase       */}

                            <TouchableOpacity style={styles.button, styles.uploadButton}
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
                                <Text style={styles.textStyle}>Upload</Text>
                            </TouchableOpacity>

                            {/* Choose Image */}

                            <TouchableOpacity style={styles.button, styles.chooseButton}
                                onPress={pickImage}
                            >
                                <Text style={styles.textStyle}>Choose Image</Text>
                                {image && <Image source={{ uri:image }} style={styles.selectedImage} />}
                            </TouchableOpacity>

                            <View style={styles.name}>
                                <Text style={styles.text1}>This Post is Related to : </Text>
                            </View>

                            <ScrollView style={styles.gameScrollContainer} vertical={true}>
                                {games.map((item, index) => {
                                    console.log(item.Code)
                                    if(gamesName.includes(item.Code)){
                                        
                                        return(
                                            <View key={index}>
                                                <TouchableOpacity style={styles.gameName} >
                                                <Text style={styles.gameText}>{item.Name}</Text>
                                                {console.log(item.Name)}
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
        left:0.3*windowWidth,
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

    text1:{
        "fontStyle": "normal",
        "fontWeight": "bold",
        "fontSize": 18,
        "color": "#000000",
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

    // divider1:{
    //     position:"absolute",
    //     top:0.2*windowHeight,
    //     left:0.02*windowWidth,
    //     resizeMode:'contain',
    //     height: 0.3*windowHeight,
    //     width: 0.01*windowWidth,
    // },

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

    upload:{
        position: 'absolute',
        width: 0.09*windowWidth,
        height: 0.03*windowHeight,
        top: 0.17*windowHeight,
        left: 0.7*windowWidth,
        backgroundColor: 'green',
        textAlign: 'center'
    },

    uploadText:{
        "fontStyle" : 'normal',
        "fontSize": 16,
        "fontWeight": 'bold',
        "color": '#ffffff'
    },

    gameText:{
        "fontStyle" : 'normal',
        "fontSize": 16,
        "fontWeight": '700',
        "color": '#000000',
        // paddingLeft: '10px',
        margin: '5px', 
        textAlign: 'center'
        
    },

    gameName:{
        // position: 'absolute',
        // borderTopRightRadius:  60,
        // borderBottomRightRadius:  60,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#006400',
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
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        width: 0.6*windowWidth,
        height: 0.6*windowHeight,
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

      uploadButton:{
        backgroundColor: 'green',
        height: 0.05*windowHeight,
        width: 0.15*windowWidth,
        left: -0.18*windowWidth,
        top: 0.43*windowHeight,
      
      },

      chooseButton:{
        backgroundColor: '#0000cd',
        height: 0.05*windowHeight,
        width: 0.15*windowWidth,
        // left: 0.05*windowWidth,
        top: 0.38*windowHeight,
        alignContent: 'center',
        alignItems: 'center'
      },

      buttonClose: {
        backgroundColor: 'red',
        // height: '80px',
        // width: '100px',
        height: 0.05*windowHeight,
        width: 0.15*windowWidth,
        left: 0.18*windowWidth,
        top: 0.48*windowHeight,
        
      },

      textStyle: {
        marginTop: '10px',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: '15px'
      },

    selectedImage:{
        position: 'absolute',
        resizeMode: 'contain',
        width: 0.38*windowWidth,
        height: 0.38*windowHeight,
        bottom: 0.07*windowHeight,
        left: -0.02*windowWidth,
    },

    textInput:{
        position: 'absolute',
        width: 0.54*windowWidth,
        height: 0.08*windowHeight,
        paddingLeft: '15px',
        top: '20px',
        backgroundColor: 'cyan'
    },

    name:{
        position: 'absolute',
        // width: 0.15*windowWidth,
        // height: 0.*windowHeight,
        left : 0.02*windowWidth,
        top: 0.14*windowHeight
    },

    gameScrollContainer:{
        position: 'absolute',
        width: 0.15*windowWidth,
        height: 0.3*windowHeight,
        left : 0.02*windowWidth,
        top: 0.19*windowHeight,
        // flexGrow: 0.1,
        // justifyContent: 'space-between',
        // backgroundColor: 'cyan'
    },

});