import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { CustomButton } from "../components";

const ContactUsPage = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message) {
      Alert.alert("Hata", "Lütfen mesajınızı yazın.");
    } else {
      Alert.alert("Başarılı", "Mesajınız gönderildi. Teşekkür ederiz!");
      // Mesaj gönderme işlemleri burada yapılabilir
      setMessage("");
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Mesajınızın detaylarını buraya yazınız."
          value={message}
          onChangeText={(text) => setMessage(text)}
          multiline
          numberOfLines={5}
        />

       
        <View style={styles.contactInfo}>
        <CustomButton
          handlePressButton={handleSubmit}
          title={"Kaydet ve Gönder"}
          setWidth={"80%"}
          setHeight={45}
          handleBackgroundColor={"#0a78ca"}
          handlePressedBackgroundColor={"#b3cde0"}
        />
          {/* <Text style={styles.infoHeader}>İletişim Bilgileri</Text>
          <Text style={styles.infoText}>Telefon: +90 505 50 05</Text>
          <Text style={styles.infoText}>E-posta: info@barbaros.com</Text> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactUsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textInput: {
    width: "90%",
    borderWidth: 1,
    borderRadius: 5,
    height: "30%",
  },

  textInput: {
    width: "90%",
    borderWidth: 1.7,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 15,
    paddingTop: 20,
    marginBottom: 15,
    backgroundColor: "#f8f9fa",
  },
  textArea: {
    height: 250,
    textAlignVertical: "top",
  },

  contactInfo: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
    width: "100%",
  },
  infoHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },

});
