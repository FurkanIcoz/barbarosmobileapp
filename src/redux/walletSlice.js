import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDoc, doc, getFirestore } from "firebase/firestore";

export const fetchWallet = createAsyncThunk(
  "wallet/fetchWallet",
  async (userId) => {
    const db = getFirestore();
    const walletDoc = await getDoc(
      doc(db, "users", userId, "wallets", "main_wallet")
    );
    if (walletDoc.exists()) {
      return walletDoc.data();
    } else {
      throw new Error("Cüzdan bulunamadı.");
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    balance: 0,
    bonus: 0,
    cards: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload.balance;
        state.bonus = action.payload.bonus;
        state.cards = action.payload.cards;
      })
      .addCase(fetchWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default walletSlice.reducer;
