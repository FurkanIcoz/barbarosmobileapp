import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const LoginPage = ({navigation})=>{
    return(
        <View style={styles.container}>
            <Pressable 
                onPress={()=> navigation.navigate('Register')}
                style={styles.loginButton}
            >
                <Text style={styles.buttonText}> Sign Up</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    loginButton:{
        backgroundColor:'lightblue',
        borderRadius:20,
        width: '80%',
        alignItems:"center",
        height:50,
        justifyContent:"center"
    },
    buttonText:{
        fontWeight:"bold",
        fontSize: 25,

        
    }
})

export default LoginPage;