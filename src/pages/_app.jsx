import { Provider } from "react-redux";
import { store, persistor } from "../store/store";
import "../styles/global.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";

// Slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
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
