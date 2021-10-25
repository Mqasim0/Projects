import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, ActivityIndicator, } from 'react-native';
import { height, width } from '../assets/Constant';

import AsyncStorage from '@react-native-community/async-storage';


import AppButton from '../Components/AppButton';
import AppTextInput from '../Components/AppTextInput';
import firebase from '../../config'

import { Icon } from 'react-native-elements'


const SignupScreen = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [load, setLoad] = useState(false)


    const SignUpRequest = async (email, password) => {
        try {
            return await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
        } catch (error) {
            return error;
        }
    }


    const AddUser = async (name, email, uid, profileImg) => {
        try {
            return await firebase
                .database()
                .ref("users/" + uid)
                .set({
                    name: name,
                    email: email,
                    uuid: uid,
                    profileImg: profileImg,
                });
        } catch (error) {
            return error;
        }
    }
    const setAsyncStorage = async (key, item) => {
        try {
            await AsyncStorage.setItem(key, item);
        } catch (error) {
            console.log(error);
        }
    }


    let onSignup = () => {
        if (!email && !password && !username && !confirmPassword) {
            alert('All fields required')
        }
        else if (password != confirmPassword) {
            alert('Password did not match')
        } else {
            setLoad(true)
            SignUpRequest(email, password)
                .then((res) => {
                    if (!res.additionalUserInfo) {
                        alert(res);
                        setLoad(false)
                        return;
                    }
                    let uuid = firebase.auth().currentUser.uid;
                    let profileImg = "";
                    AddUser(username, email, uuid, profileImg)
                        .then(() => {
                            setAsyncStorage('uuid', uuid);
                            setUsername('')
                            setEmail('')
                            setPassword('')
                            setConfirmPassword('')
                            setLoad(false)
                            alert("You Registered Successfully")
                            navigation.replace("LoginScreen");
                        })
                        .catch((err) => {
                            alert(err);
                            setLoad(false)
                        });
                })
                .catch((err) => {
                    alert(err);
                    setLoad(false)
                });
        }

    }





    return (
        <>
            <ScrollView contentInsetAdjustmentBehavior="automatic">

                <View style={styles.container}>
                    <View style={styles.logo}>
                        <Icon name="hipchat" type="fontisto" size={55} />
                        <Text style={styles.logoText}>Chit Chat</Text>
                    </View>
                    <Text style={styles.text}>REGISTER</Text>
                    <AppTextInput
                        placeholder="Enter username ...."
                        icon="user"
                        value={username}
                        type="antdesign"
                        onChange={text => setUsername(text)}
                    />
                    <AppTextInput
                        placeholder="Enter Email ...."
                        value={email}
                        icon="email-outline"
                        type="material-community"
                        onChange={text => setEmail(text)}
                    />

                    <AppTextInput
                        placeholder="Enter Password  ...."
                        value={password}
                        icon="lock"
                        type="feather"
                        secureTextEntry={true}
                        onChange={text => setPassword(text)}
                    />
                    <AppTextInput
                        placeholder="Enter Confirm Password ... "
                        value={confirmPassword}
                        icon="lock"
                        type="feather"
                        secureTextEntry={true}
                        onChange={text => setConfirmPassword(text)}
                    />
                    <AppButton icon="login" title={load ? <ActivityIndicator
                        animating={true}
                        color="#ffff"
                        size="small"
                    /> : "Register"} onPress={() => onSignup()} />
                    <View
                        style={styles.linkStyle}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Almarai-Light', }}>Already have an account?</Text>
                        <Text style={styles.signup} onPress={() => navigation.navigate('LoginScreen')}>Login</Text>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: height / 15,
        justifyContent: 'center',
    },
    text: {
        padding: 20,
        fontWeight: 'bold',
        fontSize: 35,
        color: '#000',
        fontFamily: 'sans-serif-medium'
    },
    linkStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    signup: {
        color: 'blue',
        marginLeft: 4,
        textDecorationLine: 'underline'
    },
    logo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    logoText: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold'
    }
});

export default SignupScreen;
