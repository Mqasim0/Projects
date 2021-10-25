import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import Header from '../Components/Header'
import { width, height } from '../assets/Constant';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '../../config'

const SettingScreen = ({ navigation }) => {

    const clearAsyncStorage = async () => {
        try {
            AsyncStorage.clear();
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    const LogOutUser = async () => {
        try {
            return await firebase.auth().signOut();
        } catch (error) {
            return error;
        }
    };

    const logout = () => {
        LogOutUser()
            .then(() => {
                clearAsyncStorage()
                    .then(() => {
                        navigation.replace("LoginScreen");
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => alert(err));
    };

    return (
        <>
            <Header text="Settings" icon="home" onPress={() => navigation.navigate('HomeScreen')} />
            <View style={styles.container}>

                <TouchableOpacity style={styles.list}>
                    <Icon name="user-o" type="font-awesome" size={25} />
                    <Text style={styles.text}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.list} onPress={() =>
                    Alert.alert(
                        "Logout",
                        "Are you sure to log out",
                        [
                            {
                                text: "Yes",
                                onPress: () => logout(),
                            },
                            {
                                text: "No",
                            },
                        ],
                        { cancelable: false }
                    )
                }>
                    <Icon name="logout" type="material" size={25} />
                    <Text style={styles.text}>Logout</Text>
                </TouchableOpacity>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    list: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginTop: 1,
        elevation: 2,
        width: width / 1,
        height: height / 16,
        padding: 10,
    },
    text: {
        marginLeft: 20,
        fontWeight: 'bold'
    }

})


export default SettingScreen;