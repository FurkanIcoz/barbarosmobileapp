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
import Toast from "react-native-toast-message";

const RegisterPage = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEnglish, setIsEnglish] = useState(false);

  const validatePassword = (password) => {
    const minLength = 6;
    const maxLength = 14;
    const hasNumber = /\d/;
    const hasLetter = /[a-zA-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      return isEnglish
        ? "Password must be at least 6 characters long."
        : "Şifre en az 6 karakter uzunluğunda olmalıdır.";
    }
    if (password.length > maxLength) {
      return isEnglish
        ? "Password can be up to 14 characters long."
        : "Şifre en fazla 14 karakter uzunluğunda olabilir.";
    }
    if (!hasNumber.test(password)) {
      return isEnglish
        ? "Password must contain at least one number."
        : "Şifre en az bir rakam içermelidir.";
    }
    if (!hasLetter.test(password)) {
      return isEnglish
        ? "Password must contain at least one letter."
        : "Şifre en az bir harf içermelidir.";
    }
    if (!hasSpecialChar.test(password)) {
      return isEnglish
        ? "Password must contain at least one special character."
        : "Şifre en az bir özel karakter içermelidir.";
    }
    return null;
  };

  const handleRegister = () => {
    if (!fullName || !phoneNumber || !email || !password) {
      setErrorMessage(
        isEnglish
          ? "Please make sure all fields are filled."
          : "Lütfen tüm alanları doldurduğunuzdan emin olun."
      );
      Toast.show({
        type: "error",
        position: "top",
        text1: isEnglish ? "Registration Failed" : "Kayıt Başarısız",
        text2: isEnglish
          ? "Please make sure all fields are filled."
          : "Lütfen tüm alanları doldurduğunuzdan emin olun.",
        visibilityTime: 4000,
      });
      return;
    }

    const passwordError = validatePassword(password);

    if (passwordError) {
      setErrorMessage(passwordError);

      Toast.show({
        type: "error",
        position: "top",
        text1: isEnglish ? "Password Error" : "Şifre Hatası",
        text2: passwordError,
        visibilityTime: 4000,
      });
      return;
    }
    setErrorMessage("");

    dispatch(register({ email, password, fullName, phoneNumber }));
  };

  if (isLoading) {
    return <Loading />;
  }

  const handleLanguageToggle = () => {
    setIsEnglish((prev) => !prev);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.header}>
              <Pressable style={styles.languageToggle} onPress={handleLanguageToggle}>
                <Text style={styles.languageText}>{isEnglish ? "TR" : "EN"}</Text>
              </Pressable>
              <View style={styles.title}>
              <Image
                source={require("../../assets/barbotranlogo.png")}
                style={styles.logo}
              />
              </View>
            </View>
            <View style={styles.textInputContainer}>
              <CustomTextInput
                title={isEnglish ? "Full Name" : "İsim"}
                isSecureText={false}
                handleOnchangeText={(name) => setFullName(name)}
                handleValue={fullName}
                handlePlaceholder={isEnglish ? "Enter your full name" : "İsminizi Giriniz"}
              />
              <CustomTextInput
                title={isEnglish ? "Phone Number" : "Telefon"}
                isSecureText={false}
                handleOnchangeText={(phoneNumber) =>
                  setPhoneNumber(phoneNumber)
                }
                handleValue={phoneNumber}
                handlePlaceholder={isEnglish ? "Enter your phone number" : "Telefon Numaranızı Giriniz"}
              />
              <CustomTextInput
                title={isEnglish ? "Email" : "Email"}
                isSecureText={false}
                handleOnchangeText={(email) => setEmail(email)}
                handleValue={email}
                handlePlaceholder={isEnglish ? "Enter your email address" : "E-Posta Adresinizi Giriniz"}
              />
              <CustomTextInput
                title={isEnglish ? "Password" : "Şifre"}
                isSecureText={true}
                handleOnchangeText={(password) => setPassword(password)}
                handleValue={password}
                handlePlaceholder={isEnglish ? "Choose password" : "Şifre Belirleyin"}
              />
            </View>
            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
            <View style={styles.signupOptions}>
              <CustomButton
                handlePressButton={handleRegister}
                title={isEnglish ? "Register" : "Kayıt Ol"}
                setWidth="80%"
                setHeight={40}
                handleBackgroundColor={"#0a78ca"}
                handlePressedBackgroundColor={"#b3cde0"}
              />
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text>
                  {isEnglish ? "Already have an account?" : "Zaten bir hesabınız var mı?"}
                  <Text style={{ fontWeight: "bold", color: "#0a78ca" }}>
                    {isEnglish ? " Log In" : " Giriş Yapın"}
                  </Text>
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffdff",
    justifyContent: "center",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
    textAlign: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 30,
  },
  languageToggle: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    elevation: 3,
  },
  languageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
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

export default RegisterPage;
