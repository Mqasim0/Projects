import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { width } from '../assets/Constant';

const AppButton = ({ icon, title, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Icon name={icon} type="material" size={25} color="#fff" />
            <Text style={styles.Button}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        padding: 10,
        width: width / 1.1,
        borderRadius: 25,
        fontFamily: 'Poppins-Regular',
    },
    Button: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
    },
});

export default AppButton;
