import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDoc, doc, getFirestore, updateDoc, arrayUnion } from "firebase/firestore";

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

export const addCard = createAsyncThunk(
  "wallet/addCard",
  async ({ userId, card }) => {
    const db = getFirestore();
    const walletRef = doc(db, "users", userId, "wallets", "main_wallet");

    await updateDoc(walletRef, {
      cards: arrayUnion(card),
    });

    return card;
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    balance: 0,
    cards: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    updateBalance: (state, action) => {
      state.balance += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload.balance;
        state.cards = action.payload.cards;
      })
      .addCase(fetchWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.cards.push(action.payload);
      });
  },
});

export const { updateBalance } = walletSlice.actions;
export default walletSlice.reducer;