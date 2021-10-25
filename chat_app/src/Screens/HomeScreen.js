import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native'
import Header from '../Components/Header'
import { width, height } from '../assets/Constant';
import ImagePicker from "react-native-image-picker";
import { Icon } from 'react-native-elements'
import firebase from '../../config'
import ShowUsers from '../Components/ShowUsers';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = ({ navigation }) => {
    const [userDetail, setUserDetail] = useState({
        id: "",
        name: "",
        profileImg: "",
    });
    const [uuid, setuuid] = useState('');
    const [getScrollPosition, setScrollPosition] = useState(0);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false)

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
        setLoading(true)
        try {
            firebase
                .database()
                .ref("users")
                .on("value", (dataSnapshot) => {
                    let users = [];
                    let currentUser = {
                        id: "",
                        name: "",
                        profileImg: "",
                    };
                    dataSnapshot.forEach((child) => {
                        getAsyncStorage('uuid')
                            .then((uuid) => {
                                setuuid(uuid)
                                console.log(uuid)
                                if (uuid == child.val().uuid) {
                                    currentUser.id = uuid;
                                    currentUser.name = child.val().name;
                                    currentUser.profileImg = child.val().profileImg;
                                    setUserDetail(currentUser);
                                }
                                else {
                                    console.log("else blog")
                                    users.push({
                                        id: child.val().uuid,
                                        name: child.val().name,
                                        profileImg: child.val().profileImg,
                                    });
                                    setAllUsers(users);
                                }
                            });

                    });
                    setLoading(false)
                });

        } catch (error) {
            alert(error);
            setLoading(false)
        }
    }, []);

    console.log("all users", allUsers)
    const UpdateUser = async (uuid, imgSource) => {
        try {
            return await firebase
                .database()
                .ref("users/" + uuid)
                .update({
                    profileImg: imgSource,
                });
        } catch (error) {
            return error;
        }
    };

    const nameTap = (profileImg, name, guestUserId) => {
        if (!profileImg) {
            navigation.navigate("ChatScreen", {
                name,
                imgText: name.charAt(0),
                guestUserId,
                currentUserId: uuid,
            });
        } else {
            navigation.navigate("ChatScreen", {
                name,
                img: profileImg,
                guestUserId,
                currentUserId: uuid,
            });
        }
    };

    const imgTap = (profileImg, name) => {
        if (!profileImg) {
            navigation.navigate("ShowFullImg", {
                name,
                imgText: name.charAt(0),
            });
        } else {
            navigation.navigate("ShowFullImg", { name, img: profileImg });
        }
    };



    const selectPhotoTapped = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
            },
        };
    }
    return (
        <View>
            <Header text="chit chat" icon="settings" name="hipchat" onPress={() => navigation.navigate('SettingScreen')} />
            {loading ? <ActivityIndicator
                animating={true}
                color="#000000"
                size="large"
                style={styles.activityIndicator}
            /> :
                <FlatList
                    alwaysBounceVertical={false}
                    data={allUsers}
                    keyExtractor={(_, index) => index.toString()}
                    onScroll={(event) =>
                        setScrollPosition(event.nativeEvent.contentOffset.y)
                    }

                    renderItem={({ item }) => (
                        <ShowUsers
                            name={item.name}
                            img={item.profileImg}
                            onImgTap={() => imgTap(item.profileImg, item.name)}
                            onNameTap={() => nameTap(item.profileImg, item.name, item.id)}
                        />
                    )}
                />
            }

        </View>
    )
}

const styles = StyleSheet.create({
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
        height: height / 8,
        padding: 10,
    }
})


export default HomeScreen;