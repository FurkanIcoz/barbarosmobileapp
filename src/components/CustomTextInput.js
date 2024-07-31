import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const CustomTextInput = ({title,isSecureText,handlePlaceholder,handleOnchangeText,handleValue}) => {
  return (
    <View style={styles.inputContainer}>
        <Text style={styles.inputTextName}>{title}</Text>

        <TextInput 
            placeholder={handlePlaceholder}
            onChangeText={handleOnchangeText}
            secureTextEntry={isSecureText}
            style={styles.inputText}
            value={handleValue}
        />
    </View>
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
    inputTextName:{
        fontWeight:'bold',
        color:'#0a78ca'
    },    
    inputContainer:{
        width:'80%',
        marginVertical:10
    },
    inputText:{
        
        borderBottomWidth:0.85,
        width: '100%',
        height:44,
        borderRadius:14,
        borderColor:'#0a78ca',
        textAlign:"center",
        marginVertical:7
    },
})