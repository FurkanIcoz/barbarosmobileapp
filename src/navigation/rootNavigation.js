import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { useSelector } from "react-redux";
import app from "../../firebaseConfig";
const rootNavigation = () => {
  const { isAuth } = useSelector((state) => state.user);

  return (
    <NavigationContainer>
      {!isAuth ? <AuthStack /> : <UserStack />}
    </NavigationContainer>
  );
};

export default rootNavigation;
