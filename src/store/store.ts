import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import authReducer from "./authSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// import storage from "redux-persist/lib/storage"; 
import storage from './storage';

// Create persist config for redux-persist
const persistConfig = {
  key: "root", // Key for the storage
  storage,     // Using your custom storage
  whitelist: ["auth"], // Persist only the 'auth' slice
};

// Create the persisted reducer for auth
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Create the store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: persistedAuthReducer, // persisted auth reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // <== important!
      },
    }),
});

// Create a persistor to manage persistence
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
