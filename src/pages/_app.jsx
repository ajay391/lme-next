import { Provider } from "react-redux";
import { store, persistor } from "../store/store";
import "../styles/global.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { FaWhatsapp } from "react-icons/fa";

// Slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navbar />
        
        <a
          href="https://wa.me/XXXXX-XXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg transition duration-300 ease-in-out flex items-center justify-center"
        >
          <FaWhatsapp size={26} />
        </a>

       <Toaster
  position="top-center"
  toastOptions={{
    duration: 4000,
    style: {
      padding: "8px 20px",
      fontSize: "14px",
      background: "#1f2937", // dark background
      color: "#fff",         // white text
      borderRadius: "0px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
    
  }}
  containerStyle={{
    top: 20,
  }}
/>

        <Component {...pageProps} />
        <Footer />
      </PersistGate>
    </Provider>
  );
}

export default App;
