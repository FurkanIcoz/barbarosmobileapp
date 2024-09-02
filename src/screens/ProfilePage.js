import {
  Pressable,
  ScrollView,
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
import { CustomButton, Loading } from "../components";
import { logout } from "../redux/userSlice";
import { useNavigation } from "@react-navigation/native";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { balance, cards, isLoading, error } = useSelector((state) => state.wallet);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const getUserData = async () => {
      if (user.uid) {
        const data = await fetchUserData(user.uid);
        if (data) {
          //console.log("PROFILE PAGE LOG:::", data);
          setUserData(data);
          setLoading(false)
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

  if(loading){
    return <Loading/>
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={styles.userInfoContent}>
          {/* <Avatar.Icon size={65} icon={"account"} style={styles.avatar} /> */}
          <View style={styles.textContainer}>
            <Title style={styles.title}>{`Merhaba, ${userData?.fullName.split(' ')[0]}`}</Title>
            <Caption style={styles.caption}>{userData?.email}</Caption>
            <Caption style={styles.caption}>{userData?.phoneNumber}</Caption>
          </View>
        </View>
      </View>
      <View style={styles.menuWrapperWallet}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Cüzdan Bakiyem</Text>
        <Text style={styles.balanceAmount}>₺{balance.toFixed(2)}</Text>
        <Pressable style={styles.topUpButton} onPress={() => navigation.navigate("TopUpPage")}>
          <Text style={styles.topUpText}>Bakiye Yükle</Text>
        </Pressable>
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
    </ScrollView>
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
    marginTop: 40,
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginBottom: 15,
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
    color: "#4d9ee9",
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
    marginHorizontal:3,
    padding: 8,
    bottom:10
  },
  menuWrapperWallet: {
    borderWidth: 0,
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
  balanceContainer: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 7,
  },
  balanceText: {
    fontSize: 18,
    color: "#555",
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4d9ee9",
    marginVertical: 8,
  },
  topUpButton: {
    backgroundColor: "#4d9ee9",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  topUpText: {
    color: "#fff",
    fontSize: 16,
  },
});
