import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'

const Header = ({ text, name, icon, onPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Icon name={name} type="fontisto" size={35} color="white" />
                <Text style={styles.logoText}>{text}</Text>
            </View>
            <TouchableOpacity onPress={onPress}>
                <Icon name={icon} type="feather" size={25} color="white" />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 10
    },
    logo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff'

    }
})

export default Header;
