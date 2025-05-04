import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string; // Make sure size is part of the CartItem
}

interface CartState {
  items: CartItem[];
}

// Helper to safely load cart from localStorage (only in browser)
const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

// Helper to save cart to localStorage
const saveCartToLocalStorage = (items: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(items));
  }
};

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;

      // Check if item with same id and size already exists
      const existingItem = state.items.find(
        item => item.id === newItem.id && item.size === newItem.size
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      saveCartToLocalStorage(state.items);
    },

    removeFromCart(
      state,
      action: PayloadAction<{ id: number; size: string }>
    ) {
      state.items = state.items.filter(
        item => item.id !== action.payload.id || item.size !== action.payload.size
      );
      saveCartToLocalStorage(state.items);
    },

    clearCart(state) {
      state.items = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
