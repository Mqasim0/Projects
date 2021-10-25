import { StyleSheet, Dimensions } from "react-native";



export default StyleSheet.create({
    sendMessageContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        width: 200
    },
    input: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        width: "70%",
    },

    sendBtnContainer: {
        height: 120,
        backgroundColor: 'darkgray',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        width: "39%",
    },
    textfield: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        borderRadius: 35,
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height / 14,
        marginTop: 12,
        borderColor: '#424a75',
    },
});