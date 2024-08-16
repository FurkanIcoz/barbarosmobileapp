import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const CustomButton = ({handlePressButton,title,setWidth,setHeight,handleBackgroundColor,handlePressedBackgroundColor,style,icon}) => {
const fontSizeValue = setHeight*5/8.5;

  return (
    <Pressable 
        onPress={handlePressButton}
        style={({pressed}) =>[{
            backgroundColor: pressed ? handlePressedBackgroundColor :handleBackgroundColor,
            width:setWidth,height:setHeight,
            justifyContent: 'center',
            alignItems: 'center',
        },styles.loginButton,style]}
    >
         <View style={styles.buttonContent}>
        {icon && <Ionicons name={icon} size={28} color="white" style={styles.icon} />}
        <Text style={[{ fontSize: fontSizeValue }, styles.loginButtonText]}>{title}</Text>
      </View>
    </Pressable>

  )
}

export default CustomButton
const styles = StyleSheet.create({
    loginButton: {
        marginVertical: 15,
        borderColor: '#0a78ca',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
      },
      loginButtonText: {
        fontWeight: 'bold',
        color: '#fffdff',
        marginLeft: 10,
      },
      buttonContent: {
        flexDirection: 'row', 
        alignItems: 'center',
      },
      icon: {
        marginRight: 10,
      },
})