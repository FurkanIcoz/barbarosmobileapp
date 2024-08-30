import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const TopUpPage = () => {
  const [amount, setAmount] = useState("");

  const handleTopUp = () => {
    // Bakiye yükleme işlemi
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Yüklemek İstediğiniz Tutar</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Yükle" onPress={handleTopUp} />
    </View>
  );
};

export default TopUpPage;

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
