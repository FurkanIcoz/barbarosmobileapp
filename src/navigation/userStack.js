import React from "react";
import { HomePage, ProfilePage } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet } from "react-native";
import CustomTabBarButton from "../components/CustomTabBarButton";
import { Divider } from "react-native-paper";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UserStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // if (route.name === "QrPage") {
          //   iconName = focused ? "qr-code-sharp" : "qr-code-sharp";
          // }
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-sharp" : "person-outline";
          }
          return <Ionicons name={iconName} size={29} color={color} />;
          // return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#f8f8f8",
          borderTopWidth: 0,
          elevation: 0,
        },
        
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: false }}
      />
      {/* <Tab.Screen
        name="QrPage"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      /> */}
   
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>

    // <Stack.Navigator initialRouteName="Home">
    //   <Stack.Screen
    //     name="Home"
    //     component={HomePage}
    //     options={{ headerShown: false }}
    //   />
    //   <Stack.Screen name="Profile" component={ProfilePage} />
    // </Stack.Navigator>
  );
};

export default UserStack;
