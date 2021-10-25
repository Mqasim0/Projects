import React, { useLayoutEffect, useState, useEffect, Fragment, useRef } from "react";
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    TextInput,
    Keyboard,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from "react-native";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DocumentPicker from 'react-native-document-picker'
import storage from "@react-native-firebase/storage";
import styles from "./styles";
import getPath from '@flyerhq/react-native-android-uri-path';
import ImgToBase64 from 'react-native-image-base64';
import InputField from "../Components/InputField";
import ChatBox from "../Components/ChatBox";
import { Icon } from 'react-native-elements'
import RBSheet from "react-native-raw-bottom-sheet";
import firebase from "../../config";


const ChatScreen = ({ route, navigation }) => {
    const { params } = route;
    const refRBSheet = useRef();
    const { name, img, imgText, guestUserId, currentUserId, lat, long, address } = params;
    const [msgValue, setMsgValue] = useState("");
    const [messeges, setMesseges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filePath, setFilePath] = useState({})
    const [process, setProcess] = useState("");
    const [d_loading, setD_Loading] = useState(false)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: <Text>{name}</Text>,
        });
    }, [navigation]);

    const recieverMsg = async (
        msgValue,
        currentUserId,
        guestUserId,
        img,
        file,
        location,
    ) => {
        try {
            return await firebase
                .database()
                .ref('messeges/' + guestUserId)
                .child(currentUserId)
                .push({
                    messege: {
                        sender: currentUserId,
                        reciever: guestUserId,
                        msg: msgValue,
                        img: img,
                        file: file,
                        location: location,
                    },
                });
        } catch (error) {
            return error;
        }
    };

    const senderMsg = async (msgValue, currentUserId, guestUserId, img, file, location) => {
        try {
            return await firebase
                .database()
                .ref('messeges/' + currentUserId)
                .child(guestUserId)
                .push({
                    messege: {
                        sender: currentUserId,
                        reciever: guestUserId,
                        msg: msgValue,
                        img: img,
                        file: file,
                        location: location,

                    },
                });
        } catch (error) {
            return error;
        }
    };

    const storeFile = async (Name, uri) => {
        try {
            firebase
                .storage()
                .ref(Name)
                .putFile(uri)
                .then((snapshot) => {
                    //You can check the image is now uploaded in the storage bucket
                    console.log(`${Name} has been successfully uploaded.`);
                })

        } catch (error) {
            console.log("[Error]", error)
        }
    }

    const _chooseFile = async () => {
        // Opening Document Picker to select one file
        try {
            const fileDetails = await DocumentPicker.pick({
                // Provide which type of file you want user to pick
                type: [DocumentPicker.types.allFiles],
            });
            console.log(
                "fileDetails : " + JSON.stringify(fileDetails)
            );
            // Setting the state for selected File
            setFilePath(fileDetails);
            senderMsg(msgValue, currentUserId, guestUserId, "", fileDetails[0].name, "")
            _uploadFile()
                .then(() => { })
                .catch((err) => alert(err));
            recieverMsg(msgValue, currentUserId, guestUserId, "", fileDetails[0].name, "")
                .then(() => { })
                .catch((err) => alert(err));

        } catch (error) {
            setFilePath({});

            // If user canceled the document selection
            // alert(
            //     DocumentPicker.isCancel(error)
            //         ? "Canceled"
            //         : "Unknown Error: " + JSON.stringify(error)
            // );
        }
    };
    const _uploadFile = async () => {
        try {
            // Check if file selected
            let uri = getPath(filePath[0].uri);
            if (Object.keys(filePath).length == 0)
                return alert("Please Select any File");
            setLoading(true);

            // Create Reference
            // console.log(filePath.uri.replace("file://", ""));
            console.log(filePath.name);
            const reference =
                storage()
                    .ref(
                        `/myfiles/${filePath[0].name}`
                    );

            // Put File
            const task = reference.putFile(
                uri
            );
            // You can do different operation with task
            // task.pause();
            // task.resume();
            // task.cancel();

            task.on("state_changed", (taskSnapshot) => {
                setD_Loading(true);
                setProcess(
                    `${taskSnapshot.bytesTransferred} transferred 
               out of ${taskSnapshot.totalBytes}`
                );
                console.log(
                    `${taskSnapshot.bytesTransferred} transferred 
               out of ${taskSnapshot.totalBytes}`
                );
            });
            task.then(() => {
                setD_Loading(false);
                alert("Document send successfully!");
                setProcess("");
            });
            setFilePath({});
        } catch (error) {
            console.log("Error->", error);
            alert(`Error-> ${error}`);
        }
        setLoading(false);
    };

    useEffect(() => {
        try {
            firebase
                .database()
                .ref("messeges")
                .child(currentUserId)
                .child(guestUserId)
                .on("value", (dataSnapshot) => {
                    let msgs = [];
                    dataSnapshot.forEach((child) => {
                        msgs.push({
                            sendBy: child.val().messege.sender,
                            recievedBy: child.val().messege.reciever,
                            msg: child.val().messege.msg,
                            img: child.val().messege.img,
                            file: child.val().messege.file,
                            location: child.val().messege.location,
                        });
                    });
                    setMesseges(msgs.reverse());
                });
        } catch (error) {
            alert(error);
        }
    }, []);

    const handleSend = () => {
        if (msgValue) {
            senderMsg(msgValue, currentUserId, guestUserId, "", "", "",)
                .then(() => { })
                .catch((err) => alert(err));
            recieverMsg(msgValue, currentUserId, guestUserId, "", "", "",)
                .then(() => { })
                .catch((err) => alert(err));
        }
        setMsgValue("");
    };

    const handleAddress = () => {
        senderMsg(msgValue, currentUserId, guestUserId, "", "", "38 E, Block-6 Block 6 PECHS, Karachi, Karachi City, Sindh, Pakistan",)
            .then(() => { })
            .catch((err) => alert(err));
        recieverMsg(msgValue, currentUserId, guestUserId, "", "", "38 E, Block-6 Block 6 PECHS, Karachi, Karachi City, Sindh, Pakistan",)
            .then(() => { })
            .catch((err) => alert(err));


    };
    const handleCamera = () => {
        launchImageLibrary('mixed', (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                ImgToBase64.getBase64String(response.assets[0].uri)
                    .then(async (base64String) => {
                        let source = "data:image/jpeg;base64," + base64String;
                        senderMsg(msgValue, currentUserId, guestUserId, source, "", "",)
                            .then(() => { })
                            .catch((err) => alert(err));
                        recieverMsg(msgValue, currentUserId, guestUserId, source, "", "",)
                            .then(() => { })
                            .catch((err) => alert(err));
                    })
                    .catch(err => console.log(err));
            }
        })
    };
    console.log(lat, long)
    const filePciker = async () => {
        // Pick a single file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            }).then((result) => {
                let name = result[0].name;
                let uri = result[0].uri
                storeFile(name, uri)
                    .then(() => console.log('done'))
                    .catch((err) => console.log(err))
                console.log(result)
                senderMsg(msgValue, currentUserId, guestUserId, "", name)
                    .then(() => { })
                    .catch((err) => alert(err));
                recieverMsg(msgValue, currentUserId, guestUserId, "", name)
                    .then(() => { })
                    .catch((err) => alert(err));
            }).catch(err => console.log(err))


        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err
            }
        }
    }

    const openCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                ImgToBase64.getBase64String(response.assets[0].uri)
                    .then(async (base64String) => {
                        let source = "data:image/jpeg;base64," + base64String;
                        senderMsg(msgValue, currentUserId, guestUserId, source, "", "",)
                            .then(() => { })
                            .catch((err) => alert(err));
                        recieverMsg(msgValue, currentUserId, guestUserId, source, "", "",)
                            .then(() => { })
                            .catch((err) => alert(err));
                    })
                    .catch(err => console.log(err));
            }
        });

    }
    const handleOnChange = (text) => {
        setMsgValue(text);
    };

    const imgTap = (chatImg) => {
        navigation.navigate("ShowFullImg", { name, img: chatImg });
    };
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>

            <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={Keyboard.dismiss}
            >
                <Fragment>
                    <FlatList
                        inverted
                        data={messeges}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => (
                            <ChatBox
                                msg={item.msg}
                                userId={item.sendBy}
                                img={item.img}
                                onImgTap={() => imgTap(item.img)}
                                file={item.file}
                                location={item.location}

                            />
                        )}
                    />
                    <View style={styles.textfield}>
                        <TextInput placeholder="Enter your Message Here ..."
                            value={msgValue}
                            onChangeText={(text) => handleOnChange(text)}
                            style={{ width: Dimensions.get('screen').width / 1.8, flex: 1 }}
                        />
                        <TouchableOpacity>
                            <Icon name="attach-file" type="material" color="black" size={30} style={{ marginRight: 30 }} onPress={() => refRBSheet.current.open()} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSend()}>
                            <Icon name="send" type="feather" color="black" size={30} />
                        </TouchableOpacity>
                    </View>
                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        customStyles={{
                            wrapper: {
                                backgroundColor: "transparent"
                            },
                            draggableIcon: {
                                backgroundColor: "#000"
                            }
                        }}
                    >

                        {!d_loading ?
                            <>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', }}>
                                    <TouchableOpacity >
                                        <Icon name="camera" type="material-community" color="black" size={40} onPress={() => openCamera()} />
                                        <Text>Camera</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity >
                                        <Icon name="images" type="entypo" color="black" size={40} onPress={() => handleCamera()} />
                                        <Text>Gallery</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity >
                                        <Icon name="file-document-outline" type="material-community" color="black" size={40} onPress={() => _chooseFile()} />
                                        <Text>Document</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: Dimensions.get('screen').height / 20 }}>
                                    <TouchableOpacity >
                                        <Icon name="location-pin" type="entypo" color="black" size={40} onPress={() => navigation.replace('MapScreen') && handleAddress()} />
                                        <Text>Location</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                            : <ActivityIndicator size="small" color="#0000ff" />
                        }


                    </RBSheet>
                </Fragment>
            </TouchableWithoutFeedback>
            {/* </KeyboardAvoidingView> */}
        </SafeAreaView>
    );
};

export default ChatScreen;