import React from "react";
import { Pressable, Text, View } from "react-native";

const LoginPage = ({navigation})=>{
    return(
        <View>
            <Pressable 
                onPress={()=> navigation.navigate('Register')}
            >
                <Text> Sign Up</Text>
            </Pressable>
        </View>
    )
}

export default LoginPage;