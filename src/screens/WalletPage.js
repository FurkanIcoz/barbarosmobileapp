import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchWallet } from "../redux/walletSlice";
import { Loading } from "../components";
import CustomButton from "../components/CustomButton"; // Özel buton componenti

const WalletPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const { balance, cards, isLoading, error } = useSelector(
    (state) => state.wallet
  );
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchWallet(user.uid));
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Text>Hata: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Cüzdan Bakiyem</Text>
        <Text style={styles.balanceAmount}>₺{balance.toFixed(2)}</Text>
        <Pressable
          style={styles.topUpButton}
          onPress={() => navigation.navigate("TopUpPage")}
        >
          <Text style={styles.topUpText}>Bakiye Yükle</Text>
        </Pressable>
      </View>

      <FlatList
        data={cards}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Text>{item.cardNumber}</Text>
            <Text>{item.isDefault ? "Varsayılan" : ""}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text>Kayıtlı kart bulunmamaktadır.</Text>}
      />

      <Pressable
        style={styles.addCardButton}
        onPress={() => navigation.navigate("AddCardPage")}
      >
        <Text style={styles.addCardText}>Kart Ekle</Text>
      </Pressable>
    </View>
  );
};

export default WalletPage;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  balanceContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginBottom: 16,
  },
  balanceText: {
    fontSize: 18,
    color: "#555",
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00b300",
    marginVertical: 8,
  },
  topUpButton: {
    backgroundColor: "#00b300",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  topUpText: {
    color: "#fff",
    fontSize: 16,
  },
  friendButton: {
    marginVertical: 16,
  },
  cardContainer: {
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  addCardButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop: 16,
  },
  addCardText: {
    color: "#555",
    fontSize: 16,
  },
});
