// store/wishlistSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axiosInstance'; // use your axios setup

export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async () => {
  const res = await axios.get('/wishlist/');
  return res.data;
});
export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (item, { rejectWithValue }) => {
    try {
      const res = await axios.post('/wishlist/add/', item);
      return res.data;
    } catch (error) {
      let errorMessage =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong.';

      // Customize specific error messages
      if (errorMessage === 'Authentication credentials were not provided.') {
        errorMessage = 'Please login to add item to wishlist.';
      }

      return rejectWithValue(errorMessage);
    }
  }
);


export const removeFromWishlist = createAsyncThunk('wishlist/removeFromWishlist', async ({ id }) => {
  await axios.delete(`/wishlist/${id}/delete/`);
  return id;
});

export const clearWishlist = createAsyncThunk('wishlist/clearWishlist', async (_, { getState }) => {
  const { wishlist } = getState();
  await Promise.all(
    wishlist.items.map((item) => axios.delete(`/wishlist/${item.id}/delete/`))
  );
  return [];
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(clearWishlist.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default wishlistSlice.reducer;
