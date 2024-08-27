import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { CustomButton, CustomTextInput, Loading } from "../components";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/userSlice";
import Toast from 'react-native-toast-message';

const RegisterPage = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  const validatePassword = (password) => {
    const minLength = 6;
    const maxLength = 14;
    const hasNumber = /\d/;
    const hasLetter = /[a-zA-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      return "Şifre en az 6 karakter uzunluğunda olmalıdır.";
    }
    if (password.length > maxLength) {
      return "Şifre en fazla 14 karakter uzunluğunda olabilir.";
    }
    if (!hasNumber.test(password)) {
      return "Şifre en az bir rakam içermelidir.";
    }
    if (!hasLetter.test(password)) {
      return "Şifre en az bir harf içermelidir.";
    }
    if (!hasSpecialChar.test(password)) {
      return "Şifre en az bir özel karakter içermelidir.(,.!*-_)"
    }
    return null;
  };

  const handleRegister = () => {
    if (!fullName || !phoneNumber || !email || !password) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Kayıt Başarısız',
        text2: 'Lütfen tüm alanları doldurduğunuzdan emin olun.',
        visibilityTime: 4000,
      });
      return;
    }


    const passwordError = validatePassword(password);
    if (passwordError) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Şifre Hatası',
        text2: passwordError,
        visibilityTime: 4000,
      });
      return;
    }

    dispatch(register({ email, password, fullName, phoneNumber }));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
      <Toast/>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.title}>
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
                handleOnchangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
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
                  Zaten bir hesabınız var mı?
                  <Text style={{ fontWeight: "bold" }}> Giriş Yapın</Text>
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
    
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffdff",
    justifyContent:'center',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    alignItems: "center",
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
  signupOptions: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
