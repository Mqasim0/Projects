import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Button,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements'

import AsyncStorage from '@react-native-community/async-storage';
import firebase from '../../config'


import { height } from '../assets/Constant';
import AppButton from '../Components/AppButton';
import AppTextInput from '../Components/AppTextInput'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [load, setLoad] = useState(false)

    const LoginRequest = async (email, password) => {
        try {
            return await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            return error;
        }
    };
    const setAsyncStorage = async (key, item) => {
        try {
            await AsyncStorage.setItem(key, item);
        } catch (error) {
            console.log(error);
        }
    }
    let onLogin = () => {
        if (!email && !password) {
            alert('All fields are required')
        }
        else {
            setLoad(true)
            LoginRequest(email, password)
                .then((res) => {
                    if (!res.additionalUserInfo) {

                        alert(res);
                        setLoad(false)
                        return;
                    }
                    setAsyncStorage('uuid', res.user.uid);
                    setEmail('')
                    setPassword('')
                    setLoad(false)
                    navigation.replace("HomeScreen");
                })
                .catch((err) => {
                    setLoad(false)
                    alert(err);
                });
        }
    }
    return (
        <View style={styles.superContainer}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" >

                <View style={styles.container}>
                    <View style={styles.logo}>
                        <Icon name="hipchat" type="fontisto" size={55} />
                        <Text style={styles.logoText}>Chit Chat</Text>
                    </View>

                    <Text style={styles.text}>Login</Text>
                    <AppTextInput
                        placeholder="Enter Email ...."
                        value={email}
                        icon="email-outline"
                        type="material-community"
                        onChange={text => setEmail(text)}
                    />
                    <AppTextInput
                        placeholder="Enter Password ... "
                        value={password}
                        icon="lock"
                        type="feather"
                        onChange={text => setPassword(text)}
                        secureTextEntry={true}
                    />
                    <AppButton icon="login" title={load ? <ActivityIndicator
                        animating={true}
                        color="#ffff"
                        size="small"
                    /> : "Login"} onPress={() => onLogin()} />


                    <View
                        style={styles.linkStyle}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Almarai-Light', }}>Don't have Account?</Text>
                        <Text style={styles.signup} onPress={() => navigation.navigate('SignupScreen')}>Sign Up</Text>
                    </View>
                </View>


            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    superContainer: {
        height: height / 1.2,
    },
    container: {
        marginTop: height / 8,
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
    },

});

export default LoginScreen;
