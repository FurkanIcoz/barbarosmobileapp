import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const AddCardPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const handleAddCard = () => {
    // Kart ekleme işlemi
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Kart Numarası</Text>
      <TextInput
        style={styles.input}
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Kart Sahibi</Text>
      <TextInput
        style={styles.input}
        value={cardHolder}
        onChangeText={setCardHolder}
      />
      <Button title="Kart Ekle" onPress={handleAddCard} />
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
});
