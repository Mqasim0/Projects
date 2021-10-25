import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements'


import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({ navigation }) => {
    const [animating, setAnimating] = useState(true);

    const getAsyncStorage = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            getAsyncStorage('uuid')
                .then((uuid) => {
                    if (uuid) {
                        navigation.replace('HomeScreen')
                    } else {
                        navigation.replace('LoginScreen')
                    }
                })
                .catch((err) => {
                    console.log(err);
                    navigation.replace('LoginScreen')
                })
        }, 3000);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Icon name="hipchat" type="fontisto" size={105} />
                <Text style={styles.logoText}>Chit Chat</Text>
            </View>
            <ActivityIndicator
                animating={animating}
                color="#FFFFFF"
                size="large"
                style={styles.activityIndicator}
            />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
    logo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    logoText: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold',
        fontSize: 30
    }
});
