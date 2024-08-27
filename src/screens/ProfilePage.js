import {
  Pressable,
  ScrollViewComponent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../services/userService";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, Caption, List, Title } from "react-native-paper";
import { Loading } from "../components";
import { logout } from "../redux/userSlice";
import { useNavigation } from "@react-navigation/native";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      if (user.uid) {
        const data = await fetchUserData(user.uid);
        if (data) {
          console.log("PROFILE PAGE LOG:::", data);
          setUserData(data);
        } else {
          console.log("BULUNAMADI PROFILE PAGE LOG ");
        }
      }
    };
    getUserData();
  }, [user]);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <View style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={styles.userInfoContent}>
          <Avatar.Icon size={65} icon={"account"} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Title style={styles.title}>{userData?.fullName}</Title>
            <Caption style={styles.caption}>{userData?.email}</Caption>
            <Caption style={styles.caption}>{userData?.phoneNumber}</Caption>
          </View>
        </View>
      </View>
      <View style={styles.menuWrapper}>
        <View style={styles.menuItem}>
          <List.Item
            style={styles.listItem}
            titleStyle={styles.listTitle}
            title="Bize Ulasin"
            left={() => <List.Icon icon="phone" />}
            onPress={() => navigation.navigate("ContactUs")}
          />
        </View>
        <View style={styles.menuItem}>
          <List.Item
            style={styles.listItem}
            titleStyle={styles.listTitle}
            title="Barbaros Cuzdanim"
            left={() => <List.Icon icon="credit-card" />}
            onPress={() => navigation.navigate("Wallet")}
          />
        </View>
        <View style={styles.menuItem}>
          <List.Item
            style={styles.listItem}
            titleStyle={styles.listTitle}
            title="Suruslerim"
            left={() => <List.Icon icon="history" />}
            onPress={() => navigation.navigate("Drives")}
          />
        </View>
        <View style={styles.menuItem}>
          <List.Item
            style={styles.listItem}
            titleStyle={styles.listTitle}
            title="Surus Kilavuzu"
            left={() => <List.Icon icon="security" />}
            onPress={() => navigation.navigate("HelpDrive")}
          />
        </View>
        <View style={styles.menuItem}>
          <List.Item
            style={styles.listItem}
            titleStyle={styles.listTitle}
            title="Ayarlar"
            left={() => <List.Icon icon="account-settings" />}
            onPress={() => navigation.navigate("Settings")}
          />
        </View>
        <View style={styles.menuItem}>
          <List.Item
            style={styles.listItem}
            titleStyle={styles.listTitle}
            title="Cikis Yap"
            left={() => <List.Icon icon="account-remove" />}
            onPress={handleLogout}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    paddingTop: 15,
    backgroundColor: "#f4f4f4",
  },
  userInfoSection: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 25,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  userInfoContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#6200ea",
    borderWidth: 2,
    borderColor: "#fff",
  },
  textContainer: {
    marginLeft: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  caption: {
    fontSize: 14,
    lineHeight: 16,
    color: "#666",
    marginTop: 2,
  },
  menuWrapper: {
    borderWidth: 0,
    margin: 10,
    padding: 8,
  },
  listItem: {
    borderWidth: 0,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginVertical: 4,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  menuItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
});
