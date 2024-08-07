import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { CustomButton, CustomTextInput, Loading } from "../components";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/userSlice";

const RegisterPage = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  const handleRegister = () => {
    dispatch(register({ email, password, fullName, phoneNumber }));
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.welcome}>Hoşgeldiniz</Text>
        <Image
          source={require("../../assets/barbaros.jpg")}
          style={styles.logo}
        />
      </View>

      <View style={styles.textInputContainer}>
        <CustomTextInput
          title="İsim"
          isSecureText={false}
          handleOnchangeText={(name) => setFullName(name)}
          handleValue={fullName}
          handlePlaceholder="İsminizi Giriniz"
        />
        <CustomTextInput
          title="Telefon"
          isSecureText={false}
          handleOnchangeText={(phoneNumber) => setphoneNumber(phoneNumber)}
          handleValue={phoneNumber}
          handlePlaceholder="Telefon Numaranızı Giriniz"
        />
        <CustomTextInput
          title="Email"
          isSecureText={false}
          handleOnchangeText={(email) => setEmail(email)}
          handleValue={email}
          handlePlaceholder="E-Posta Adresinizi Giriniz"
        />
        <CustomTextInput
          title="Şifre"
          isSecureText={true}
          handleOnchangeText={(password) => setPassword(password)}
          handleValue={password}
          handlePlaceholder="Bir Şifre Belirleyin"
        />
      </View>
      <View style={styles.signupOptions}>
        <CustomButton
          handlePressButton={handleRegister}
          title="Kayıt Ol"
          setWidth="80%"
          setHeight={40}
          handleBackgroundColor={"#0a78ca"}
          handlePressedBackgroundColor={"#b3cde0"}
        />
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text>
            {" "}
            Zaten bir hesabınız var mı ?
            <Text style={{ fontWeight: "bold" }}> Giriş Yapın</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fffdff",
  },
  title: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logo: {
    marginVertical: 20,
  },
  textInputContainer: {
    flex: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  welcome: {
    paddingTop: 20,
    fontWeight: "bold",
    fontSize: 35,
    color: "#0a78ca",
    alignItems: "center",
    justifyContent: "center",
  },
  signupOptions: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
