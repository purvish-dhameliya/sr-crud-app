import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import App from "./App.jsx";
import Header from "./components/Header";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Header />
          <App />
          <ToastContainer />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
