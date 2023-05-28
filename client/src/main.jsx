import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/index.css";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./store";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthProvider.jsx";

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
