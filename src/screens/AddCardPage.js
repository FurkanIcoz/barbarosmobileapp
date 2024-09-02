import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { addCard } from "../redux/walletSlice";
import { Checkbox } from "react-native-paper";

const AddCardPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const [cvc, setCvc] = useState("");
  const dispatch = useDispatch();

  const handleAddCard = () => {
    if (cardNumber && cardHolder && expiryDate && cvc) {
      const card = { cardNumber, cardHolder, expiryDate, cvc, isDefault: false };
      dispatch(addCard(card));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kart ekle</Text>

      <TextInput
        style={styles.input}
        value={cardHolder}
        onChangeText={setCardHolder}
        placeholder="Kart üzerinde bulunan isim"
      />
      <TextInput
        style={styles.input}
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numbers-and-punctuation"
        placeholder="Kart numarası"
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.expiryInput]}
          value={expiryDate}
          onChangeText={setExpiryDate}
          keyboardType="numbers-and-punctuation"
          placeholder="Son Kullanma Tarihi"
        />
        <TextInput
          style={[styles.input, styles.cvcInput]}
          value={cvc}
          onChangeText={setCvc}
          keyboardType="numeric"
          placeholder="CVC"
          secureTextEntry
        />
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={saveCard}
          onValueChange={setSaveCard}
        />
        {/* <Text style={styles.checkboxLabel}>Sonraki ödemeler için kartımı kaydet.</Text> */}
      </View>

      <Pressable style={styles.reviewPaymentButton} onPress={handleAddCard}>
        <Text style={styles.reviewPaymentText}>Kartı kaydet</Text>
      </Pressable>
    </View>
  );
};

export default AddCardPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",

  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expiryInput: {
    flex: 1,
    marginRight: 8,
  },
  cvcInput: {
    flex: 1,
    marginLeft: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  reviewPaymentButton: {
    backgroundColor: "#4d9ee9",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  reviewPaymentText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
