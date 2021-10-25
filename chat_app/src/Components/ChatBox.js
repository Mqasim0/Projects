import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Linking, ActivityIndicator } from "react-native";
import { Icon } from 'react-native-elements'
import storage from "@react-native-firebase/storage";

import AsyncStorage from '@react-native-community/async-storage';


const ChatBox = ({ userId, msg, img, onImgTap, file, location }) => {

    const [isCurrentUser, setIsCurrentUser] = useState(true)
    const [fileUrl, setFileUrl] = useState('')
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

    const downloadFile = async () => {
        let url = storage().ref(`/myfiles/${file}`);
        url.getDownloadURL().then((link) => {
            Linking.openURL(link)
        }).catch(err => console.log(err))

    }

    const openMap = () => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${latitude},${longitude}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });
        return url
    }


    useEffect(() => {
        getAsyncStorage('uuid')
            .then((uuid) => {
                if (userId == uuid) {

                    setIsCurrentUser(true)
                }
                else {
                    setIsCurrentUser(false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [msg])


    return (
        <>
            {file ? <View style={{ elevation: 1, padding: 10, flexDirection: 'row', width: Dimensions.get('window').width / 1.2, borderColor: 'black', margin: 5 }}>
                <Text style={{ color: 'black', flex: 1 }}>{file}</Text>
                <TouchableOpacity>
                    <Icon name="download" type="material-community" color="black" size={30} onPress={() => downloadFile()} />
                </TouchableOpacity>
            </View> :
                location ? <TouchableOpacity style={{ elevation: 1, padding: 10, width: Dimensions.get('window').width / 1.2, height: Dimensions.get('window').height / 8, borderColor: 'black', margin: 5 }} onPress={() => Linking.openURL(openMap())}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Location :</Text>
                    <Text style={{ color: 'black', flex: 1 }}>{location}</Text>
                </TouchableOpacity>

                    :
                    <View
                        style={{
                            margin: 1,
                            borderTopLeftRadius: isCurrentUser ? 20 : 0,
                            borderTopRightRadius: isCurrentUser ? 0 : 20,
                            color: isCurrentUser ? 'white' : 'black',
                            backgroundColor: isCurrentUser ? 'lightblue' : 'blue',
                            alignSelf: isCurrentUser ? "flex-end" : "flex-start",
                        }}
                    >
                        {
                            img ? (

                                // <TouchableOpacity onPress={onImgTap}>
                                <Image
                                    source={{ uri: img }}
                                    resizeMode="cover"
                                    style={{ height: 200, width: Dimensions.get('screen').width / 2 }}
                                />
                                // </TouchableOpacity>

                            ) : (
                                <Text
                                    style={styles.chatTxt}
                                >
                                    {msg}
                                </Text>
                            )
                        }
                    </View >
            }

        </>

    );
};

const styles = StyleSheet.create({
    chatTxt: {
        color: "#fff",
        fontSize: 18,
        marginVertical: 10,
        fontWeight: "500",
        padding: 8,

    },
})

export default ChatBox;