import React from "react";
import {
  AddCardPage,
  ContactUsPage,
  DrivesPage,
  DrivingPage,
  HelpDrivePage,
  HomePage,
  ProfilePage,
  QRScannerPage,
  SettingsPage,
  TopUpPage,
  WalletPage,
} from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return (
            <Ionicons name={iconName} size={focused ? 34 : 26} color={color} />
          );
        },
        tabBarActiveTintColor: "#3386FF",
        tabBarInactiveTintColor: "#7F8C8D",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          right: 11,
          left: 11,
          elevation: 10,
          backgroundColor: "#ffffff",
          borderRadius: 20,
          height: 60,
          borderWidth: 1.5,
          borderColor: "#ddd",
          shadowColor: "#000",
          shadowOpacity: 0.5,
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowRadius: 10,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScannerPage}
        options={{ headerShown: false, title: "QR Scanner" }}
      />
      <Stack.Screen
        name="DrivingPage"
        component={DrivingPage}
        options={{ headerShown: false, title: "Driving" }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUsPage}
        options={{
          headerShown: true,
          title: "Bize Ulaşın",
          headerBackTitleVisible: false,
          headerStyle: {
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Wallet"
        component={WalletPage}
        options={{
          headerShown: true,
          title: "Barbaros Cüzdanım",
          headerBackTitleVisible: false,
          headerStyle: {
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Drives"
        component={DrivesPage}
        options={{
          headerShown: true,
          title: "Sürüşlerim",
          headerBackTitleVisible: false,
          headerStyle: {
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="HelpDrive"
        component={HelpDrivePage}
        options={{
          headerShown: true,
          title: "Sürüş Kılavuzu",
          headerBackTitleVisible: false,
          headerStyle: {
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          headerShown: true,
          title: "Ayarlar",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="TopUpPage"
        component={TopUpPage}
        options={{
          headerShown: true,
          title: "Para Yükle",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="AddCardPage"
        component={AddCardPage}
        options={{
          headerShown: true,
          title: "Kart Ekle",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default UserStack;
