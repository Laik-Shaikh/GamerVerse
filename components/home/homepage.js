import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height


export default function homepage({ navigation }) {
    return (
            <View style={styles.container} >
                <LinearGradient
                    start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
                    colors={['#D49CFF', '#8F00FF', '#0038FF', '#102265']}
                    style={styles.background} />
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: windowWidth,
        height: windowHeight

    },

    background: {
        position: "relative",
        width: windowWidth,
        height: windowHeight,
    }
});