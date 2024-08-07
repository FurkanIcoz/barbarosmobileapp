import React, { useEffect, useState } from "react";
import { CustomButton } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { Text, View } from "react-native";
import { fetchUserData } from "../services/userService";

const BottomSheetPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [userData, setuserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      if (user?.uid) {
        const data = await fetchUserData(user.uid);
        if (data) {
          setuserData(data);
        }
      }
    };
    getUserData();
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <CustomButton
        handleBackgroundColor={"blue"}
        handlePressedBackgroundColor={"gray"}
        title={"Çıkış Yap"}
        setHeight={50}
        setWidth={"40%"}
        handlePressButton={handleLogout}
      />

      {user ? (
        <>
          <Text style={{ color: "black" }}>
            Isim Soyisim: {userData.fullName}
          </Text>
          <Text style={{ color: "black" }}>Email: {userData.email}</Text>
          <Text style={{ color: "black" }}>
            Telefon: {userData.phoneNumber}
          </Text>
        </>
      ) : (
        <Text style={{ color: "black" }}>Kullanıcı bilgileri bulunamadı.</Text>
      )}
    </View>
  );
};

export default BottomSheetPage;
