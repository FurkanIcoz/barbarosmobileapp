import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomButton = ({handlePressButton,title,setWidth,setHeight,handleBackgroundColor,handlePressedBackgroundColor}) => {
const fontSizeValue = setHeight*5/8.5;

  return (
    <Pressable 
        onPress={handlePressButton}
        style={({pressed}) =>[{
            backgroundColor: pressed ? handlePressedBackgroundColor :handleBackgroundColor,
            width:setWidth,height:setHeight
        },styles.loginButton]}
    >
        <Text style={[{fontSize:fontSizeValue},styles.loginButtonText]}> {title}</Text>
    </Pressable>

  )
}

export default CustomButton
const styles = StyleSheet.create({
    loginButton:{
        marginVertical:15,
        borderRadius:18,
        borderColor:'#0a78ca',
        alignItems:"center",
        justifyContent:"center"
    },
    loginButtonText:{
        fontWeight:"bold",
        color:'#fffdff'
    },
})