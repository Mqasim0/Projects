import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { width, height } from '../assets/Constant';

const ShowUsers = ({ name, img, onImgTap, onNameTap }) => {
    return (
        <>
            {/* <View style={styles.list}> */}
            <TouchableOpacity style={styles.list} onPress={onNameTap}>
                {img ? (
                    <Image source={{ uri: img }} resizeMode="cover" />
                ) : (
                    <Text style={styles.thumbnailName}>{name.charAt(0)}</Text>
                )}
                <Text style={styles.text} onPress={onNameTap}>{name}</Text>
            </TouchableOpacity>

            {/* </View> */}
        </>

    );
};





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
        height: height / 16,
        padding: 10,
    },
    text: {
        marginLeft: 20,
        fontWeight: 'bold'
    },
    thumbnailName: {
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 25,
        padding: 5,
        textAlign: 'center'
    }
})
export default ShowUsers;