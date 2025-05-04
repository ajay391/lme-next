// store/wishlistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
}

interface WishlistState {
  items: WishlistItem[];
}

const loadWishlistFromLocalStorage = (): WishlistItem[] => {
  if (typeof window !== 'undefined') {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  }
  return [];
};

const saveWishlistToLocalStorage = (items: WishlistItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }
};

const initialState: WishlistState = {
  items: loadWishlistFromLocalStorage(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<WishlistItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        item => item.id === newItem.id && item.size === newItem.size
      );

      if (!existingItem) {
        state.items.push(newItem);
        saveWishlistToLocalStorage(state.items);
      }
    },

    removeFromWishlist(state, action: PayloadAction<{ id: number; size: string }>) {
      state.items = state.items.filter(
        item => item.id !== action.payload.id || item.size !== action.payload.size
      );
      saveWishlistToLocalStorage(state.items);
    },

    clearWishlist(state) {
      state.items = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('wishlist');
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
