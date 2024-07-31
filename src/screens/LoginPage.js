import React, { useState } from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import {CustomButton,CustomTextInput} from '../components/index'
import { useNavigation } from "@react-navigation/native";
const LoginPage = ()=>{

    const navigation = useNavigation();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('') 
    
    return(
        <SafeAreaView style={styles.container}>

            <View style={{flex:2, width:'100%',alignItems:'center',justifyContent:"space-evenly"}}>
                <Text style={styles.welcome}>Merhaba</Text>

                <Image
                    source={require('../../assets/barbaros.jpg')}
                    style={styles.logo}
                />
            </View>
            <View style={{flex:3,width:'100%',alignItems:'center'}}>
                
            <CustomTextInput
                title='Email'
                handlePlaceholder='EMAIL'
                isSecureText={false}
                handleOnchangeText= {setEmail}
                handleValue={email}
            />

            <CustomTextInput
                title='Şifre'
                handlePlaceholder='SIFRE'
                isSecureText={true}
                handleOnchangeText= {setPassword}
                handleValue={password}
            />
            
           <View style={{flex:3,width:'100%',alignItems:'center',justifyContent:"space-between"}}>
            <CustomButton
                handlePressButton={()=> alert(email + "   " + password)}
                title={'Giriş Yap'}
                setWidth={'80%'}
                setHeight={50}
                handleBackgroundColor={'#0a78ca'}
                handlePressedBackgroundColor={'#b3cde0'}
            />

            <Pressable onPress={()=> navigation.navigate('Register')}>
                <Text> Hesabınız Yok mu ?<Text style={{fontWeight:'bold'}}> Kayıt Olun</Text></Text>
            </Pressable>
            </View>
           </View>
{/* 
            <View style={styles.signUpContainer}>
                <Text>Hesabınız Yok mu?</Text>
                <CustomButton
                    handlePressButton={()=> navigation.navigate('Register')}
                    title={'Kayıt Ol'}
                    setWidth={'40%'}
                    setHeight={30}
                    handleBackgroundColor={'#b3cde0'}
                    handlePressedBackgroundColor={'#0a78ca'}
                />
            </View> */}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#fffdff"
    },
    welcome:{
        marginBottom:15,
        fontWeight:'bold',
        fontSize:35,
        color:'#0a78ca'
    },
    logo:{
        marginVertical:40
    },
    signUpContainer:{
        width:"80%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        
    }
})
//011c75 , 0a78ca, 15b3da
export default LoginPage;