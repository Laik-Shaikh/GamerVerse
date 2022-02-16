import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions,ImageBackground,TouchableOpacity,Text,TextInput, Modal, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import fire from '../firebase';
import uuid from 'uuid';
import { getStorage, ref as strRef, uploadBytes} from "firebase/storage";
import {Picker} from '@react-native-picker/picker';
import { PickerItem } from 'react-native/Libraries/Components/Picker/Picker';



const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


export default function homepage({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [platform, setPlatform] = useState(null);

    const pickerRef = useRef();

    const storage = getStorage();
    const metadata = {
      contentType: 'image/jpg',
    };

    const storageRef = strRef(storage, 'Post/'+'Something'+'.jpg');

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
        uploadBytes(storageRef, blob, metadata).then((snapshot) => {
            console.log('Uploaded a blob or file!');
          });
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
                                    style={styles.textInput}
                                />
                            {/* </View> */}
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

                            <Picker
                                ref={pickerRef}
                                selectedValue={platform}
                                onValueChange={(itemValue, itemIndex) => {
                                    setPlatform(itemValue)
                                }}
                                >
                                <Picker.Item label='Computer' value="Comp" />
                                <Picker.Item label='Mobile' value="Mob" />
                                <Picker.Item label='Console' value="CG" />
                            </Picker>

                            
                           
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
        width: 0.5*windowWidth,
        height: 0.5*windowHeight,
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

      buttonClose: {
        backgroundColor: 'red',
        // height: '80px',
        // width: '100px',
        height: 0.05*windowHeight,
        width: 0.08*windowWidth,
        left: 0.18*windowWidth,
        top: 0.38*windowHeight
      },

      uploadButton:{
        backgroundColor: 'green',
        height: 0.05*windowHeight,
        width: 0.08*windowWidth,
        left: -0.18*windowWidth,
        top: 0.33*windowHeight
      },

      chooseButton:{
        backgroundColor: '#0000cd',
        height: 0.05*windowHeight,
        width: 0.08*windowWidth,
        // left: 0.05*windowWidth,
        top: 0.28*windowHeight,
        alignContent: 'center',
        alignItems: 'center'
      },

      textStyle: {
        marginTop: '10px',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },

    selectedImage:{
        position: 'absolute',
        resizeMode: 'contain',
        width: 0.4*windowWidth,
        height: 0.27*windowHeight,
        bottom: 0.07*windowHeight,
        left: -0.1*windowWidth,
    },

    textInput:{
        position: 'absolute',
        width: 0.45*windowWidth,
        height: 0.08*windowHeight,
        paddingLeft: '15px',
        top: '20px',
        backgroundColor: 'cyan'
    }

});