import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StrictMode } from "react";
import store from './redux/store.tsx';
import { Provider } from "react-redux";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store} >
  
    <App />
    </Provider>
  </StrictMode>
      
  
);
