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
      <Navbar />
        <a
        href="https://wa.me/918594069080" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg transition duration-300 ease-in-out flex items-center justify-center"
      >
        <FaWhatsapp size={26} />
      </a>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            marginTop: "60px", // Set your desired top offset
          },
        }}
      />
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
      <Footer />
    </Provider>
  );
}

export default App;
