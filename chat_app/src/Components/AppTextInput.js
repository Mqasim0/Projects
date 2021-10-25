import React from 'react';

import { View, StyleSheet, TextInput } from 'react-native';
import { Icon } from 'react-native-elements'
import { width } from '../assets/Constant';

const AppTextInput = ({ placeholder, icon, onChange, type = "material", secureTextEntry = false }) => {
    return (
        <View style={styles.container}>
            <Icon name={icon} type={type} size={25} />
            <TextInput
                placeholder={placeholder}
                onChangeText={onChange}
                secureTextEntry={secureTextEntry}
                style={styles.textInput} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#fff',
        margin: 10,
    },
    textInput: {
        width: width / 1.2,
        fontFamily: 'Poppins-Regular',
    }
});

export default AppTextInput;
