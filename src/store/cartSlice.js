import { createSlice } from '@reduxjs/toolkit';

// Helper to safely load cart from localStorage (only in browser)
const loadCartFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

// Helper to save cart to localStorage
const saveCartToLocalStorage = (items) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(items));
  }
};

const initialState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;

      // Check if item with same id, size, and color already exists
      const existingItem = state.items.find(
        item =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      saveCartToLocalStorage(state.items);
    },

    removeFromCart(state, action) {
      const { id, size, color } = action.payload;

      state.items = state.items.filter(
        item =>
          item.id !== id ||
          item.size !== size ||
          item.color !== color
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
