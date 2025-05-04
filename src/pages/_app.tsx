// pages/_app.tsx
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store, persistor } from "@/store/store";
import "@/styles/global.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";

// _app.js or _app.tsx
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navbar />
      <Toaster position="bottom-right" />

      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>

      <Footer />
    </Provider>
  );
}
