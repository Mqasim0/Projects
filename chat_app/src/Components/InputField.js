import React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from 'react-native-elements';

const InputField = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    onFocus,
    onBlur,
    ref,
    onSubmitEditing,
    getRef,
}) => {
    return (
        <View style={styles.inputContainer}>
            <Input
                placeholder={placeholder}
                placeholderTextColor="#ffff"
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                onFocus={onFocus}
                onBlur={onBlur}
                returnKeyType={"next"}
                ref={ref}
                getRef={getRef}
                onSubmitEditing={onSubmitEditing}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        borderRadius: 20,
        marginVertical: 10,
        backgroundColor: 'gray',
        borderBottomWidth: 0,
        height: 40,
    },

    input: {
        paddingLeft: 16,
        color: '#fff',
        position: "absolute",
        top: 0,
        width: "100%",
    },
});

export default InputField;
