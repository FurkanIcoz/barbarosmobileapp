import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import UserStack from './userStack'
import AuthStack from './authStack'
const rootNavigation = () => {

    const isAuth = false

  return (
    <NavigationContainer>
        {
            !isAuth 
                ? <AuthStack/>
                : <UserStack/> 
        }
    </NavigationContainer>
  )
}

export default rootNavigation

