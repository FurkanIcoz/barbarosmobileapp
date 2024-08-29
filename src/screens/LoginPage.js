import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { CustomButton, CustomTextInput, Loading } from "../components/index";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { login, autoLogin } from "../redux/userSlice";
import Toast from "react-native-toast-message";

const LoginPage = () => {
  const { isLoading, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setErrorMessage("");
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (error) {
      setErrorMessage("Email veya şifreyi doğru girdiğinizden emin olun.");
    }
  }, [error]);

  const handleLogin = () => {
    setErrorMessage("");
    if (!email || !password) {
      setErrorMessage("Lütfen tüm alanları doldurduğunuzdan emin olun.");
      return;
    }

    dispatch(login({ email, password }));
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        {/* <Toast /> */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/barbaros.jpg")}
            style={styles.logo}
          />
        </View>
        <View style={styles.form}>
          <View style={styles.textInputContainer}>
            <CustomTextInput
              title="Email"
              handlePlaceholder="EMAIL"
              isSecureText={false}
              handleOnchangeText={(text) => setEmail(text)}
              handleValue={email}
            />

            <CustomTextInput
              title="Şifre"
              handlePlaceholder="ŞIFRE"
              isSecureText={true}
              handleOnchangeText={(text) => setPassword(text)}
              handleValue={password}
            />
          </View>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          <View style={styles.actions}>
            <CustomButton
              handlePressButton={handleLogin}
              title={"Giriş Yap"}
              setWidth={"80%"}
              setHeight={50}
              handleBackgroundColor={"#0a78ca"}
              handlePressedBackgroundColor={"#b3cde0"}
            />
            <CustomButton
              style={styles.kurumsalLogin}
              handlePressButton={() => console.log("Kurumsal Giris")}
              title={"Kurumsal Giriş"}
              setWidth={"60%"}
              setHeight={40}
              handleBackgroundColor={"#0a78ca"}
              handlePressedBackgroundColor={"#b3cde0"}
            />
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text>
                Hesabınız Yok mu?
                <Text style={{ fontWeight: "bold" }}> Kayıt Olun</Text>
              </Text>
            </Pressable>
          </View>
        </View>
        {isLoading && <Loading />}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fffdff",
  },
  header: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  errorText: {
    color: "red",
    marginBottom: 5,
    textAlign: "center",
  },
  textInputContainer: {
    flex: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  logo: {
    marginVertical: 40,
  },
  form: {
    flex: 3.5,
    width: "100%",
    alignItems: "center",
  },
  actions: {
    flex: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default LoginPage;
