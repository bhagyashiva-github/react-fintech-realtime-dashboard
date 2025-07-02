import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Coin } from '../../types/Coin';

interface CryptoState {
  coins: Coin[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CryptoState = {
  coins: [],
  status: 'idle',
};

export const fetchCryptoData = createAsyncThunk('crypto/fetchData', async () => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    console.log(response.json);
  return await response.json();
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState, // ✅ This line fixes the warning
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coins = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default cryptoSlice.reducer;
