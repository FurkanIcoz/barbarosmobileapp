import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchWallet } from "../redux/walletSlice";

const TopUpPage = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const dispatch = useDispatch();
  const { balance } = useSelector((state) => state.wallet);

  const handleTopUp = () => {
    if (selectedAmount) {
      // Bakiye yükleme işlemi, örneğin dispatch ile backend'e gönderilebilir.
      // Burada sadece state güncelleyebiliriz:
      dispatch({ type: 'wallet/updateBalance', payload: selectedAmount });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>Toplam Bakiyeniz</Text>
      <Text style={styles.balanceAmount}>₺{balance.toFixed(2)}</Text>

      <Text style={styles.label}>Yüklemek İstediğiniz Tutar</Text>
      <View style={styles.cardContainer}>
        {[50, 100, 200].map((amount) => (
          <Pressable
            key={amount}
            style={[
              styles.amountCard,
              selectedAmount === amount && styles.selectedCard,
            ]}
            onPress={() => setSelectedAmount(amount)}
          >
            <Text style={styles.amountText}>₺{amount}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.topUpButton} onPress={handleTopUp}>
        <Text style={styles.topUpButtonText}>Bakiye Yükle</Text>
      </Pressable>
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
  balanceText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4d9ee9",
    textAlign: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  amountCard: {
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f0f0f0",
  },
  selectedCard: {
    backgroundColor: "#4d9ee9",
  },
  amountText: {
    fontSize: 18,
    color: "#000",
  },
  topUpButton: {
    backgroundColor: "#4d9ee9",
    borderRadius: 5,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  topUpButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
