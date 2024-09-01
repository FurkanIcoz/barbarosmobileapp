import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { CustomButton, CustomTextInput, Loading } from "../components/index";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { login, autoLogin } from "../redux/userSlice";
import { TabView, TabBar } from 'react-native-tab-view';
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const LoginPage = () => {
  const { isLoading, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEnglish, setIsEnglish] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState("");
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'barbaros', title: 'Barbaros' },
    { key: 'barbarosOtel', title: 'Barbaros Otel' },
  ]);

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setErrorMessage("");
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage(
        isEnglish
          ? "Please make sure all fields are filled."
          : "Lütfen tüm alanları doldurduğunuzdan emin olun."
      );
      return;
    }
    setErrorMessage("");
    await dispatch(login({ email, password }));
    if (!isLoading && error) {
      setErrorMessage(
        isEnglish
          ? "Make sure you entered the email and password correctly."
          : "Email veya şifreyi doğru girdiğinizden emin olun."
      );
      return;
    }
  };

  const handleLanguageToggle = () => {
    setIsEnglish((prev) => !prev);
    // Update error message when toggling language
    if (errorMessage === "Lütfen tüm alanları doldurduğunuzdan emin olun.") {
      setErrorMessage("Please make sure all fields are filled.");
    }
    if (errorMessage === "Email veya şifreyi doğru girdiğinizden emin olun.") {
      setErrorMessage("Make sure you entered the email and password correctly.");
    }
    if (errorMessage === "Please make sure all fields are filled.") {
      setErrorMessage("Lütfen tüm alanları doldurduğunuzdan emin olun.");
    }
    if (errorMessage === "Make sure you entered the email and password correctly.") {
      setErrorMessage("Email veya şifreyi doğru girdiğinizden emin olun.");
    }
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'barbaros':
        return (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        
        <View style={styles.header}>
          <Pressable style={styles.languageToggle} onPress={handleLanguageToggle}>
            <Text style={styles.languageText}>{isEnglish ? "TR" : "EN"}</Text>
          </Pressable>
          <Image
            source={require("../../assets/barbotranlogo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.form}>
          <View style={styles.textInputContainer}>
            <CustomTextInput
              title={isEnglish ? "Email" : "E-posta"}
              handlePlaceholder={isEnglish ? "Enter your email" : "E-posta adresinizi girin"}
              isSecureText={false}
              handleOnchangeText={(text) => setEmail(text)}
              handleValue={email}
              style={styles.textInput}
            />
            <CustomTextInput
              title={isEnglish ? "Password" : "Şifre"}
              handlePlaceholder={isEnglish ? "Enter your password" : "Şifrenizi girin"}
              isSecureText={true}
              handleOnchangeText={(text) => setPassword(text)}
              handleValue={password}
              style={styles.textInput}
            />
            <Pressable style={styles.forgotPassword} onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.forgotPasswordText}>
                {isEnglish ? "Forgot your password?" : "Şifrenizi mi unuttunuz?"}
              </Text>
            </Pressable>
          </View>
          
          <View style={styles.socialContainer}>
            <Pressable style={styles.socialButton}>
              <FontAwesome name="google" size={24} color="#DB4437" />
            </Pressable>
            <Pressable style={styles.socialButton}>
              <FontAwesome name="facebook" size={24} color="#4267B2" />
            </Pressable>
            <Pressable style={styles.socialButton}>
              <MaterialCommunityIcons name="apple" size={24} color="#000000" />
            </Pressable>
          </View>

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          <View style={styles.actions}>
            <CustomButton
              handlePressButton={handleLogin}
              title={isEnglish ? "Login" : "Giriş Yap"}
              setWidth={"80%"}
              setHeight={45}
              handleBackgroundColor={"#0a78ca"}
              handlePressedBackgroundColor={"#b3cde0"}
              style={styles.loginButton}
            />
            <Pressable style={styles.dontAccount} onPress={() => navigation.navigate("Register")}>
              <Text style={styles.dontAccountText}>
                {isEnglish
                  ? "Don't have an account? "
                  : "Hesabınız yok mu? "}
                <Text style={styles.signUpText}>
                  {isEnglish ? "Sign Up" : "Kayıt Olun"}
                </Text>
              </Text>
            </Pressable>
          </View>
        </View>
        {isLoading && <Loading />}
      </SafeAreaView>
    </TouchableWithoutFeedback>
        );
      case 'barbarosOtel':
        return (
          <View style={styles.container}>
            {/* Buraya BarbarosOtel sayfasının içeriğini ekleyin */}
            <Text style={styles.contentText}>BarbarosOtel Sayfası İçeriği</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 360 }} // Adjust according to your screen width
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.tabLabel}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    flex: 0.4,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 30,
  },
  languageToggle: {
    position: "absolute",
    top: 30,
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
  logo: {
    marginVertical: 20,
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  textInputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    marginVertical: 10,
    width: "90%",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 50
  },
  forgotPasswordText: {
    color: "#0a78ca",
    fontSize: 14,
  },
  form: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 20,
  },
  socialButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  actions: {
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 14,
  },
  dontAccount: {
    marginTop: 60,
    marginBottom: 30,
    alignItems: "center",
  },
  dontAccountText: {
    fontSize: 14,
  },
  signUpText: {
    fontWeight: "bold",
    color: "#0a78ca",
  },
  loginButton: {
    marginVertical: 20,
    borderRadius: 25,
    elevation: 3,
  },
  tabBar: {
    backgroundColor: "#f5f5f5",
  },
  tabLabel: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  indicator: {
    backgroundColor: "#0a78ca",
  },
  contentText: {
    fontSize: 16,
    color: "#333",
  },
});
export default LoginPage;
