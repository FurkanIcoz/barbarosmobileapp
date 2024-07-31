import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginPage, RegisterPage } from '../screens';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
    initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginPage} options={{headerShown:false}}/>
        <Stack.Screen name='Register' component={RegisterPage} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default AuthStack

