import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { addCard } from "../redux/walletSlice";

const AddCardPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const dispatch = useDispatch();

  const handleAddCard = () => {
    if (cardNumber && cardHolder) {
      const card = { cardNumber, cardHolder, isDefault: false };
      dispatch(addCard(card));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Kart Numarası</Text>
      <TextInput
        style={styles.input}
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numbers-and-punctuation"
      />
      <Text style={styles.label}>Kart Sahibi</Text>
      <TextInput
        style={styles.input}
        value={cardHolder}
        onChangeText={setCardHolder}
      />

      <Pressable style={styles.addCardButton} onPress={handleAddCard}>
        <Text style={styles.addCardText}>Kart Ekle</Text>
      </Pressable>
    </View>
  );
};

export default AddCardPage;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  addCardButton: {
    backgroundColor: "#4d9ee9",
    borderRadius: 5,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  addCardText: {
    color: "#fff",
    fontSize: 18,
  },
});
