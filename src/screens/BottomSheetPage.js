import React from "react";
import { CustomButton } from "../components";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { View } from "react-native";

const BottomSheetPage = () => {
  const dispatch = useDispatch();
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
    </View>
  );
};

export default BottomSheetPage;
