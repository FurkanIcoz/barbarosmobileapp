import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const ContactUsPage = () => {
  return (
    <View style={styles.container}>
        
    </View>
  )
}

export default ContactUsPage

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    textInput:{
        width:"90%",
        borderWidth:1,
        borderRadius:5,
        height:'30%',
    }
})